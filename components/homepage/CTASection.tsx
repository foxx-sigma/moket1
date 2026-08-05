import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full py-20 bg-moket-navy">
      <div className="section-container">
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
