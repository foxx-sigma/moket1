import { Calendar, Search, Filter, Download, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTransactions } from "@/lib/mock/data";

export default function TransactionsPage() {
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "pending":
        return "bg-amber-500/10 text-amber-600 border-amber-200";
      case "failed":
        return "bg-red-500/10 text-red-600 border-red-200";
      case "expired":
        return "bg-slate-500/10 text-slate-600 border-slate-200";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "success":
        return "Berhasil";
      case "pending":
        return "Menunggu Pembayaran";
      case "failed":
        return "Gagal";
      case "expired":
        return "Kedaluwarsa";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Riwayat Transaksi</h1>
          <p className="mt-2 text-muted-foreground">
            Daftar seluruh transaksi pembelian tiket kamu di MokeT.
          </p>
        </div>
        <Button variant="outline" className="shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Ekspor CSV
        </Button>
      </div>

      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari Invoice Number atau nama event..."
            className="pl-9 bg-background"
          />
        </div>
        <div className="w-full sm:w-auto flex items-center gap-2">
          <Button variant="outline" className="w-full sm:w-auto bg-background">
            <Filter className="mr-2 h-4 w-4" />
            Filter Status
          </Button>
          <Button variant="outline" className="w-full sm:w-auto bg-background">
            <Calendar className="mr-2 h-4 w-4" />
            Pilih Tanggal
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[180px]">Invoice Number / Waktu</TableHead>
                <TableHead>Event & Tiket</TableHead>
                <TableHead>Metode Pembayaran</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center w-[150px]">Status</TableHead>
                <TableHead className="text-center w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.length > 0 ? (
                mockTransactions.map((trx) => (
                  <TableRow key={trx.id} className="group hover:bg-muted/30">
                    <TableCell>
                      <div className="font-medium text-foreground">{trx.invoiceNumber}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(trx.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-foreground line-clamp-1">
                        {trx.event?.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {trx.items[0]?.quantity}x {trx.items[0]?.ticketType?.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {trx.paymentMethod || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-foreground">
                        {trx.totalAmount === 0 ? "Gratis" : formatPrice(trx.totalAmount)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          trx.status
                        )}`}
                      >
                        {getStatusLabel(trx.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-moket-red hover:bg-moket-red/10">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <CreditCard className="h-10 w-10 mb-4 opacity-20" />
                      <p>Belum ada transaksi.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Menampilkan 1-3 dari 3 transaksi
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
          <Button variant="outline" size="sm" disabled>Selanjutnya</Button>
        </div>
      </div>
    </div>
  );
}
