import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { EventListItem } from "@/lib/api";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function EventCard({ event }: { event: EventListItem }) {
  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="group h-full overflow-hidden border border-border transition-all duration-200 hover:border-moket-red/30 hover:shadow-lg">
        {/* Poster */}
        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
          {event.posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.posterUrl}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-moket-navy/5">
              <span className="text-sm text-muted-foreground">
                {event.name}
              </span>
            </div>
          )}
          {/* Scope badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              event.scope === "internal"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}>
              {event.scope === "internal" ? "Internal" : "Publik"}
            </span>
          </div>
        </div>

        <CardContent className="p-5 flex flex-col justify-between h-[calc(100%-16/10)]">
          <div>
            {/* Organizer */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-full bg-moket-navy/10 flex items-center justify-center">
                <span className="text-xs font-bold text-moket-navy">
                  {(event.organizer.name ?? "?").charAt(0)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {event.organizer.name ?? "Penyelenggara"}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-moket-red transition-colors mb-3">
              {event.name}
            </h3>

            {/* Category */}
            {event.category && (
              <span className="inline-block mb-3 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                {event.category}
              </span>
            )}

            {/* Meta */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-end">
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-moket-red group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
