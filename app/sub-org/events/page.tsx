"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Ticket,
  Users,
  LayoutList,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/DataTable";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import type { DataTableColumn } from "@/components/shared/DataTable";
import { EVENT_STATUS_CONFIG } from "@/lib/constants";
import type { EventStatus } from "@/lib/types";

interface EventRow {
  id: string;
  title: string;
  startDate: string;
  category: string;
  ticketsSold: number;
  quota: number;
  status: EventStatus;
}

const mockEvents: EventRow[] = [
  { id: "evt-1", title: "Moklet Fest 2026", startDate: "15 Sep 2026", category: "Festival", ticketsSold: 623, quota: 1000, status: "published" },
  { id: "evt-2", title: "Tech Talk: AI & Future", startDate: "22 Sep 2026", category: "Seminar", ticketsSold: 180, quota: 300, status: "published" },
  { id: "evt-3", title: "Workshop Design UI/UX", startDate: "10 Okt 2026", category: "Workshop", ticketsSold: 45, quota: 100, status: "draft" },
  { id: "evt-4", title: "English Speaking Club", startDate: "1 Agt 2026", category: "Bahasa", ticketsSold: 400, quota: 400, status: "completed" },
];

export default function SubOrgEventsPage() {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<EventRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    // TODO: DELETE /api/events/:id
    await new Promise((r) => setTimeout(r, 1000));
    setIsDeleting(false);
    setDeleteTarget(null);
  }

  const columns: DataTableColumn<EventRow>[] = [
    {
      key: "title",
      header: "Nama Event",
      render: (row) => (
        <div>
          <p className="font-medium text-sm text-foreground">{row.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{row.startDate} • {row.category}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const cfg = EVENT_STATUS_CONFIG[row.status];
        return (
          <Badge className={`text-[10px] border ${cfg.className}`}>{cfg.label}</Badge>
        );
      },
      hideOnMobile: true,
    },
    {
      key: "ticketsSold",
      header: "Tiket Terjual",
      render: (row) => {
        const pct = Math.round((row.ticketsSold / row.quota) * 100);
        return (
          <div className="min-w-[100px]">
            <p className="text-sm font-medium">{row.ticketsSold}/{row.quota}</p>
            <div className="h-1.5 bg-border rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-moket-red rounded-full"
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        );
      },
      hideOnMobile: true,
    },
    {
      key: "actions",
      header: "",
      width: "w-12",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary transition-colors h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/events/${row.id}`)} className="flex items-center gap-2 cursor-pointer">
              <Eye className="h-4 w-4" /> Lihat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/sub-org/events/${row.id}/edit`)} className="flex items-center gap-2 cursor-pointer">
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/sub-org/events/${row.id}/tickets`)} className="flex items-center gap-2 cursor-pointer">
              <Ticket className="h-4 w-4" /> Kelola Tiket
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/sub-org/events/${row.id}/participants`)} className="flex items-center gap-2 cursor-pointer">
              <Users className="h-4 w-4" /> Peserta
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/sub-org/events/${row.id}/timeline`)} className="flex items-center gap-2 cursor-pointer">
              <LayoutList className="h-4 w-4" /> Timeline
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
              onClick={() => setDeleteTarget(row)}
            >
              <Trash2 className="h-4 w-4" /> Hapus Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Saya</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola semua event yang diselenggarakan oleh organisasimu.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockEvents}
        rowKey="id"
        searchPlaceholder="Cari event..."
        totalItems={mockEvents.length}
        currentPage={1}
        pageSize={10}
        emptyTitle="Belum Ada Event"
        emptyDescription="Buat event pertamamu sekarang."
        emptyActionLabel="Buat Event"
        onEmptyAction={() => window.location.href = "/sub-org/events/create"}
        onExportCsv={() => console.log("Export CSV")}
        headerAction={
          <Link href="/sub-org/events/create">
            <Button className="bg-moket-red hover:bg-moket-red-dark text-white gap-2">
              <PlusCircle className="h-4 w-4" />
              Buat Event
            </Button>
          </Link>
        }
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Hapus Event?"
        description={`Event "${deleteTarget?.title}" akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan.`}
        confirmLabel="Ya, Hapus"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
