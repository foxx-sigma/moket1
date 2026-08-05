// ============================
// Event Types
// ============================

export type EventStatus = "upcoming" | "ongoing" | "sold_out" | "closed";
export type EventScope = "internal" | "external";
export type EventCategory = string;

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  posterUrl: string;
  date: string; // ISO date
  endDate?: string;
  time: string;
  location: string;
  status: EventStatus;
  scope: EventScope;
  category: EventCategory;
  organizer: SubOrganization;
  tickets: TicketType[];
  timeline?: TimelineMilestone[];
  termsAndConditions?: string;
  totalSold: number;
  totalCapacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventSummary {
  id: string;
  slug: string;
  title: string;
  posterUrl: string;
  date: string;
  location: string;
  organizer: { name: string; logoUrl: string };
  priceStart: number;
  status: EventStatus;
  scope: EventScope;
  category: EventCategory;
}

// ============================
// Ticket Types
// ============================

export type TicketStatus = "active" | "used" | "expired";
export type PaymentStatus = "pending" | "success" | "failed" | "expired";

export interface TicketType {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  quota: number;
  sold: number;
  remaining: number;
  expiredAt: string; // ISO date for countdown
  maxPerUser: number;
}

export interface UserTicket {
  id: string;
  ticketCode: string;
  event: EventSummary;
  ticketType: TicketType;
  status: TicketStatus;
  qrCodeData: string;
  purchasedAt: string;
  checkedInAt?: string;
  userName: string;
}

// ============================
// Transaction Types
// ============================

export interface Transaction {
  id: string;
  orderId: string;
  event: EventSummary;
  ticketType: TicketType;
  quantity: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================
// User Types
// ============================

export type UserRole = "user" | "sub_org" | "talent" | "mentor" | "admin";
export type AccountStatus = "active" | "inactive" | "banned";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  status: AccountStatus;
  institution?: string;
  classYear?: string;
  participantCategory?: string;
  isOnboarded: boolean;
  lastLogin?: string;
  createdAt: string;
}

// ============================
// Sub-Organization Types
// ============================

export interface SubOrganization {
  id: string;
  name: string;
  logoUrl: string;
  description?: string;
  totalEvents: number;
  totalTicketsSold: number;
  totalParticipants: number;
  totalRevenue: number;
}

// ============================
// Scanner Types
// ============================

export type ScanResultType = "valid" | "already_used" | "invalid" | "wrong_event";

export interface ScanResult {
  type: ScanResultType;
  ticketCode?: string;
  participantName?: string;
  ticketType?: string;
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
// Talent Types
// ============================

export type TalentScheduleStatus = "draft" | "scheduled" | "ready" | "performed";

export interface Talent {
  id: string;
  name: string;
  category: string;
  subOrganization: SubOrganization;
  bio?: string;
  portfolioUrl?: string;
  contact?: string;
  avatarUrl?: string;
  performanceHistory: TalentPerformance[];
}

export interface TalentPerformance {
  id: string;
  eventId: string;
  eventName: string;
  performanceTime: string;
  duration: number; // minutes
  status: TalentScheduleStatus;
}

export interface MentoringSession {
  id: string;
  eventId: string;
  eventName: string;
  scheduledAt: string;
  duration: number;
  zoomMeetingUrl: string;
  zoomMeetingId: string;
  status: "upcoming" | "ongoing" | "completed";
}

// ============================
// Timeline Types
// ============================

export type MilestoneStatus = "pending" | "in_progress" | "completed";

export interface TimelineMilestone {
  id: string;
  name: string;
  description?: string;
  status: MilestoneStatus;
  date?: string;
  order: number;
}

// ============================
// Admin Types
// ============================

export interface AdminMetrics {
  totalUsers: number;
  totalSubOrgs: number;
  totalEvents: number;
  totalTicketsSold: number;
  totalTalent: number;
  totalCheckIns: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  activityType: string;
  description: string;
  device: string;
  timestamp: string;
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
