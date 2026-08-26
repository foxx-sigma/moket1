// ============================================================
// MokeT — Proxy (Route Protection)
// ============================================================
// Next.js 16+ menggunakan `proxy.ts` (pengganti `middleware.ts`).
// File ini melindungi route per-role dan mengarahkan user yang
// belum login ke halaman sign-in.
//
// Catatan: Proxy berjalan sebelum route di-render. Gunakan
// hanya untuk redirect/rewrite — jangan taruh business logic
// atau database call di sini.
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cookie name yang diset saat login berhasil
const AUTH_COOKIE = "moket_session";
const ROLE_COOKIE = "moket_role";

// Route yang hanya bisa diakses saat BELUM login
const AUTH_ONLY_PATHS = ["/sign-in", "/sign-up", "/forgot-password"];

// Mapping: prefix path → role yang diizinkan
// Nilai array kosong berarti semua role yang sudah login boleh akses
const PROTECTED_ROUTES: Record<string, string[]> = {
  "/user": ["user"],
  "/sub-org": ["super_admin"], // akan diperluas ke OrgMemberRole saat integrasi
  "/panitia": ["super_admin"], // akan diperluas ke OrgMemberRole scanner
  "/talent": ["talent"],
  "/mentor": ["mentor"],
  "/admin": ["super_admin"],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Baca cookie auth & role
  const session = request.cookies.get(AUTH_COOKIE)?.value;
  const role = request.cookies.get(ROLE_COOKIE)?.value;
  const isLoggedIn = !!session;

  // Jika sudah login dan mencoba akses halaman auth → redirect sesuai role
  if (isLoggedIn && AUTH_ONLY_PATHS.some((p) => pathname.startsWith(p))) {
    const redirectUrl = getPostLoginUrl(role);
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Cek apakah path perlu proteksi
  const protectedEntry = Object.entries(PROTECTED_ROUTES).find(([prefix]) =>
    pathname.startsWith(prefix)
  );

  if (protectedEntry) {
    const allowedRoles = protectedEntry![1];

    // Belum login → redirect ke sign-in dengan next param
    if (!isLoggedIn) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Login tapi role salah → redirect ke halaman yang sesuai
    if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
      const redirectUrl = getPostLoginUrl(role);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  return NextResponse.next();
}

function getPostLoginUrl(role?: string): string {
  switch (role) {
    case "super_admin":
      return "/admin/dashboard";
    case "talent":
      return "/talent/dashboard";
    case "mentor":
      return "/mentor/dashboard";
    case "user":
      // User diarahkan ke landing page setelah login
      return "/";
    default:
      return "/";
  }
}


export const config = {
  matcher: [
    /*
     * Jalankan proxy untuk semua path kecuali:
     * - _next/static (file statis)
     * - _next/image (optimisasi gambar)
     * - favicon.ico, sitemap.xml, robots.txt
     * - file dengan ekstensi (.png, .jpg, .svg, dll)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
