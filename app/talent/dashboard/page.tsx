"use client";

import Link from "next/link";
import {
  CalendarClock,
  Mic2,
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
    title: "Event Mendatang",
    value: "2",
    sub: "Jadwal tampil bulan ini",
    icon: CalendarClock,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
  },
  {
    title: "Total Penampilan",
    value: "12",
    sub: "Sepanjang tahun ini",
    icon: Mic2,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
  },
  {
    title: "Sesi Mentoring",
    value: "1",
    sub: "Jadwal Zoom minggu ini",
    icon: Video,
    color: "text-moket-red",
    bg: "bg-moket-red/10",
  },
];

type TalentScheduleStatus = "draft" | "scheduled" | "ready" | "performed";

const mockSchedules = [
  {
    id: "sched-1",
    eventTitle: "Moklet Fest 2026",
    performanceDate: "15 September 2026",
    startTime: "19:30",
    endTime: "20:15",
    location: "Main Stage - Aula Utama",
    status: "ready" as TalentScheduleStatus,
    daysLeft: 36,
  },
  {
    id: "sched-2",
    eventTitle: "Moklet Music Night",
    performanceDate: "20 Agustus 2026",
    startTime: "20:00",
    endTime: "20:45",
    location: "Lapangan Utama",
    status: "scheduled" as TalentScheduleStatus,
    daysLeft: 10,
  },
];

const mockMentoringSessions = [
  {
    id: "sess-1",
    topic: "Vokal & Stage Act",
    mentorName: "Dr. Hendra Wijaya",
    scheduledAt: "10 Agustus 2026 • 15:00 WIB",
    zoomJoinUrl: "https://zoom.us/j/example",
    status: "scheduled" as const,
  },
];

const scheduleStatusConfig: Record<
  TalentScheduleStatus,
  { label: string; className: string }
> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground border-border" },
  scheduled: { label: "Terjadwal", className: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  ready: { label: "Siap", className: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  performed: { label: "Selesai", className: "bg-muted text-muted-foreground border-border" },
};

export default function TalentDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Talent</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pantau jadwal tampil dan sesi mentoring kamu.
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
        {/* Jadwal Tampil */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Mic2 className="h-4 w-4 text-moket-red" />
              Jadwal Tampil
            </CardTitle>
            <Link href="/talent/schedule">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-moket-red hover:bg-moket-red/5"
              >
                Lihat Semua <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSchedules.length > 0 ? (
              mockSchedules.map((sched) => {
                const statusCfg = scheduleStatusConfig[sched.status];
                return (
                  <div
                    key={sched.id}
                    className="p-3 rounded-lg border border-border bg-secondary/30 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm text-foreground">{sched.eventTitle}</p>
                      <Badge className={`text-[10px] border shrink-0 ${statusCfg.className}`}>
                        {statusCfg.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span>{sched.performanceDate} • {sched.startTime} - {sched.endTime} WIB</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{sched.location}</p>
                    <div className="pt-1">
                      <span className="text-xs font-semibold text-moket-red">
                        {sched.daysLeft} hari lagi
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <CalendarClock
                  className="h-10 w-10 text-muted-foreground/30 mb-3"
                  strokeWidth={1}
                />
                <p className="text-sm text-muted-foreground">Belum ada jadwal tampil.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sesi Mentoring */}
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Video className="h-4 w-4 text-moket-red" />
              Sesi Mentoring
            </CardTitle>
            <Link href="/talent/zoom">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-moket-red hover:bg-moket-red/5"
              >
                Lihat Semua <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMentoringSessions.length > 0 ? (
              mockMentoringSessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3 rounded-lg border border-moket-red/20 bg-moket-red/5 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-moket-red shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{sess.topic}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Mentor: {sess.mentorName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {sess.scheduledAt}
                      </p>
                    </div>
                  </div>
                  {sess.zoomJoinUrl && (
                    <a
                      href={sess.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-moket-red hover:bg-moket-red/90 text-white text-xs mt-1"
                      >
                        <Video className="h-3.5 w-3.5 mr-1.5" />
                        Bergabung ke Zoom
                      </Button>
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center py-8 text-center">
                <AlertCircle
                  className="h-10 w-10 text-muted-foreground/30 mb-3"
                  strokeWidth={1}
                />
                <p className="text-sm text-muted-foreground">
                  Belum ada sesi mentoring terjadwal.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
