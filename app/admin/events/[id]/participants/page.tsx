"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Search, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Participant {
  id: string;
  name: string;
  ticketType: string;
  purchasedAt: string;
  checkedIn: boolean;
  checkedInAt?: string;
}

const mockParticipants: Participant[] = [
  { id: "p-001", name: "Ahmad Fadhil", ticketType: "Presale 1", purchasedAt: "10 Agt 2026", checkedIn: true, checkedInAt: "09:14 WIB" },
  { id: "p-002", name: "Budi Santoso", ticketType: "Normal", purchasedAt: "12 Agt 2026", checkedIn: false },
  { id: "p-003", name: "Citra Dewi", ticketType: "Presale 2", purchasedAt: "11 Agt 2026", checkedIn: true, checkedInAt: "09:32 WIB" },
  { id: "p-004", name: "Dani Wijaya", ticketType: "Normal", purchasedAt: "13 Agt 2026", checkedIn: false },
  { id: "p-005", name: "Eka Fitriani", ticketType: "Presale 1", purchasedAt: "10 Agt 2026", checkedIn: true, checkedInAt: "10:01 WIB" },
];

export default function AdminParticipantsPage({ params }: { params: { id: string } }) {
  const [search, setSearch] = useState("");

  const filtered = mockParticipants.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const checkedInCount = mockParticipants.filter((p) => p.checkedIn).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Daftar Peserta</h1>
          <p className="text-sm text-muted-foreground">Event ID: {params.id}</p>
        </div>
        <Button variant="outline" className="gap-2 shrink-0">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">Sudah Check-in</p>
              <p className="text-xl font-bold">{checkedInCount} / {mockParticipants.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-8 w-8 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">Belum Hadir</p>
              <p className="text-xl font-bold">{mockParticipants.length - checkedInCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cari nama peserta..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Participant List */}
      <div className="space-y-2">
        {filtered.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-secondary/30 transition-colors">
            <div>
              <p className="font-semibold text-sm text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {p.ticketType} • Beli: {p.purchasedAt}
              </p>
            </div>
            <div className="text-right">
              {p.checkedIn ? (
                <>
                  <Badge className="text-[10px] border bg-green-500/10 text-green-600 border-green-500/20">
                    ✓ Hadir
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{p.checkedInAt}</p>
                </>
              ) : (
                <Badge className="text-[10px] border bg-muted text-muted-foreground border-border">
                  Belum Hadir
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
