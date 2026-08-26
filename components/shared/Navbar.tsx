"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Ticket, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/events", label: "Event" },
];

/** Baca cookie moket_session dari browser (client-side only) */
function getSessionCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)moket_session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Deteksi status login dari cookie
    setIsLoggedIn(!!getSessionCookie());
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/image/foto_tiket.png" 
              alt="MokeT Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              /* Sudah login: tampilkan tombol Dashboard */
              <Link href="/user/dashboard">
                <Button
                  size="sm"
                  className="bg-moket-red hover:bg-moket-red-dark text-white gap-1.5"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              /* Belum login: tampilkan Masuk & Daftar */
              <>
                <Link href="/sign-in">
                  <Button variant="outline" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-moket-red hover:bg-moket-red-dark text-white"
                  >
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 pt-6">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 px-2">
                  <Image 
                    src="/image/foto_tiket.png" 
                    alt="MokeT Logo" 
                    width={120} 
                    height={40} 
                    className="h-10 w-auto object-contain" 
                  />
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-2 px-2">
                  {isLoggedIn ? (
                    <Link href="/user/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-moket-red hover:bg-moket-red-dark text-white gap-1.5">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard Saya
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Masuk
                        </Button>
                      </Link>
                      <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-moket-red hover:bg-moket-red-dark text-white">
                          Daftar
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
