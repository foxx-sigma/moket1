"use client";

import { CalendarClock, User as UserIcon, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockSessions = [
  {
    id: "ses-001",
    talentName: "Budi Santoso",
    topic: "Vokal & Stage Act",
    scheduledAt: "10 September 2026",
    time: "15:00 - 16:30 WIB",
    status: "scheduled" as const,
    notes: "Fokus pada penguasaan panggung.",
  },
  {
    id: "ses-002",
    talentName: "Citra Dewi",
    topic: "Koreografi Dasar",
    scheduledAt: "12 September 2026",
    time: "10:00 - 11:30 WIB",
    status: "completed" as const,
    notes: "Sudah menguasai gerakan dasar, perlu latihan kelenturan.",
  }
];

const statusConfig = {
  scheduled: { label: "Terjadwal", color: "bg-moket-red/10 text-moket-red border-moket-red/20", icon: Clock },
  completed: { label: "Selesai", color: "bg-muted text-muted-foreground border-border", icon: CheckCircle },
  cancelled: { label: "Dibatalkan", color: "bg-black/10 text-black/60 border-black/10", icon: CheckCircle },
};

export default function MentorSessionsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sesi Mentoring</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Daftar sesi mentoring dengan talent yang ditugaskan.
        </p>
      </div>

      <div className="space-y-4">
        {mockSessions.map((session) => {
          const status = statusConfig[session.status];
          const StatusIcon = status.icon;
          return (
            <Card key={session.id} className="border border-border">
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold">{session.topic}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                       <div className="flex items-center gap-1.5 font-medium text-moket-red">
                         <UserIcon className="h-4 w-4" />
                         {session.talentName}
                       </div>
                    </div>
                  </div>
                  <Badge className={`border whitespace-nowrap gap-1 pr-3 pl-2 py-1 ${status.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1"><CalendarClock className="h-3 w-3" /> Tanggal</p>
                      <p className="font-medium">{session.scheduledAt}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1"><Clock className="h-3 w-3" /> Waktu</p>
                       <p className="font-medium text-moket-red">{session.time}</p>
                    </div>
                 </div>

                 {session.notes && (
                   <div className="mt-4 p-3 bg-secondary/50 rounded-lg flex gap-2 items-start border border-border">
                     <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Catatan:</span> {session.notes}</p>
                   </div>
                 )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
