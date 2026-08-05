import Link from "next/link";
import { Calendar, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";
import type { UserTicket } from "@/lib/types";

export function TicketCard({ ticket }: { ticket: UserTicket }) {
  const isExpired = ticket.status === "expired";
  const isUsed = ticket.status === "used";
  const isActive = ticket.status === "active";

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`relative w-full rounded-2xl border transition-all duration-300 ${
        isActive
          ? "border-border bg-card shadow-sm hover:border-moket-red/50 hover:shadow-md"
          : "border-border bg-muted/50 opacity-80 grayscale-[20%]"
      }`}
    >
      {/* Visual Ticket Notches */}
      <div className="absolute left-0 top-[60%] h-6 w-3 -translate-y-1/2 rounded-r-full border-b border-r border-t border-border bg-background" />
      <div className="absolute right-0 top-[60%] h-6 w-3 -translate-y-1/2 rounded-l-full border-b border-l border-t border-border bg-background" />

      {/* Ticket Dashed Line */}
      <div className="absolute left-4 right-4 top-[60%] -translate-y-1/2 border-t-[1.5px] border-dashed border-border/60" />

      <Link href={`/my-tickets/${ticket.id}`} className="block">
        {/* Upper Part (Event Info) */}
        <div className="p-5 pb-8">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-foreground text-lg line-clamp-1">
              {ticket.event.title}
            </h3>
            {isActive && (
              <span className="inline-flex items-center gap-1 rounded-full bg-moket-navy/10 px-2 py-0.5 text-xs font-semibold text-moket-navy">
                Aktif
              </span>
            )}
            {isUsed && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-600">
                <CheckCircle2 className="h-3 w-3" /> Dipakai
              </span>
            )}
            {isExpired && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted-foreground/10 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                Kedaluwarsa
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-moket-red shrink-0" />
              <span>{formatDate(ticket.event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-moket-orange shrink-0" />
              <span className="line-clamp-1">{ticket.event.location}</span>
            </div>
          </div>
        </div>

        {/* Lower Part (Ticket Info) */}
        <div className="p-5 pt-8 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Jenis Tiket
            </p>
            <p className="font-bold text-foreground mt-0.5">
              {ticket.ticketType.name}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
              {isActive ? "Tampilkan QR" : "Detail"}
            </p>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                isActive ? "bg-moket-red text-white" : "bg-muted-foreground/20"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
