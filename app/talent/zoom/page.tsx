import { Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockSessions = [
  {
    id: "zm-001",
    title: "Mentoring Vokal & Stage Act",
    host: "Mentor A",
    scheduledAt: "2026-09-10 • 15:00 WIB",
    duration: 90,
    status: "scheduled" as const,
    joinUrl: "#",
  }
];

const statusBadge = {
  scheduled: { label: "Terjadwal", className: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  completed: { label: "Selesai", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "Dibatalkan", className: "bg-black/10 text-black/60 border-black/10" },
};

export default function TalentZoomPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Zoom Mentoring</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sesi mentoring online bersama expert untuk persiapan perform.
        </p>
      </div>

      <div className="space-y-4">
        {mockSessions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground bg-card border border-dashed rounded-lg">
            Tidak ada sesi mentoring yang terjadwal.
          </div>
        ) : (
          mockSessions.map((session) => {
            const badge = statusBadge[session.status];
            return (
              <Card key={session.id} className="border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{session.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Mentor: {session.host} • {session.duration} menit
                      </CardDescription>
                    </div>
                    <Badge className={`text-xs border shrink-0 ${badge.className}`}>
                      {badge.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{session.scheduledAt}</p>
                    <a
                      href={session.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-moket-red hover:bg-moket-red/90 text-white transition-colors"
                    >
                      <Video className="h-3.5 w-3.5" />
                      Join Zoom
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
