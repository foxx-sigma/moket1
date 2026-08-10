"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle2, User, Phone, School, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { ParticipantCategory } from "@/lib/types";

interface OnboardingForm {
  fullName: string;
  phone: string;
  schoolOrigin: string;
  classBatch: string;
  category: ParticipantCategory | "";
}

export default function OnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState<OnboardingForm>({
    fullName: "",
    phone: "",
    schoolOrigin: "",
    classBatch: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof OnboardingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.fullName.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }
    if (!form.category) {
      setError("Kategori peserta wajib dipilih.");
      return;
    }

    setIsLoading(true);
    // TODO: POST ke /api/user/profile (buat user_profiles di DB)
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);

    // Setelah selesai, redirect ke dashboard user
    router.push("/user/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-2xl bg-moket-red flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Lengkapi Profilmu</h1>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Isi data dirimu terlebih dahulu sebelum mulai menjelajahi MokeT.
            Informasi ini diperlukan untuk e-ticket dan konfirmasi acara.
          </p>
          <p className="text-xs text-muted-foreground/60">Langkah ini tidak bisa dilewati.</p>
        </div>

        {/* Form Card */}
        <Card className="border border-border">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-600"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Nama Lengkap */}
              <div className="space-y-1.5">
                <Label htmlFor="onboarding-fullname" className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Nama Lengkap
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="onboarding-fullname"
                  type="text"
                  placeholder="Nama sesuai kartu identitas"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Telepon */}
              <div className="space-y-1.5">
                <Label htmlFor="onboarding-phone" className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Nomor Telepon
                  <span className="text-xs text-muted-foreground ml-1">(opsional)</span>
                </Label>
                <Input
                  id="onboarding-phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  disabled={isLoading}
                  maxLength={20}
                />
              </div>

              {/* Asal Sekolah / Instansi */}
              <div className="space-y-1.5">
                <Label htmlFor="onboarding-school" className="flex items-center gap-1.5">
                  <School className="h-3.5 w-3.5 text-muted-foreground" />
                  Asal Sekolah / Instansi
                  <span className="text-xs text-muted-foreground ml-1">(opsional)</span>
                </Label>
                <Input
                  id="onboarding-school"
                  type="text"
                  placeholder="SMK Telkom Malang"
                  value={form.schoolOrigin}
                  onChange={(e) => handleChange("schoolOrigin", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Kelas / Angkatan */}
              <div className="space-y-1.5">
                <Label htmlFor="onboarding-class" className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                  Kelas / Angkatan
                  <span className="text-xs text-muted-foreground ml-1">(opsional)</span>
                </Label>
                <Input
                  id="onboarding-class"
                  type="text"
                  placeholder="XII RPL 1 / Angkatan 2024"
                  value={form.classBatch}
                  onChange={(e) => handleChange("classBatch", e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Kategori Peserta */}
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  Kategori Peserta
                  <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      value: "internal" as ParticipantCategory,
                      label: "Internal",
                      description: "Siswa / Guru SMK Telkom Malang",
                    },
                    {
                      value: "external" as ParticipantCategory,
                      label: "External",
                      description: "Dari luar SMK Telkom Malang",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleChange("category", opt.value)}
                      disabled={isLoading}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        form.category === opt.value
                          ? "border-moket-red bg-moket-red/5"
                          : "border-border hover:border-moket-red/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            form.category === opt.value
                              ? "border-moket-red"
                              : "border-muted-foreground"
                          }`}
                        >
                          {form.category === opt.value && (
                            <div className="h-2 w-2 rounded-full bg-moket-red" />
                          )}
                        </div>
                        <span className="font-semibold text-sm text-foreground">
                          {opt.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                id="onboarding-submit"
                type="submit"
                className="w-full bg-moket-red hover:bg-moket-red-dark text-white font-semibold h-11 mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Simpan & Mulai Jelajahi
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          Data ini hanya digunakan untuk keperluan e-ticket dan konfirmasi acara. Kamu bisa mengubahnya kapan saja di halaman Profil.
        </p>
      </div>
    </div>
  );
}
