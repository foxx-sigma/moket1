import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorVariant = "default" | "network" | "not-found" | "forbidden";

interface ErrorStateProps {
  message?: string;
  variant?: ErrorVariant;
  onRetry?: () => void;
  retryLabel?: string;
}

const variantConfig: Record<
  ErrorVariant,
  { icon: React.ElementType; defaultMessage: string }
> = {
  default: {
    icon: AlertCircle,
    defaultMessage: "Terjadi kesalahan saat memuat data. Silakan coba lagi.",
  },
  network: {
    icon: WifiOff,
    defaultMessage: "Tidak dapat terhubung ke server. Periksa koneksi internet kamu.",
  },
  "not-found": {
    icon: AlertCircle,
    defaultMessage: "Data yang kamu cari tidak ditemukan.",
  },
  forbidden: {
    icon: AlertCircle,
    defaultMessage: "Kamu tidak memiliki akses ke data ini.",
  },
};

export function ErrorState({
  message,
  variant = "default",
  onRetry,
  retryLabel = "Coba Lagi",
}: ErrorStateProps) {
  const cfg = variantConfig[variant];
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-red-500" strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-foreground text-base mb-1">Terjadi Kesalahan</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {message ?? cfg.defaultMessage}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="mt-5 gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
