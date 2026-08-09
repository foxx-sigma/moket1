"use client";

import { useState } from "react";
import Image from "next/image";
import { QrCode, ChevronDown, Calendar, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const mockTickets = [
  {
    id: "tkt-001",
    eventTitle: "Moklet Fest 2026",
    eventDate: "15 September 2026",
    eventTime: "09:00 WIB",
    location: "Aula Utama SMK Telkom Malang",
    ticketType: "Presale 1",
    attendeeName: "Ahmad Fadhil",
    qrCode: "MOKET-TKT-001-ABCXYZ",
    status: "active" as const,
  },
  {
    id: "tkt-002",
    eventTitle: "Tech Talk: AI & Future",
    eventDate: "22 September 2026",
    eventTime: "13:00 WIB",
    location: "Lab Komputer Gedung C",
    ticketType: "Normal",
    attendeeName: "Ahmad Fadhil",
    qrCode: "MOKET-TKT-002-DEFUVW",
    status: "active" as const,
  },
];

const statusConfig = {
  active: { label: "Aktif", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  used: { label: "Terpakai", color: "bg-muted text-muted-foreground" },
  expired: { label: "Kadaluarsa", color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

function QRCodeDisplay({ value }: { value: string }) {
  // Simple visual QR placeholder — replace with actual QR lib like qrcode.react
  return (
    <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-xl border border-border shadow-sm">
      <div className="w-36 h-36 bg-foreground/5 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
        <QrCode className="h-20 w-20 text-foreground/60" strokeWidth={1.5} />
      </div>
      <p className="text-[10px] font-mono text-muted-foreground tracking-widest text-center break-all">
        {value}
      </p>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: typeof mockTickets[0] }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[ticket.status];

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
      {/* Tiket Header */}
      <div className="bg-moket-red p-4 text-white">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-base leading-tight">{ticket.eventTitle}</h3>
            <p className="text-xs text-red-100 mt-0.5">{ticket.ticketType}</p>
          </div>
          <Badge className={`text-xs border ${status.color} bg-transparent shrink-0`}>
            {status.label}
          </Badge>
        </div>
      </div>

      {/* Notch divider */}
      <div className="ticket-notch h-[1px] bg-border mx-5 relative" />

      {/* Tiket Body */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{ticket.eventDate} • {ticket.eventTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">{ticket.location}</span>
          </div>
        </div>

        {/* Expand button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center gap-1 text-moket-red hover:bg-moket-red/5 text-xs"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Sembunyikan QR Code" : "Tampilkan QR Code"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </Button>

        {expanded && (
          <div className="flex flex-col items-center gap-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs text-muted-foreground text-center">
              Tunjukkan QR ini ke panitia saat masuk venue.
            </p>
            <QRCodeDisplay value={ticket.qrCode} />
            <p className="text-sm font-semibold text-foreground">{ticket.attendeeName}</p>
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <Download className="h-3.5 w-3.5" />
              Unduh E-Ticket
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tiket Saya</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Daftar e-ticket yang kamu miliki. Tunjukkan QR code ke panitia saat masuk.
        </p>
      </div>

      {/* Ticket List */}
      {mockTickets.length > 0 ? (
        <div className="space-y-4">
          {mockTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <Card className="border border-dashed border-border">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <QrCode className="h-14 w-14 text-muted-foreground/40 mb-4" strokeWidth={1} />
            <h3 className="font-semibold text-foreground mb-1">Belum Ada Tiket</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Kamu belum memiliki tiket. Temukan event seru dan beli tiketnya sekarang!
            </p>
            <Link href="/events">
              <Button className="bg-moket-red hover:bg-moket-red-dark text-white">
                Cari Event
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
