import { CheckCircle2, XCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ScanStatus = "valid" | "used" | "invalid" | "not_found" | "idle";

interface ScanResultProps {
  status: ScanStatus;
  ticketData?: {
    name: string;
    type: string;
    time?: string;
  };
  onReset: () => void;
}

export function ScanResult({ status, ticketData, onReset }: ScanResultProps) {
  if (status === "idle") {
    return (
      <div className="bg-secondary/50 border border-border rounded-xl p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Arahkan kamera ke QR Code pada tiket peserta untuk melakukan pemindaian (check-in).
        </p>
      </div>
    );
  }

  const resultConfig = {
    valid: {
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      title: "Tiket Valid!",
      message: "Check-in berhasil dilakukan.",
    },
    used: {
      icon: AlertTriangle,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      title: "Sudah Digunakan",
      message: `Tiket ini sudah di-scan sebelumnya pada: ${ticketData?.time || "waktu tidak diketahui"}.`,
    },
    invalid: {
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      title: "Tiket Tidak Valid",
      message: "QR Code tidak dikenali oleh sistem.",
    },
    not_found: {
      icon: HelpCircle,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      borderColor: "border-border",
      title: "Event Berbeda",
      message: "Tiket ini bukan untuk event yang sedang berlangsung.",
    },
  };

  const config = resultConfig[status as keyof typeof resultConfig];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border p-6 text-center animate-in zoom-in-95 duration-200 ${config.bgColor} ${config.borderColor}`}>
      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-background mb-4 shadow-sm`}>
        <Icon className={`h-8 w-8 ${config.color}`} />
      </div>
      
      <h3 className={`text-xl font-bold mb-1 ${config.color}`}>{config.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{config.message}</p>
      
      {ticketData && status !== "invalid" && status !== "not_found" && (
        <div className="bg-background rounded-lg p-3 text-left mb-4 shadow-sm border border-border/50">
          <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Peserta</p>
          <p className="font-bold text-foreground line-clamp-1">{ticketData.name}</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Jenis Tiket:</span>
            <span className="font-semibold">{ticketData.type}</span>
          </div>
        </div>
      )}

      <Button 
        onClick={onReset} 
        className="w-full font-semibold"
        variant={status === "valid" ? "default" : "outline"}
      >
        Pindai Tiket Selanjutnya
      </Button>
    </div>
  );
}
