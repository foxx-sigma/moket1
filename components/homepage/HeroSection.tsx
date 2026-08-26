"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Ticket, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

// ─── HeroSection ─────────────────────────────────────────────────────────────
// Single-layer hero: solid MokeT-red gradient background, a full-bleed event
// photo sitting as a semi-transparent layer in front of it (so red still
// dominates the tone), and text content on top with a drop-shadow so it
// never blends into the busy layer beneath it.
// ─────────────────────────────────────────────────────────────────────────────
export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const photoRef     = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // If reduced motion, skip animation but make everything visible
    if (mq.matches) {
      const refs = [photoRef, contentRef, headlineRef, subRef, ctaRef];
      refs.forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Photo layer fades in first, up to its target overlay opacity
      tl.fromTo(
  photoRef.current,
  { opacity: 0 },
  { opacity: 1, duration: 0.9 }
)
        // Content block slides up on top of it
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.45"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.28"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.42 },
          "-=0.18"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center"
      style={{
        minHeight: "clamp(560px, 88vh, 820px)",
        background: "linear-gradient(150deg, #D81B28 0%, #B8151F 50%)",
      }}
      aria-label="Hero — Temukan Event Seru di Moklet"
    >
      {/* ══════════════════════════════════════════════════════════════
          PHOTO LAYER — full-bleed, sits in front of the red background
          as a semi-transparent overlay (red still shows through).
          ══════════════════════════════════════════════════════════════ */}
    
<div
  ref={photoRef}
  className="absolute inset-y-0 right-0 z-10 flex items-end justify-end max-w-[60%] opacity-0"
  aria-hidden="true"
>
  <Image
    src="/image/people1-cropped.png"
    alt=""
    width={1444}
    height={1185}
    style={{ height: "100%", width: "auto" }}
    className="object-contain"
    loading="eager"
    priority
  />
</div>  
      {/* ══════════════════════════════════════════════════════════════
          CONTENT — sits above the photo layer, drop-shadow keeps text
          legible regardless of what's happening in the photo behind it.
          ══════════════════════════════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="
          relative z-20 flex flex-col justify-center
          w-full
          px-6 sm:px-10 lg:px-14 xl:px-20
          py-16 sm:py-20
          opacity-0
        "
      >
        {/* ── HEADLINE ─────────────────────────────────────── */}
        <h1
          ref={headlineRef}
          className="
            text-[2.1rem] sm:text-[2.75rem] lg:text-[3rem] xl:text-[3.5rem]
            font-bold leading-[1.5] tracking-[-0.02em]
            text-white
            max-w-[560px]
            opacity-0
          "
        >
          Temukan Event{" "}
          
            Seru
         
          di&nbsp;Moklet
        </h1>

        {/* ── SUBHEADLINE ──────────────────────────────────── */}
        <p
          ref={subRef}
          className="
            mt-10 text-[0.95rem] sm:text-[1.05rem] lg:text-base
            text-white leading-[2.5]
            max-w-[430px]
            opacity-0
            drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]
          "
        >
          Platform ticketing event digital SMK Telkom Malang. Beli tiket,
          dapatkan&nbsp;e&#8209;ticket QR, dan nikmati eventnya!
        </p>

        {/* ── CTA BUTTONS ──────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-15 opacity-0"
        >
          {/* Primary — white fill, MokeT-red text, Ticket icon on left */}
          <Link href="/events">
            <Button
              size="lg"
              className="
                bg-white text-[#D81B28] hover:bg-white/90 active:bg-white/80
                px-7 h-12 text-[0.95rem] font-semibold tracking-wide
                transition-all duration-200
                gap-2.5
              "
            >
              Lihat Event
            </Button>
          </Link>

          {/* Secondary — outline, drop-shadow so the border reads against
              whatever part of the photo sits behind it */}
          <Link href="#how-it-works">
            <Button
              size="lg"
              className="
                bg-white text-[#D81B28] hover:bg-white/90 active:bg-white/80
                px-7 h-12 text-[0.95rem] font-semibold tracking-wide
                transition-all duration-200
                gap-2.5
              "
            >
              
              Pelajari Lebih Lanjut
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}