import { Music, Mic, Theater, Sparkles } from "lucide-react";
import { mockTalents } from "@/lib/mock/data";

const categoryIcons: Record<string, React.ReactNode> = {
  Band: <Music className="h-4 w-4" />,
  Vocalist: <Mic className="h-4 w-4" />,
  "Stand-up Comedy": <Theater className="h-4 w-4" />,
  "Traditional Dance": <Sparkles className="h-4 w-4" />,
};

export function TalentHighlight() {
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
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {mockTalents.map((talent) => (
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

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
