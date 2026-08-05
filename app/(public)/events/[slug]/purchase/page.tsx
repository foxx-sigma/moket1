"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Ticket, 
  User, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { mockEvents } from "@/lib/mock/data";

const steps = [
  { id: 1, name: "Pilih Tiket", icon: Ticket },
  { id: 2, name: "Data Pemesan", icon: User },
  { id: 3, name: "Pembayaran", icon: CreditCard },
];

export default function PurchasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const event = mockEvents.find((e) => e.slug === resolvedParams.slug);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState("type-2"); // default selected
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fallback if event is not found
  if (!event) {
    return <div className="p-20 text-center">Event tidak ditemukan.</div>;
  }

  // Mock tickets data for purchase (in real app, fetched based on event)
  const availableTickets = [
    {
      id: "type-1",
      name: "Presale 1",
      price: event.priceStart,
      remaining: 0,
    },
    {
      id: "type-2",
      name: "Normal Ticket",
      price: event.priceStart + 15000,
      remaining: 150,
    },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratis";
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const selectedTicketData = availableTickets.find(t => t.id === selectedTicket);
  const subtotal = (selectedTicketData?.price || 0) * quantity;
  const serviceFee = subtotal > 0 ? 2500 : 0;
  const total = subtotal + serviceFee;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handlePayment();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push(`/events/${event.slug}`);
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/events/${event.slug}/purchase/success`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="section-container max-w-5xl">
        {/* Header & Stepper */}
        <div className="mb-10">
          <Button variant="ghost" onClick={handleBack} className="mb-6 -ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Pemesanan Tiket
          </h1>

          {/* Stepper Component */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-moket-red rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            
            <div className="relative flex justify-between">
              {steps.map((step) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                        isCompleted || isCurrent 
                          ? "bg-moket-red border-moket-red text-white" 
                          : "bg-card border-muted-foreground/30 text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                    </div>
                    <span className={`text-xs font-semibold ${
                      isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* STEP 1: PILIH TIKET */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4">Pilih Kategori Tiket</h2>
                    
                    <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket} className="space-y-4">
                      {availableTickets.map((ticket) => (
                        <div key={ticket.id}>
                          <RadioGroupItem 
                            value={ticket.id} 
                            id={ticket.id} 
                            disabled={ticket.remaining === 0}
                            className="peer sr-only" 
                          />
                          <Label
                            htmlFor={ticket.id}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                              ticket.remaining === 0
                                ? "border-muted bg-muted/50 opacity-60 cursor-not-allowed"
                                : "border-border hover:border-moket-red/50 peer-data-[state=checked]:border-moket-red peer-data-[state=checked]:bg-moket-red/5"
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-base">{ticket.name}</h3>
                                {ticket.remaining === 0 && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider bg-muted-foreground/20 text-muted-foreground px-2 py-0.5 rounded-sm">Habis</span>
                                )}
                              </div>
                              <p className="text-sm font-bold text-moket-red">{formatPrice(ticket.price)}</p>
                            </div>
                            
                            {ticket.remaining > 0 && selectedTicket === ticket.id && (
                              <div className="mt-4 sm:mt-0 flex items-center gap-4 bg-background p-1.5 rounded-lg border shadow-sm">
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-md"
                                  onClick={(e) => { e.preventDefault(); setQuantity(Math.max(1, quantity - 1)); }}
                                  disabled={quantity <= 1}
                                >
                                  -
                                </Button>
                                <span className="font-semibold w-4 text-center">{quantity}</span>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-md"
                                  onClick={(e) => { e.preventDefault(); setQuantity(Math.min(ticket.remaining, quantity + 1)); }}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* STEP 2: DATA PEMESAN */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4">Informasi Pemesan</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      E-ticket akan dikirimkan ke email dan nomor WhatsApp di bawah ini. Pastikan data yang dimasukkan benar.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap Sesuai Identitas</Label>
                        <Input id="name" defaultValue="Ahmad Fadhil" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="ahmad.fadhil@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Nomor WhatsApp Aktif</Label>
                          <Input id="phone" type="tel" defaultValue="081234567890" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instansi">Asal Sekolah / Instansi</Label>
                        <Input id="instansi" defaultValue="SMK Telkom Malang" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="bg-moket-orange/10 border border-moket-orange/20 rounded-xl p-4 flex items-start gap-3 text-sm text-moket-orange-dark">
                  <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>
                    Data kamu dilindungi dan dienkripsi. Dengan melanjutkan, kamu menyetujui Syarat dan Ketentuan yang berlaku di MokeT.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: PEMBAYARAN */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4">Pilih Metode Pembayaran</h2>
                    
                    <div className="space-y-4">
                      {/* E-Wallet */}
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">E-Wallet</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="border border-border rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-moket-red/50">
                            <span className="font-medium">GoPay</span>
                            <div className="w-4 h-4 rounded-full border border-muted-foreground" />
                          </div>
                          <div className="border-2 border-moket-red bg-moket-red/5 rounded-xl p-4 flex items-center justify-between cursor-pointer">
                            <span className="font-medium">ShopeePay</span>
                            <div className="w-4 h-4 rounded-full border-4 border-moket-red bg-white" />
                          </div>
                          <div className="border border-border rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-moket-red/50">
                            <span className="font-medium">OVO</span>
                            <div className="w-4 h-4 rounded-full border border-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Virtual Account */}
                      <div className="pt-4 border-t border-border">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Virtual Account</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="border border-border rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-moket-red/50">
                            <span className="font-medium">BCA Virtual Account</span>
                            <div className="w-4 h-4 rounded-full border border-muted-foreground" />
                          </div>
                          <div className="border border-border rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-moket-red/50">
                            <span className="font-medium">Mandiri Virtual Account</span>
                            <div className="w-4 h-4 rounded-full border border-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-border">
                <CardContent className="p-0">
                  <div className="p-6 bg-secondary/50 border-b border-border">
                    <h3 className="font-bold text-lg mb-1">Ringkasan Pesanan</h3>
                    <p className="text-sm font-medium text-foreground line-clamp-2">{event.title}</p>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start text-sm">
                      <div className="text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">{selectedTicketData?.name}</p>
                        <p>{quantity}x {formatPrice(selectedTicketData?.price || 0)}</p>
                      </div>
                      <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Biaya Layanan</span>
                      <span>{formatPrice(serviceFee)}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-muted/30 border-t border-border border-dashed">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-foreground">Total Bayar</span>
                      <span className="text-xl font-bold text-moket-red">{formatPrice(total)}</span>
                    </div>
                    
                    <Button 
                      className="w-full h-12 text-base font-semibold bg-moket-red hover:bg-moket-red-dark text-white"
                      onClick={handleNext}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Memproses..." : currentStep === steps.length ? "Bayar Sekarang" : "Selanjutnya"}
                      {!isProcessing && currentStep < steps.length && <ChevronRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>Pembayaran aman & terenkripsi (Sandbox)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
