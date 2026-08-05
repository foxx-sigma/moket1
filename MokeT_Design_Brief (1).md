# MokeT — Design Brief

> Ringkasan task frontend untuk dijadikan prompt desain. Lampirkan bersama FSD MokeT.

## Produk

MokeT adalah platform ticketing event untuk SMK Telkom Malang, mendukung program Moklet Go Global.
Event diselenggarakan oleh sub organisasi siswa, untuk peserta internal (siswa) maupun external (umum).
Alur inti: temukan event → pilih tiket → bayar via Midtrans → dapat e-ticket QR → check-in scan di gate.
Tiket bersifat **non-refundable**.

## Brand & Sistem Desain

| Aspek | Ketentuan |
|---|---|
| Warna utama | Merah `#D81B28` dengan aksen oranye `#FF6A1C` |
| Warna teks | Navy `#1A2247` |
| Font | Poppins |
| Stack | Next.js + Tailwind CSS + ShadCN UI |
| Motion | Lenis (smooth scroll) + GSAP (reveal) pada halaman publik saja |
| Bahasa UI | Indonesia |
| Logo | Ikon tiket bernotch dengan motif QR, wordmark "MokeT" (huruf T merah) |

Nuansa yang dituju: energik dan muda seperti event kampus, tapi tetap kredibel karena ada transaksi uang.
Bukan korporat, bukan pula terlalu main-main.

## Peran Pengguna

| Role | Kebutuhan utama |
|---|---|
| User (peserta) | Cari event, beli tiket, simpan e-ticket |
| Sub-Organisasi (PIC) | Kelola event, tiket, timeline, peserta |
| Panitia Gate | Scan QR di lokasi acara — **mobile-first, kondisi terburu-buru** |
| Talent & Mentor | Lihat jadwal tampil, ikut sesi mentoring Zoom |
| Admin | Metrik sistem, kelola user, pantau aktivitas |

---

## Daftar Layar

### A. Publik

**Homepage** — landing page dengan urutan section:
hero (headline + CTA "Lihat Event") → featured event (maks 3 kartu, event terdekat) →
sub organisasi penyelenggara (logo grid) → talent highlight → how it works (4 langkah:
pilih event → pilih tiket → bayar → dapat e-ticket) → dokumentasi & testimoni → footer + CTA.

**Sign Up / Sign In / Forgot Password** — layout dua kolom: form di kiri, panel visual event di kanan.
Sign Up butuh nama, email, password, konfirmasi, checkbox Terms. Ada opsi Google OAuth.
Validasi realtime, toggle show/hide password.

**Event Discovery** — grid card responsif berisi poster, nama, tanggal, lokasi, penyelenggara, harga mulai.
Panel filter di kiri (kategori, sub organisasi, rentang tanggal, scope internal/external),
search bar di atas, sorting (terbaru / terdekat / harga), pagination.
Badge status: `Upcoming`, `On Going`, `Sold Out`, `Closed`.
Butuh skeleton loading dan empty state.

**Detail Event** — deskripsi, timeline/rundown acara, lokasi & waktu, syarat ketentuan,
daftar tiket tersedia, CTA beli tiket (nonaktif saat Sold Out / Closed).

### B. Alur Pembelian (paling kritis)

**Ticket Selection** — kartu per jenis tiket: nama, harga, benefit, **sisa kuota**, **countdown expired time**
yang berjalan realtime. Tiket habis diberi badge Sold Out dan tidak bisa dipilih.

**Purchase Flow** — stepper 4 tahap: Pilih Tiket → Data Peserta → Pembayaran → Selesai.
Stepper jumlah tiket dibatasi kuota dan batas per user. Form data peserta ter-prefill dari profil.
Order summary: rincian harga, biaya layanan, total. Checkbox persetujuan **non-refundable** wajib
dicentang sebelum tombol bayar aktif — ketentuannya harus terbaca jelas, bukan disembunyikan.

**Status Pembayaran** — empat tampilan berbeda: Pending (dengan instruksi), Success (CTA ke dashboard),
Failed, Expired.

### C. Area User

**User Dashboard** — summary card (tiket aktif, event mendatang, jumlah transaksi) + reminder event terdekat.
Layout sidebar kiri, konten kanan.

**My Tickets** — tiket dikelompokkan: Aktif / Terpakai / Expired. Kartu bergaya tiket fisik (ada notch).

