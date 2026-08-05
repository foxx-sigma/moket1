import { EventSummary, SubOrganization } from "@/lib/types";

// ============================
// Mock Sub-Organizations
// ============================

export const mockSubOrgs: SubOrganization[] = [
  {
    id: "org-1",
    name: "OSIS SMK Telkom",
    logoUrl: "/images/orgs/osis.png",
    description: "Organisasi Siswa Intra Sekolah SMK Telkom Malang",
    totalEvents: 12,
    totalTicketsSold: 1420,
    totalParticipants: 980,
    totalRevenue: 28500000,
  },
  {
    id: "org-2",
    name: "MPK SMK Telkom",
    logoUrl: "/images/orgs/mpk.png",
    description: "Majelis Perwakilan Kelas SMK Telkom Malang",
    totalEvents: 8,
    totalTicketsSold: 640,
    totalParticipants: 520,
    totalRevenue: 12800000,
  },
  {
    id: "org-3",
    name: "Moklet Creative",
    logoUrl: "/images/orgs/creative.png",
    description: "Komunitas kreatif dan seni SMK Telkom Malang",
    totalEvents: 15,
    totalTicketsSold: 2100,
    totalParticipants: 1650,
    totalRevenue: 42000000,
  },
  {
    id: "org-4",
    name: "Moklet Dev Club",
    logoUrl: "/images/orgs/devclub.png",
    description: "Komunitas developer dan teknologi SMK Telkom Malang",
    totalEvents: 6,
    totalTicketsSold: 450,
    totalParticipants: 380,
    totalRevenue: 9000000,
  },
  {
    id: "org-5",
    name: "Moklet Sports",
    logoUrl: "/images/orgs/sports.png",
    description: "Organisasi olahraga SMK Telkom Malang",
    totalEvents: 10,
    totalTicketsSold: 890,
    totalParticipants: 720,
    totalRevenue: 17800000,
  },
  {
    id: "org-6",
    name: "English Club",
    logoUrl: "/images/orgs/english.png",
    description: "Klub Bahasa Inggris SMK Telkom Malang",
    totalEvents: 4,
    totalTicketsSold: 320,
    totalParticipants: 280,
    totalRevenue: 6400000,
  },
];

// ============================
// Mock Events
// ============================

export const mockEvents: EventSummary[] = [
  {
    id: "evt-1",
    slug: "moklet-fest-2026",
    title: "Moklet Fest 2026",
    posterUrl: "/images/events/moklet-fest.jpg",
    date: "2026-09-15T09:00:00+07:00",
    location: "Aula SMK Telkom Malang",
    organizer: { name: "OSIS SMK Telkom", logoUrl: "/images/orgs/osis.png" },
    priceStart: 25000,
    status: "upcoming",
    scope: "external",
    category: "Festival",
  },
  {
    id: "evt-2",
    slug: "tech-talk-ai-2026",
    title: "Tech Talk: AI & The Future",
    posterUrl: "/images/events/tech-talk.jpg",
    date: "2026-08-28T13:00:00+07:00",
    location: "Lab Komputer Lt. 3",
    organizer: {
      name: "Moklet Dev Club",
      logoUrl: "/images/orgs/devclub.png",
    },
    priceStart: 0,
    status: "upcoming",
    scope: "internal",
    category: "Seminar",
  },
  {
    id: "evt-3",
    slug: "moklet-music-night",
    title: "Moklet Music Night",
    posterUrl: "/images/events/music-night.jpg",
    date: "2026-08-20T18:00:00+07:00",
    location: "Lapangan SMK Telkom Malang",
    organizer: {
      name: "Moklet Creative",
      logoUrl: "/images/orgs/creative.png",
    },
    priceStart: 35000,
    status: "ongoing",
    scope: "external",
    category: "Konser",
  },
  {
    id: "evt-4",
    slug: "inter-school-basketball",
    title: "Inter-School Basketball Championship",
    posterUrl: "/images/events/basketball.jpg",
    date: "2026-09-05T08:00:00+07:00",
    location: "GOR SMK Telkom Malang",
    organizer: {
      name: "Moklet Sports",
      logoUrl: "/images/orgs/sports.png",
    },
    priceStart: 15000,
    status: "upcoming",
    scope: "external",
    category: "Olahraga",
  },
  {
    id: "evt-5",
    slug: "english-debate-2026",
    title: "English Debate Competition 2026",
    posterUrl: "/images/events/debate.jpg",
    date: "2026-08-10T09:00:00+07:00",
    location: "Aula Lt. 2 SMK Telkom Malang",
    organizer: {
      name: "English Club",
      logoUrl: "/images/orgs/english.png",
    },
    priceStart: 10000,
    status: "sold_out",
    scope: "internal",
    category: "Kompetisi",
  },
  {
    id: "evt-6",
    slug: "moklet-art-exhibition",
    title: "Moklet Art Exhibition: Colors of Youth",
    posterUrl: "/images/events/art-exhibition.jpg",
    date: "2026-09-20T10:00:00+07:00",
    location: "Galeri Seni SMK Telkom Malang",
    organizer: {
      name: "Moklet Creative",
      logoUrl: "/images/orgs/creative.png",
    },
    priceStart: 20000,
    status: "upcoming",
    scope: "external",
    category: "Pameran",
  },
];

