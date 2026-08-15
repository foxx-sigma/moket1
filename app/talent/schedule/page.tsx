"use client";

import { Calendar, MapPin, Clock, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockSchedules = [
  {
    id: "sch-001",
    eventTitle: "Moklet Fest 2026",
    performanceDate: "15 September 2026",
    location: "Aula Utama SMK Telkom Malang",
    stage: "Main Stage",
    callTime: "18:00 WIB",
    performTime: "19:30 - 20:15 WIB",
    status: "scheduled" as const,
    notes: "Soundcheck jam 15:00 WIB. Harap hadir tepat waktu.",
  },
  {
    id: "sch-002",
    eventTitle: "Tech Talk: AI & Future",
    performanceDate: "22 September 2026",
    location: "Lab Komputer Gedung C",
    stage: "Mini Stage",
    callTime: "12:30 WIB",
    performTime: "13:30 - 14:00 WIB",
    status: "draft" as const,
    notes: "Membawa materi presentasi dalam flashdisk.",
  }
];

const statusConfig = {
  draft: { label: "Menunggu Konfirmasi", color: "bg-black/5 text-black/50 border-black/10" },
  scheduled: { label: "Terjadwal", color: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  ready: { label: "Standby", color: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  performed: { label: "Selesai", color: "bg-muted text-muted-foreground" },
};

export default function TalentSchedulePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Jadwal Tampil</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Daftar jadwal manggung dan kegiatan kamu di berbagai event MokeT.
        </p>
      </div>

      <div className="space-y-4">
        {mockSchedules.map((sch) => {
          const status = statusConfig[sch.status];
          return (
            <Card key={sch.id} className="border border-border">
              <CardHeader className="pb-3 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold">{sch.eventTitle}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                       <div className="flex items-center gap-1.5">
                         <Calendar className="h-4 w-4" />
                         {sch.performanceDate}
                       </div>
                       <div className="flex items-center gap-1.5 hidden sm:flex">
                         <MapPin className="h-4 w-4" />
                         {sch.location}
                       </div>
                    </div>
                  </div>
                  <Badge className={`border whitespace-nowrap ${status.color}`}>
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Stage</p>
                      <p className="font-medium">{sch.stage}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1"><Clock className="h-3 w-3" /> Call Time</p>
                      <p className="font-medium text-moket-red">{sch.callTime}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold flex items-center gap-1"><Clock className="h-3 w-3" /> Perform Time</p>
                      <p className="font-bold text-lg text-moket-red">{sch.performTime}</p>
                    </div>
                 </div>

                 {sch.notes && (
                   <div className="mt-4 p-3 bg-secondary/50 rounded-lg flex gap-2 items-start border border-border">
                     <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                     <p className="text-sm text-muted-foreground">{sch.notes}</p>
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
