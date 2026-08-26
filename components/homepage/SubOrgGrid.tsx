"use client";

import { useEffect, useState } from "react";
import { apiSubOrganizations, type SubOrganization } from "@/lib/api";

// Skeleton saat loading
function OrgSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 animate-pulse">
      <div className="h-16 w-16 rounded-full bg-muted" />
      <div className="h-3 w-20 rounded bg-muted" />
      <div className="h-3 w-12 rounded bg-muted" />
    </div>
  );
}

export function SubOrgGrid() {
  const [orgs, setOrgs] = useState<SubOrganization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    apiSubOrganizations()
      .then((data) => {
        if (!cancelled) {
          setOrgs(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[SubOrgGrid] Gagal fetch:", err);
          setError("Gagal memuat data penyelenggara.");
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <OrgSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>{error}</p>
          </div>
        ) : orgs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Belum ada penyelenggara yang terdaftar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {orgs.map((org) => (
              <div
                key={org.id}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:border-moket-red/30 hover:shadow-md"
              >
                {/* Logo Placeholder */}
                {org.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={org.logoUrl}
                    alt={org.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moket-navy/10">
                    <span className="text-xl font-bold text-moket-navy">
                      {org.name.charAt(0)}
                    </span>
                  </div>
                )}

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
        )}
      </div>
    </section>
  );
}
