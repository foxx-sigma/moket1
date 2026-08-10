"use client";

import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MilestoneStatus } from "@/lib/types";

interface TimelineItem {
  id: string;
  milestoneName: string;
  milestoneDate: string;
  status: MilestoneStatus;
  notes?: string;
}

const mockTimeline: TimelineItem[] = [
  {
    id: "m-1",
    milestoneName: "Persiapan & Planning",
    milestoneDate: "1 Agustus 2026",
    status: "completed",
    notes: "Pembentukan panitia inti, penyusunan rundown.",
  },
  {
    id: "m-2",
    milestoneName: "Open Ticket",
    milestoneDate: "10 Agustus 2026",
    status: "completed",
    notes: "Presale 1 dibuka. 100 tiket habis dalam 2 jam.",
  },
  {
    id: "m-3",
    milestoneName: "Persiapan Venue",
    milestoneDate: "12 September 2026",
    status: "in_progress",
    notes: "Dekorasi dan soundcheck sedang berjalan.",
  },
  {
    id: "m-4",
    milestoneName: "Hari-H Event",
    milestoneDate: "15 September 2026",
    status: "pending",
  },
  {
    id: "m-5",
    milestoneName: "Close Ticket & Evaluasi",
    milestoneDate: "20 September 2026",
    status: "pending",
  },
];

const milestoneStatusConfig: Record<
  MilestoneStatus,
  { label: string; icon: React.ElementType; iconClass: string; lineClass: string }
> = {
  completed: {
    label: "Selesai",
    icon: CheckCircle2,
    iconClass: "text-green-600 bg-green-500/10",
    lineClass: "bg-green-500",
  },
  in_progress: {
    label: "Sedang Berjalan",
    icon: Clock,
    iconClass: "text-blue-600 bg-blue-500/10",
    lineClass: "bg-blue-500",
  },
  pending: {
    label: "Belum Dimulai",
    icon: Circle,
    iconClass: "text-muted-foreground bg-secondary",
    lineClass: "bg-border",
  },
};

const completedCount = mockTimeline.filter((m) => m.status === "completed").length;
const progressPct = Math.round((completedCount / mockTimeline.length) * 100);

export default function EventTimelinePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Timeline Event</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pantau progres milestone dari persiapan hingga evaluasi.
        </p>
      </div>

      {/* Progress Bar Keseluruhan */}
      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">
              Progres Keseluruhan
            </span>
            <span className="text-sm font-bold text-moket-red">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-moket-red rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completedCount} dari {mockTimeline.length} milestone selesai
          </p>
        </CardContent>
      </Card>

      {/* Timeline Visual */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Milestone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {mockTimeline.map((item, index) => {
              const cfg = milestoneStatusConfig[item.status];
              const Icon = cfg.icon;
              const isLast = index === mockTimeline.length - 1;

              return (
                <div key={item.id} className="flex gap-4 relative">
                  {/* Line + Icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${cfg.iconClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 flex-1 min-h-[2rem] mt-1 ${cfg.lineClass}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-6 flex-1 ${isLast ? "pb-0" : ""}`}>
                    <div className="flex items-start gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">
                        {item.milestoneName}
                      </span>
                      <Badge
                        className={`text-[10px] border shrink-0 ${
                          item.status === "completed"
                            ? "bg-green-500/10 text-green-600 border-green-500/20"
                            : item.status === "in_progress"
                            ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {cfg.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.milestoneDate}
                    </p>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground mt-1.5 bg-secondary/50 rounded-md p-2">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
