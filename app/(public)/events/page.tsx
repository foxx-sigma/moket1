import { Search } from "lucide-react";
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
import { mockEvents } from "@/lib/mock/data";

export default function EventsPage() {
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
                />
              </div>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Urutkan:
                </span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Pilih urutan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Terbaru</SelectItem>
                    <SelectItem value="nearest">Waktu Terdekat</SelectItem>
                    <SelectItem value="price-low">Harga: Terendah</SelectItem>
                    <SelectItem value="price-high">Harga: Tertinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-12 flex justify-center">
              <span className="text-sm text-muted-foreground">
                Menampilkan 6 dari 6 event
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
