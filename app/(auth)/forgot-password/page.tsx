"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiForgotPassword, type ApiError } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    setIsLoading(true);
    try {
      await apiForgotPassword({ email });
      setIsSent(true);
    } catch (err) {
      const apiErr = err as ApiError;
      if (apiErr.errors) {
        const firstField = Object.values(apiErr.errors)[0];
        setError(firstField?.[0] ?? apiErr.message);
      } else {
        setError(apiErr.message ?? "Gagal mengirim email. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  }


  if (isSent) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Email Terkirim!</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            Kami telah mengirim link reset password ke{" "}
            <span className="font-semibold text-foreground">{email}</span>.
            Cek folder inbox (atau spam) kamu.
          </p>
        </div>
        <div className="pt-2 space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 gap-2"
            onClick={() => setIsSent(false)}
          >
            <Mail className="h-4 w-4" />
            Kirim Ulang Email
          </Button>
          <Link href="/sign-in">
            <Button
              className="w-full bg-moket-red hover:bg-moket-red-dark text-white h-11"
            >
              Kembali ke Halaman Masuk
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Back */}
      <Link
        href="/sign-in"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Masuk
      </Link>

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Lupa Password?</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Masukkan email akunmu dan kami akan kirim link untuk reset password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-600"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="forgot-email">Email Akun</Label>
          <Input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={isLoading}
          />
        </div>

        {/* Submit */}
        <Button
          id="forgot-submit"
          type="submit"
          className="w-full bg-moket-red hover:bg-moket-red-dark text-white font-semibold h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Mengirim email...
            </>
          ) : (
            "Kirim Link Reset Password"
          )}
        </Button>
      </form>

      <p className="text-sm text-center text-muted-foreground">
        Ingat passwordmu?{" "}
        <Link href="/sign-in" className="text-moket-red font-medium hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
