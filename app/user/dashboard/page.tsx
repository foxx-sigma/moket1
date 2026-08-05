import Link from "next/link";
import { Ticket, Calendar, CreditCard, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserDashboardPage() {
  const summaryCards = [
    {
      title: "Tiket Aktif",
      value: "3",
      description: "Tiket belum digunakan",
      icon: Ticket,
      color: "text-moket-red",
      bgColor: "bg-moket-red/10",
      href: "/my-tickets",
    },
    {
      title: "Event Mendatang",
      value: "2",
      description: "Event dalam 30 hari",
      icon: Calendar,
      color: "text-moket-orange",
      bgColor: "bg-moket-orange/10",
      href: "/events",
    },
    {
      title: "Total Transaksi",
      value: "5",
      description: "Riwayat pembelian",
      icon: CreditCard,
      color: "text-moket-navy",
      bgColor: "bg-moket-navy/10",
      href: "/transactions",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Halo, Ahmad Fadhil! 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Selamat datang di dashboard MokeT. Berikut adalah ringkasan aktivitasmu.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title} className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${card.bgColor}`}
              >
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  href={card.href}
                  className={`text-xs font-medium flex items-center hover:underline ${card.color}`}
                >
                  Lihat Detail <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reminder */}
        <Card className="border border-border bg-moket-navy/5">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-5 w-5 text-moket-navy" />
              Event Terdekat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card p-4 rounded-lg border border-border">
              <div>
                <h4 className="font-semibold text-foreground">Moklet Fest 2026</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  15 Sep 2026 • 09:00 - Selesai
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Aula SMK Telkom Malang
                </p>
              </div>
              <Link href="/my-tickets/tkt-1">
                <Button size="sm" className="bg-moket-red hover:bg-moket-red-dark text-white">
                  Lihat E-Ticket
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Explore */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Ticket className="h-5 w-5 text-moket-red" />
              Eksplorasi Event Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ada event seru yang menunggumu. Jangan sampai ketinggalan dan kehabisan tiket!
            </p>
            <Link href="/events">
              <Button variant="outline" className="w-full justify-between group">
                Cari Event Sekarang
                <ArrowRight className="h-4 w-4 group-hover:text-moket-red group-hover:translate-x-1 transition-all" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
