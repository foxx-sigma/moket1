"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventCard } from "@/components/events/EventCard";
import { EventFilter } from "@/components/events/EventFilter";
import { apiGetEvents, type EventListItem, type ListEventsParams } from "@/lib/api";

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

export default function EventsPage() {
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "nearest" | "price">("newest");
  const [meta, setMeta] = useState<{ total: number; current_page: number; last_page: number; per_page: number } | null>(null);

  const fetchEvents = useCallback(async (params: ListEventsParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiGetEvents(params);
      setEvents(result.data);
      setMeta(result.meta);
    } catch (err) {
      console.error("[EventsPage] Gagal fetch events:", err);
      setError("Gagal memuat daftar event. Pastikan server backend sedang berjalan.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEvents({ sort, perPage: 12 });
  }, [fetchEvents, sort]);

  // Search dengan debounce sederhana
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents({ q: search || undefined, sort, perPage: 12 });
    }, 400);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSortChange = (value: string) => {
    const sortValue = value as "newest" | "nearest" | "price";
    setSort(sortValue);
    fetchEvents({ q: search || undefined, sort: sortValue, perPage: 12 });
  };

  return (
    <div className="w-full min-h-screen bg-background py-10">
      <div className="section-container">
        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Eksplorasi Event
          </h1>
          <p className="mt-3 text-muted-foreground">
            Temukan berbagai event seru dari SMK Telkom Malang
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-64 shrink-0">
            <EventFilter />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar: Search & Sort */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari nama event..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Urutkan:
                </span>
                <Select value={sort} onValueChange={(value) => handleSortChange(value ?? "newest")}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Pilih urutan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="nearest">Waktu Terdekat</SelectItem>
                    <SelectItem value="price">Harga</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Event Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <EventCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : events.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-muted-foreground">Tidak ada event yang ditemukan.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* Pagination / Info */}
                {meta && (
                  <div className="mt-12 flex justify-center">
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Menampilkan {events.length} dari {meta.total} event
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
