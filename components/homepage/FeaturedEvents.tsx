"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiFeaturedEvents, type FeaturedEvent } from "@/lib/api";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Skeleton card saat loading
function EventCardSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-muted" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-muted" />
          <div className="h-3 w-24 rounded bg-muted" />
        </div>
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}

export function FeaturedEvents() {
  const [events, setEvents] = useState<FeaturedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    apiFeaturedEvents()
      .then((data) => {
        if (!cancelled) {
          setEvents(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[FeaturedEvents] Gagal fetch:", err);
          setError("Gagal memuat event unggulan.");
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full py-20 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Event Unggulan
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Event terdekat yang tidak boleh kamu lewatkan
          </p>
        </div>

        {/* Event Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Belum ada event unggulan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`}>
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
                  </div>

                  <CardContent className="p-5">
                    {/* Organizer */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-moket-navy/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-moket-navy">
                          {(event.organizer.name ?? "?").charAt(0)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {event.organizer.name}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-moket-red transition-colors">
                      {event.name}
                    </h3>

                    {/* Meta */}
                    <div className="mt-3 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-end">
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-moket-red group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="mt-10 text-center">
          <Link href="/events">
            <Button
              variant="outline"
              size="lg"
              className="border-moket-red text-moket-red hover:bg-moket-red hover:text-white"
            >
              Lihat Semua Event
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
