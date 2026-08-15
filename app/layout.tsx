import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MokeT — Platform Ticketing Event SMK Telkom Malang",
    template: "%s | MokeT",
  },
  description:
    "Platform ticketing event digital untuk mendukung program Moklet Go Global. Temukan event, beli tiket, dan dapatkan e-ticket QR secara instan.",
  keywords: [
    "MokeT",
    "ticketing",
    "event",
    "SMK Telkom Malang",
    "Moklet Go Global",
    "e-ticket",
    "QR code",
  ],
  icons: {
    icon: "/foto_tiket.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
