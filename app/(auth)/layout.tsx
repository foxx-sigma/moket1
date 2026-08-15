import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "MokeT | SMK Telkom Malang",
    template: "%s | MokeT",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      {/* Tombol Back ke Home — pojok kiri atas */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali ke Beranda
        </Link>
      </div>

      {/* Form container — di tengah halaman */}
      <div className="w-full max-w-md flex flex-col gap-8 py-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-fit mx-auto">
          <span className="font-bold text-lg text-foreground">
            Moke<span className="text-moket-red">T</span>
          </span>
        </Link>

        {/* Konten form — diserahkan ke page masing-masing */}
        <main>{children}</main>

        {/* Footer mini */}
        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} MokeT — SMK Telkom Malang. Semua hak dilindungi.
        </p>
      </div>
    </div>
  );
}
