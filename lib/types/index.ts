// ============================================================
// MokeT Frontend — TypeScript Types (Aligned with DB V2)
// ============================================================
// Semua interface & enum di file ini diselaraskan 1:1 dengan
// skema PostgreSQL di Database_Dictionary.md V2.
// Konvensi: nama field menggunakan camelCase (FE), bukan
// snake_case (DB). Mapping dilakukan saat fetch/transform.
// ============================================================

// ============================
// Enum Types (Global)
// ============================

/** Role global user — disimpan di tabel `users.role` */
export type UserRole = "user" | "super_admin" | "talent" | "mentor";

/** Role kontekstual di dalam organisasi — disimpan di `organization_members.role` */
export type OrgMemberRole = "admin" | "committee" | "ticketing" | "scanner" | "finance";

/** Status akun user */
export type AccountStatus = "active" | "inactive" | "banned";

/** Status keanggotaan organisasi */
export type OrgMemberStatus = "invited" | "active" | "inactive";

/** Status organisasi */
export type OrganizationStatus = "active" | "inactive";

/** Status event */
export type EventStatus = "draft" | "published" | "completed" | "cancelled";

/** Scope event */
export type EventScope = "internal" | "external";

/** Status transaksi */
export type PaymentStatus = "pending" | "success" | "failed" | "expired";

/** Status milestone timeline */
export type MilestoneStatus = "pending" | "in_progress" | "completed";

/** Status jadwal talent */
export type TalentScheduleStatus = "draft" | "scheduled" | "ready" | "performed";

/** Status sesi mentoring */
export type MentoringSessionStatus = "scheduled" | "completed" | "cancelled";

/** Kategori peserta */
export type ParticipantCategory = "internal" | "external";

/** Kategori event (freeform string dari DB) */
export type EventCategory = string;

// ============================
// A. Users & Profiles
// ============================

/** Tabel `users` — Auth Core */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}

/** Tabel `user_profiles` — Profil Peserta */
export interface UserProfile {
  id: string;
  userId: string;
  fullName: string;
  phone?: string;
  schoolOrigin?: string;
  classBatch?: string;
  category: ParticipantCategory;
  avatarUrl?: string;
}

/** Tabel `talent_profiles` — Profil Pengisi Acara */
export interface TalentProfile {
  id: string;
  userId: string;
  category: string; // e.g. "Band", "MC", "Vocalist"
  bio?: string;
  portfolioUrl?: string;
  contactInfo?: string;
}

// ============================
// B. Organizations & Members
// ============================

/** Tabel `organizations` — Entitas Penyelenggara */
export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  status: OrganizationStatus;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

/** Tabel `organization_members` — Anggota Kepanitiaan */
export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: OrgMemberRole;
  status: OrgMemberStatus;
  invitationToken?: string;
  invitedBy?: string;
  acceptedAt?: string;
  joinedAt?: string;
  user?: User;
  organization?: Organization;
}

// ============================
// C. Events
// ============================

/** Tabel `events` */
export interface Event {
  id: string;
  organizationId: string;
  createdBy?: string;
  updatedBy?: string;
  title: string;
  slug: string;
  description: string;
  category: EventCategory;
  location: string;
  scope: EventScope;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  bannerUrl?: string;
  status: EventStatus;
  organization?: Organization;
  ticketTypes?: TicketType[];
  timelines?: EventTimeline[];
  createdAt: string;
  updatedAt: string;
}

/** Summary view untuk card listing (derived, bukan tabel langsung) */
export interface EventSummary {
  id: string;
  slug: string;
  title: string;
  bannerUrl?: string;
  startDate: string;
  location: string;
  organization: { name: string; logoUrl?: string };
  priceStart: number;
  status: EventStatus;
  scope: EventScope;
  category: EventCategory;
}

