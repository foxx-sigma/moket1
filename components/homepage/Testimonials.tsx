import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockTestimonials } from "@/lib/mock/data";

export function Testimonials() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Apa Kata Mereka
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Pengalaman pengguna MokeT dalam mengikuti event sekolah
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {mockTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border border-border bg-background transition-all duration-200 hover:border-moket-red/20 hover:shadow-md"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-moket-red/20 mb-4" />

                {/* Content */}
                <p className="text-sm text-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-moket-orange text-moket-orange"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-moket-navy/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-moket-navy">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n.charAt(0))
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
