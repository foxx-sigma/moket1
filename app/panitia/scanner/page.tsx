"use client";

import { useState } from "react";
import { QRScanner } from "@/components/scanner/QRScanner";
import { ScanResult, ScanStatus } from "@/components/scanner/ScanResult";
import { ManualInput } from "@/components/scanner/ManualInput";
import { Users, Ticket as TicketIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ScanHistoryItem {
  id: string;
  code: string;
  name: string;
  type: string;
  status: ScanStatus;
  time: string;
}

export default function QRScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [ticketData, setTicketData] = useState<{name: string; type: string; time?: string} | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedInCount, setCheckedInCount] = useState(145);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([
    {
      id: "hist-0",
      code: "MKT-2026-0915-ABC1",
      name: "Rizky Pratama",
      type: "Presale 1",
      status: "valid",
      time: "10:30 WIB",
    },
  ]);

  const totalTickets = 300;

  const processScan = (code: string) => {
    setIsScanning(false);
    setIsLoading(true);

    // Mock API call based on the scanned code
    setTimeout(() => {
      setIsLoading(false);
      const timeNow = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
      const randomValue = Math.random();
      
      let newStatus: ScanStatus = "valid";
      let newTicketData: { name: string; type: string; time?: string } | undefined = undefined;

      // Simulate different responses
      if (randomValue > 0.7) {
        newStatus = "used";
        newTicketData = {
          name: "Ahmad Fadhil",
          type: "Presale 1",
          time: "10:45 AM",
        };
      } else if (randomValue > 0.4) {
        newStatus = "valid";
        newTicketData = {
          name: "Budi Santoso",
          type: "Normal Ticket",
        };
        setCheckedInCount((prev) => prev + 1);
      } else if (randomValue > 0.1) {
        newStatus = "invalid";
      } else {
        newStatus = "not_found";
      }

      setScanStatus(newStatus);
      setTicketData(newTicketData);

      // Catat ke riwayat scan sesi berjalan
      setScanHistory((prev) => [
        {
          id: `hist-${Date.now()}`,
          code: code.toUpperCase(),
          name: newTicketData?.name || (newStatus === "invalid" ? "Tiket Tidak Valid" : "Bukan Event Ini"),
          type: newTicketData?.type || "-",
          status: newStatus,
          time: timeNow,
        },
        ...prev.slice(0, 9), // Simpan 10 riwayat terbaru
      ]);
    }, 600);
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
            <div className="h-10 w-10 rounded-full bg-moket-red/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-moket-red" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Check-in</p>
              <p className="font-bold text-lg">{checkedInCount}</p>
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
              <p className="font-bold text-lg">{totalTickets}</p>
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
                className="mt-6 w-full max-w-sm bg-moket-red hover:bg-moket-red/90 text-white"
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

        {/* Riwayat Scan Sesi Berjalan */}
        <div className="pt-2 space-y-3" data-testid="scan-history">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Riwayat Scan Sesi Ini</h3>
            <span className="text-xs text-muted-foreground">{scanHistory.length} pemindaian</span>
          </div>
          <div className="space-y-2">
            {scanHistory.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-card text-xs shadow-xs"
              >
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-muted-foreground font-mono text-[11px]">{item.code} • {item.type}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    item.status === "valid" ? "bg-green-500/10 text-green-600" :
                    item.status === "used" ? "bg-amber-500/10 text-amber-600" :
                    item.status === "invalid" ? "bg-red-500/10 text-red-600" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {item.status === "valid" ? "Valid" :
                     item.status === "used" ? "Terpakai" :
                     item.status === "invalid" ? "Tidak Valid" : "Bukan Event Ini"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
