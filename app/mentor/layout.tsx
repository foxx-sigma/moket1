import { Metadata } from "next";
import { MentorSidebar } from "@/components/shared/MentorSidebar";

export const metadata: Metadata = {
  title: "Dashboard Mentor | MokeT",
  description: "Area kerja mentor — Sesi mentoring dan evaluasi talent.",
};

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <MentorSidebar />
      <main className="flex-1 min-w-0 flex flex-col mt-16 lg:mt-0">
        <div className="flex-1 p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
