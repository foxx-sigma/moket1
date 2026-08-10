import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockEvents } from "@/lib/mock/data";

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

export function FeaturedEvents() {
  // Take 3 upcoming/ongoing events
  const featured = mockEvents
    .filter((e) => e.status === "published")
    .slice(0, 3);

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`}>
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

                <CardContent className="p-5">
                  {/* Organizer */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-full bg-moket-navy/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-moket-navy">
                        {event.organization.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {event.organization.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-moket-red transition-colors">
                    {event.title}
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

                  {/* Price */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Mulai dari
                      </p>
                      <p className="text-sm font-bold text-moket-red">
                        {formatPrice(event.priceStart)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-moket-red group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

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
