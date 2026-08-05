import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-moket-navy">
      {/* Decorative Elements - solid shapes, no gradients */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-moket-red/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-moket-orange/5 rounded-full translate-y-1/2 -translate-x-1/3" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-moket-red rounded-full opacity-40" />
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-moket-orange rounded-full opacity-30" />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white rounded-full opacity-20" />

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[560px] py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mb-8">
            <Ticket className="h-4 w-4 text-moket-orange" />
            <span className="text-sm font-medium text-white/90">
              Moklet Go Global 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight max-w-3xl">
            Temukan Event{" "}
            <span className="text-moket-red">Seru</span>{" "}
            di Moklet
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Platform ticketing event digital SMK Telkom Malang. Beli tiket,
            dapatkan e-ticket QR, dan nikmati eventnya!
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/events">
              <Button
                size="lg"
                className="bg-moket-red hover:bg-moket-red-dark text-white px-8 h-12 text-base font-semibold"
              >
                Lihat Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white px-8 h-12 text-base"
              >
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">50+</p>
              <p className="mt-1 text-sm text-white/50">Event</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">5K+</p>
              <p className="mt-1 text-sm text-white/50">Tiket Terjual</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">10+</p>
              <p className="mt-1 text-sm text-white/50">Organisasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
