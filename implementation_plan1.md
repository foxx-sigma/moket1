# MokeT Frontend — Implementation Plan

Platform ticketing event berbasis web untuk SMK Telkom Malang (program Moklet Go Global). Frontend ini mengkonsumsi API dari backend Laravel dan menyediakan UI untuk 5 role pengguna: User, Sub-Organisasi, Panitia Gate, Talent/Mentor, dan Admin.

---

## Analisis Dokumen

### Dari PRD.md
- **5 user roles** dengan kebutuhan UI yang sangat berbeda (peserta, PIC sub-org, panitia gate, talent/mentor, admin)
- **Tech stack** sudah ditentukan: Next.js + Tailwind CSS + ShadCN UI + Lenis + GSAP
- **4 prioritas fungsional**: Purchase Flow > QR Scanner > Homepage/Discovery > User Dashboard
- **Design system**: Merah `#D81B28`, Oranye `#FF6A1C`, Navy `#1A2247`, font Poppins
- **Standar tabel data**: Search, Filter Chips, Clear Filters, Export CSV, Pagination + 3 state (Loading/Empty/Error)

### Dari Design Brief
- **20+ layar unik** yang harus dibangun, dikelompokkan dalam 7 area (A-G)
- **Alur pembelian** adalah inti bisnis — stepper 4 tahap dengan validasi real-time kuota & countdown
- **QR Scanner** harus mobile-first, digunakan dalam kondisi ekstrem (satu tangan, antrean, cahaya variatif)
- **E-Ticket** harus menyerupai tiket fisik dengan notch dan QR kontras tinggi
- **Konsistensi**: semua tabel admin pakai pola yang sama, semua list punya 3 state, aksi destruktif butuh konfirmasi

---

## User Review Required

> [!IMPORTANT]
> **Backend API**: Plan ini mengasumsikan backend Laravel sudah/akan menyediakan REST API. Untuk fase awal development, saya akan menggunakan **mock data** dan **dummy API calls** yang bisa langsung di-swap dengan API asli. Apakah ada dokumentasi API (Swagger/Postman collection) yang sudah tersedia?

> [!IMPORTANT]
> **ShadCN UI**: PRD menyebutkan ShadCN UI. Saya akan meng-install dan mengkonfigurasinya sebagai component library utama. Confirm?

> [!WARNING]
> **Scope eksekusi**: Ini adalah proyek besar (20+ halaman, 5 role). Saya merekomendasikan eksekusi bertahap sesuai prioritas bisnis. Apakah Anda ingin saya eksekusi **semua fase sekaligus**, atau **fase per fase** dengan review di setiap checkpoint?

---

## Open Questions

1. **Autentikasi**: Apakah auth flow menggunakan Laravel Sanctum token-based? Apakah ada endpoint login/register/forgot-password yang sudah siap?
2. **Midtrans Integration**: Apakah pembayaran akan menggunakan Snap popup atau redirect? Saya mengasumsikan Snap (embed di halaman).
3. **Zoom API**: Untuk sesi mentoring, apakah cukup dengan link meeting saja atau butuh embedded Zoom SDK?
4. **Cloudinary**: Apakah upload image langsung dari frontend ke Cloudinary, atau melalui backend?
5. **Google OAuth**: Apakah OAuth flow di-handle backend (redirect) atau frontend (Google Sign-In SDK)?
6. **Multi-bahasa**: Design brief menyebut bahasa UI Indonesia. Apakah perlu i18n support untuk English juga, atau murni Indonesia?

---

## Arsitektur Proyek

### Tech Stack (Confirmed)
| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.11 |
| Styling | Tailwind CSS | v4 |
| Components | ShadCN UI | Latest |
| Animation | GSAP + Lenis | Halaman publik saja |
| Font | Poppins (Google Fonts) | Via `next/font/google` |
| Language | TypeScript | ^5 |

### Routing Strategy: Hybrid Approach

