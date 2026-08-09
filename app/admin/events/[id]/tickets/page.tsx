"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TicketType {
  id: string;
  name: string;
  price: number;
  quota: number;
  quotaSold: number;
  maxPerUser: number;
  expiredTime: string;
}

const mockTickets: TicketType[] = [
  { id: "tt-001", name: "Presale 1", price: 25000, quota: 200, quotaSold: 200, maxPerUser: 2, expiredTime: "2026-08-15" },
  { id: "tt-002", name: "Presale 2", price: 35000, quota: 300, quotaSold: 180, maxPerUser: 3, expiredTime: "2026-09-01" },
  { id: "tt-003", name: "Normal", price: 50000, quota: 500, quotaSold: 243, maxPerUser: 5, expiredTime: "2026-09-14" },
];

function formatRp(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

export default function AdminEventTicketsPage({ params }: { params: { id: string } }) {
  const [tickets] = useState<TicketType[]>(mockTickets);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Kelola Tiket</h1>
          <p className="text-sm text-muted-foreground">Event ID: {params.id}</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-moket-navy hover:bg-moket-navy-dark text-white gap-2">
              <PlusCircle className="h-4 w-4" />
              Tambah Tipe Tiket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Tipe Tiket</DialogTitle>
              <DialogDescription>Buat jenis tiket baru untuk event ini.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Nama Tiket</Label>
                <Input placeholder="Contoh: VIP, Early Bird" />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi / Benefit</Label>
                <Textarea placeholder="Fasilitas yang didapat..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Harga (Rp)</Label>
                  <Input type="number" placeholder="0" min="0" />
                </div>
                <div className="space-y-2">
                  <Label>Kuota</Label>
                  <Input type="number" placeholder="100" min="1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maks. per Akun</Label>
                  <Input type="number" placeholder="2" min="1" />
                </div>
                <div className="space-y-2">
                  <Label>Batas Penjualan</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-moket-navy text-white">Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Ticket List */}
      <div className="space-y-3">
        {tickets.map((t) => {
          const pct = Math.round((t.quotaSold / t.quota) * 100);
          const isSoldOut = t.quotaSold >= t.quota;
          return (
            <Card key={t.id} className="border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-semibold">{t.name}</CardTitle>
                  {isSoldOut && (
                    <Badge className="text-[10px] bg-red-500/10 text-red-600 border-red-500/20 border">Sold Out</Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-moket-navy text-base">{formatRp(t.price)}</span>
                  <span className="text-muted-foreground">Maks. {t.maxPerUser}x/akun • Hingga {t.expiredTime}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{t.quotaSold} dari {t.quota} terjual</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isSoldOut ? "bg-red-500" : "bg-moket-navy"}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
