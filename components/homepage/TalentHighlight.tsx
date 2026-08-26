"use client";

import React, { useEffect, useState } from "react";
import { Music, Mic, Theater, Sparkles } from "lucide-react";
import { apiTalentHighlights, type TalentHighlight } from "@/lib/api";

const categoryIcons: Record<string, React.ReactNode> = {
  Band: <Music className="h-4 w-4" />,
  Vocalist: <Mic className="h-4 w-4" />,
  "Stand-up Comedy": <Theater className="h-4 w-4" />,
  "Traditional Dance": <Sparkles className="h-4 w-4" />,
};

// Skeleton saat loading
function TalentSkeleton() {
  return (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="h-28 w-28 rounded-full bg-muted mb-4" />
      <div className="h-3 w-24 rounded bg-muted mb-2" />
      <div className="h-3 w-16 rounded bg-muted" />
    </div>
  );
}

export function TalentHighlight() {
  const [talents, setTalents] = useState<TalentHighlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    apiTalentHighlights()
      .then((data) => {
        if (!cancelled) {
          setTalents(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[TalentHighlight] Gagal fetch:", err);
          setError("Gagal memuat data talent.");
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full py-20 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Talent Unggulan
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Kenali para talenta berbakat dari SMK Telkom Malang
          </p>
        </div>

        {/* Talent Cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <TalentSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>{error}</p>
          </div>
        ) : talents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Belum ada talent yang ditampilkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {talents.map((talent) => (
              <div
                key={talent.id}
                className="group flex flex-col items-center text-center"
              >
                {/* Avatar Placeholder */}
                <div className="relative mb-4">
                  <div className="h-28 w-28 rounded-full bg-moket-navy/10 flex items-center justify-center border-2 border-transparent transition-colors group-hover:border-moket-red">
                    <span className="text-2xl font-bold text-moket-navy">
                      {talent.name
                        .split(" ")
                        .map((n) => n.charAt(0))
                        .join("")}
                    </span>
                  </div>
                  {/* Category Icon */}
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-moket-red text-white">
                    {categoryIcons[talent.category] || (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-sm font-semibold text-foreground">
                  {talent.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {talent.category}
                </p>
                {talent.bio && (
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {talent.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
