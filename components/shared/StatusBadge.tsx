import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { EventStatus } from "@/lib/types";

const statusConfig: Record<
  EventStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-amber-500/10 text-amber-600 border border-amber-500/20 hover:bg-amber-500/20",
  },
  published: {
    label: "Published",
    className: "bg-foreground text-background hover:bg-foreground/90",
  },
  completed: {
    label: "Selesai",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "bg-moket-red/10 text-moket-red border border-moket-red/20 hover:bg-moket-red/20",
  },
};

interface StatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, "text-xs font-medium", className)}>
      {config.label}
    </Badge>
  );
}
