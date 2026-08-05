import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Calendar, MapPin, Clock, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockUserTickets } from "@/lib/mock/data";

export default function ETicketDetailPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const resolvedParams = use(params);
  const ticket = mockUserTickets.find((t) => t.id === resolvedParams.ticketId);

  if (!ticket) {
    notFound();
  }

  const isUsed = ticket.status === "used";
  const isExpired = ticket.status === "expired";
  const isActive = ticket.status === "active";

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Back Button */}
      <Link href="/my-tickets">
        <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Tiket Saya
        </Button>
      </Link>

      {/* Main Ticket Container */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl relative">
        {/* Top Header - Event Title */}
        <div className="bg-moket-navy p-6 text-center text-white">
          <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-widest">
            E-Ticket
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold">{ticket.event.title}</h1>
        </div>

        {/* QR Code Section */}
        <div className="p-8 flex flex-col items-center border-b-[2px] border-dashed border-border relative bg-white">
          {/* Visual Ticket Notches */}
          <div className="absolute left-0 bottom-0 h-8 w-4 translate-y-1/2 rounded-r-full border-y border-r border-border bg-background" />
          <div className="absolute right-0 bottom-0 h-8 w-4 translate-y-1/2 rounded-l-full border-y border-l border-border bg-background" />

          {isActive && (
            <div className="bg-white p-4 rounded-xl border-4 border-moket-red/20 shadow-sm inline-block">
              <QRCodeSVG
                value={ticket.qrCodeData}
                size={220}
                level="H"
                includeMargin={true}
                fgColor="#1A2247" // moket-navy
              />
            </div>
          )}
          
          {isUsed && (
            <div className="h-[252px] w-[252px] flex flex-col items-center justify-center bg-muted/30 rounded-xl border-4 border-muted">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-2" />
              <p className="font-bold text-muted-foreground">Sudah Digunakan</p>
              <p className="text-sm text-muted-foreground mt-1">
                {ticket.checkedInAt ? new Date(ticket.checkedInAt).toLocaleString("id-ID") : ""}
              </p>
            </div>
          )}
          
          {isExpired && (
            <div className="h-[252px] w-[252px] flex items-center justify-center bg-muted/30 rounded-xl border-4 border-muted">
              <p className="font-bold text-muted-foreground">Kedaluwarsa</p>
            </div>
          )}

          <p className="mt-6 text-sm font-medium text-muted-foreground font-mono bg-muted px-4 py-1.5 rounded-md">
            {ticket.ticketCode}
          </p>
          {isActive && (
            <p className="mt-4 text-sm text-center text-muted-foreground max-w-sm">
              Tunjukkan QR Code ini kepada panitia saat check-in di lokasi event.
            </p>
          )}
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-8 bg-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                Nama Peserta
              </p>
              <p className="font-semibold text-foreground">{ticket.userName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                Jenis Tiket
              </p>
              <p className="font-semibold text-foreground">{ticket.ticketType.name}</p>
            </div>
            <div className="sm:col-span-2 space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-moket-red shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{formatDate(ticket.event.date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-moket-orange shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">09:00 - Selesai</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-moket-navy shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{ticket.event.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {isActive && (
              <Button className="w-full bg-moket-red hover:bg-moket-red-dark text-white">
                <Download className="mr-2 h-4 w-4" />
                Simpan E-Ticket
              </Button>
            )}
            <Link href={`/events/${ticket.event.slug}`} className="w-full">
              <Button variant="outline" className="w-full">
                Lihat Detail Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
