import { Metadata } from "next";
import { SubOrgSidebar } from "@/components/shared/SubOrgSidebar";

export const metadata: Metadata = {
  title: "Panitia Dashboard | MokeT",
  description: "Dashboard pengelolaan event untuk panitia.",
};

export default function SubOrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <SubOrgSidebar />
      <main className="flex-1 min-w-0 flex flex-col mt-16 lg:mt-0">
        <div className="flex-1 p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
