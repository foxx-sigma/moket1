"use client";

import { useState } from "react";
import { UserX, ShieldOff, ShieldCheck, MoreHorizontal } from "lucide-react";
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
import { USER_ROLE_LABELS, ACCOUNT_STATUS_CONFIG } from "@/lib/constants";
import type { UserRole, AccountStatus } from "@/lib/types";

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  createdAt: string;
}

const mockUsers: AdminUserRow[] = [
  { id: "u-1", name: "Ahmad Fadhil", email: "fadhil@smktelkom.sch.id", role: "user", status: "active", createdAt: "1 Agustus 2026" },
  { id: "u-2", name: "Budi Santoso", email: "budi@smktelkom.sch.id", role: "talent", status: "active", createdAt: "2 Agustus 2026" },
  { id: "u-3", name: "Sari Dewi", email: "sari@email.com", role: "mentor", status: "active", createdAt: "3 Agustus 2026" },
  { id: "u-4", name: "Doni Hermawan", email: "doni@smktelkom.sch.id", role: "user", status: "banned", createdAt: "4 Agustus 2026" },
  { id: "u-5", name: "Rina Kartika", email: "rina@email.com", role: "user", status: "inactive", createdAt: "5 Agustus 2026" },
];

type DialogType = "ban" | "unban" | "role" | null;

export default function AdminUsersPage() {
  const [targetUser, setTargetUser] = useState<AdminUserRow | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  function openDialog(user: AdminUserRow, type: DialogType) {
    setTargetUser(user);
    setDialogType(type);
  }

  function closeDialog() {
    setTargetUser(null);
    setDialogType(null);
  }

  async function handleAction() {
    setIsProcessing(true);
    // TODO: PATCH /api/admin/users/:id/status atau /api/admin/users/:id/role
    await new Promise((r) => setTimeout(r, 1000));
    setIsProcessing(false);
    closeDialog();
  }

  const columns: DataTableColumn<AdminUserRow>[] = [
    {
      key: "name",
      header: "Pengguna",
      render: (row) => (
        <div>
          <p className="font-medium text-sm text-foreground">{row.name}</p>
          <p className="text-xs text-muted-foreground font-mono">{row.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <Badge className="text-[10px] border bg-secondary text-foreground border-border">
          {USER_ROLE_LABELS[row.role]}
        </Badge>
      ),
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const cfg = ACCOUNT_STATUS_CONFIG[row.status];
        return (
          <Badge className={`text-[10px] border ${cfg.className}`}>
            {cfg.label}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: "Bergabung",
      hideOnMobile: true,
      render: (row) => <span className="text-sm text-muted-foreground">{row.createdAt}</span>,
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
            {row.status !== "banned" ? (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
                onClick={() => openDialog(row, "ban")}
              >
                <ShieldOff className="h-4 w-4" /> Blokir Pengguna
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => openDialog(row, "unban")}
              >
                <ShieldCheck className="h-4 w-4" /> Aktifkan Kembali
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const dialogConfig = {
    ban: {
      title: "Blokir Pengguna?",
      description: `Pengguna "${targetUser?.name}" tidak akan bisa masuk ke platform. Kamu bisa mengaktifkan kembali kapan saja.`,
      confirmLabel: "Blokir",
      variant: "destructive" as const,
    },
    unban: {
      title: "Aktifkan Kembali?",
      description: `Pengguna "${targetUser?.name}" akan dapat kembali masuk ke platform.`,
      confirmLabel: "Aktifkan",
      variant: "default" as const,
    },
    role: {
      title: "Ubah Role?",
      description: `Ubah role "${targetUser?.name}".`,
      confirmLabel: "Ubah",
      variant: "default" as const,
    },
  };

  const currentDialog = dialogType ? dialogConfig[dialogType] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manajemen Pengguna</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola semua akun pengguna di platform MokeT.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={mockUsers}
        rowKey="id"
        searchPlaceholder="Cari nama atau email..."
        totalItems={mockUsers.length}
        currentPage={1}
        pageSize={10}
        emptyTitle="Tidak Ada Pengguna"
        emptyDescription="Belum ada pengguna terdaftar."
        onExportCsv={() => console.log("Export CSV")}
      />

      {currentDialog && targetUser && (
        <ConfirmDialog
          open={!!dialogType}
          onOpenChange={(open) => !open && closeDialog()}
          title={currentDialog.title}
          description={currentDialog.description}
          confirmLabel={currentDialog.confirmLabel}
          variant={currentDialog.variant}
          onConfirm={handleAction}
          isLoading={isProcessing}
        />
      )}
    </div>
  );
}
