1. Gambaran Umum & Objektif
MokeT adalah platform ticketing event berbasis web yang diinisiasi untuk mendukung program
Moklet Go Global di SMK Telkom Malang. Sistem ini dirancang untuk mendigitalkan dan
mengotomatisasi proses ticketing acara yang diselenggarakan oleh sub-organisasi sekolah,
mencakup pendaftaran, manajemen kuota, validasi e-ticket, hingga pelacakan timeline dan talent.
2. Pembagian Peran (User Roles)
User (Peserta): Menelusuri event, melakukan transaksi tiket (terintegrasi Midtrans), dan
menyimpan e-ticket berbasis QR Code.
Sub-Organisasi (PIC): Bertanggung jawab penuh atas manajemen event, pengaturan jenis
tiket, kuota maksimal, masa berlaku (expired time), serta memantau progres acara melalui
Timeline Tracking.
Panitia Gate: Mengoperasikan fitur Event Check-in QR Scanner berbasis web di lokasi acara
untuk memvalidasi tiket secara real-time.
Talent & Mentor: Mengelola jadwal performa dan bergabung dalam sesi Talent Mentoring
jarak jauh via Zoom API.
Admin: Mengawasi keseluruhan aktivitas sistem, mengelola metrik data global, mengatur
otorisasi role pengguna, dan mengekspor laporan.
3. Spesifikasi Arsitektur & Teknologi

Backend: PHP / Laravel, Sanctum Auth, PostgreSQL, SimpleSoftwareIO (QR)
Frontend: Next.js, Tailwind CSS, ShadCN UI, Lenis (Smooth Scroll), GSAP (Reveal Animation)
Integrasi Pihak Ketiga: Midtrans (Payment Gateway), Zoom API, Cloudinary, SMTP
Infrastruktur: Docker, VPS Hosting

4. Kebutuhan Fungsional Utama (Prioritas Sistem)
Prioritas 1: Alur Ticket Selection & Purchase Flow
Merupakan core business flow yang paling kritis. Fitur ini terdiri dari 4 tahapan stepper (Pilih Tiket →
Data Peserta → Pembayaran → Selesai). Pemilihan tiket harus mencerminkan sisa kuota dan
countdown expired time secara real-time. Pengguna wajib menyetujui syarat non-refundable secara
•
•

•
•
•

MokeT PRD - Halaman 1

eksplisit sebelum melakukan pembayaran. Terdapat 4 status konfirmasi pembayaran: Pending,
Success, Failed, dan Expired.
Prioritas 2: Event Check-in QR Scanner (Mobile-First)

Antarmuka scanner ditujukan untuk panitia gate di lapangan dengan lingkungan ekstrem (terburu-
buru, antrean panjang, pencahayaan variatif). Tampilan harus memprioritaskan kamera besar di

tengah dan memberikan umpan balik (feedback) seketika tanpa reload halaman. 4 status hasil scan
yang harus diakomodir: Valid, Sudah Digunakan, Tidak Valid, dan Bukan Event Ini.
Prioritas 3: Homepage & Event Discovery
Sebagai gerbang konversi utama. Homepage disusun untuk persuasif dengan struktur: Hero
Section → Featured Event → Sub-Organization → Talent → How it Works → Testimonials. Halaman
Discovery dilengkapi pencarian, filter (scope internal/eksternal, kategori, tanggal), dan badge status
(Upcoming, On Going, Sold Out, Closed).
Prioritas 4: User Dashboard & E-Ticket
Pusat kontrol bagi pengguna. E-Ticket harus didesain menyerupai tiket fisik (dengan aksen notch)
dan memiliki kontras tinggi pada QR Code-nya agar mudah dipindai di lapangan.
5. Panduan Desain & UI/UX (Design Brief)
Platform MokeT mengusung nuansa yang energik khas event sekolah, namun tetap memancarkan
kredibilitas tinggi mengingat adanya transaksi finansial.
Aspek Ketentuan Implementasi
Warna
Utama

Merah #D81B28 (Primary), Aksen Oranye #FF6A1C, Navy #1A2247 (Teks)

Tipografi Poppins digunakan di seluruh antarmuka untuk kesan bersih dan modern.

Motion &
Animasi

Lenis dan GSAP diimplementasikan secara eksklusif pada halaman publik (Discovery
& Homepage). Wajib mengakomodasi preferensi prefers-reduced-motion pada
browser.

Standar
Tabel Data

Semua tabel pada dashboard (Admin & Sub-Org) wajib mengimplementasikan fungsi:
Search, Filter Chips, Clear Filters, Export CSV, dan Pagination. Harus mengakomodir
state: Loading (Skeleton), Empty, dan Error.