import { mockOrganizations } from "@/lib/mock/data";

export function SubOrgGrid() {
  return (
    <section className="w-full py-20 bg-secondary">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Penyelenggara
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Organisasi siswa yang menggelar event di SMK Telkom Malang
          </p>
        </div>

        {/* Org Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {mockOrganizations.map((org) => (
            <div
              key={org.id}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:border-moket-red/30 hover:shadow-md"
            >
              {/* Logo Placeholder */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moket-navy/10">
                <span className="text-xl font-bold text-moket-navy">
                  {org.name.charAt(0)}
                </span>
              </div>

              {/* Name */}
              <p className="text-xs font-medium text-foreground text-center leading-tight">
                {org.name}
              </p>

              {/* Slug */}
              <p className="text-xs text-muted-foreground">
                @{org.slug}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
