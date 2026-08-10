"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Ticket,
  Users,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CURRENCY_FORMATTER } from "@/lib/constants";

type PeriodFilter = "7d" | "30d" | "all";

const mockStats = {
  totalEvents: 4,
  totalTicketsSold: 1248,
  totalParticipants: 847,
  totalRevenue: 45600000,
};

const mockRecentEvents = [
  {
    id: "evt-1",
    title: "Moklet Fest 2026",
    startDate: "15 Sep 2026",
    ticketsSold: 623,
    quota: 1000,
    status: "published" as const,
    revenue: 15575000,
  },
  {
    id: "evt-2",
    title: "Tech Talk: AI & Future",
    startDate: "22 Sep 2026",
    ticketsSold: 180,
    quota: 300,
    status: "published" as const,
    revenue: 0,
  },
  {
    id: "evt-3",
    title: "Workshop Design UI/UX",
    startDate: "10 Okt 2026",
    ticketsSold: 45,
    quota: 100,
    status: "draft" as const,
    revenue: 2250000,
  },
];

const eventStatusConfig = {
  published: { label: "Published", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  draft: { label: "Draft", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  completed: { label: "Selesai", className: "bg-muted text-muted-foreground border-border" },
  cancelled: { label: "Dibatalkan", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const periodLabels: Record<PeriodFilter, string> = {
  "7d": "7 Hari",
  "30d": "30 Hari",
  all: "Semua",
};

const summaryCards = [
  {
    title: "Total Event",
    key: "totalEvents" as keyof typeof mockStats,
    icon: CalendarDays,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    format: (v: number) => v.toString(),
  },
  {
    title: "Tiket Terjual",
    key: "totalTicketsSold" as keyof typeof mockStats,
    icon: Ticket,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
    format: (v: number) => v.toLocaleString("id-ID"),
  },
  {
    title: "Peserta Terdaftar",
    key: "totalParticipants" as keyof typeof mockStats,
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    format: (v: number) => v.toLocaleString("id-ID"),
  },
  {
    title: "Total Pendapatan",
    key: "totalRevenue" as keyof typeof mockStats,
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    format: (v: number) => CURRENCY_FORMATTER.format(v),
  },
];

export default function SubOrgDashboardPage() {
  const [period, setPeriod] = useState<PeriodFilter>("30d");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Penyelenggara</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ringkasan performa event dan tiket organisasimu.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Filter Periode */}
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            {(["7d", "30d", "all"] as PeriodFilter[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  period === p
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {periodLabels[p]}
              </button>
            ))}
          </div>
          <Link href="/sub-org/events/create">
            <Button className="bg-moket-red hover:bg-moket-red-dark text-white gap-2 shrink-0">
              <PlusCircle className="h-4 w-4" />
              Buat Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">
                {card.format(mockStats[card.key])}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Terbaru */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-moket-red" />
            Event Terbaru
          </CardTitle>
          <Link href="/sub-org/events">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-xs text-moket-red hover:bg-moket-red/5"
            >
              Lihat Semua <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecentEvents.map((event) => {
              const statusCfg = eventStatusConfig[event.status];
              const pct = Math.round((event.ticketsSold / event.quota) * 100);
              return (
                <Link key={event.id} href={`/sub-org/events/${event.id}/edit`}>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-foreground truncate">
                          {event.title}
                        </p>
                        <Badge className={`text-[10px] border shrink-0 ${statusCfg.className}`}>
                          {statusCfg.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{event.startDate}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-moket-red rounded-full"
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {event.ticketsSold}/{event.quota}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-foreground">
                        {event.revenue === 0 ? "Gratis" : CURRENCY_FORMATTER.format(event.revenue)}
                      </p>
                      <p className="text-xs text-muted-foreground">Pendapatan</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