/** Tabel `event_timelines` — Milestone Acara */
export interface EventTimeline {
  id: string;
  eventId: string;
  milestoneName: string;
  milestoneDate: string; // ISO 8601
  status: MilestoneStatus;
  notes?: string;
}

// ============================
// D. Tickets & Transactions
// ============================

/** Tabel `ticket_types` — Jenis Tiket yang Dijual */
export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number;     // Float — format di FE pakai Intl.NumberFormat('id-ID')
  quota: number;
  quotaSold: number;
  maxPerUser: number; // default 5
  expiredTime: string; // ISO 8601
}

/** Tabel `transactions` — Header Struk Pembayaran */
export interface Transaction {
  id: string;
  userId: string;
  eventId: string;
  invoiceNumber: string;
  totalAmount: number;  // Float
  status: PaymentStatus;
  snapToken?: string;
  paymentMethod?: string;
  paidAt?: string;
  items: TransactionItem[];
  event?: EventSummary;
  createdAt: string;
  updatedAt: string;
}

/** Tabel `transaction_items` — Rincian Keranjang Tiket */
export interface TransactionItem {
  id: string;
  transactionId: string;
  ticketTypeId: string;
  quantity: number;
  price: number;     // snapshot harga satuan saat transaksi
  subtotal: number;  // quantity * price
  ticketType?: TicketType;
}

/** Tabel `e_tickets` — QR Code Tiket Peserta */
export interface ETicket {
  id: string;
  userId: string;
  eventId: string;
  attendeeName: string;
  qrCode: string;
  isUsed: boolean;
  usedAt?: string;
  checkedInBy?: string;
  transactionItemId?: string;
  ticketType?: TicketType;
  event?: EventSummary;
}

// ============================
// E. Talent & Mentoring
// ============================

/** Tabel `event_talents` — Jadwal Tampil Pengisi Acara */
export interface EventTalent {
  id: string;
  eventId: string;
  talentId: string;
  performanceDate: string; // "YYYY-MM-DD"
  startTime: string;       // "HH:MM:SS"
  endTime: string;         // "HH:MM:SS"
  status: TalentScheduleStatus;
  event?: Event;
  talent?: User & { talentProfile?: TalentProfile };
}

/** Tabel `mentoring_sessions` — Jadwal Bimbingan Zoom */
export interface MentoringSession {
  id: string;
  eventTalentId: string;
  mentorId: string;
  scheduledAt: string;     // ISO 8601
  durationMinutes: number; // default 60
  zoomJoinUrl?: string;
  status: MentoringSessionStatus;
  eventTalent?: EventTalent;
  mentor?: User;
}

// ============================
// F. Scanner
// ============================

export type ScanResultType = "valid" | "already_used" | "invalid" | "wrong_event";

export interface ScanResult {
  type: ScanResultType;
  qrCode?: string;
  attendeeName?: string;
  ticketTypeName?: string;
  checkedInAt?: string;
  previousCheckInAt?: string;
}

export interface ScanSession {
  eventId: string;
  eventName: string;
  totalCheckedIn: number;
  totalSold: number;
  scanHistory: ScanResult[];
}

// ============================
// G. Activity Logs
// ============================

/** Tabel `activity_logs` */
export interface ActivityLog {
  id: string;
  userId?: string;
  userName?: string;
  activityType: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// ============================
// H. Admin / Super Admin Metrics
// ============================

export interface AdminMetrics {
  totalUsers: number;
  totalOrganizations: number;
  totalEvents: number;
  totalTicketsSold: number;
  totalTalent: number;
  totalCheckIns: number;
  totalRevenue: number;
}

// ============================
// I. Refund (FE-driven concept)
// ============================

/**
 * Refund: Tiket bersifat refundable.
 * Biaya yang dikembalikan dipotong 15%.
 */
export interface RefundInfo {
  originalAmount: number;
  deductionPercent: number; // 15
  deductionAmount: number;
  refundAmount: number;
}

// ============================
// API Response Types
// ============================

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}
