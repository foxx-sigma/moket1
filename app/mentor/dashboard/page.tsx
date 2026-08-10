"use client";

import Link from "next/link";
import {
  Users,
  CalendarClock,
  Video,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data — diganti dengan API call saat integrasi backend
const mockStats = [
  {
    title: "Sesi Mendatang",
    value: "3",
    sub: "Minggu ini",
    icon: CalendarClock,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Talent Dibimbing",
    value: "8",
    sub: "Total talent aktif",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    title: "Sesi Selesai",
    value: "12",
    sub: "Total sesi mentoring",
    icon: Video,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
  },
];

type MentoringSessionStatus = "scheduled" | "completed" | "cancelled";

const mockUpcomingSessions = [
  {
    id: "sess-1",
    topic: "Vokal & Stage Act",
    talentName: "Budi Santoso",
    eventTitle: "Moklet Fest 2026",
    scheduledAt: "10 Agustus 2026",
    scheduledTime: "15:00 WIB",
    durationMinutes: 60,
    zoomJoinUrl: "https://zoom.us/j/example1",
    status: "scheduled" as MentoringSessionStatus,
  },
  {
    id: "sess-2",
    topic: "Koreografi Panggung",
    talentName: "Sari Indah",
    eventTitle: "Moklet Music Night",
    scheduledAt: "12 Agustus 2026",
    scheduledTime: "10:00 WIB",
    durationMinutes: 60,
    zoomJoinUrl: "https://zoom.us/j/example2",
    status: "scheduled" as MentoringSessionStatus,
  },
];

const mockTalentList = [
  {
    id: "talent-1",
    name: "Budi Santoso",
    category: "Band",
    eventTitle: "Moklet Fest 2026",
    nextSession: "10 Agt 2026",
    sessionsCompleted: 3,
  },
  {
    id: "talent-2",
    name: "Aisha Zahra",
    category: "Vocalist",
    eventTitle: "Moklet Music Night",
    nextSession: "14 Agt 2026",
    sessionsCompleted: 2,
  },
  {
    id: "talent-3",
    name: "Sari Indah",
    category: "Traditional Dance",
    eventTitle: "Moklet Music Night",
    nextSession: "12 Agt 2026",
    sessionsCompleted: 1,
  },
];

const sessionStatusConfig: Record<
  MentoringSessionStatus,
  { label: string; className: string }
> = {
  scheduled: { label: "Terjadwal", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  completed: { label: "Selesai", className: "bg-muted text-muted-foreground border-border" },
  cancelled: { label: "Dibatalkan", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export default function MentorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Mentor</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pantau jadwal sesi mentoring dan perkembangan talent.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {mockStats.map((s) => (
          <Card key={s.title} className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {s.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sesi Mendatang */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Video className="h-4 w-4 text-emerald-600" />
              Sesi Mendatang
            </CardTitle>
            <Link href="/mentor/sessions">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-emerald-600 hover:bg-emerald-500/5"
              >
                Lihat Semua <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUpcomingSessions.length > 0 ? (
              mockUpcomingSessions.map((sess) => {
                const statusCfg = sessionStatusConfig[sess.status];
                return (
                  <div
                    key={sess.id}
                    className="p-3 rounded-lg border border-border bg-secondary/30 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm text-foreground">{sess.topic}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Talent: {sess.talentName}
                        </p>
                      </div>
                      <Badge className={`text-[10px] border shrink-0 ${statusCfg.className}`}>
                        {statusCfg.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>
                        {sess.scheduledAt} • {sess.scheduledTime} ({sess.durationMinutes} menit)
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{sess.eventTitle}</p>
                    {sess.zoomJoinUrl && (
                      <a
                        href={sess.zoomJoinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          size="sm"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs mt-1"
                        >
                          <Video className="h-3.5 w-3.5 mr-1.5" />
                          Buka Zoom
                        </Button>
                      </a>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <AlertCircle
                  className="h-10 w-10 text-muted-foreground/30 mb-3"
                  strokeWidth={1}
                />
                <p className="text-sm text-muted-foreground">Belum ada sesi terjadwal.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daftar Talent Dibimbing */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Talent Dibimbing
            </CardTitle>
            <Link href="/mentor/sessions">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-blue-600 hover:bg-blue-500/5"
              >
                Jadwal Lengkap <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockTalentList.map((talent) => (
              <div
                key={talent.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40 hover:bg-secondary transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-blue-600">
                    {talent.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{talent.name}</p>
                  <p className="text-xs text-muted-foreground">{talent.category} — {talent.eventTitle}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium text-foreground">{talent.nextSession}</p>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <p className="text-[10px] text-muted-foreground">{talent.sessionsCompleted} sesi</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
