import { Metadata } from "next";
import { TalentSidebar } from "@/components/shared/TalentSidebar";

export const metadata: Metadata = {
  title: "Dashboard Talent | MokeT",
  description: "Area kerja talent — Jadwal panggung dan sesi mentoring.",
};

export default function TalentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <TalentSidebar />
      <main className="flex-1 min-w-0 flex flex-col mt-16 lg:mt-0">
        <div className="flex-1 p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
