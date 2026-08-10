import { SubOrgSidebar } from "@/components/shared/SubOrgSidebar";

export default function SubOrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <SubOrgSidebar />
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 min-w-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
