import { Search, Ticket, CreditCard, QrCode } from "lucide-react";
import { howItWorksSteps } from "@/lib/mock/data";

const stepIcons: Record<string, React.ReactNode> = {
  search: <Search className="h-6 w-6" />,
  ticket: <Ticket className="h-6 w-6" />,
  "credit-card": <CreditCard className="h-6 w-6" />,
  "qr-code": <QrCode className="h-6 w-6" />,
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20 bg-secondary">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Cara Kerja
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Cuma 4 langkah mudah untuk menikmati event
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Connector line (hidden on mobile & last item) */}
              {index < howItWorksSteps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-[2px] bg-border hidden lg:block" />
              )}

              {/* Step Number + Icon */}
              <div className="relative z-10 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moket-red text-white">
                  {stepIcons[step.icon]}
                </div>
                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-moket-navy text-white text-xs font-bold">
                  {step.step}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
