"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRegister, apiLoginWithGoogle, type ApiError } from "@/lib/api";
import { useGoogleSignIn } from "@/lib/hooks/useGoogleSignIn";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Lemah", color: "bg-red-500" };
  if (score === 2) return { score, label: "Sedang", color: "bg-amber-500" };
  if (score === 3) return { score, label: "Kuat", color: "bg-blue-500" };
  return { score, label: "Sangat Kuat", color: "bg-green-500" };
}

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn: googleSignIn, isLoading: isGoogleLoading } = useGoogleSignIn();

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (!agreedToTerms) {
      setError("Kamu harus menyetujui syarat dan ketentuan.");
      return;
    }

    setIsLoading(true);
    try {
      await apiRegister({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      // Setelah berhasil, arahkan ke sign-in dengan pesan sukses
      router.replace("/sign-in?registered=1");
    } catch (err) {
      const apiErr = err as ApiError;

      if (apiErr.errors) {
        const firstField = Object.values(apiErr.errors)[0];
        setError(firstField?.[0] ?? apiErr.message);
      } else {
        setError(apiErr.message ?? "Registrasi gagal. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Helper untuk simpan cookie (sama seperti sign-in)
  function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }

  function handleGoogleSignUp() {
    setError(null);
    googleSignIn(
      async (idToken) => {
        try {
          const res = await apiLoginWithGoogle(idToken);
          setCookie("moket_session", res.token);
          setCookie("moket_role", res.user.role);
          // Redirect ke landing page setelah daftar/masuk via Google
          router.replace("/");
        } catch (err) {
          const apiErr = err as ApiError;
          if (apiErr.errors) {
            const firstField = Object.values(apiErr.errors)[0];
            setError(firstField?.[0] ?? apiErr.message);
          } else {
            setError(apiErr.message ?? "Daftar dengan Google gagal. Silakan coba lagi.");
          }
        }
      },
      (msg) => setError(msg),
      "signup"
    );
  }


  return (
    <div className="w-full space-y-7">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Buat Akun MokeT</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Daftar gratis dan mulai beli tiket event favoritmu.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

        {/* Nama */}
        <div className="space-y-1.5">
          <Label htmlFor="signup-name">Nama Lengkap</Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="Nama kamu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
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
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {/* Password strength indicator */}
          {password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      bar <= passwordStrength.score
                        ? passwordStrength.color
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{passwordStrength.label}</p>
            </div>
          )}
        </div>

        {/* Konfirmasi Password */}
        <div className="space-y-1.5">
          <Label htmlFor="signup-confirm-password">Konfirmasi Password</Label>
          <div className="relative">
            <Input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              disabled={isLoading}
              className={`pr-10 ${
                passwordsMismatch ? "border-red-500 focus-visible:ring-red-500" : ""
              } ${passwordsMatch ? "border-green-500" : ""}`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {passwordsMatch && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {passwordsMismatch && (
            <p className="text-xs text-red-600">Password tidak cocok.</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 pt-1">
          <Checkbox
            id="signup-terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            disabled={isLoading}
            className="mt-0.5 shrink-0"
          />
          <label htmlFor="signup-terms" className="text-sm font-normal cursor-pointer leading-relaxed text-foreground">
            Saya menyetujui{" "}
            <Link href="/terms" className="text-moket-red hover:underline font-medium" target="_blank">Syarat &amp; Ketentuan</Link>
            {" "}dan{" "}
            <Link href="/privacy" className="text-moket-red hover:underline font-medium" target="_blank">Kebijakan Privasi</Link>
            {" "}MokeT.
          </label>
        </div>

        {/* Submit */}
        <Button
          id="signup-submit"
          type="submit"
          className="w-full bg-moket-red hover:bg-moket-red-dark text-white font-semibold h-11"
          disabled={isLoading || !agreedToTerms}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Membuat akun...
            </>
          ) : (
            "Buat Akun"
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
          id="signup-google"
          type="button"
          variant="outline"
          className="w-full h-11 gap-2"
          disabled={isLoading || isGoogleLoading}
          onClick={handleGoogleSignUp}
        >
          {isGoogleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          )}
          {isGoogleLoading ? "Menghubungkan..." : "Daftar dengan Google"}
        </Button>
      </form>

      {/* Link ke Sign In */}
      <p className="text-sm text-center text-muted-foreground">
        Sudah punya akun?{" "}
        <Link href="/sign-in" className="text-moket-red font-medium hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
