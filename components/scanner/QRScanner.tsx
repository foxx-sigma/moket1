"use client";

import { useEffect, useRef, useCallback } from "react";
import { ScanLine } from "lucide-react";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: any) => void;
  isScanning: boolean;
}

export function QRScanner({ onScanSuccess, onScanFailure, isScanning }: QRScannerProps) {
  const scannerRef = useRef<any>(null);
  const isStartedRef = useRef(false);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current && isStartedRef.current) {
      try {
        await scannerRef.current.stop();
        isStartedRef.current = false;
      } catch (e) {
        // ignore stop errors (already stopped)
      }
    }
  }, []);

  useEffect(() => {
    let html5QrCode: any = null;

    const initScanner = async () => {
      // Dynamically import to avoid SSR issues
      const { Html5Qrcode } = await import("html5-qrcode");

      // Ensure previous instance is cleaned up before creating a new one
      if (scannerRef.current && isStartedRef.current) {
        try {
          await scannerRef.current.stop();
          isStartedRef.current = false;
        } catch (e) {}
      }

      html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      if (isScanning) {
        try {
          await html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
            },
            (decodedText: string) => {
              // Pause after success to avoid rapid re-scans
              try {
                if (html5QrCode.isScanning) {
                  html5QrCode.pause(true);
                }
              } catch (e) {}
              onScanSuccess(decodedText);
            },
            (error: any) => {
              if (onScanFailure) onScanFailure(error);
            }
          );
          isStartedRef.current = true;
        } catch (err) {
          console.error("Error starting QR scanner:", err);
        }
      }
    };

    initScanner();

    return () => {
      if (html5QrCode && isStartedRef.current) {
        html5QrCode.stop().catch(() => {});
        isStartedRef.current = false;
      }
    };
  }, [isScanning, onScanSuccess, onScanFailure]);

  // Resume scanner when isScanning toggled back on from paused state
  useEffect(() => {
    if (isScanning && scannerRef.current) {
      try {
        const state = scannerRef.current.getState?.();
        // State 3 = PAUSED in html5-qrcode
        if (state === 3) {
          scannerRef.current.resume();
        }
      } catch (e) {}
    }
  }, [isScanning]);

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-black">
      <div id="qr-reader" className="w-full h-full" />

      {/* Scan frame overlay */}
      <div className="absolute inset-0 border-4 border-moket-red/20 rounded-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-moket-red rounded-xl pointer-events-none">
        <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-moket-red rounded-tl" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-moket-red rounded-tr" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-moket-red rounded-bl" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-moket-red rounded-br" />

        {/* Scanning line animation */}
        {isScanning && (
          <div className="absolute left-0 w-full h-0.5 bg-moket-red opacity-80 animate-[scan_2s_ease-in-out_infinite]" />
        )}
      </div>

      {!isScanning && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-6 text-center">
          <ScanLine className="h-12 w-12 mb-4 text-white/40" />
          <p className="font-semibold text-lg">Scanner Dihentikan</p>
          <p className="text-sm text-white/50">Tekan tombol pindai untuk memulai</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%   { top: 4px; }
          50%  { top: calc(100% - 4px); }
          100% { top: 4px; }
        }
      `}} />
    </div>
  );
}