Proyek MokeT menggunakan pendekatan routing **Hybrid**:
- **Halaman Publik (Route Groups)**: Menggunakan folder dengan kurung seperti `app/(public)/` agar URL tetap bersih di root (misal: `/` atau `/events`), sehingga ramah SEO dan mudah diingat pengunjung.
- **Halaman Dasbor Terautentikasi (Explicit Prefix)**: Menggunakan nama folder eksplisit seperti `app/user/`, `app/sub-org/`, dan `app/admin/`. Hal ini memberikan struktur URL yang jelas, mencegah bentrok rute (route collision), sinkron dengan endpoint API backend, dan memudahkan proteksi di level Middleware.

#### Contoh Implementasi `middleware.ts`
Dengan prefix eksplisit, proteksi rute menjadi sangat sederhana menggunakan pencocokan path (`:path*`):

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userRole = request.cookies.get('role')?.value; // e.g., 'user', 'sub-org', 'admin'
  const path = request.nextUrl.pathname;

  // Jika belum login dan mencoba akses area terproteksi
  if (!token && (path.startsWith('/user') || path.startsWith('/sub-org') || path.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Proteksi berdasarkan Role
  if (path.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  if (path.startsWith('/sub-org') && userRole !== 'sub_org') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  if (path.startsWith('/user') && userRole !== 'user') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/sub-org/:path*', '/admin/:path*'],
}
```

### Folder Structure

```
app/
├── (public)/                     # Route group: halaman publik (dengan animasi)
│   ├── layout.tsx                # Public layout (Navbar + Footer + Lenis)
│   ├── page.tsx                  # Homepage
│   ├── events/
│   │   ├── page.tsx              # Event Discovery
│   │   └── [slug]/
│   │       ├── page.tsx          # Detail Event
│   │       └── purchase/
│   │           └── page.tsx      # Purchase Flow (stepper)
│   └── payment/
│       └── [orderId]/
│           └── page.tsx          # Status Pembayaran
│
├── (auth)/                       # Route group: halaman auth
│   ├── layout.tsx                # Auth layout (2 kolom: form + visual)
│   ├── sign-in/page.tsx
│   ├── sign-up/page.tsx
│   └── forgot-password/page.tsx
│
├── user/                         # Hybrid: Dasbor pembeli tiket
│   ├── layout.tsx                # Dashboard layout (sidebar + content)
│   ├── dashboard/page.tsx        # User Dashboard
│   ├── my-tickets/
│   │   ├── page.tsx              # My Tickets (list)
│   │   └── [ticketId]/page.tsx   # Detail E-Ticket
│   ├── transactions/page.tsx     # Riwayat Transaksi
│   ├── onboarding/page.tsx       # Onboarding Form
│   └── profile/page.tsx          # Profil User
│
├── sub-org/                      # Hybrid: Dasbor panitia
│   ├── layout.tsx                # Sub-org layout (sidebar khusus)
│   ├── dashboard/page.tsx
│   ├── events/
│   │   ├── page.tsx              # Manajemen Event (tabel)
│   │   ├── create/page.tsx       # Form Tambah Event
│   │   └── [eventId]/
│   │       ├── edit/page.tsx     # Form Edit Event
│   │       ├── tickets/page.tsx  # Manajemen Tiket per Event
│   │       ├── timeline/page.tsx # Timeline Tracking
│   │       └── participants/page.tsx # Daftar Peserta
│   └── scanner/page.tsx          # Check-in QR Scanner
│
├── talent/                       # Hybrid: Area talent & mentor
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── schedule/page.tsx         # Penjadwalan
│   └── mentoring/page.tsx        # Sesi Mentoring (Zoom)
│
├── admin/                        # Hybrid: Area admin sekolah
│   ├── layout.tsx                # Admin layout
│   ├── dashboard/page.tsx
│   ├── users/page.tsx            # Users Management
│   └── activity/page.tsx         # Activity Monitoring
│
├── layout.tsx                    # Root layout (html, body, font, metadata)
├── globals.css                   # Global styles + design tokens
├── not-found.tsx                 # 404 page
└── error.tsx                     # Global error boundary

components/
├── ui/                           # ShadCN UI components (auto-generated)
├── shared/                       # Shared custom components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── DataTable.tsx             # Reusable data table (search, filter, pagination, export)
│   ├── ConfirmDialog.tsx         # Dialog konfirmasi aksi destruktif
│   ├── StatusBadge.tsx           # Badge status (Upcoming, Sold Out, dll)
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   └── SkeletonLoader.tsx
├── tickets/                      # Ticket-specific components
│   ├── TicketCard.tsx            # Kartu tiket bergaya fisik (notch)
│   ├── TicketStepper.tsx         # Stepper 4 tahap purchase flow
│   ├── QRCode.tsx                # QR Code display (kontras tinggi)
│   └── CountdownTimer.tsx        # Countdown expired time
├── events/                       # Event-specific components
│   ├── EventCard.tsx             # Card event di discovery
│   ├── EventFilter.tsx           # Panel filter
│   └── TimelineTracker.tsx       # Timeline visual milestone
├── scanner/                      # Scanner components
│   ├── QRScanner.tsx             # Camera scanner
│   ├── ScanResult.tsx            # Hasil scan (4 state)
│   └── ManualInput.tsx           # Input manual kode tiket
└── homepage/                     # Homepage sections
    ├── HeroSection.tsx
    ├── FeaturedEvents.tsx
    ├── SubOrgGrid.tsx
    ├── TalentHighlight.tsx
    ├── HowItWorks.tsx
    ├── Testimonials.tsx
    └── CTASection.tsx

lib/
├── api/                          # API client functions
│   ├── client.ts                 # Base API client (fetch wrapper + auth headers)
│   ├── events.ts
│   ├── tickets.ts
│   ├── auth.ts
│   ├── users.ts
│   └── scanner.ts
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useCountdown.ts
│   └── useScanner.ts
├── types/                        # TypeScript type definitions
│   ├── event.ts
│   ├── ticket.ts
│   ├── user.ts
│   └── api.ts
├── utils/                        # Utility functions
│   ├── formatters.ts             # Tanggal, harga, dll
│   └── validators.ts
├── constants/                    # Constants
│   └── index.ts
└── mock/                         # Mock data untuk development
    ├── events.ts
    ├── tickets.ts
    └── users.ts
```

---

## Proposed Changes — Phased Execution

### Phase 0: Foundation & Design System
> Setup project infrastructure, design tokens, dan reusable components.

#### [MODIFY] [layout.tsx](file:///c:/Penting/MOKLET/Project/MokeT/FE/moket/app/layout.tsx)
- Ganti font dari Geist ke **Poppins** via `next/font/google`
- Update metadata (title: "MokeT — Ticketing Event", description, lang: "id")
- Setup CSS variables untuk design tokens

#### [MODIFY] [globals.css](file:///c:/Penting/MOKLET/Project/MokeT/FE/moket/app/globals.css)
- Define design tokens: warna MokeT (`--primary: #D81B28`, `--accent: #FF6A1C`, `--text: #1A2247`)
- Setup Tailwind CSS v4 `@theme` dengan custom colors, spacing, dan breakpoints
- Base styles, scrollbar styling, `prefers-reduced-motion` support

#### [NEW] `components/ui/*` — ShadCN UI components
- Install ShadCN UI dan generate base components: Button, Input, Dialog, Select, Badge, Card, Table, Tabs, Skeleton, Toast, Dropdown, Sheet, Separator

#### [NEW] `components/shared/*` — Shared components
- `Navbar.tsx` — Responsive navbar dengan logo MokeT, navigasi, dan auth button
- `Footer.tsx` — Footer dengan links, social media, dan branding
- `Sidebar.tsx` — Sidebar untuk dashboard areas (collapsible, responsive)
- `DataTable.tsx` — Reusable tabel dengan search, filter chips, clear, export CSV, pagination, 3 state
- `StatusBadge.tsx` — Badge untuk Upcoming/On Going/Sold Out/Closed/dll
- `ConfirmDialog.tsx` — Dialog konfirmasi dengan danger styling
- `EmptyState.tsx`, `ErrorState.tsx`, `SkeletonLoader.tsx`

#### [NEW] `lib/types/*` — TypeScript types
- Definisi semua interface: Event, Ticket, User, Transaction, ScanResult, dll

#### [NEW] `lib/api/client.ts` — API client
- Fetch wrapper dengan base URL, auth header injection, error handling

#### [NEW] `lib/mock/*` — Mock data
- Data dummy untuk semua entity (events, tickets, users)

---

### Phase 1: Alur Pembelian Tiket (Prioritas 1)
> Core business flow — paling kritis.

#### [NEW] `app/(public)/events/[slug]/purchase/page.tsx`
- **Stepper 4 tahap**: Pilih Tiket → Data Peserta → Pembayaran → Selesai
- Step 1: Kartu tiket dengan nama, harga, benefit, sisa kuota real-time, countdown expired
- Step 2: Form data peserta (pre-filled dari profil), validasi
- Step 3: Order summary + checkbox non-refundable (wajib visible, bukan hidden) + Midtrans Snap
- Step 4: Konfirmasi & redirect ke status pembayaran

#### [NEW] `app/(public)/payment/[orderId]/page.tsx`
- 4 tampilan status: **Pending** (instruksi pembayaran), **Success** (CTA ke dashboard), **Failed**, **Expired**
- Auto-refresh status via polling atau webhook callback

#### [NEW] `components/tickets/TicketStepper.tsx`
- Stepper visual dengan progress indicator

#### [NEW] `components/tickets/TicketCard.tsx`
- Kartu seleksi tiket dengan kuota, countdown, badge Sold Out

#### [NEW] `components/tickets/CountdownTimer.tsx`
- Countdown real-time untuk expired time tiket

---

### Phase 2: Check-in QR Scanner (Prioritas 2)
> Mobile-first, kondisi ekstrem.

#### [NEW] `app/(sub-org)/scanner/page.tsx`
- Area kamera besar di tengah (80%+ viewport mobile)
- Frame pemindaian dengan guide overlay
- Panel hasil di bawah kamera

#### [NEW] `components/scanner/QRScanner.tsx`
- Integrasi camera API via `html5-qrcode` atau `@zxing/browser`
- Auto-focus, torch toggle (jika available)

#### [NEW] `components/scanner/ScanResult.tsx`
- 4 state dengan warna berbeda:
  - ✅ **Valid** (hijau) — tampilkan nama, jenis tiket, waktu check-in
  - ⚠️ **Sudah Digunakan** (kuning) — tampilkan waktu check-in sebelumnya
  - ❌ **Tidak Valid** (merah)
  - 🚫 **Bukan Event Ini** (abu-abu)
- Feedback instan tanpa reload

#### [NEW] `components/scanner/ManualInput.tsx`
- Input manual kode tiket sebagai fallback
- Counter real-time: sudah masuk / total terjual
- Riwayat scan sesi berjalan

---

### Phase 3: Homepage & Event Discovery (Prioritas 3)
> Gerbang konversi utama.

#### [NEW] `app/(public)/layout.tsx`
- Layout publik: Navbar + Footer
- Integrasi Lenis (smooth scroll) — **hanya di halaman publik**
- GSAP scroll reveal animations
- `prefers-reduced-motion` check

#### [NEW] `app/(public)/page.tsx` — Homepage
- Section order: Hero → Featured Events → Sub-Org Grid → Talent → How It Works → Testimonials → Footer CTA
- GSAP reveal animations per section
- Responsive design (3 breakpoints)

#### [NEW] `app/(public)/events/page.tsx` — Event Discovery
- Grid card responsif (poster, nama, tanggal, lokasi, harga mulai)
- Panel filter kiri (kategori, sub-org, tanggal, scope internal/external)
- Search bar atas + sorting (terbaru/terdekat/harga)
- Badge status: Upcoming, On Going, Sold Out, Closed
- Skeleton loading + empty state + pagination

#### [NEW] `app/(public)/events/[slug]/page.tsx` — Detail Event
- Deskripsi, timeline/rundown, lokasi & waktu, S&K
- Daftar tiket tersedia dengan status kuota
- CTA beli tiket (disabled saat Sold Out/Closed)

#### [NEW] Homepage section components (`components/homepage/*`)
- Semua section sebagai komponen terpisah untuk maintainability

---

### Phase 4: Auth & User Dashboard (Prioritas 4)

#### [NEW] `app/(auth)/layout.tsx`
- Layout 2 kolom: form kiri, panel visual event kanan

#### [NEW] Auth pages: `sign-in`, `sign-up`, `forgot-password`
- Validasi realtime, toggle show/hide password
- Google OAuth button
- Checkbox Terms (sign-up)

#### [NEW] `app/(dashboard)/layout.tsx`
- Sidebar kiri + konten kanan
- Responsive: sidebar collapse di mobile

#### [NEW] Dashboard pages
- **Dashboard** — Summary cards (tiket aktif, event mendatang, transaksi) + reminder
- **My Tickets** — Grouped: Aktif/Terpakai/Expired, kartu bergaya tiket fisik (notch)
- **E-Ticket Detail** — QR besar kontras tinggi, info event, opsi download
- **Transactions** — Daftar + status + detail rincian
- **Onboarding** — Form wajib setelah login pertama
- **Profile** — Kartu identitas + form edit + upload foto + ubah password

---

### Phase 5: Area Sub-Organisasi & Talent

#### [NEW] `app/(sub-org)/layout.tsx` + pages
- **Dashboard** — Cards: total event, tiket terjual, peserta, pendapatan + filter periode
- **Event Management** — Tabel standar + form CRUD + upload poster + publish/unpublish
- **Ticket Management** — Per event: jenis tiket, harga, kuota, expired. Warning saat kuota < terjual
- **Timeline Tracking** — Milestone visual (persiapan → open → close → hari-H → evaluasi)
- **Participant List** — Tabel + status check-in + export CSV

#### [NEW] `app/(talent)/layout.tsx` + pages
- **Dashboard** — Jadwal tampil, event aktif
- **Schedule** — Kalender/timeline, peringatan bentrok, status (Draft/Scheduled/Ready/Performed)
- **Mentoring** — List sesi, tombol Join Meeting (Zoom link), sesi lampau

---

### Phase 6: Area Admin

#### [NEW] `app/(admin)/layout.tsx` + pages
- **Dashboard** — Metric cards + filter periode + grafik (penjualan tiket, distribusi peserta, event aktif, status pembayaran)
- **Users Management** — Tabel standar, pengaturan role & status akun (Active/Inactive/Banned)
- **Activity Monitoring** — Grafik aktivitas harian + tabel log + filter + export CSV

---

## Verification Plan

### Automated Tests
```bash
# Build check — memastikan tidak ada TypeScript errors
npm run build

# Lint check
npm run lint
```

### Manual Verification
- **Responsive check**: Setiap halaman diuji di 3 breakpoint (mobile 375px, tablet 768px, desktop 1440px)
- **Scanner & E-Ticket**: Wajib diuji di mobile device fisik
- **Accessibility**: `prefers-reduced-motion` diverifikasi — animasi harus mati saat preference aktif
- **Browser check**: Dev server `npm run dev` dan navigasi semua route
- **Component consistency**: Semua tabel mengikuti pola DataTable, semua list punya 3 state

### Per-Phase Checkpoint
Setiap fase selesai → `npm run build` + visual review di browser → lanjut fase berikutnya.
