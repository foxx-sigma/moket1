import type {
  Organization,
  EventSummary,
  ETicket,
  Transaction,
  TransactionItem,
  TicketType,
} from "@/lib/types";

// ============================
// Mock Organizations (was: SubOrganizations)
// ============================

export const mockOrganizations: Organization[] = [
  {
    id: "org-1",
    name: "OSIS SMK Telkom",
    slug: "osis-smk-telkom",
    logoUrl: "/images/orgs/osis.png",
    description: "Organisasi Siswa Intra Sekolah SMK Telkom Malang",
    contactEmail: "osis@smktelkom-mlg.sch.id",
    status: "active",
    createdAt: "2026-01-01T00:00:00+07:00",
    updatedAt: "2026-01-01T00:00:00+07:00",
  },
  {
    id: "org-2",
    name: "MPK SMK Telkom",
    slug: "mpk-smk-telkom",
    logoUrl: "/images/orgs/mpk.png",
    description: "Majelis Perwakilan Kelas SMK Telkom Malang",
    contactEmail: "mpk@smktelkom-mlg.sch.id",
    status: "active",
    createdAt: "2026-01-01T00:00:00+07:00",
    updatedAt: "2026-01-01T00:00:00+07:00",
  },
  {
    id: "org-3",
    name: "Moklet Creative",
    slug: "moklet-creative",
    logoUrl: "/images/orgs/creative.png",
    description: "Komunitas kreatif dan seni SMK Telkom Malang",
    status: "active",
    createdAt: "2026-01-01T00:00:00+07:00",
    updatedAt: "2026-01-01T00:00:00+07:00",
  },
  {
    id: "org-4",
    name: "Moklet Dev Club",
    slug: "moklet-dev-club",
    logoUrl: "/images/orgs/devclub.png",
    description: "Komunitas developer dan teknologi SMK Telkom Malang",
    status: "active",
    createdAt: "2026-01-01T00:00:00+07:00",
    updatedAt: "2026-01-01T00:00:00+07:00",
  },
  {
    id: "org-5",
    name: "Moklet Sports",
    slug: "moklet-sports",
    logoUrl: "/images/orgs/sports.png",
    description: "Organisasi olahraga SMK Telkom Malang",
    status: "active",
    createdAt: "2026-01-01T00:00:00+07:00",
    updatedAt: "2026-01-01T00:00:00+07:00",
  },
  {
    id: "org-6",
    name: "English Club",
    slug: "english-club",
    logoUrl: "/images/orgs/english.png",
    description: "Klub Bahasa Inggris SMK Telkom Malang",
    status: "active",
    createdAt: "2026-01-01T00:00:00+07:00",
    updatedAt: "2026-01-01T00:00:00+07:00",
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
    bannerUrl: "/images/events/moklet-fest.jpg",
    startDate: "2026-09-15T09:00:00+07:00",
    location: "Aula SMK Telkom Malang",
    organization: { name: "OSIS SMK Telkom", logoUrl: "/images/orgs/osis.png" },
    priceStart: 25000,
    status: "published",
    scope: "external",
    category: "Festival",
  },
  {
    id: "evt-2",
    slug: "tech-talk-ai-2026",
    title: "Tech Talk: AI & The Future",
    bannerUrl: "/images/events/tech-talk.jpg",
    startDate: "2026-08-28T13:00:00+07:00",
    location: "Lab Komputer Lt. 3",
    organization: { name: "Moklet Dev Club", logoUrl: "/images/orgs/devclub.png" },
    priceStart: 0,
    status: "published",
    scope: "internal",
    category: "Seminar",
  },
  {
    id: "evt-3",
    slug: "moklet-music-night",
    title: "Moklet Music Night",
    bannerUrl: "/images/events/music-night.jpg",
    startDate: "2026-08-20T18:00:00+07:00",
    location: "Lapangan SMK Telkom Malang",
    organization: { name: "Moklet Creative", logoUrl: "/images/orgs/creative.png" },
    priceStart: 35000,
    status: "published",
    scope: "external",
    category: "Konser",
  },
  {
    id: "evt-4",
    slug: "inter-school-basketball",
    title: "Inter-School Basketball Championship",
    bannerUrl: "/images/events/basketball.jpg",
    startDate: "2026-09-05T08:00:00+07:00",
    location: "GOR SMK Telkom Malang",
    organization: { name: "Moklet Sports", logoUrl: "/images/orgs/sports.png" },
    priceStart: 15000,
    status: "published",
    scope: "external",
    category: "Olahraga",
  },
  {
    id: "evt-5",
    slug: "english-debate-2026",
    title: "English Debate Competition 2026",
    bannerUrl: "/images/events/debate.jpg",
    startDate: "2026-08-10T09:00:00+07:00",
    location: "Aula Lt. 2 SMK Telkom Malang",
    organization: { name: "English Club", logoUrl: "/images/orgs/english.png" },
    priceStart: 10000,
    status: "completed",
    scope: "internal",
    category: "Kompetisi",
  },
  {
    id: "evt-6",
    slug: "moklet-art-exhibition",
    title: "Moklet Art Exhibition: Colors of Youth",
    bannerUrl: "/images/events/art-exhibition.jpg",
    startDate: "2026-09-20T10:00:00+07:00",
    location: "Galeri Seni SMK Telkom Malang",
    organization: { name: "Moklet Creative", logoUrl: "/images/orgs/creative.png" },
    priceStart: 20000,
    status: "draft",
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
  },
  {
    id: "talent-2",
    name: "Aisha Zahra",
    category: "Vocalist",
    avatarUrl: "/images/talents/aisha.jpg",
  },
  {
    id: "talent-3",
    name: "Dimas Arya",
    category: "Stand-up Comedy",
    avatarUrl: "/images/talents/dimas.jpg",
  },
  {
    id: "talent-4",
    name: "Sari Indah",
    category: "Traditional Dance",
    avatarUrl: "/images/talents/sari.jpg",
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
      "Jelajahi berbagai event menarik yang diselenggarakan oleh organisasi SMK Telkom Malang.",
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
// Mock Ticket Types
// ============================

const mockTicketPresale1: TicketType = {
  id: "type-1",
  eventId: "evt-1",
  name: "Presale 1",
  description: "Entry Pass ke seluruh area event.",
  price: 25000,
  quota: 100,
  quotaSold: 100,
  maxPerUser: 2,
  expiredTime: "2026-09-15T09:00:00+07:00",
};

const mockTicketVIP: TicketType = {
  id: "type-2",
  eventId: "evt-2",
  name: "VIP Ticket",
  description: "Entry Pass, Front Row, Merch Kit.",
  price: 0,
  quota: 50,
  quotaSold: 50,
  maxPerUser: 1,
  expiredTime: "2026-08-28T13:00:00+07:00",
};

const mockTicketNormal: TicketType = {
  id: "type-3",
  eventId: "evt-3",
  name: "Normal Ticket",
  description: "Entry Pass standar.",
  price: 35000,
  quota: 500,
  quotaSold: 500,
  maxPerUser: 4,
  expiredTime: "2026-07-10T18:00:00+07:00",
};

const mockTicketTribun: TicketType = {
  id: "type-4",
  eventId: "evt-4",
  name: "Tribun",
  description: "Tempat duduk tribun penonton.",
  price: 15000,
  quota: 200,
  quotaSold: 10,
  maxPerUser: 2,
  expiredTime: "2026-09-05T08:00:00+07:00",
};

// ============================
// Mock User E-Tickets
// ============================

export const mockUserTickets: ETicket[] = [
  {
    id: "etk-1",
    userId: "usr-fadhil",
    eventId: "evt-1",
    attendeeName: "Ahmad Fadhil",
    qrCode: "MKT-2026-0915-ABC1-VALID",
    isUsed: false,
    ticketType: mockTicketPresale1,
    event: mockEvents[0],
  },
  {
    id: "etk-2",
    userId: "usr-fadhil",
    eventId: "evt-2",
    attendeeName: "Ahmad Fadhil",
    qrCode: "MKT-2026-0828-XYZ9-VALID",
    isUsed: false,
    ticketType: mockTicketVIP,
    event: mockEvents[1],
  },
  {
    id: "etk-3",
    userId: "usr-fadhil",
    eventId: "evt-3",
    attendeeName: "Ahmad Fadhil",
    qrCode: "MKT-2026-0710-DEF4-USED",
    isUsed: true,
    usedAt: "2026-07-10T17:45:00+07:00",
    ticketType: mockTicketNormal,
    event: {
      ...mockEvents[2],
      title: "Past Event: Music Fest",
      startDate: "2026-07-10T18:00:00+07:00",
      status: "completed",
    },
  },
];

// ============================
// Mock Transactions
// ============================

export const mockTransactions: Transaction[] = [
  {
    id: "trx-1",
    userId: "usr-fadhil",
    eventId: "evt-1",
    invoiceNumber: "INV-20260801-ABC123",
    totalAmount: 25000,
    status: "success",
    paymentMethod: "GoPay",
    paidAt: "2026-08-01T10:30:00+07:00",
    items: [
      {
        id: "item-1",
        transactionId: "trx-1",
        ticketTypeId: "type-1",
        quantity: 1,
        price: 25000,
        subtotal: 25000,
        ticketType: mockTicketPresale1,
      },
    ],
    event: mockEvents[0],
    createdAt: "2026-08-01T10:28:00+07:00",
    updatedAt: "2026-08-01T10:30:00+07:00",
  },
  {
    id: "trx-2",
    userId: "usr-fadhil",
    eventId: "evt-2",
    invoiceNumber: "INV-20260802-XYZ987",
    totalAmount: 0,
    status: "success",
    paidAt: "2026-08-02T14:15:00+07:00",
    items: [
      {
        id: "item-2",
        transactionId: "trx-2",
        ticketTypeId: "type-2",
        quantity: 1,
        price: 0,
        subtotal: 0,
        ticketType: mockTicketVIP,
      },
    ],
    event: mockEvents[1],
    createdAt: "2026-08-02T14:15:00+07:00",
    updatedAt: "2026-08-02T14:15:00+07:00",
  },
  {
    id: "trx-3",
    userId: "usr-fadhil",
    eventId: "evt-4",
    invoiceNumber: "INV-20260804-DEF456",
    totalAmount: 30000,
    status: "pending",
    paymentMethod: "BCA Virtual Account",
    items: [
      {
        id: "item-3",
        transactionId: "trx-3",
        ticketTypeId: "type-4",
        quantity: 2,
        price: 15000,
        subtotal: 30000,
        ticketType: mockTicketTribun,
      },
    ],
    event: mockEvents[3],
    createdAt: "2026-08-04T08:00:00+07:00",
    updatedAt: "2026-08-04T08:00:00+07:00",
  },
];
