import Link from "next/link";
import { Ticket, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const quickLinks = [
  { href: "/", label: "Beranda" },
  { href: "/events", label: "Event" },
  { href: "/sign-in", label: "Masuk" },
  { href: "/sign-up", label: "Daftar" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-secondary">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/image/foto_tiket.png" 
                alt="MokeT Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Platform ticketing event digital untuk mendukung program Moklet Go
              Global di SMK Telkom Malang.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Tautan Cepat
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-moket-red"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Kontak</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Jl. Danau Ranau, Sawojajar, Malang, Jawa Timur
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">
                  info@moket.id
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">
                  (0341) 123456
                </span>
              </div>
            </div>
          </div>

          {/* Social / Moklet Go Global */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Moklet Go Global
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Program unggulan SMK Telkom Malang untuk mengembangkan kompetensi
              siswa di kancah global.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} MokeT — SMK Telkom Malang. Hak cipta
            dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-moket-red"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-moket-red"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