**Detail E-Ticket** — QR Code besar dan kontras tinggi (akan dipindai dari layar HP di lokasi ramai,
kadang di bawah matahari). Info event, tanggal, lokasi, jenis tiket, kode tiket. Opsi unduh.

**Riwayat Transaksi** — daftar transaksi + status pembayaran, detail rincian.

**Onboarding Form** — muncul setelah login pertama, tidak bisa dilewati:
nama, email, telepon, asal sekolah/instansi, kelas/angkatan, kategori peserta.

**Profil** — kartu identitas di atas, form data diri di bawah, upload foto, ubah password.

### D. Area Sub-Organisasi

**Dashboard** — kartu ringkasan: total event, tiket terjual, peserta terdaftar, pendapatan. Filter periode.

**Manajemen Event** — tabel event (search, filter, sorting, pagination), form tambah/edit dengan
upload poster, aksi publish/unpublish.

**Manajemen Tiket per Event** — atur jenis tiket, harga, kuota maksimal, expired time.
Kuota tidak boleh diturunkan di bawah jumlah terjual — perlu peringatan visual.

**Timeline Tracking** — milestone event (persiapan → open ticket → close ticket → hari-H → evaluasi)
dengan status dan indikator progres keseluruhan. Tampilan timeline visual.

**Daftar Peserta** — tabel peserta + status check-in, export CSV.

### E. Check-in Scanner — mobile-first

Area kamera besar di tengah dengan frame pemindaian, panel hasil di bawah.
Empat state hasil dengan warna berbeda: `Valid` / `Sudah Digunakan` / `Tidak Valid` / `Bukan Event Ini`.
Setelah scan valid, tampilkan nama peserta, jenis tiket, waktu check-in.
Ada input manual kode tiket sebagai fallback, counter realtime (sudah masuk / total terjual),
dan riwayat scan sesi berjalan.

Konteks pakai: dipegang satu tangan, antrean panjang, pencahayaan tidak menentu.
Target tap besar, feedback instan, tidak perlu reload antar scan.

### F. Talent

**Daftar & Profil Talent** — card/tabel dengan nama, kategori, sub organisasi.
Detail: bio, portofolio, kontak, riwayat penampilan.

**Penjadwalan** — assign talent ke event dengan waktu tampil dan durasi.
Tampilan kalender/timeline, peringatan saat jadwal bentrok.
Status kesiapan: `Draft` / `Scheduled` / `Ready` / `Performed`.

**Sesi Mentoring** — daftar sesi untuk upcoming event, tombol Join Meeting (Zoom),
sesi lampau ditandai berbeda.

### G. Area Admin

**Admin Dashboard** — kartu metrik: Total Users, Sub-Organisasi, Events, Tiket Terjual, Talent, Check-in.
Filter periode (All Time / 7 / 30 / 90 hari). Grafik penjualan tiket per periode,
distribusi peserta internal vs external, event teraktif, ringkasan status pembayaran.

**Users Management** — tabel user (nama, email, role, status, last login) dengan search, filter, sorting,
pagination, export CSV. Pengaturan role (Admin / Sub-Organisasi / Talent / Mentor / User)
dan status akun (Active / Inactive / Banned).

**Activity Monitoring** — grafik aktivitas harian di atas, tabel log di bawah
(user, jenis aktivitas, waktu, perangkat). Filter rentang tanggal, jenis aktivitas, role. Export CSV.

---

## Prioritas Desain

1. **Alur pembelian tiket** (B) — inti bisnis, paling banyak titik gagal
2. **Check-in Scanner** (E) — konteks pakai paling ekstrem, salah desain langsung terasa di lapangan
3. **Event Discovery + Detail** (A) — pintu masuk konversi
4. **User Dashboard & E-Ticket** (C)
5. Sisanya (D, F, G) — pola dashboard admin yang relatif standar

## Catatan Konsistensi

- Semua tabel admin memakai pola sama: search bar + filter chips + Clear Filters + export CSV + pagination
- Semua daftar butuh tiga state: loading (skeleton), empty, error
- Semua aksi destruktif (hapus event, hapus user) butuh konfirmasi
- Responsif di tiga breakpoint; scanner dan e-ticket wajib diuji di mobile
- Dukung `prefers-reduced-motion` — animasi mati saat aktif
