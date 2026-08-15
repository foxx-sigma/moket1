"use client";

import Link from "next/link";
import {
  Ticket,
  CalendarDays,
  ReceiptText,
  MapPin,
  Clock,
  ArrowRight,
  QrCode,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data — diganti dengan API call saat integrasi backend
const mockStats = {
  activeTickets: 2,
  upcomingEvents: 3,
  totalTransactions: 5,
};

const mockUpcomingEvents = [
  {
    id: "evt-1",
    title: "Moklet Fest 2026",
    date: "15 September 2026",
    time: "09:00 WIB",
    location: "Aula Utama SMK Telkom Malang",
    ticketType: "Presale 1",
    daysLeft: 36,
  },
  {
    id: "evt-2",
    title: "Tech Talk: AI & Future",
    date: "22 September 2026",
    time: "13:00 WIB",
    location: "Lab Komputer Gedung C",
    ticketType: "Normal",
    daysLeft: 43,
  },
];

const mockRecentTransactions = [
  {
    id: "trx-1",
    invoiceNumber: "INV-20260801-ABC123",
    eventTitle: "Moklet Fest 2026",
    totalAmount: 25000,
    status: "success" as const,
    createdAt: "1 Agustus 2026",
  },
  {
    id: "trx-2",
    invoiceNumber: "INV-20260802-XYZ987",
    eventTitle: "Tech Talk: AI & Future",
    totalAmount: 0,
    status: "success" as const,
    createdAt: "2 Agustus 2026",
  },
  {
    id: "trx-3",
    invoiceNumber: "INV-20260804-DEF456",
    eventTitle: "Inter-School Basketball",
    totalAmount: 30000,
    status: "pending" as const,
    createdAt: "4 Agustus 2026",
  },
];

const transactionStatusConfig = {
  pending: { label: "Menunggu", className: "bg-black/5 text-black/50 border-black/10" },
  success: { label: "Berhasil", className: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  failed: { label: "Gagal", className: "bg-black/10 text-black/60 border-black/10" },
  expired: { label: "Kedaluwarsa", className: "bg-muted text-muted-foreground border-border" },
};

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const summaryCards = [
  {
    title: "Tiket Aktif",
    value: mockStats.activeTickets,
    sub: "Siap digunakan",
    icon: Ticket,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
    href: "/user/my-tickets",
  },
  {
    title: "Event Mendatang",
    value: mockStats.upcomingEvents,
    sub: "Yang kamu ikuti",
    icon: CalendarDays,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
    href: "/events",
  },
  {
    title: "Total Transaksi",
    value: mockStats.totalTransactions,
    sub: "Riwayat pembelian",
    icon: ReceiptText,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
    href: "/user/transactions",
  },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Selamat datang! Pantau tiket, event, dan transaksimu di sini.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((s) => (
          <Link key={s.title} href={s.href}>
            <Card className="border border-border hover:border-moket-red/30 hover:shadow-sm transition-all cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {s.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reminder Event Terdekat */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-moket-red" />
              Event Mendatang
            </CardTitle>
            <Link href="/user/my-tickets">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-moket-red hover:bg-moket-red/5"
              >
                Lihat Tiket <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUpcomingEvents.length > 0 ? (
              mockUpcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-moket-red/10 flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-moket-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.ticketType}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-xs font-semibold text-moket-red">
                      {event.daysLeft}h lagi
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <CalendarDays className="h-10 w-10 text-muted-foreground/30 mb-3" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">Belum ada event mendatang.</p>
                <Link href="/events" className="mt-3">
                  <Button
                    size="sm"
                    className="bg-moket-red hover:bg-moket-red-dark text-white text-xs"
                  >
                    Cari Event
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Riwayat Transaksi Terbaru */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <ReceiptText className="h-4 w-4 text-moket-red" />
              Transaksi Terbaru
            </CardTitle>
            <Link href="/user/transactions">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-moket-red hover:bg-moket-red/5"
              >
                Lihat Semua <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockRecentTransactions.map((trx) => {
              const statusCfg = transactionStatusConfig[trx.status];
              return (
                <Link key={trx.id} href={`/user/transactions`}>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground truncate">
                        {trx.eventTitle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                        {trx.invoiceNumber}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 ml-3 shrink-0">
                      <span className="text-sm font-semibold text-foreground">
                        {trx.totalAmount === 0
                          ? "Gratis"
                          : currencyFormatter.format(trx.totalAmount)}
                      </span>
                      <Badge className={`text-[10px] border px-1.5 py-0 ${statusCfg.className}`}>
                        {statusCfg.label}
                      </Badge>
                    </div>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
