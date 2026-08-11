"use client";

import { useEffect, useRef } from "react";

type Bubble = {
  size: number; // px
  top: string; // %
  left: string; // %
  opacity: number;
  depth: number; // how much it reacts to mouse (parallax strength)
  duration: number; // float animation duration (s)
  delay: number; // animation delay (s)
  blur?: number; // px, for the big glow bubbles
};

const bubbles: Bubble[] = [
  // big soft glow bubbles (background depth)
  { size: 420, top: "-10%", left: "78%", opacity: 0.18, depth: 60, duration: 14, delay: 0, blur: 90 },
  { size: 480, top: "55%", left: "-8%", opacity: 0.12, depth: 60, duration: 18, delay: 1, blur: 100 },

  // mid bubbles
  { size: 90, top: "18%", left: "12%", opacity: 0.12, depth: 60, duration: 9, delay: 0.2 },
  { size: 60, top: "62%", left: "85%", opacity: 0.14, depth: 60, duration: 10, delay: 1.4 },
  { size: 46, top: "8%", left: "60%", opacity: 0.1, depth: 60, duration: 8, delay: 0.6 },
  { size: 52, top: "70%", left: "10%", opacity: 0.5, depth: 60, duration: 8, delay: 0.6 },

  // small crisp dots (like the original design accents)
  { size: 16, top: "48%", left: "25%", opacity: 0.7, depth: 60, duration: 6, delay: 0 },
  { size: 12, top: "32%", left: "22%", opacity: 0.7, depth: 60, duration: 7, delay: 0.8 },
  { size: 10, top: "72%", left: "34%", opacity: 0.6, depth: 60, duration: 6.5, delay: 1.2 },
  { size: 14, top: "50%", left: "74%", opacity: 0.7, depth: 60, duration: 7.5, delay: 0.4 },
  { size: 8, top: "68%", left: "66%", opacity: 0.6, depth: 60, duration: 5.5, delay: 1.6 },
  { size: 22, top: "80%", left: "34%", opacity: 0.6, depth: 10, duration: 6.8, delay: 0.9 },
];

export function BubbleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // -1 to 1 range relative to container center
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const animate = () => {
      // ease towards target for a smooth, non-jittery feel
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      bubbleRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = bubbles[i].depth;
        const x = currentX * depth;
        const y = currentY * depth;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });

      frame = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    frame = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {bubbles.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            bubbleRefs.current[i] = el;
          }}
          className="absolute rounded-full bg-white will-change-transform"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            opacity: b.opacity,
            filter: b.blur ? `blur(${b.blur}px)` : undefined,
            animation: `bubble-float ${b.duration}s ease-in-out ${b.delay}s infinite`,
            transform: "translate(var(--mx, 0px), var(--my, 0px))",
            transition: "transform 0.1s linear",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes bubble-float {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -18px;
          }
        }
      `}</style>
    </div>
  );
}