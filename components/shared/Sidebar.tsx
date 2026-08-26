"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { QrCode, User, LogOut, Menu, X, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { apiLogout } from "@/lib/api";

const sidebarLinks = [
  { href: "/user/dashboard", label: "Tiket Saya", icon: QrCode },
  { href: "/user/profile", label: "Profil", icon: User },
];

/** Hapus cookie berdasarkan nama */
function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await apiLogout();
    } catch {
      // Ignore API error — tetap lanjutkan logout di sisi client
    } finally {
      // Hapus cookie auth
      deleteCookie("moket_session");
      deleteCookie("moket_role");
      // Redirect ke halaman login
      router.replace("/sign-in");
    }
  }

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center justify-between px-4">
        <Link href="/user/dashboard" className="flex items-center gap-2">
          <Image
            src="/image/foto_tiket.png"
            alt="MokeT Logo"
            width={100}
            height={32}
            className="h-8 w-auto object-contain"
          />
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:sticky top-0 lg:top-0 left-0 z-40 w-64 h-screen bg-card border-r border-border transition-transform duration-300 ease-in-out lg:flex lg:flex-col pt-16 lg:pt-0`}
      >
        {/* Logo */}
        <div className="hidden lg:flex items-center gap-2 p-6 border-b border-border">
          <Link href="/">
            <Image
              src="/image/foto_tiket.png"
              alt="MokeT Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Tombol Beli Tiket */}
        <div className="px-4 pt-5 pb-2">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Button
              className="w-full bg-moket-red hover:bg-moket-red-dark text-white gap-2 font-semibold"
              size="sm"
            >
              <Ticket className="h-4 w-4" />
              Beli Tiket
            </Button>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Menu Peserta
          </p>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-moket-red/10 text-moket-red"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-moket-red" : ""}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? "Keluar..." : "Keluar"}
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
