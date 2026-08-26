"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, Tag, Ticket, Info, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiGetEventBySlug, type EventDetail, type ApiError } from "@/lib/api";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Mapping status event ke label & style
const statusConfig: Record<string, { label: string; className: string }> = {
  published: { label: "Pendaftaran Dibuka", className: "bg-green-100 text-green-700" },
  draft:     { label: "Segera Hadir", className: "bg-yellow-100 text-yellow-700" },
  completed: { label: "Telah Selesai", className: "bg-gray-100 text-gray-600" },
  cancelled: { label: "Dibatalkan", className: "bg-red-100 text-red-600" },
};

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  useEffect(() => {
    let cancelled = false;

    apiGetEventBySlug(resolvedParams.slug)
      .then((data) => {
        if (!cancelled) {
          setEvent(data);
          setIsLoading(false);
        }
      })
      .catch((err: ApiError) => {
        if (cancelled) return;
        if (err.status === 404) {
          setNotFoundFlag(true);
        }
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [resolvedParams.slug]);

  if (notFoundFlag) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Gagal memuat detail event.</p>
        <Link href="/events">
          <Button variant="outline">Kembali ke Daftar Event</Button>
        </Link>
      </div>
    );
  }

  const statusInfo = statusConfig[event.status] ?? { label: event.status, className: "bg-muted text-muted-foreground" };
  const isAvailable = event.status === "published";

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-muted overflow-hidden">
        {event.posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.posterUrl}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />

        {/* Banner Content Layer */}
        <div className="absolute bottom-0 left-0 right-0 z-20 section-container pb-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Poster Thumbnail */}
            {event.posterUrl && (
              <div className="hidden md:block w-48 aspect-[3/4] rounded-lg shadow-xl overflow-hidden bg-muted border-4 border-background shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.posterUrl}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title & Badge */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.className}`}>
                  {statusInfo.label}
                </span>
                {event.category && (
                  <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                    <Tag className="mr-1 h-3 w-3" />
                    {event.category}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-md">
                {event.name}
              </h1>
              {event.organizer.name && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-moket-navy">
                      {event.organizer.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground drop-shadow-md">
                    Penyelenggara: {event.organizer.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-container py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Details */}
          <div className="flex-1 space-y-10">
            {/* Info Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary p-4 rounded-xl">
                <Calendar className="h-5 w-5 text-moket-red mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                <p className="text-sm font-medium">{formatDate(event.startDate)}</p>
              </div>
              <div className="bg-secondary p-4 rounded-xl">
                <Clock className="h-5 w-5 text-moket-orange mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Waktu</p>
                <p className="text-sm font-medium">{formatTime(event.startDate)}</p>
                {event.endDate && (
                  <p className="text-xs text-muted-foreground">s/d {formatTime(event.endDate)}</p>
                )}
              </div>
              <div className="bg-secondary p-4 rounded-xl col-span-2 md:col-span-2">
                <MapPin className="h-5 w-5 text-moket-navy mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Lokasi</p>
                <p className="text-sm font-medium">{event.location}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-moket-red" />
                Deskripsi Event
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                <p>{event.description}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Ticket Panel */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-moket-red" />
                Tiket
              </h3>

              {/* Tickets — BE belum mengisi data tickets, tampilkan info sementara */}
              <div className="mb-8">
                {event.tickets && event.tickets.length > 0 ? (
                  <div className="space-y-4">
                    {/* Render tickets ketika BE sudah mengembalikan data */}
                    <p className="text-sm text-muted-foreground">
                      {event.tickets.length} jenis tiket tersedia.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                    <p className="text-sm text-muted-foreground">
                      Informasi tiket akan segera tersedia.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-border">
                {isAvailable ? (
                  <Link href={`/events/${event.slug}/purchase`}>
                    <Button
                      size="lg"
                      className="w-full bg-moket-red hover:bg-moket-red-dark text-white h-12 text-base font-semibold"
                    >
                      Beli Tiket Sekarang
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="w-full h-12 text-base font-semibold"
                  >
                    Event {event.status === "completed" ? "Telah Selesai" : event.status === "cancelled" ? "Dibatalkan" : "Belum Dibuka"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
