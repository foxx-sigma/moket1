import { FileX2, Search, Inbox, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyVariant = "default" | "search" | "no-data";

interface EmptyStateProps {
  title?: string;
  description?: string;
  variant?: EmptyVariant;
  /** Label tombol CTA opsional */
  actionLabel?: string;
  onAction?: () => void;
}

const variantConfig: Record<
  EmptyVariant,
  { icon: React.ElementType; defaultTitle: string; defaultDescription: string }
> = {
  default: {
    icon: Inbox,
    defaultTitle: "Tidak Ada Data",
    defaultDescription: "Belum ada data yang tersedia saat ini.",
  },
  search: {
    icon: Search,
    defaultTitle: "Hasil Tidak Ditemukan",
    defaultDescription: "Coba gunakan kata kunci lain atau hapus filter yang aktif.",
  },
  "no-data": {
    icon: FileX2,
    defaultTitle: "Belum Ada Data",
    defaultDescription: "Data akan muncul di sini setelah ditambahkan.",
  },
};

export function EmptyState({
  title,
  description,
  variant = "default",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const cfg = variantConfig[variant];
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-foreground text-base mb-1">
        {title ?? cfg.defaultTitle}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {description ?? cfg.defaultDescription}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          size="sm"
          className="mt-5 bg-moket-red hover:bg-moket-red-dark text-white gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
