import { Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockSessions = [
  {
    id: "zoom-001",
    title: "Koordinasi Panitia Harian",
    host: "Ketua Panitia",
    scheduledAt: "2026-09-14 • 19:00 WIB",
    duration: 60,
    status: "scheduled" as const,
    joinUrl: "#",
  },
  {
    id: "zoom-002",
    title: "Briefing Teknis Venue",
    host: "Ketua Panitia",
    scheduledAt: "2026-09-15 • 07:00 WIB",
    duration: 30,
    status: "scheduled" as const,
    joinUrl: "#",
  },
];

const statusBadge = {
  scheduled: { label: "Terjadwal", className: "bg-moket-red/10 text-moket-red border-moket-red/20" },
  completed: { label: "Selesai", className: "bg-muted text-muted-foreground" },
  cancelled: { label: "Dibatalkan", className: "bg-black/10 text-black/60 border-black/10" },
};

export default function PanitiaZoomPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Zoom Meeting</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sesi koordinasi dan briefing panitia via Zoom.
        </p>
      </div>

      <div className="space-y-4">
        {mockSessions.map((session) => {
          const badge = statusBadge[session.status];
          return (
            <Card key={session.id} className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{session.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Host: {session.host} • {session.duration} menit
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
        })}
      </div>
    </div>
  );
}