// ============================
// Mock Talents
// ============================

export const mockTalents = [
  {
    id: "talent-1",
    name: "Rafi Pratama",
    category: "Band",
    avatarUrl: "/images/talents/rafi.jpg",
    subOrg: "Moklet Creative",
  },
  {
    id: "talent-2",
    name: "Aisha Zahra",
    category: "Vocalist",
    avatarUrl: "/images/talents/aisha.jpg",
    subOrg: "Moklet Creative",
  },
  {
    id: "talent-3",
    name: "Dimas Arya",
    category: "Stand-up Comedy",
    avatarUrl: "/images/talents/dimas.jpg",
    subOrg: "OSIS SMK Telkom",
  },
  {
    id: "talent-4",
    name: "Sari Indah",
    category: "Traditional Dance",
    avatarUrl: "/images/talents/sari.jpg",
    subOrg: "Moklet Creative",
  },
];

// ============================
// Mock Testimonials
// ============================

export const mockTestimonials = [
  {
    id: "test-1",
    name: "Ahmad Fadhil",
    role: "Siswa Kelas XII RPL",
    avatarUrl: "/images/avatars/fadhil.jpg",
    content:
      "MokeT bikin beli tiket event sekolah jadi super gampang! Nggak perlu antri lagi, tinggal scan QR langsung masuk.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Putri Amelia",
    role: "PIC OSIS Event",
    avatarUrl: "/images/avatars/putri.jpg",
    content:
      "Sebagai panitia, MokeT sangat membantu tracking peserta dan penjualan tiket. Dashboard-nya lengkap dan mudah dipahami.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Budi Santoso",
    role: "Siswa Kelas XI TKJ",
    avatarUrl: "/images/avatars/budi.jpg",
    content:
      "E-ticket QR-nya keren! Check-in di gate cuma 2 detik. Eventnya jadi lebih terorganisir.",
    rating: 4,
  },
];

// ============================
// How It Works Steps
// ============================

export const howItWorksSteps = [
  {
    step: 1,
    title: "Pilih Event",
    description:
      "Jelajahi berbagai event menarik yang diselenggarakan oleh sub-organisasi SMK Telkom Malang.",
    icon: "search",
  },
  {
    step: 2,
    title: "Pilih Tiket",
    description:
      "Pilih jenis tiket yang sesuai dengan kebutuhanmu. Cek kuota dan harga secara real-time.",
    icon: "ticket",
  },
  {
    step: 3,
    title: "Bayar",
    description:
      "Lakukan pembayaran aman melalui Midtrans. Berbagai metode pembayaran tersedia.",
    icon: "credit-card",
  },
  {
    step: 4,
    title: "Dapat E-Ticket",
    description:
      "E-ticket dengan QR Code langsung dikirim ke akunmu. Tinggal tunjukkan saat check-in!",
    icon: "qr-code",
  },
];

// ============================
// Mock User Tickets
// ============================

