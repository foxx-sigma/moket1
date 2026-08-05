import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { EventStatus } from "@/lib/types";

const statusConfig: Record<
  EventStatus,
  { label: string; className: string }
> = {
  upcoming: {
    label: "Segera",
    className: "bg-moket-navy text-white hover:bg-moket-navy-dark",
  },
  ongoing: {
    label: "Berlangsung",
    className: "bg-moket-orange text-white hover:bg-moket-orange-dark",
  },
  sold_out: {
    label: "Habis",
    className: "bg-moket-red text-white hover:bg-moket-red-dark",
  },
  closed: {
    label: "Ditutup",
    className: "bg-muted text-muted-foreground hover:bg-muted",
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
