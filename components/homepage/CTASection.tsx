import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-black">
      {/* Decorative Elements - red motif */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-800/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full opacity-20 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-moket-red">
            <Ticket className="h-8 w-8 text-white" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Siap Ikut Event?
          </h2>
          <p className="mt-4 text-base text-white/70 max-w-md">
            Jangan sampai ketinggalan event seru di SMK Telkom Malang
          </p>

          {/* CTA Button */}
          <Link href="/events">
            <Button
              size="lg"
              className="mt-8 bg-moket-red hover:bg-moket-red-dark text-white px-8 h-12 text-base font-semibold"
            >
              Jelajahi Event Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