export const mockUserTickets: import("@/lib/types").UserTicket[] = [
  {
    id: "tkt-1",
    ticketCode: "MKT-2026-0915-ABC1",
    event: mockEvents[0], // Moklet Fest
    ticketType: {
      id: "type-1",
      name: "Presale 1",
      price: 25000,
      benefits: ["Entry Pass"],
      quota: 100,
      sold: 100,
      remaining: 0,
      expiredAt: "2026-09-15T09:00:00+07:00",
      maxPerUser: 2,
    },
    status: "active",
    qrCodeData: "MKT-2026-0915-ABC1-VALID",
    purchasedAt: "2026-08-01T10:30:00+07:00",
    userName: "Ahmad Fadhil",
  },
  {
    id: "tkt-2",
    ticketCode: "MKT-2026-0828-XYZ9",
    event: mockEvents[1], // Tech Talk
    ticketType: {
      id: "type-2",
      name: "VIP Ticket",
      price: 0,
      benefits: ["Entry Pass", "Front Row", "Merch"],
      quota: 50,
      sold: 50,
      remaining: 0,
      expiredAt: "2026-08-28T13:00:00+07:00",
      maxPerUser: 1,
    },
    status: "active",
    qrCodeData: "MKT-2026-0828-XYZ9-VALID",
    purchasedAt: "2026-08-02T14:15:00+07:00",
    userName: "Ahmad Fadhil",
  },
  {
    id: "tkt-3",
    ticketCode: "MKT-2026-0710-DEF4",
    event: {
      ...mockEvents[2],
      title: "Past Event: Music Fest",
      date: "2026-07-10T18:00:00+07:00",
      status: "closed",
    },
    ticketType: {
      id: "type-3",
      name: "Normal Ticket",
      price: 35000,
      benefits: ["Entry Pass"],
      quota: 500,
      sold: 500,
      remaining: 0,
      expiredAt: "2026-07-10T18:00:00+07:00",
      maxPerUser: 4,
    },
    status: "used",
    qrCodeData: "MKT-2026-0710-DEF4-USED",
    purchasedAt: "2026-07-01T09:00:00+07:00",
    checkedInAt: "2026-07-10T17:45:00+07:00",
    userName: "Ahmad Fadhil",
  },
];

// ============================
// Mock Transactions
// ============================

export const mockTransactions: import("@/lib/types").Transaction[] = [
  {
    id: "trx-1",
    orderId: "ORD-20260801-ABC123",
    event: mockEvents[0],
    ticketType: {
      id: "type-1",
      name: "Presale 1",
      price: 25000,
      benefits: [],
      quota: 100,
      sold: 100,
      remaining: 0,
      expiredAt: "2026-09-15T09:00:00+07:00",
      maxPerUser: 2,
    },
    quantity: 1,
    subtotal: 25000,
    serviceFee: 2500,
    total: 27500,
    paymentStatus: "success",
    paymentMethod: "GoPay",
    createdAt: "2026-08-01T10:28:00+07:00",
    updatedAt: "2026-08-01T10:30:00+07:00",
  },
  {
    id: "trx-2",
    orderId: "ORD-20260802-XYZ987",
    event: mockEvents[1],
    ticketType: {
      id: "type-2",
      name: "VIP Ticket",
      price: 0,
      benefits: [],
      quota: 50,
      sold: 50,
      remaining: 0,
      expiredAt: "2026-08-28T13:00:00+07:00",
      maxPerUser: 1,
    },
    quantity: 1,
    subtotal: 0,
    serviceFee: 0,
    total: 0,
    paymentStatus: "success",
    createdAt: "2026-08-02T14:15:00+07:00",
    updatedAt: "2026-08-02T14:15:00+07:00",
  },
  {
    id: "trx-3",
    orderId: "ORD-20260804-DEF456",
    event: mockEvents[3],
    ticketType: {
      id: "type-4",
      name: "Tribun",
      price: 15000,
      benefits: [],
      quota: 200,
      sold: 10,
      remaining: 190,
      expiredAt: "2026-09-05T08:00:00+07:00",
      maxPerUser: 2,
    },
    quantity: 2,
    subtotal: 30000,
    serviceFee: 3000,
    total: 33000,
    paymentStatus: "pending",
    paymentMethod: "BCA Virtual Account",
    createdAt: "2026-08-04T08:00:00+07:00",
    updatedAt: "2026-08-04T08:00:00+07:00",
  },
];
