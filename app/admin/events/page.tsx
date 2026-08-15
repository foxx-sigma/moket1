"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  Ticket,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

type EventStatus = "draft" | "published" | "completed" | "cancelled";

const mockEvents = [
  { id: "evt-001", title: "Moklet Fest 2026", startDate: "15 Sep 2026", category: "Musik", ticketsSold: 623, quota: 1000, status: "published" as EventStatus },
  { id: "evt-002", title: "Tech Talk: AI & Future", startDate: "22 Sep 2026", category: "Seminar", ticketsSold: 180, quota: 300, status: "published" as EventStatus },
  { id: "evt-003", title: "Workshop Design UI/UX", startDate: "10 Okt 2026", category: "Workshop", ticketsSold: 45, quota: 100, status: "draft" as EventStatus },
  { id: "evt-004", title: "English Speaking Club", startDate: "1 Agt 2026", category: "Bahasa", ticketsSold: 400, quota: 400, status: "completed" as EventStatus },
];

const statusConfig: Record<EventStatus, { label: string; className: string }> = {
  published: { label: "Published", className: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  draft: { label: "Draft", className: "bg-black/5 text-black/60 border-black/10" },
  completed: { label: "Selesai", className: "bg-muted text-muted-foreground border-border" },
  cancelled: { label: "Dibatalkan", className: "bg-black/10 text-black/50 border-black/10" },
};

export default function AdminEventsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockEvents.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Event</h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola semua event yang kamu selenggarakan.</p>
        </div>
        <Link href="/admin/events/create">
          <Button className="bg-moket-red hover:bg-moket-red/90 text-white gap-2 shrink-0">
            <PlusCircle className="h-4 w-4" />
            Buat Event
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Events List */}
      {filtered.length === 0 ? (
        <Card className="border border-dashed border-border">
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Tidak ada event ditemukan.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((event) => {
            const status = statusConfig[event.status];
            const pct = Math.round((event.ticketsSold / event.quota) * 100);
            return (
              <Card key={event.id} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
                        <Badge className={`text-[10px] border ${status.className}`}>{status.label}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {event.startDate} • {event.category}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm shrink-0">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Ticket className="h-3.5 w-3.5" />
                        <span className="font-medium text-foreground">{event.ticketsSold}</span>
                        <span>/ {event.quota} tiket</span>
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">({pct}%)</div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary shrink-0 h-8 w-8 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.location.href = `/events/${event.id}`} className="flex items-center gap-2 cursor-pointer">
                          <Eye className="h-4 w-4" /> Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `/admin/events/${event.id}/edit`} className="flex items-center gap-2 cursor-pointer">
                          <Edit className="h-4 w-4" /> Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `/admin/events/${event.id}/tickets`} className="flex items-center gap-2 cursor-pointer">
                          <Ticket className="h-4 w-4" /> Kelola Tiket
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.location.href = `/admin/events/${event.id}/participants`} className="flex items-center gap-2 cursor-pointer">
                          <Users className="h-4 w-4" /> Peserta
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer">
                          <Trash2 className="h-4 w-4" /> Hapus Event
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Tiket terjual</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-moket-red rounded-full transition-all"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
