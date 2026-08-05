import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { EventSummary } from "@/lib/types";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price: number): string {
  if (price === 0) return "Gratis";
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export function EventCard({ event }: { event: EventSummary }) {
  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="group h-full overflow-hidden border border-border transition-all duration-200 hover:border-moket-red/30 hover:shadow-lg">
        {/* Poster */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-moket-navy/5">
            <span className="text-sm text-muted-foreground">
              {event.title}
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <StatusBadge status={event.status} />
          </div>
        </div>

        <CardContent className="p-5 flex flex-col justify-between h-[calc(100%-16/10)]">
          <div>
            {/* Organizer */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-moket-navy/10 flex items-center justify-center">
                <span className="text-xs font-bold text-moket-navy">
                  {event.organizer.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {event.organizer.name}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-moket-red transition-colors mb-3">
              {event.title}
            </h3>

            {/* Meta */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Mulai dari</p>
              <p className="text-sm font-bold text-moket-red">
                {formatPrice(event.priceStart)}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-moket-red group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
