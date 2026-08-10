"use client";

import { useState } from "react";
import { Activity, User, Ticket, CalendarDays, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ActivityType =
  | "user_registered"
  | "ticket_purchased"
  | "event_created"
  | "event_published"
  | "user_banned"
  | "check_in";

interface ActivityLog {
  id: string;
  type: ActivityType;
  description: string;
  actorName: string;
  targetName?: string;
  createdAt: string;
}

const mockLogs: ActivityLog[] = [
  { id: "log-1", type: "user_registered", description: "Pengguna baru mendaftar", actorName: "Ahmad Fadhil", createdAt: "10 Agt 2026 14:32" },
  { id: "log-2", type: "ticket_purchased", description: "Pembelian tiket berhasil", actorName: "Sari Dewi", targetName: "Moklet Fest 2026 — Presale 1", createdAt: "10 Agt 2026 13:15" },
  { id: "log-3", type: "event_published", description: "Event dipublikasikan", actorName: "Admin OSIS", targetName: "Tech Talk: AI & Future", createdAt: "10 Agt 2026 11:00" },
  { id: "log-4", type: "event_created", description: "Event baru dibuat (draft)", actorName: "Admin OSIS", targetName: "Workshop Design UI/UX", createdAt: "10 Agt 2026 10:45" },
  { id: "log-5", type: "user_banned", description: "Akun pengguna diblokir", actorName: "Super Admin", targetName: "Doni Hermawan", createdAt: "9 Agt 2026 17:20" },
  { id: "log-6", type: "check_in", description: "Peserta check-in via QR", actorName: "Scanner Panitia", targetName: "Budi Santoso", createdAt: "9 Agt 2026 09:04" },
  { id: "log-7", type: "ticket_purchased", description: "Pembelian tiket berhasil", actorName: "Rina Kartika", targetName: "Moklet Fest 2026 — Normal", createdAt: "8 Agt 2026 20:11" },
  { id: "log-8", type: "user_registered", description: "Pengguna baru mendaftar", actorName: "Budi Santoso", createdAt: "7 Agt 2026 08:55" },
];

const activityConfig: Record<
  ActivityType,
  { label: string; icon: React.ElementType; iconClass: string; badgeClass: string }
> = {
  user_registered: {
    label: "Registrasi",
    icon: User,
    iconClass: "text-blue-600 bg-blue-500/10",
    badgeClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  ticket_purchased: {
    label: "Tiket",
    icon: Ticket,
    iconClass: "text-emerald-600 bg-emerald-500/10",
    badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  event_created: {
    label: "Event Draft",
    icon: CalendarDays,
    iconClass: "text-amber-600 bg-amber-500/10",
    badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  event_published: {
    label: "Event Publish",
    icon: CalendarDays,
    iconClass: "text-green-600 bg-green-500/10",
    badgeClass: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  user_banned: {
    label: "Blokir",
    icon: Shield,
    iconClass: "text-red-600 bg-red-500/10",
    badgeClass: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  check_in: {
    label: "Check-in",
    icon: Activity,
    iconClass: "text-purple-600 bg-purple-500/10",
    badgeClass: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
};

type FilterType = ActivityType | "all";

const filterOptions: Array<{ value: FilterType; label: string }> = [
  { value: "all", label: "Semua" },
  { value: "user_registered", label: "Registrasi" },
  { value: "ticket_purchased", label: "Tiket" },
  { value: "event_created", label: "Event" },
  { value: "user_banned", label: "Blokir" },
  { value: "check_in", label: "Check-in" },
];

export default function AdminActivityPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredLogs =
    filter === "all" ? mockLogs : mockLogs.filter((l) => l.type === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Activity Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pantau semua aktivitas penting di platform MokeT secara realtime.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              filter === opt.value
                ? "bg-moket-red text-white border-moket-red"
                : "border-border text-muted-foreground hover:border-moket-red/50 hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Log List */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-moket-red" />
            Log Aktivitas
            <span className="text-xs font-normal text-muted-foreground ml-1">
              ({filteredLogs.length} entri)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <Activity className="h-10 w-10 text-muted-foreground/30 mb-3" strokeWidth={1} />
              <p className="text-sm text-muted-foreground">Tidak ada aktivitas untuk filter ini.</p>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-border">
              {filteredLogs.map((log) => {
                const cfg = activityConfig[log.type];
                const Icon = cfg.icon;
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 py-3 hover:bg-secondary/20 -mx-2 px-2 rounded-md transition-colors"
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${cfg.iconClass}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-foreground">{log.description}</p>
                        <Badge className={`text-[10px] border shrink-0 ${cfg.badgeClass}`}>
                          {cfg.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground flex-wrap">
                        <span className="font-medium text-foreground/70">{log.actorName}</span>
                        {log.targetName && (
                          <>
                            <span>•</span>
                            <span>{log.targetName}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0 mt-0.5 text-right">
                      {log.createdAt}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
