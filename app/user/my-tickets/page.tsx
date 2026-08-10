import { TicketCard } from "@/components/tickets/TicketCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUserTickets } from "@/lib/mock/data";

export default function MyTicketsPage() {
  const activeTickets = mockUserTickets.filter((t) => !t.isUsed);
  const usedTickets = mockUserTickets.filter((t) => t.isUsed);
  const expiredTickets: typeof mockUserTickets = []; // Simplified logic for mock

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tiket Saya</h1>
        <p className="mt-2 text-muted-foreground">
          Kelola semua e-ticket kamu di sini. Tunjukkan QR Code pada tiket aktif saat check-in.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-muted/50 rounded-xl p-1">
          <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Aktif ({activeTickets.length})
          </TabsTrigger>
          <TabsTrigger value="used" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Dipakai ({usedTickets.length})
          </TabsTrigger>
          <TabsTrigger value="expired" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Kedaluwarsa ({expiredTickets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          {activeTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl bg-card">
              <p className="text-muted-foreground">Tidak ada tiket aktif.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="used" className="mt-0">
          {usedTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {usedTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl bg-card">
              <p className="text-muted-foreground">Belum ada tiket yang dipakai.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="expired" className="mt-0">
          {expiredTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {expiredTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-xl bg-card">
              <p className="text-muted-foreground">Tidak ada tiket kedaluwarsa.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
