import { cn } from "@/lib/utils";

// ============================
// Base Skeleton Primitive
// ============================

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  );
}

// ============================
// Preset Variants
// ============================

type SkeletonVariant = "table-rows" | "card-grid" | "stats-cards" | "detail-page";

interface SkeletonLoaderProps {
  variant: SkeletonVariant;
  /** Jumlah baris (untuk table-rows) atau jumlah kartu (untuk card-grid) */
  rows?: number;
  columns?: number;
}

export function SkeletonLoader({
  variant,
  rows = 5,
  columns = 3,
}: SkeletonLoaderProps) {
  if (variant === "table-rows") {
    return (
      <div className="space-y-3" role="status" aria-label="Memuat data...">
        {/* Header row */}
        <div className="flex gap-4 pb-2 border-b border-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center py-1">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 flex-[2]" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "card-grid") {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4`}
        role="status"
        aria-label="Memuat data..."
      >
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border border-border rounded-xl p-4 space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "stats-cards") {
    return (
      <div
        className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}
        role="status"
        aria-label="Memuat data..."
      >
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border border-border rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "detail-page") {
    return (
      <div className="space-y-6" role="status" aria-label="Memuat data...">
        <Skeleton className="h-56 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
      </div>
    );
  }

  return null;
}
