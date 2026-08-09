"use client";

import { useState } from "react";
import { QRScanner } from "@/components/scanner/QRScanner";
import { ScanResult, ScanStatus } from "@/components/scanner/ScanResult";
import { ManualInput } from "@/components/scanner/ManualInput";
import { Users, Ticket as TicketIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QRScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [ticketData, setTicketData] = useState<{name: string; type: string; time?: string} | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Stats
  const stats = {
    checkedIn: 145,
    total: 300,
  };

  const processScan = (code: string) => {
    setIsScanning(false);
    setIsLoading(true);

    // Mock API call based on the scanned code
    setTimeout(() => {
      setIsLoading(false);
      const randomValue = Math.random();
      
      // Simulate different responses
      if (randomValue > 0.7) {
        setScanStatus("used");
        setTicketData({
          name: "Ahmad Fadhil",
          type: "Presale 1",
          time: "10:45 AM",
        });
      } else if (randomValue > 0.4) {
        setScanStatus("valid");
        setTicketData({
          name: "Budi Santoso",
          type: "Normal Ticket",
        });
      } else if (randomValue > 0.1) {
        setScanStatus("invalid");
        setTicketData(undefined);
      } else {
        setScanStatus("not_found");
        setTicketData(undefined);
      }
    }, 800);
  };

  const handleReset = () => {
    setScanStatus("idle");
    setTicketData(undefined);
    setIsScanning(true);
  };

  return (
    <div className="max-w-md mx-auto min-h-[80vh] pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Check-in Scanner</h1>
        <p className="text-sm text-muted-foreground">
          Event: <span className="font-semibold text-foreground">Moklet Fest 2026</span>
        </p>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-moket-orange/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-moket-orange-dark" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Check-in</p>
              <p className="font-bold text-lg">{stats.checkedIn}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <TicketIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Tiket</p>
              <p className="font-bold text-lg">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Scanner Area */}
      <div className="space-y-6">
        {scanStatus === "idle" ? (
          <div className="flex flex-col items-center">
            {/* The Camera */}
            <QRScanner 
              isScanning={isScanning} 
              onScanSuccess={processScan} 
              onScanFailure={(err) => {
                // Usually ignore rapid failure logs, only capture actual read errors if needed
              }}
            />
            
            {!isScanning && (
              <Button 
                onClick={() => setIsScanning(true)}
                className="mt-6 w-full max-w-sm bg-moket-orange hover:bg-moket-orange-dark text-white"
              >
                Mulai Pindai QR
              </Button>
            )}
          </div>
        ) : (
          <ScanResult 
            status={scanStatus}
            ticketData={ticketData}
            onReset={handleReset}
          />
        )}

        {/* Fallback Manual Input */}
        <div className="pt-2">
          <ManualInput 
            onSearch={processScan} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}
