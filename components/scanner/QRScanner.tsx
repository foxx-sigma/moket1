"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { ScanLine } from "lucide-react";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: any) => void;
  isScanning: boolean;
}

export function QRScanner({ onScanSuccess, onScanFailure, isScanning }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    // Initialize scanner
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    if (isScanning) {
      html5QrCode
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            // Pause scanning after success to avoid multiple rapid scans
            if (html5QrCode.isScanning) {
              html5QrCode.pause(true);
            }
            onScanSuccess(decodedText);
          },
          (error) => {
            if (onScanFailure) {
              onScanFailure(error);
            }
          }
        )
        .catch((err) => {
          console.error("Error starting scanner:", err);
        });
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning, onScanSuccess, onScanFailure]);

  // Expose resume function if needed
  useEffect(() => {
    if (isScanning && scannerRef.current?.getState() === 3 /* PAUSED */) {
      scannerRef.current.resume();
    }
  }, [isScanning]);

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-black">
      <div id="reader" className="w-full h-full" />
      
      {/* Overlay to give a scanning feel */}
      <div className="absolute inset-0 border-4 border-moket-orange-dark/30 rounded-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-moket-orange rounded-xl pointer-events-none">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-moket-orange" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-moket-orange" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-moket-orange" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-moket-orange" />
        
        {/* Scanning line animation */}
        {isScanning && (
          <div className="absolute top-0 left-0 w-full h-1 bg-moket-orange opacity-70 animate-[scan_2s_ease-in-out_infinite]" />
        )}
      </div>

      {!isScanning && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-6 text-center">
          <ScanLine className="h-12 w-12 mb-4 text-muted-foreground" />
          <p className="font-semibold text-lg">Scanner Dihentikan</p>
          <p className="text-sm text-muted-foreground">Tekan tombol pindai untuk memulai</p>
        </div>
      )}
      
      {/* Custom keyframes for scanning animation since tailwind doesn't have it by default */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}} />
    </div>
  );
}
