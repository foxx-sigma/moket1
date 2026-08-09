import { Metadata } from "next";
import { AdminSidebar } from "@/components/shared/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Penyelenggara | MokeT",
  description: "Dashboard pengelolaan event untuk admin penyelenggara MokeT.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 flex flex-col mt-16 lg:mt-0">
        <div className="flex-1 p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
