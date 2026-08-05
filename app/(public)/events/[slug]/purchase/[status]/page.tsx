import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, XCircle, ArrowRight, Ticket, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockEvents } from "@/lib/mock/data";

const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-200",
    title: "Pembayaran Berhasil!",
    description: "Terima kasih! Tiket kamu berhasil dipesan dan E-Ticket telah dikirimkan ke email kamu.",
    primaryAction: { label: "Lihat E-Ticket", href: "/user/my-tickets" },
    secondaryAction: { label: "Kembali ke Beranda", href: "/" },
  },
  pending: {
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-200",
    title: "Menunggu Pembayaran",
    description: "Segera selesaikan pembayaran kamu sebelum batas waktu habis.",
    primaryAction: { label: "Cara Pembayaran", href: "/user/transactions" },
    secondaryAction: { label: "Kembali ke Beranda", href: "/" },
  },
  failed: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-200",
    title: "Pembayaran Gagal",
    description: "Maaf, pembayaran kamu gagal diproses. Silakan coba metode pembayaran lain.",
    primaryAction: { label: "Coba Lagi", href: "BACK" },
    secondaryAction: { label: "Kembali ke Beranda", href: "/" },
  },
};

export default function PaymentStatusPage({
  params,
}: {
  params: Promise<{ slug: string; status: string }>;
}) {
  const resolvedParams = use(params);
  const { slug, status } = resolvedParams;

  const event = mockEvents.find((e) => e.slug === slug);
  
  if (!event || !["success", "pending", "failed"].includes(status)) {
    notFound();
  }

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <div className="min-h-[80vh] bg-background py-16 flex items-center justify-center">
      <div className="section-container max-w-md w-full">
        <Card className="border-border shadow-xl overflow-hidden relative">
          {/* Top colored line */}
          <div className={`h-2 w-full ${config.bgColor.replace("/10", "")}`} />
          
          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className={`h-20 w-20 rounded-full flex items-center justify-center mb-6 ${config.bgColor}`}>
              <Icon className={`h-10 w-10 ${config.color}`} />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {config.title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {config.description}
            </p>

            <div className="w-full bg-secondary/50 rounded-xl p-4 mb-8 text-left border border-border">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                Event
              </p>
              <p className="font-bold text-foreground line-clamp-1 mb-3">
                {event.title}
              </p>
              
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <span className="text-sm font-semibold text-foreground">ORD-{new Date().getTime().toString().slice(-6)}</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              {config.primaryAction.href === "BACK" ? (
                <Link href={`/events/${slug}/purchase`}>
                  <Button className="w-full h-12 bg-moket-red hover:bg-moket-red-dark text-white">
                    {config.primaryAction.label}
                  </Button>
                </Link>
              ) : (
                <Link href={config.primaryAction.href}>
                  <Button className="w-full h-12 bg-moket-red hover:bg-moket-red-dark text-white">
                    {status === "success" && <Ticket className="mr-2 h-4 w-4" />}
                    {config.primaryAction.label}
                    {status !== "success" && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </Link>
              )}
              
              <Link href={config.secondaryAction.href}>
                <Button variant="outline" className="w-full h-12">
                  <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                  {config.secondaryAction.label}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
