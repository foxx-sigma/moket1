"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  CalendarDays,
  Ticket,
  Mic2,
  ScanLine,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data — diganti dengan API call saat integrasi backend
type PeriodFilter = "all" | "7d" | "30d" | "90d";

const mockMetrics = {
  totalUsers: 1842,
  totalOrganizations: 6,
  totalEvents: 14,
  totalTicketsSold: 3217,
  totalTalent: 23,
  totalCheckIns: 2891,
};

const mockTopEvents = [
  {
    id: "evt-1",
    title: "Moklet Fest 2026",
    organization: "OSIS SMK Telkom",
    ticketsSold: 623,
    quota: 1000,
    status: "published" as const,
    revenue: 15575000,
  },
  {
    id: "evt-2",
    title: "Tech Talk: AI & Future",
    organization: "Moklet Dev Club",
    ticketsSold: 180,
    quota: 300,
    status: "published" as const,
    revenue: 0,
  },
  {
    id: "evt-3",
    title: "Workshop Design UI/UX",
    organization: "Moklet Creative",
    ticketsSold: 45,
    quota: 100,
    status: "draft" as const,
    revenue: 2250000,
  },
  {
    id: "evt-4",
    title: "English Debate Competition",
    organization: "English Club",
    ticketsSold: 400,
    quota: 400,
    status: "completed" as const,
    revenue: 4000000,
  },
];

const mockPaymentSummary = {
  success: 2891,
  pending: 214,
  failed: 87,
  expired: 25,
};

const mockParticipantDistribution = {
  internal: 2145,
  external: 1072,
};

const eventStatusConfig = {
  published: { label: "Published", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  draft: { label: "Draft", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  completed: { label: "Selesai", className: "bg-muted text-muted-foreground border-border" },
  cancelled: { label: "Dibatalkan", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const periodLabels: Record<PeriodFilter, string> = {
  all: "Semua Waktu",
  "7d": "7 Hari",
  "30d": "30 Hari",
  "90d": "90 Hari",
};

const metricCards = [
  {
    title: "Total Pengguna",
    key: "totalUsers" as const,
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    format: (v: number) => v.toLocaleString("id-ID"),
  },
  {
    title: "Sub-Organisasi",
    key: "totalOrganizations" as const,
    icon: Building2,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    format: (v: number) => v.toString(),
  },
  {
    title: "Total Event",
    key: "totalEvents" as const,
    icon: CalendarDays,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
    format: (v: number) => v.toString(),
  },
  {
    title: "Tiket Terjual",
    key: "totalTicketsSold" as const,
    icon: Ticket,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    format: (v: number) => v.toLocaleString("id-ID"),
  },
  {
    title: "Total Talent",
    key: "totalTalent" as const,
    icon: Mic2,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    format: (v: number) => v.toString(),
  },
  {
    title: "Check-in",
    key: "totalCheckIns" as const,
    icon: ScanLine,
    color: "text-indigo-600",
    bg: "bg-indigo-500/10",
    format: (v: number) => v.toLocaleString("id-ID"),
  },
];

// Grafik penjualan sederhana (bar) — diganti dengan Recharts saat integrasi
const mockSalesChart = [
  { label: "Sen", value: 312 },
  { label: "Sel", value: 480 },
  { label: "Rab", value: 395 },
  { label: "Kam", value: 610 },
  { label: "Jum", value: 520 },
  { label: "Sab", value: 780 },
  { label: "Min", value: 432 },
];

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<PeriodFilter>("30d");
  const maxSales = Math.max(...mockSalesChart.map((d) => d.value));
  const totalParticipants =
    mockParticipantDistribution.internal + mockParticipantDistribution.external;
  const internalPct = Math.round(
    (mockParticipantDistribution.internal / totalParticipants) * 100
  );

  const totalPayments =
    mockPaymentSummary.success +
    mockPaymentSummary.pending +
    mockPaymentSummary.failed +
    mockPaymentSummary.expired;

  return (
    <div className="space-y-8">
      {/* Header + Filter Periode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pantau metrik keseluruhan platform MokeT.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          {(["all", "7d", "30d", "90d"] as PeriodFilter[]).map((p) => (
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
      </div>

      {/* Metric Cards — 6 kartu sesuai PRD */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricCards.map((m) => (
          <Card key={m.title} className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground leading-tight">
                {m.title}
              </CardTitle>
              <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${m.bg}`}>
                <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">
                {m.format(mockMetrics[m.key])}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafik Penjualan Tiket */}
        <Card className="border border-border lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-moket-red" />
              Penjualan Tiket
            </CardTitle>
            <span className="text-xs text-muted-foreground">{periodLabels[period]}</span>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-36">
              {mockSalesChart.map((d) => {
                const heightPct = Math.round((d.value / maxSales) * 100);
                return (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {d.value}
                    </span>
                    <div
                      className="w-full rounded-t-sm bg-moket-red/80 hover:bg-moket-red transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{d.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Distribusi Peserta + Status Pembayaran */}
        <div className="flex flex-col gap-6">
          {/* Distribusi Internal vs External */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                Distribusi Peserta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Internal</span>
                  <span className="font-medium">{internalPct}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${internalPct}%` }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">External</span>
                  <span className="font-medium">{100 - internalPct}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${100 - internalPct}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                <span>Internal: {mockParticipantDistribution.internal.toLocaleString("id-ID")}</span>
                <span>Ext: {mockParticipantDistribution.external.toLocaleString("id-ID")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Ringkasan Status Pembayaran */}
          <Card className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Status Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Berhasil", value: mockPaymentSummary.success, color: "bg-green-500" },
                { label: "Menunggu", value: mockPaymentSummary.pending, color: "bg-amber-500" },
                { label: "Gagal", value: mockPaymentSummary.failed, color: "bg-red-500" },
                { label: "Kedaluwarsa", value: mockPaymentSummary.expired, color: "bg-muted-foreground" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${s.color}`} />
                  <span className="text-xs text-muted-foreground flex-1">{s.label}</span>
                  <span className="text-xs font-medium">{s.value.toLocaleString("id-ID")}</span>
                  <span className="text-[10px] text-muted-foreground w-8 text-right">
                    {Math.round((s.value / totalPayments) * 100)}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Teraktif */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-moket-red" />
            Event Teraktif
          </CardTitle>
          <Link href="/admin/events">
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
            {mockTopEvents.map((event) => {
              const statusCfg = eventStatusConfig[event.status];
              const pct = Math.round((event.ticketsSold / event.quota) * 100);
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground truncate">{event.title}</p>
                      <Badge className={`text-[10px] border shrink-0 ${statusCfg.className}`}>
                        {statusCfg.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.organization}</p>
                    <div className="mt-2 flex items-center gap-3">
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
                      {event.revenue === 0
                        ? "Gratis"
                        : currencyFormatter.format(event.revenue)}
                    </p>
                    <p className="text-xs text-muted-foreground">Pendapatan</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
