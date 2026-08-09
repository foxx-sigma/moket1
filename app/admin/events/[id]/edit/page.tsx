"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/events");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Event</h1>
          <p className="text-sm text-muted-foreground">ID: {params.id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base">Informasi Dasar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Nama Event</Label>
              <Input id="title" defaultValue="Moklet Fest 2026" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" defaultValue="Event tahunan terbesar SMK Telkom Malang..." rows={5} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select defaultValue="musik">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="musik">Musik / Konser</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Lingkup</Label>
                <Select defaultValue="external">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="external">Eksternal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base">Waktu & Lokasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Waktu Mulai</Label>
                <Input type="datetime-local" defaultValue="2026-09-15T09:00" />
              </div>
              <div className="space-y-2">
                <Label>Waktu Selesai</Label>
                <Input type="datetime-local" defaultValue="2026-09-15T22:00" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Lokasi</Label>
              <Input defaultValue="Aula Utama SMK Telkom Malang" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-base">Status Publikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <Select defaultValue="published">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft (tidak terlihat publik)</SelectItem>
                <SelectItem value="published">Published (terlihat publik)</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/admin/events">
            <Button variant="outline">Batal</Button>
          </Link>
          <Button type="submit" className="bg-moket-navy hover:bg-moket-navy-dark text-white gap-2" disabled={isLoading}>
            <Save className="h-4 w-4" />
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
