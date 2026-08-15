import { Metadata } from "next";
import { PanitiaSidebar } from "@/components/shared/PanitiaSidebar";

export const metadata: Metadata = {
  title: "Dashboard Panitia | MokeT",
  description: "Area kerja panitia — QR Scanner dan koordinasi.",
  icons: {
    icon: "/foto_tiket.svg",
  },
};

export default function PanitiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <PanitiaSidebar />
      <main className="flex-1 min-w-0 flex flex-col mt-16 lg:mt-0">
        <div className="flex-1 p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
