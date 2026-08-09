"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Calendar, MapPin, AlignLeft, Tag, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function CreateEventPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/events");
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Buat Event Baru</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Isi detail event yang akan kamu selenggarakan.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlignLeft className="h-4 w-4" /> Informasi Dasar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Nama Event *</Label>
              <Input id="title" placeholder="Contoh: Moklet Fest 2026" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Event *</Label>
              <Textarea id="description" placeholder="Jelaskan detail event, rundown, dresscode, atau hal lain yang perlu diketahui peserta..." rows={5} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" /> Kategori *
                </Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="musik">Musik / Konser</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="olahraga">Olahraga</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scope" className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Lingkup Peserta *
                </Label>
                <Select required>
                  <SelectTrigger id="scope">
                    <SelectValue placeholder="Pilih lingkup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal (Siswa/Guru SMK Telkom)</SelectItem>
                    <SelectItem value="external">Eksternal (Umum)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Waktu & Lokasi */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Waktu & Lokasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="start_date">Tanggal & Waktu Mulai *</Label>
                <Input id="start_date" type="datetime-local" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Tanggal & Waktu Selesai *</Label>
                <Input id="end_date" type="datetime-local" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Lokasi *
              </Label>
              <Input id="location" placeholder="Contoh: Aula Utama SMK Telkom Malang" required />
            </div>
          </CardContent>
        </Card>

        {/* Banner Upload */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Upload className="h-4 w-4" /> Poster / Banner Event
            </CardTitle>
            <CardDescription>
              Upload gambar poster event (JPG/PNG, max 5MB). Gambar akan diunggah via backend ke Cloudinary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <label
              htmlFor="banner"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Klik untuk upload atau drag & drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG hingga 5MB</p>
              <input id="banner" type="file" accept="image/*" className="hidden" />
            </label>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/events")} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" variant="outline" disabled={isLoading} className="border-moket-navy text-moket-navy hover:bg-moket-navy/5">
            Simpan sebagai Draft
          </Button>
          <Button type="submit" className="bg-moket-navy hover:bg-moket-navy-dark text-white" disabled={isLoading}>
            {isLoading ? "Menyimpan..." : "Publish Event"}
          </Button>
        </div>
      </form>
    </div>
  );
}
