# 🎫 MokeT — Platform Ticketing Event SMK Telkom Malang

> **MokeT** adalah platform ticketing event berbasis web yang mendukung program **Moklet Go Global** di SMK Telkom Malang. Sistem ini mendigitalkan dan mengotomatisasi seluruh proses ticketing — mulai dari pendaftaran, manajemen kuota, validasi e-ticket QR, hingga pelacakan timeline dan sesi mentoring talent.

---

## 📋 Daftar Isi

- [Gambaran Umum](#-gambaran-umum)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [User Roles](#-user-roles)
- [Fitur per Role](#-fitur-per-role)
- [Cara Kerja Sistem](#-cara-kerja-sistem)
- [Desain Sistem](#-desain-sistem)
- [Database](#-database)
- [Memulai Pengembangan](#-memulai-pengembangan)

---

## 🌐 Gambaran Umum

**Alur inti MokeT:**

```
Temukan Event → Pilih Tiket → Bayar via Midtrans → Dapat E-Ticket QR → Check-in Scan di Gate
```

Event diselenggarakan oleh **sub-organisasi siswa**, dapat diikuti oleh peserta **internal** (siswa) maupun **eksternal** (umum). Tiket bersifat _refundable_ dengan potongan 15%.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Komponen UI** | ShadCN UI + Base UI |
| **Animasi** | GSAP + Lenis (halaman publik) |
| **QR Code** | `html5-qrcode` (scanner) · `qrcode.react` (generator) |
| **Ikon** | Lucide React |
| **Backend** | PHP / Laravel + Sanctum Auth |
| **Database** | PostgreSQL |
| **Payment** | Midtrans (Snap UI) |
| **Video Meeting** | Zoom API |
| **Media Storage** | Cloudinary |
| **Email** | SMTP |
| **Infrastruktur** | Docker + VPS |

---

## 📁 Struktur Proyek

```
moket/
├── app/
│   ├── (auth)/               # Halaman autentikasi (tanpa navbar publik)
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── forgot-password/
│   ├── (public)/             # Halaman publik (dengan navbar & footer)
│   │   ├── page.tsx          # Homepage
│   │   └── events/
│   │       ├── page.tsx      # Event Discovery
│   │       └── [slug]/       # Detail Event + Purchase Flow
│   ├── user/                 # Area peserta (protected)
│   │   ├── dashboard/
│   │   ├── my-tickets/
│   │   ├── transactions/
│   │   ├── onboarding/
│   │   └── profile/
│   ├── sub-org/              # Area sub-organisasi penyelenggara (protected)
│   │   ├── dashboard/
│   │   └── events/
│   │       ├── create/
│   │       └── [id]/
│   │           ├── participants/
│   │           └── timeline/
│   ├── panitia/              # Area panitia gate (protected, mobile-first)
│   │   ├── scanner/
│   │   ├── profile/
│   │   └── zoom/
│   ├── talent/               # Area talent pengisi acara (protected)
│   │   ├── dashboard/
│   │   ├── schedule/
│   │   ├── profile/
│   │   └── zoom/
│   ├── mentor/               # Area mentor (protected)
│   │   ├── dashboard/
│   │   ├── sessions/
│   │   ├── profile/
│   │   └── zoom/
│   └── admin/                # Area admin super (protected)
│       ├── dashboard/
│       ├── events/
│       ├── users/
│       ├── activity/
│       └── profile/
├── components/
│   ├── homepage/             # Komponen khusus halaman utama
│   ├── events/               # Komponen event discovery & detail
│   ├── tickets/              # Komponen e-ticket & purchase flow
│   ├── scanner/              # Komponen QR scanner
│   ├── shared/               # Komponen bersama (Navbar, Footer, dll)
│   └── ui/                   # Komponen primitif ShadCN
├── lib/
│   ├── constants/            # Konstanta aplikasi
│   ├── hooks/                # Custom React hooks
│   ├── i18n/                 # Internasionalisasi (Bahasa Indonesia)
│   ├── mock/                 # Data mock untuk development
│   └── types/                # TypeScript type definitions
└── public/                   # Aset statis
```

---

## 👥 User Roles

MokeT menggunakan **dua lapisan role**:

### Role Global (disimpan di tabel `users`)

| Role | Deskripsi |
|---|---|
| `user` | Peserta/pembeli tiket event |
| `talent` | Pengisi acara (performer, band, MC, dll) |
| `mentor` | Pembimbing talent via sesi Zoom |
| `super_admin` | Administrator platform dengan akses penuh |

### Role Kontekstual (disimpan di tabel `organization_members`)

> Seorang pengguna bisa menjadi _admin_ di organisasi A, sekaligus hanya _scanner_ di organisasi B.

| Role | Deskripsi |
|---|---|
| `admin` | Admin pengelola sub-organisasi |
| `committee` | Panitia umum |
| `ticketing` | Pengelola tiket |
| `scanner` | Panitia gate (check-in) |
| `finance` | Pengelola keuangan |

---

## 🔧 Fitur per Role

### 🌍 Publik (Tanpa Login)

- **Homepage** — Hero section + featured events + daftar sub-organisasi + talent highlight + cara kerja + testimoni
- **Event Discovery** — Grid kartu event responsif dengan filter, search, sorting, dan badge status (`Upcoming`, `On Going`, `Sold Out`, `Closed`)
- **Detail Event** — Deskripsi lengkap, timeline rundown, lokasi, syarat, daftar tiket tersedia

### 🔐 Autentikasi

- **Sign In / Sign Up** — Layout dua kolom (form + panel visual), validasi realtime, toggle password, Google OAuth
- **Forgot Password** — Reset via email SMTP

---

### 👤 User (Peserta)

| Fitur | Deskripsi |
|---|---|
| **Onboarding Form** | Wajib diisi setelah login pertama (nama, telepon, asal sekolah, kelas, kategori). Tidak bisa dilewati. |
| **Dashboard** | Summary card (tiket aktif, event mendatang, total transaksi) + reminder event terdekat |
| **Purchase Flow** | Stepper 4 tahap: Pilih Tiket → Data Peserta → Pembayaran → Selesai |
| **My Tickets** | Tiket dikelompokkan: Aktif / Terpakai / Expired. Tampilan gaya tiket fisik (dengan notch) |
| **E-Ticket Detail** | QR Code besar + kontras tinggi (siap dipindai di lapangan), info event lengkap, opsi unduh |
| **Riwayat Transaksi** | Daftar semua transaksi dengan status pembayaran dan rincian |
| **Profil** | Upload foto, edit data diri, ubah password |

---

### 🏢 Sub-Organisasi (PIC Penyelenggara)

| Fitur | Deskripsi |
|---|---|
| **Dashboard** | Ringkasan: total event, tiket terjual, peserta, pendapatan. Filter periode. |
| **Manajemen Event** | Tabel event (search, filter, pagination), form buat/edit event dengan upload poster, aksi publish/unpublish |
| **Manajemen Tiket** | Atur jenis tiket per event: nama, harga, kuota, expired time, batas per user. Kuota tidak bisa diturunkan di bawah jumlah terjual. |
| **Timeline Tracking** | Visualisasi milestone acara (Persiapan → Open Ticket → Close Ticket → Hari-H → Evaluasi) dengan indikator progres |
| **Daftar Peserta** | Tabel peserta + status check-in, export CSV |

---

### 📷 Panitia (Scanner Gate) — Mobile-First

| Fitur | Deskripsi |
|---|---|
| **QR Scanner** | Kamera besar di tengah dengan frame pemindaian, feedback instan tanpa reload |
| **4 Status Scan** | `Valid` / `Sudah Digunakan` / `Tidak Valid` / `Bukan Event Ini` — masing-masing dengan warna berbeda |
| **Info Peserta** | Setelah scan valid: tampilkan nama, jenis tiket, waktu check-in |
| **Input Manual** | Fallback input kode tiket manual jika kamera bermasalah |
| **Counter Realtime** | Hitungan: sudah masuk / total terjual + riwayat scan sesi berjalan |
| **Akses Zoom** | Bergabung ke meeting koordinasi via Zoom API |

> **Konteks pakai:** dipegang satu tangan, antrean panjang, pencahayaan tidak menentu → target tap besar, feedback seketika.

---

### 🎤 Talent (Pengisi Acara)

| Fitur | Deskripsi |
|---|---|
| **Dashboard** | Ringkasan jadwal tampil mendatang |
| **Jadwal Tampil** | Kalender/timeline penampilan per event, status kesiapan (`Draft` / `Scheduled` / `Ready` / `Performed`), peringatan jadwal bentrok |
| **Profil Talent** | Bio, kategori, portofolio (YouTube/Instagram), kontak manajer |
| **Zoom** | Bergabung ke sesi mentoring via Zoom API |

---

### 🎓 Mentor

| Fitur | Deskripsi |
|---|---|
| **Dashboard** | Ringkasan sesi mentoring aktif |
| **Sesi Mentoring** | Daftar sesi untuk event mendatang, riwayat sesi lampau, tombol Join Meeting (Zoom) |
| **Profil** | Data diri mentor |

---

### ⚙️ Admin (Super Admin)

| Fitur | Deskripsi |
|---|---|
| **Dashboard Metrik** | Kartu: Total Users, Sub-Org, Events, Tiket Terjual, Talent, Check-in. Filter periode (All Time / 7 / 30 / 90 hari). Grafik penjualan & distribusi peserta |
| **Users Management** | Tabel user lengkap: search, filter, sorting, pagination, export CSV. Kelola role global & status akun (Active / Inactive / Banned) |
| **Activity Monitoring** | Grafik aktivitas harian + tabel log (user, jenis aktivitas, waktu, perangkat). Filter rentang tanggal & jenis aktivitas |
| **Manajemen Event** | Pantau semua event di seluruh sub-organisasi |
| **Profil** | Data diri admin |

---

## ⚙️ Cara Kerja Sistem

### 1. Alur Pembelian Tiket (Core Flow)

```
[User] → Event Discovery
       → Pilih Event (Detail Page)
       → Klik "Beli Tiket"
       → [Step 1] Pilih jenis tiket & jumlah (realtime kuota + countdown expired)
       → [Step 2] Isi / konfirmasi data peserta (prefill dari profil)
       → [Step 3] Review order summary + centang persetujuan non-refundable → Bayar (Midtrans Snap)
       → [Step 4] Status konfirmasi: Pending / Success / Failed / Expired
       → E-Ticket QR dikirim ke dashboard "My Tickets"
```

### 2. Alur Check-in di Gate

```
[Panitia Scanner] → Buka halaman /panitia/scanner
                 → Pilih Event
                 → Aktifkan kamera → Scan QR Code peserta
                 → Backend validasi token QR → Tandai is_used = true
                 → Feedback langsung: Valid ✅ / Sudah Digunakan ⚠️ / Tidak Valid ❌ / Bukan Event Ini 🚫
                 → Counter realtime diperbarui otomatis
```

### 3. Alur Manajemen Event oleh Sub-Organisasi

```
[Sub-Org] → Buat Event (judul, deskripsi, poster, tanggal, lokasi, kategori)
          → Tambah jenis tiket (nama, harga, kuota, expired time, batas per user)
          → Publish Event → Muncul di Event Discovery publik
          → Pantau Timeline Tracking (milestone otomatis & manual)
          → Lihat Daftar Peserta (dengan status check-in)
          → Export laporan CSV
```

### 4. Alur Talent & Mentoring

```
[Admin/Sub-Org] → Assign talent ke event (tanggal & jam tampil)
[Mentor]        → Jadwalkan sesi Zoom untuk talent tertentu
[Talent]        → Lihat jadwal → Join sesi Zoom via integrasi Zoom API
[Mentor]        → Fasilitasi sesi bimbingan online
```

### 5. Sistem Autentikasi & Otorisasi

```
Login (Email/Password atau Google OAuth)
  → Backend Laravel Sanctum → Beri JWT Token
  → Middleware Next.js cek token + role
  → Redirect ke dashboard sesuai role:
      user     → /user/dashboard
      talent   → /talent/dashboard
      mentor   → /mentor/dashboard
      panitia  → /panitia/scanner
      sub-org  → /sub-org/dashboard
      admin    → /admin/dashboard
  → Onboarding check (user baru wajib isi form profil dulu)
```

### 6. Sistem Pembayaran (Midtrans)

```
Frontend kirim order ke Backend Laravel
→ Backend buat transaksi di Midtrans → Dapat snap_token
→ Frontend tampilkan Midtrans Snap UI (popup)
→ User bayar (transfer bank, e-wallet, QRIS, dll)
→ Midtrans kirim webhook ke Backend → Update status transaksi
→ Backend generate E-Ticket (token QR acak, disimpan di DB)
→ Frontend polling/realtime status → Update UI konfirmasi
```

---

## 🎨 Desain Sistem

| Aspek | Ketentuan |
|---|---|
| **Warna Primer** | Merah `#73020e` |
| **Warna Teks** | Hitam `#010208` |
| **Tipografi** | Poppins (300, 400, 500, 600, 700) |
| **Animasi** | GSAP + Lenis — **hanya** pada halaman publik. Wajib support `prefers-reduced-motion` |
| **Bahasa UI** | Bahasa Indonesia |
| **Standar Tabel** | Semua tabel dashboard: Search + Filter Chips + Clear + Export CSV + Pagination |
| **State Wajib** | Setiap daftar harus handle: Loading (Skeleton) · Empty · Error |
| **Aksi Destruktif** | Hapus event/user selalu butuh konfirmasi dialog |
| **Responsivitas** | 3 breakpoint; scanner & e-ticket wajib diuji di mobile |

---

## 🗄️ Database

Database menggunakan **PostgreSQL** dengan arsitektur SaaS Enterprise (UUID sebagai PK, Soft Deletes, Audit Trail).

**Tabel Utama:**

| Grup | Tabel |
|---|---|
| Pengguna | `users`, `user_profiles`, `talent_profiles` |
| Organisasi | `organizations`, `organization_members` |
| Acara | `events`, `event_timelines` |
| Ticketing | `ticket_types`, `transactions`, `transaction_items`, `e_tickets` |
| Talent & Mentoring | `event_talents`, `mentoring_sessions` |
| Log | `activity_logs` |

> Lihat [`Database_Dictionary.md`](./Database_Dictionary.md) untuk spesifikasi lengkap kolom dan tipe data.

---

## 🚀 Memulai Pengembangan

### Prasyarat

- Node.js ≥ 18
- npm / pnpm
- Backend Laravel sudah berjalan (lihat repo BE)

### Instalasi

```bash
# Clone repo
git clone <repo-url>
cd moket

# Install dependencies
npm install

# Salin environment variables
cp .env.example .env.local
# Isi variabel: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_MIDTRANS_CLIENT_KEY, dll

# Jalankan development server
npm run dev
```

Server berjalan di `http://localhost:3000`

### Scripts

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build production bundle |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint |

---

## 📄 Dokumen Terkait

- [`PRD.md`](./PRD.md) — Product Requirements Document lengkap
- [`Database_Dictionary.md`](./Database_Dictionary.md) — Spesifikasi skema database
- [`implementation_plan1.md`](./implementation_plan1.md) — Rencana implementasi teknis

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk SMK Telkom Malang — Program Moklet Go Global</sub>
</div>
