"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiLogin, apiLoginWithGoogle, type ApiError } from "@/lib/api";
import { useGoogleSignIn } from "@/lib/hooks/useGoogleSignIn";

// Helper: simpan cookie sederhana di browser (HttpOnly tidak bisa diset FE)
// Cookie ini dibaca oleh proxy.ts untuk route protection.
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getPostLoginUrl(role: string): string {
  switch (role) {
    case "super_admin":
      return "/admin/dashboard";
    case "talent":
      return "/talent/dashboard";
    case "mentor":
      return "/mentor/dashboard";
    case "user":
      // User diarahkan ke landing page agar bisa memilih event/tiket
      return "/";
    default:
      return "/";
  }
}

// --------------------------------------------------------
// Inner component — menggunakan useSearchParams, perlu Suspense
// --------------------------------------------------------
function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn: googleSignIn, isLoading: isGoogleLoading } = useGoogleSignIn();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiLogin({ email, password });

      // Simpan session token & role ke cookie agar proxy.ts bisa membacanya
      setCookie("moket_session", res.token);
      setCookie("moket_role", res.user.role);

      // Redirect ke halaman sebelumnya atau URL sesuai role
      const next = searchParams.get("next");
      const destination = next ?? getPostLoginUrl(res.user.role);
      router.replace(destination);
    } catch (err) {
      const apiErr = err as ApiError;

      // Ambil pesan validasi pertama dari Laravel jika ada
      if (apiErr.errors) {
        const firstField = Object.values(apiErr.errors)[0];
        setError(firstField?.[0] ?? apiErr.message);
      } else {
        setError(apiErr.message ?? "Login gagal. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    googleSignIn(
      async (idToken) => {
        try {
          const res = await apiLoginWithGoogle(idToken);
          setCookie("moket_session", res.token);
          setCookie("moket_role", res.user.role);
          const next = searchParams.get("next");
          const destination = next ?? getPostLoginUrl(res.user.role);
          router.replace(destination);
        } catch (err) {
          const apiErr = err as ApiError;
          if (apiErr.errors) {
            const firstField = Object.values(apiErr.errors)[0];
            setError(firstField?.[0] ?? apiErr.message);
          } else {
            setError(apiErr.message ?? "Login Google gagal. Silakan coba lagi.");
          }
        }
      },
      (msg) => setError(msg),
      "signin"
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Masuk ke MokeT</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Selamat datang kembali! Masuk untuk lanjut ke dashboardmu.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Sukses Registrasi */}
        {justRegistered && (
          <div
            role="status"
            className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-600"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Akun berhasil dibuat! Silakan masuk.</span>
          </div>
        )}

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
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="kamu@smktelkom-mlg.sch.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="signin-password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-moket-red hover:underline"
            >
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          id="signin-submit"
          type="submit"
          className="w-full bg-moket-red hover:bg-moket-red-dark text-white font-semibold h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            "Masuk"
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs text-muted-foreground">
            <span className="bg-background px-2">atau</span>
          </div>
        </div>

        {/* Google OAuth */}
        <Button
          id="signin-google"
          type="button"
          variant="outline"
          className="w-full h-11 gap-2"
          disabled={isLoading || isGoogleLoading}
          onClick={handleGoogleSignIn}
        >
          {isGoogleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          {isGoogleLoading ? "Menghubungkan..." : "Masuk dengan Google"}
        </Button>
      </form>

      {/* Link ke Sign Up */}
      <p className="text-sm text-center text-muted-foreground">
        Belum punya akun?{" "}
        <Link href="/sign-up" className="text-moket-red font-medium hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}

// --------------------------------------------------------
// Page export — wajib bungkus dalam Suspense karena
// SignInForm menggunakan useSearchParams (Next.js 16)
// --------------------------------------------------------
export default function SignInPage() {
  return (
    <Suspense fallback={<div className="w-full h-64 animate-pulse rounded-lg bg-muted" />}>
      <SignInForm />
    </Suspense>
  );
}
