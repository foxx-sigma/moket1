"use client";

import Link from "next/link";
import { Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
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
          Reset password untuk akun MokeT kamu.
        </p>
      </div>

      {/* Info Banner — Fitur belum tersedia di backend */}
      <div
        role="status"
        className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-600"
      >
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Fitur Belum Tersedia</p>
          <p>
            Fitur reset password melalui email belum tersedia saat ini.
            Silakan hubungi administrator untuk mereset password kamu.
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="space-y-3 pt-2">
        <Link href="/sign-in">
          <Button
            className="w-full bg-moket-red hover:bg-moket-red-dark text-white font-semibold h-11"
          >
            Kembali ke Halaman Masuk
          </Button>
        </Link>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Ingat passwordmu?{" "}
        <Link href="/sign-in" className="text-moket-red font-medium hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
