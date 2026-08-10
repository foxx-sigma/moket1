"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  AlertCircle,
  CalendarDays,
  Clock,
  MapPin,
  FileText,
  Image as ImageIcon,
  Tag,
  Users,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENT_CATEGORIES } from "@/lib/constants";

interface CreateEventForm {
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  location: string;
  locationMapsUrl: string;
  bannerUrl: string;
  isPublic: boolean;
}

const initialForm: CreateEventForm = {
  title: "",
  description: "",
  category: "",
  startDate: "",
  endDate: "",
  registrationDeadline: "",
  location: "",
  locationMapsUrl: "",
  bannerUrl: "",
  isPublic: true,
};

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState<CreateEventForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange<K extends keyof CreateEventForm>(
    field: K,
    value: CreateEventForm[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()) return setError("Nama event wajib diisi.");
    if (!form.category) return setError("Kategori event wajib dipilih.");
    if (!form.startDate) return setError("Tanggal mulai wajib diisi.");
    if (!form.location.trim()) return setError("Lokasi event wajib diisi.");

    setIsLoading(true);
    // TODO: POST ke /api/events
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    router.push("/sub-org/events");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <Link
          href="/sub-org/events"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Event
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Buat Event Baru</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Isi detail event yang ingin kamu selenggarakan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-600"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Informasi Dasar */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-moket-red" />
              Informasi Dasar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="event-title">
                Nama Event <span className="text-red-500">*</span>
              </Label>
              <Input
                id="event-title"
                placeholder="Moklet Fest 2026"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="event-description">Deskripsi</Label>
              <Textarea
                id="event-description"
                placeholder="Ceritakan detail event, rundown, dan hal yang perlu diketahui peserta..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                Kategori <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {EVENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleChange("category", cat)}
                    disabled={isLoading}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.category === cat
                        ? "bg-moket-red text-white border-moket-red"
                        : "border-border text-muted-foreground hover:border-moket-red/50 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jadwal */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-moket-red" />
              Jadwal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="event-start-date">
                  Tanggal Mulai <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="event-start-date"
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="event-end-date">Tanggal Selesai</Label>
                <Input
                  id="event-end-date"
                  type="datetime-local"
                  value={form.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="event-reg-deadline">Batas Pendaftaran</Label>
              <Input
                id="event-reg-deadline"
                type="datetime-local"
                value={form.registrationDeadline}
                onChange={(e) => handleChange("registrationDeadline", e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        {/* Lokasi */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4 text-moket-red" />
              Lokasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="event-location">
                Nama Lokasi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="event-location"
                placeholder="Aula Utama SMK Telkom Malang"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="event-maps-url">Link Google Maps</Label>
              <Input
                id="event-maps-url"
                type="url"
                placeholder="https://maps.google.com/..."
                value={form.locationMapsUrl}
                onChange={(e) => handleChange("locationMapsUrl", e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>

        {/* Visibilitas */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-moket-red" />
              Visibilitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {[
                { value: true, label: "Publik", desc: "Dapat ditemukan di halaman Events" },
                { value: false, label: "Private", desc: "Hanya bisa diakses via link" },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => handleChange("isPublic", opt.value)}
                  disabled={isLoading}
                  className={`flex-1 p-3 rounded-lg border-2 text-left transition-all ${
                    form.isPublic === opt.value
                      ? "border-moket-red bg-moket-red/5"
                      : "border-border hover:border-moket-red/30"
                  }`}
                >
                  <p className="font-semibold text-sm text-foreground">{opt.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            id="create-event-submit"
            type="submit"
            className="bg-moket-red hover:bg-moket-red-dark text-white font-semibold px-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Buat Event"
            )}
          </Button>
          <Link href="/sub-org/events">
            <Button type="button" variant="outline" disabled={isLoading}>
              Batal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
