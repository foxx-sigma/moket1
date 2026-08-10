// ============================================================
// useScanner — Hook abstraksi logic QR scanner
// ============================================================
// Membungkus html5-qrcode library agar komponen scanner tidak
// langsung bergantung pada implementasi library.
// ============================================================

import { useState, useRef, useCallback, useEffect } from "react";
import type { ScanResult, ScanResultType } from "@/lib/types";

export type ScannerStatus = "idle" | "starting" | "active" | "stopped" | "error";

export interface ScannerState {
  status: ScannerStatus;
  lastResult: ScanResult | null;
  scanHistory: ScanResult[];
  errorMessage: string | null;
  totalCheckedIn: number;
  totalSold: number;
}

interface UseScannerOptions {
  eventId: string;
  onScanResult?: (result: ScanResult) => void;
}

// Mock scan logic — diganti dengan API call ke /api/scanner/validate saat integrasi
function mockProcessQrCode(qrCode: string, eventId: string): ScanResult {
  if (qrCode.includes("VALID")) {
    return {
      type: "valid",
      qrCode,
      attendeeName: "Ahmad Fadhil",
      ticketTypeName: "Presale 1",
      checkedInAt: new Date().toISOString(),
    };
  }
  if (qrCode.includes("USED")) {
    return {
      type: "already_used",
      qrCode,
      attendeeName: "Ahmad Fadhil",
      ticketTypeName: "Presale 1",
      previousCheckInAt: "2026-09-15T09:05:00+07:00",
    };
  }
  if (qrCode.includes("WRONG")) {
    return { type: "wrong_event", qrCode };
  }
  return { type: "invalid", qrCode };
}

export function useScanner({ eventId, onScanResult }: UseScannerOptions) {
  const [state, setState] = useState<ScannerState>({
    status: "idle",
    lastResult: null,
    scanHistory: [],
    errorMessage: null,
    totalCheckedIn: 0,
    totalSold: 120, // Mock — diganti dari API
  });

  // Ref untuk menyimpan instance html5-qrcode agar tidak recreate setiap render
  const scannerRef = useRef<{ stop: () => Promise<void> } | null>(null);
  const containerId = "qr-scanner-container";

  const processResult = useCallback(
    (result: ScanResult) => {
      setState((prev) => {
        const newHistory = [result, ...prev.scanHistory].slice(0, 50); // Max 50 riwayat
        const newCheckedIn =
          result.type === "valid" ? prev.totalCheckedIn + 1 : prev.totalCheckedIn;
        return {
          ...prev,
          lastResult: result,
          scanHistory: newHistory,
          totalCheckedIn: newCheckedIn,
        };
      });
      onScanResult?.(result);
    },
    [onScanResult]
  );

  const startScanner = useCallback(async () => {
    setState((prev) => ({ ...prev, status: "starting", errorMessage: null }));

    try {
      // Dynamic import agar tidak crash di SSR
      const { Html5Qrcode } = await import("html5-qrcode");
      const scanner = new Html5Qrcode(containerId);

      await scanner.start(
        { facingMode: "environment" }, // Kamera belakang
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          const result = mockProcessQrCode(decodedText, eventId);
          processResult(result);
        },
        () => {
          // onError: abaikan error kecil (frame tanpa QR) — jangan log ke console
        }
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scannerRef.current = scanner as any;
      setState((prev) => ({ ...prev, status: "active" }));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengakses kamera.";
      setState((prev) => ({
        ...prev,
        status: "error",
        errorMessage: message,
      }));
    }
  }, [eventId, processResult]);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {
        // Scanner mungkin sudah berhenti
      }
      scannerRef.current = null;
    }
    setState((prev) => ({ ...prev, status: "stopped" }));
  }, []);

  const processManualInput = useCallback(
    (code: string) => {
      if (!code.trim()) return;
      const result = mockProcessQrCode(code.trim(), eventId);
      processResult(result);
    },
    [eventId, processResult]
  );

  const clearLastResult = useCallback(() => {
    setState((prev) => ({ ...prev, lastResult: null }));
  }, []);

  // Auto-cleanup saat component unmount
  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => null);
    };
  }, []);

  return {
    state,
    containerId,
    startScanner,
    stopScanner,
    processManualInput,
    clearLastResult,
  };
}
