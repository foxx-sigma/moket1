// ============================================================
// MokeT Frontend — Application Constants
// ============================================================

import type { UserRole, OrgMemberRole, PaymentStatus, EventStatus, AccountStatus, OrgMemberStatus } from "@/lib/types";

// ============================
// Role Labels
// ============================

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  user: "Peserta",
  super_admin: "Admin",
  talent: "Talent",
  mentor: "Mentor",
};

export const ORG_MEMBER_ROLE_LABELS: Record<OrgMemberRole, string> = {
  admin: "Admin Organisasi",
  committee: "Panitia",
  ticketing: "Ticketing",
  scanner: "Scanner",
  finance: "Keuangan",
};

// ============================
// Status Labels & Styles
// ============================

export const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Menunggu",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  success: {
    label: "Berhasil",
    className: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  failed: {
    label: "Gagal",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  expired: {
    label: "Kedaluwarsa",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export const EVENT_STATUS_CONFIG: Record<
  EventStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  published: {
    label: "Published",
    className: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  completed: {
    label: "Selesai",
    className: "bg-muted text-muted-foreground border-border",
  },
  cancelled: {
    label: "Dibatalkan",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
};

export const ACCOUNT_STATUS_CONFIG: Record<
  AccountStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Aktif",
    className: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  inactive: {
    label: "Nonaktif",
    className: "bg-muted text-muted-foreground border-border",
  },
  banned: {
    label: "Diblokir",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
};

export const ORG_MEMBER_STATUS_CONFIG: Record<
  OrgMemberStatus,
  { label: string; className: string }
> = {
  invited: {
    label: "Diundang",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  active: {
    label: "Aktif",
    className: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  inactive: {
    label: "Nonaktif",
    className: "bg-muted text-muted-foreground border-border",
  },
};

// ============================
// Number & Currency Formatting
// ============================

/**
 * Format angka sebagai mata uang Rupiah.
 * Sesuai catatan Database Dictionary: semua price/subtotal/total_amount
 * wajib diformat dengan Intl.NumberFormat('id-ID').
 */
export const CURRENCY_FORMATTER = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Format angka biasa (tanpa simbol Rp).
 */
export const NUMBER_FORMATTER = new Intl.NumberFormat("id-ID");

/**
 * Shorthand format angka besar (1.2 Jt, 3.5 Rb, dll).
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} Jt`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)} Rb`;
  }
  return value.toString();
}

// ============================
// Route Paths
// ============================

export const ROUTES = {
  public: {
    home: "/",
    events: "/events",
    eventDetail: (slug: string) => `/events/${slug}`,
    purchase: (slug: string) => `/events/${slug}/purchase`,
  },
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
  },
  user: {
    dashboard: "/user/dashboard",
    onboarding: "/user/onboarding",
    myTickets: "/user/my-tickets",
    ticketDetail: (id: string) => `/user/my-tickets/${id}`,
    transactions: "/user/transactions",
    profile: "/user/profile",
  },
  admin: {
    dashboard: "/admin/dashboard",
    events: "/admin/events",
    users: "/admin/users",
    activity: "/admin/activity",
    profile: "/admin/profile",
  },
  subOrg: {
    dashboard: "/sub-org/dashboard",
    events: "/sub-org/events",
    createEvent: "/sub-org/events/create",
    editEvent: (id: string) => `/sub-org/events/${id}/edit`,
    eventTickets: (id: string) => `/sub-org/events/${id}/tickets`,
    eventParticipants: (id: string) => `/sub-org/events/${id}/participants`,
    eventTimeline: (id: string) => `/sub-org/events/${id}/timeline`,
  },
  panitia: {
    scanner: "/panitia/scanner",
    zoom: "/panitia/zoom",
    profile: "/panitia/profile",
  },
  talent: {
    dashboard: "/talent/dashboard",
    schedule: "/talent/schedule",
    zoom: "/talent/zoom",
    profile: "/talent/profile",
  },
  mentor: {
    dashboard: "/mentor/dashboard",
    sessions: "/mentor/sessions",
    zoom: "/mentor/zoom",
    profile: "/mentor/profile",
  },
} as const;

// ============================
// Pagination
// ============================

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ============================
// Event Categories
// ============================

export const EVENT_CATEGORIES = [
  "Festival",
  "Seminar",
  "Konser",
  "Olahraga",
  "Kompetisi",
  "Pameran",
  "Workshop",
  "Bahasa",
  "Lainnya",
] as const;

// ============================
// Misc
// ============================

export const TICKET_REFUND_DEDUCTION_PERCENT = 15;
export const MAX_TICKETS_PER_USER_DEFAULT = 5;
