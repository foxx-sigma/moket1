"use client";

import { useState } from "react";
import { Download, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/DataTable";
import type { DataTableColumn } from "@/components/shared/DataTable";

interface ParticipantRow {
  id: string;
  attendeeName: string;
  email: string;
  phone: string;
  ticketTypeName: string;
  category: "internal" | "external";
  checkInStatus: "checked_in" | "not_checked_in";
  checkInAt?: string;
}

const mockParticipants: ParticipantRow[] = [
  { id: "p-1", attendeeName: "Ahmad Fadhil", email: "fadhil@smktelkom.sch.id", phone: "0812345678", ticketTypeName: "Presale 1", category: "internal", checkInStatus: "checked_in", checkInAt: "15 Sep 2026 09:04" },
  { id: "p-2", attendeeName: "Sari Dewi", email: "sari@gmail.com", phone: "0898765432", ticketTypeName: "Normal", category: "external", checkInStatus: "not_checked_in" },
  { id: "p-3", attendeeName: "Budi Santoso", email: "budi@smktelkom.sch.id", phone: "0811111111", ticketTypeName: "Presale 2", category: "internal", checkInStatus: "checked_in", checkInAt: "15 Sep 2026 09:22" },
  { id: "p-4", attendeeName: "Rina Kartika", email: "rina@email.com", phone: "0877777777", ticketTypeName: "Normal", category: "external", checkInStatus: "not_checked_in" },
  { id: "p-5", attendeeName: "Doni Hermawan", email: "doni@smktelkom.sch.id", phone: "0833333333", ticketTypeName: "Presale 1", category: "internal", checkInStatus: "checked_in", checkInAt: "15 Sep 2026 09:45" },
];

const checkedInCount = mockParticipants.filter((p) => p.checkInStatus === "checked_in").length;

const columns: DataTableColumn<ParticipantRow>[] = [
  {
    key: "attendeeName",
    header: "Nama Peserta",
    render: (row) => (
      <div>
        <p className="font-medium text-sm text-foreground">{row.attendeeName}</p>
        <p className="text-xs text-muted-foreground">{row.email}</p>
      </div>
    ),
  },
  {
    key: "ticketTypeName",
    header: "Jenis Tiket",
    render: (row) => (
      <div>
        <p className="text-sm">{row.ticketTypeName}</p>
        <Badge
          className={`text-[10px] border mt-0.5 ${
            row.category === "internal"
              ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
              : "bg-purple-500/10 text-purple-600 border-purple-500/20"
          }`}
        >
          {row.category === "internal" ? "Internal" : "External"}
        </Badge>
      </div>
    ),
    hideOnMobile: true,
  },
  {
    key: "checkInStatus",
    header: "Status Check-in",
    render: (row) => (
      <div>
        <Badge
          className={`text-[10px] border ${
            row.checkInStatus === "checked_in"
              ? "bg-green-500/10 text-green-600 border-green-500/20"
              : "bg-muted text-muted-foreground border-border"
          }`}
        >
          {row.checkInStatus === "checked_in" ? "Sudah Check-in" : "Belum"}
        </Badge>
        {row.checkInAt && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{row.checkInAt}</p>
        )}
      </div>
    ),
  },
  {
    key: "phone",
    header: "Telepon",
    hideOnMobile: true,
    render: (row) => <span className="text-sm font-mono">{row.phone}</span>,
  },
];

export default function EventParticipantsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Peserta Event</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Daftar peserta terdaftar dan status check-in.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg">
            <ScanLine className="h-3.5 w-3.5" />
            {checkedInCount} / {mockParticipants.length} Check-in
          </div>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export Excel
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockParticipants}
        rowKey="id"
        searchPlaceholder="Cari nama peserta..."
        totalItems={mockParticipants.length}
        currentPage={1}
        pageSize={10}
        emptyTitle="Belum Ada Peserta"
        emptyDescription="Belum ada peserta yang mendaftar untuk event ini."
        onExportCsv={() => console.log("Export CSV")}
      />
    </div>
  );
}
