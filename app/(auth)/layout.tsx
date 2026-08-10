import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Masuk | MokeT",
    template: "%s | MokeT",
  },
};

// Panel kanan: daftar event/benefit yang ditampilkan bergantian
const highlights = [
  {
    id: 1,
    tag: "Event Terbaru",
    title: "Moklet Fest 2026",
    subtitle: "15 September 2026 • Aula Utama SMK Telkom Malang",
    gradient: "from-moket-red to-rose-700",
  },
  {
    id: 2,
    tag: "Coming Soon",
    title: "Tech Talk: AI & Future",
    subtitle: "22 September 2026 • Lab Komputer Gedung C",
    gradient: "from-slate-700 to-slate-900",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Kiri — Form */}
      <div className="flex-1 flex flex-col justify-between px-6 py-8 sm:px-10 lg:px-16 xl:px-24 max-w-xl w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="h-8 w-8 rounded-lg bg-moket-red flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg text-foreground">
            Moke<span className="text-moket-red">T</span>
          </span>
        </Link>

        {/* Konten form — diserahkan ke page masing-masing */}
        <main className="flex-1 flex flex-col justify-center py-10">
          {children}
        </main>

        {/* Footer mini */}
        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} MokeT — SMK Telkom Malang. Semua hak dilindungi.
        </p>
      </div>

      {/* Kanan — Panel Visual (hanya tampil di layar besar) */}
      <div className="hidden lg:flex flex-1 relative bg-foreground overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-moket-red/20" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col justify-center items-start p-12 xl:p-16 w-full">
          <div className="max-w-md w-full space-y-8">
            <div>
              <p className="text-moket-red font-semibold text-sm tracking-wider uppercase mb-3">
                Platform Ticketing Event
              </p>
              <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
                Temukan event seru,
                <br />
                beli tiket, masuk gate.
              </h2>
              <p className="mt-4 text-white/60 text-sm leading-relaxed">
                MokeT menghadirkan pengalaman ticketing digital untuk seluruh
                kegiatan sub-organisasi di SMK Telkom Malang.
              </p>
            </div>

            {/* Event highlight cards */}
            <div className="space-y-3">
              {highlights.map((h) => (
                <div
                  key={h.id}
                  className={`bg-gradient-to-r ${h.gradient} rounded-xl p-4 border border-white/10`}
                >
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                    {h.tag}
                  </span>
                  <p className="text-white font-semibold mt-1">{h.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{h.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 border-t border-white/10">
              {[
                { label: "Event Digelar", value: "14+" },
                { label: "Tiket Terjual", value: "3.2Rb+" },
                { label: "Pengguna", value: "1.8Rb+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white font-bold text-xl">{stat.value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
