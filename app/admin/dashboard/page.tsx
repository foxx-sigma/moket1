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

const stats = [
  {
    title: "Total Event",
    value: "4",
    sub: "2 aktif, 2 selesai",
    icon: CalendarDays,
    color: "text-moket-navy",
    bg: "bg-moket-navy/10",
  },
  {
    title: "Tiket Terjual",
    value: "1,248",
    sub: "dari 2,000 kuota",
    icon: Ticket,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
  },
  {
    title: "Total Peserta",
    value: "847",
    sub: "sudah check-in",
    icon: Users,
    color: "text-moket-orange",
    bg: "bg-moket-orange/10",
  },
  {
    title: "Pendapatan",
    value: "Rp 45,6 Jt",
    sub: "dari tiket terjual",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-500/10",
  },
];

const recentEvents = [
  {
    id: "evt-001",
    title: "Moklet Fest 2026",
    date: "15 Sep 2026",
    ticketsSold: 623,
    quota: 1000,
    status: "published" as const,
  },
  {
    id: "evt-002",
    title: "Tech Talk: AI & Future",
    date: "22 Sep 2026",
    ticketsSold: 180,
    quota: 300,
    status: "published" as const,
  },
  {
    id: "evt-003",
    title: "Workshop Design UI/UX",
    date: "10 Okt 2026",
    ticketsSold: 45,
    quota: 100,
    status: "draft" as const,
  },
];

const eventStatusConfig = {
  published: { label: "Published", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  draft: { label: "Draft", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  completed: { label: "Selesai", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "Dibatalkan", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Penyelenggara</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ringkasan performa event dan tiket kamu.
          </p>
        </div>
        <Link href="/admin/events/create">
          <Button className="bg-moket-navy hover:bg-moket-navy-dark text-white gap-2">
            <PlusCircle className="h-4 w-4" />
            Buat Event Baru
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.title} className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{s.title}</CardTitle>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Events Table */}
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-moket-navy" />
            Event Terbaru
          </CardTitle>
          <Link href="/admin/events">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-moket-navy hover:bg-moket-navy/5">
              Lihat Semua <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event) => {
              const status = eventStatusConfig[event.status];
              const pct = Math.round((event.ticketsSold / event.quota) * 100);
              return (
                <Link key={event.id} href={`/admin/events/${event.id}`}>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors cursor-pointer">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4 shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold">{event.ticketsSold}/{event.quota}</p>
                        <p className="text-xs text-muted-foreground">{pct}% terjual</p>
                      </div>
                      <Badge className={`text-[10px] border ${status.className}`}>{status.label}</Badge>
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
