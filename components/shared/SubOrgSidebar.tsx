"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  CalendarDays, 
  ScanLine, 
  LogOut, 
  Menu,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/sub-org/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sub-org/events", label: "Manajemen Event", icon: CalendarDays },
  { href: "/sub-org/scanner", label: "QR Scanner", icon: ScanLine },
];

export function SubOrgSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center justify-between px-4">
        <Link href="/sub-org/dashboard" className="flex items-center gap-2">
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

      {/* Sidebar Content */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:sticky top-0 lg:top-0 left-0 z-40 w-64 h-screen bg-card border-r border-border transition-transform duration-300 ease-in-out lg:flex lg:flex-col pt-16 lg:pt-0`}
      >
        <div className="hidden lg:flex items-center gap-2 p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/image/foto_tiket.png" 
              alt="MokeT Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto object-contain" 
            />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Menu Panitia
            </p>
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-moket-orange/10 text-moket-orange-dark"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-moket-orange-dark" : ""}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
