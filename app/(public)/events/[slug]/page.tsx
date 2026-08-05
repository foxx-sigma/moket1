import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, Tag, Ticket, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockEvents } from "@/lib/mock/data";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const event = mockEvents.find((e) => e.slug === resolvedParams.slug);

  if (!event) {
    notFound();
  }

  // Mock extended details since mockEvents is currently EventSummary
  const eventDetail = {
    ...event,
    description: "Ini adalah deskripsi panjang mengenai event yang akan diselenggarakan. Event ini bertujuan untuk mengembangkan potensi siswa di bidang teknologi dan seni. Acara akan dimeriahkan oleh berbagai penampilan menarik dari siswa berbakat SMK Telkom Malang.",
    termsAndConditions: [
      "Tiket yang sudah dibeli tidak dapat dikembalikan (non-refundable).",
      "E-ticket harus ditunjukkan saat check-in.",
      "Dilarang membawa makanan dan minuman dari luar.",
      "Peserta wajib menjaga ketertiban selama acara berlangsung.",
    ],
    time: "09:00 - Selesai",
    tickets: [
      {
        id: "tkt-1",
        name: "Presale 1",
        price: event.priceStart,
        quota: 100,
        sold: 100,
        remaining: 0,
        status: "sold_out",
      },
      {
        id: "tkt-2",
        name: "Normal Ticket",
        price: event.priceStart + 15000,
        quota: 300,
        sold: 150,
        remaining: 150,
        status: "available",
      },
    ],
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratis";
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const isAvailable = eventDetail.status === "upcoming" || eventDetail.status === "ongoing";

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-muted overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-moket-navy/10 backdrop-blur-md">
          {/* Fallback pattern if no real image */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        </div>
        
        {/* Banner Content Layer */}
        <div className="absolute bottom-0 left-0 right-0 z-20 section-container pb-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Poster Thumbnail */}
            <div className="hidden md:block w-48 aspect-[3/4] rounded-lg shadow-xl overflow-hidden bg-muted border-4 border-background shrink-0">
              <div className="w-full h-full bg-moket-navy/5 flex items-center justify-center text-xs text-muted-foreground">
                Poster
              </div>
            </div>
            
            {/* Title & Badge */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <StatusBadge status={eventDetail.status} />
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                  <Tag className="mr-1 h-3 w-3" />
                  {eventDetail.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-md">
                {eventDetail.title}
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-moket-navy">
                    {eventDetail.organizer.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground drop-shadow-md">
                  Penyelenggara: {eventDetail.organizer.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-container py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Details */}
          <div className="flex-1 space-y-10">
            {/* Info Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-secondary p-4 rounded-xl">
                <Calendar className="h-5 w-5 text-moket-red mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                <p className="text-sm font-medium">{formatDate(eventDetail.date)}</p>
              </div>
              <div className="bg-secondary p-4 rounded-xl">
                <Clock className="h-5 w-5 text-moket-orange mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Waktu</p>
                <p className="text-sm font-medium">{eventDetail.time}</p>
              </div>
              <div className="bg-secondary p-4 rounded-xl col-span-2 md:col-span-2">
                <MapPin className="h-5 w-5 text-moket-navy mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Lokasi</p>
                <p className="text-sm font-medium">{eventDetail.location}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-moket-red" />
                Deskripsi Event
              </h2>
              <div className="text-muted-foreground leading-relaxed">
                <p>{eventDetail.description}</p>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-moket-orange" />
                Syarat & Ketentuan
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {eventDetail.termsAndConditions.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Sticky Ticket Panel */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-moket-red" />
                Pilih Tiket
              </h3>

              <div className="space-y-4 mb-8">
                {eventDetail.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-4 rounded-xl border ${
                      ticket.status === "sold_out"
                        ? "border-border bg-muted/50 opacity-60"
                        : "border-border hover:border-moket-red/50 transition-colors"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{ticket.name}</h4>
                        <p className="text-sm font-bold text-moket-red">
                          {formatPrice(ticket.price)}
                        </p>
                      </div>
                      {ticket.status === "sold_out" ? (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-medium">
                          Habis
                        </span>
                      ) : (
                        <span className="text-xs bg-moket-red/10 text-moket-red px-2 py-1 rounded-full font-medium">
                          Sisa {ticket.remaining}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                {isAvailable ? (
                  <Link href={`/events/${eventDetail.slug}/purchase`}>
                    <Button
                      size="lg"
                      className="w-full bg-moket-red hover:bg-moket-red-dark text-white h-12 text-base font-semibold"
                    >
                      Beli Tiket Sekarang
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    disabled
                    className="w-full h-12 text-base font-semibold"
                  >
                    Event {eventDetail.status === "sold_out" ? "Sudah Habis" : "Ditutup"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
