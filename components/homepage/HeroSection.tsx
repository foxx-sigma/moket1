import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BubbleBackground } from "./BubbleBackground";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#a2000b]">
      {/* Decorative Elements - red motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      {/* Interactive floating bubbles */}
      <BubbleBackground />

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[560px] py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
            <Ticket className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white/90">
              Moklet Go Global 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl tracking-tight max-w-3xl [text-shadow:_0_2px_24px_rgb(0_0_0_/_35%)]">
            Temukan Event{" "}
            <span className="text-moket-red">Seru</span>{" "}
            di Moklet
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed [text-shadow:_0_1px_14px_rgb(0_0_0_/_40%)]">
            Platform ticketing event digital SMK Telkom Malang. Beli tiket,
            dapatkan e-ticket QR, dan nikmati eventnya!
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/events">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-900 text-white px-8 h-12 text-base font-semibold"
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
              <p className="text-2xl sm:text-3xl font-bold text-white [text-shadow:_0_2px_16px_rgb(0_0_0_/_35%)]">
                50+
              </p>
              <p className="mt-1 text-sm text-white/50">Event</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white [text-shadow:_0_2px_16px_rgb(0_0_0_/_35%)]">
                5K+
              </p>
              <p className="mt-1 text-sm text-white/50">Tiket Terjual</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white [text-shadow:_0_2px_16px_rgb(0_0_0_/_35%)]">
                10+
              </p>
              <p className="mt-1 text-sm text-white/50">Organisasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}