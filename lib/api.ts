// ============================================================
// MokeT — API Client
// ============================================================
// Wrapper tipis di atas fetch yang membaca NEXT_PUBLIC_BASE_API_URL
// dari environment variable.
//
// Autentikasi menggunakan Bearer token (Laravel Sanctum).
// Token disimpan di cookie `moket_session` (JavaScript-accessible)
// dan dikirim via Authorization header pada setiap request.
//
// PENTING: `credentials: "include"` TIDAK digunakan karena backend
// mengembalikan Access-Control-Allow-Origin: * (wildcard), dan browser
// melarang kombinasi wildcard origin + credentials (CORS spec).
// ============================================================

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_API_URL ?? "").replace(/\/$/, "");

if (!BASE_URL && typeof window !== "undefined") {
  console.warn("[api] NEXT_PUBLIC_BASE_API_URL belum dikonfigurasi di .env");
}

// ============================================================
// Tipe internal
// ============================================================

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>; // Laravel validation errors
  status: number;
}

/**
 * Wrapper standar semua response backend MokeT:
 * { success: boolean, message: string, data: T }
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ============================================================
// Helper: baca Bearer token dari cookie moket_session (browser only)
// ============================================================

function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)moket_session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// ============================================================
// Helper: request utama
// ============================================================

async function request<T>(
  path: string,
  options: RequestInit = {},
  authenticated = false
): Promise<T> {
  const url = `${BASE_URL}/${path.replace(/^\//, "")}`;

  const token = authenticated ? getToken() : null;

  const defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Ngrok memerlukan header ini untuk menghindari redirect halaman warning
    "ngrok-skip-browser-warning": "true",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // --------------------------------------------------------
  // Network-level errors (CORS, server mati, DNS gagal, dll.)
  // akan melempar TypeError SEBELUM response diterima.
  // Kita tangkap di sini dan ubah menjadi ApiError yang ramah.
  // --------------------------------------------------------
  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers ?? {}),
      },
    });
  } catch (networkErr) {
    console.error("[api] Network error:", networkErr);

    // Coba deteksi penyebab umum
    let friendlyMessage =
      "Tidak dapat terhubung ke server. Periksa koneksi internet atau coba lagi nanti.";

    if (networkErr instanceof TypeError) {
      const msg = networkErr.message.toLowerCase();
      if (msg.includes("cors") || msg.includes("blocked")) {
        friendlyMessage =
          "Request diblokir oleh CORS. Pastikan backend mengizinkan origin dari localhost.";
      } else if (msg.includes("failed to fetch") || msg.includes("network")) {
        friendlyMessage =
          "Server tidak dapat dijangkau. Pastikan backend sedang berjalan dan URL ngrok masih aktif.";
      }
    }

    throw {
      message: friendlyMessage,
      errors: undefined,
      status: 0, // 0 = network error (bukan HTTP error)
    } satisfies ApiError;
  }

  // Untuk response tanpa body (204 No Content)
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  let body: unknown;
  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  if (!res.ok) {
    const err = body as Record<string, unknown>;
    throw {
      message:
        (err?.message as string) ?? `HTTP ${res.status}`,
      errors: (err?.errors as Record<string, string[]>) ?? undefined,
      status: res.status,
    } satisfies ApiError;
  }

  // Unwrap envelope { success, message, data } yang dipakai semua endpoint backend
  const wrapped = body as Record<string, unknown>;
  if (wrapped && typeof wrapped === "object" && "data" in wrapped) {
    return wrapped.data as T;
  }

  return body as T;
}


// ============================================================
// Auth API
// ============================================================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string; // Bearer token dari Laravel Sanctum
}

export interface RegisterResponse {
  user: AuthUser;
  token: string; // Bearer token dari Laravel Sanctum
}

/**
 * POST /api/auth/login
 * Setelah berhasil, token disimpan ke cookie `moket_session` oleh sign-in page.
 */
export async function apiLogin(payload: LoginPayload): Promise<LoginResponse> {
  return request<LoginResponse>("api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/auth/register
 */
export async function apiRegister(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return request<RegisterResponse>("api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/auth/logout
 */
export async function apiLogout(): Promise<void> {
  return request<void>("api/auth/logout", { method: "POST" }, true);
}

/**
 * POST /api/auth/google
 * Verifikasi Google ID Token di backend (via google/apiclient),
 * lalu return Sanctum token seperti login biasa.
 * `idToken` adalah credential JWT yang diterima dari Google Identity Services.
 */
export async function apiLoginWithGoogle(idToken: string): Promise<LoginResponse> {
  return request<LoginResponse>("api/auth/google", {
    method: "POST",
    body: JSON.stringify({ id_token: idToken }),
  });
}



/**
 * GET /api/auth/me
 * Mengembalikan user yang sedang login berdasarkan Bearer token.
 * Response backend: { success, message, data: { user: AuthUser } }
 */
export async function apiGetMe(): Promise<AuthUser> {
  // Backend wraps user satu level lebih dalam: data.user
  const data = await request<{ user: AuthUser }>("api/auth/me", {}, true);
  return data.user;
}

// ============================================================
// Homepage API
// Endpoint: GET /api/homepage/*
// Semua public, tidak perlu token.
// ============================================================

/**
 * Shape response dari FeaturedEventResource (BE):
 * id, slug, name (= judul event), posterUrl, startDate, location, organizer: { name, logoUrl }
 */
export interface FeaturedEvent {
  id: string;
  slug: string;
  name: string;
  posterUrl: string | null;
  startDate: string;
  location: string;
  organizer: {
    name: string;
    logoUrl: string | null;
  };
}

/**
 * Shape response dari SubOrganizationResource (BE):
 * id, name, slug, logoUrl, description
 */
export interface SubOrganization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
}

/**
 * Shape response dari TalentHighlightResource (BE):
 * id, name, category, bio, portfolioUrl
 */
export interface TalentHighlight {
  id: string;
  name: string;
  category: string;
  bio: string | null;
  portfolioUrl: string | null;
}

/**
 * GET /api/homepage/featured-events
 * Maks 3 event published terdekat.
 */
export async function apiFeaturedEvents(): Promise<FeaturedEvent[]> {
  return request<FeaturedEvent[]>("api/homepage/featured-events");
}

/**
 * GET /api/homepage/sub-organizations
 * Semua sub-organisasi aktif.
 */
export async function apiSubOrganizations(): Promise<SubOrganization[]> {
  return request<SubOrganization[]>("api/homepage/sub-organizations");
}

/**
 * GET /api/homepage/talent-highlights
 * Talent yang punya bio, max 6.
 */
export async function apiTalentHighlights(): Promise<TalentHighlight[]> {
  return request<TalentHighlight[]>("api/homepage/talent-highlights");
}

// ============================================================
// Events API
// Endpoint: GET /api/events, GET /api/events/{slug}
// ============================================================

/**
 * Shape response dari EventListItemResource (BE):
 * id, slug, name, posterUrl, category, location, scope, startDate, endDate,
 * organizer: { id, name, logoUrl }
 * CATATAN: Tidak ada field `priceStart` di response BE saat ini.
 */
export interface EventListItem {
  id: string;
  slug: string;
  name: string;
  posterUrl: string | null;
  category: string;
  location: string;
  scope: "internal" | "external";
  startDate: string;
  endDate: string | null;
  organizer: {
    id: string | null;
    name: string | null;
    logoUrl: string | null;
  };
}

/**
 * Shape response dari EventDetailResource (BE):
 * id, slug, name, posterUrl, description, category, location, scope, status,
 * startDate, endDate, organizer: { id, name, logoUrl, description },
 * tickets: [] (belum diisi BE), timeline: []
 */
export interface EventDetail {
  id: string;
  slug: string;
  name: string;
  posterUrl: string | null;
  description: string;
  category: string;
  location: string;
  scope: "internal" | "external";
  status: "draft" | "published" | "completed" | "cancelled";
  startDate: string;
  endDate: string | null;
  organizer: {
    id: string | null;
    name: string | null;
    logoUrl: string | null;
    description: string | null;
  };
  tickets: unknown[];
  timeline: unknown[];
}

/**
 * Query params untuk GET /api/events sesuai ListEventsRequest (BE).
 */
export interface ListEventsParams {
  q?: string;
  category?: string;
  subOrg?: string;
  scope?: "internal" | "external";
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string;   // YYYY-MM-DD
  sort?: "newest" | "nearest" | "price";
  page?: number;
  perPage?: number;
}

/**
 * Paginated response shape dari EventController::index.
 * Saat data kosong BE return { data: [], meta: {...} }.
 * Saat ada data, Laravel pagination collection dipakai.
 */
export interface PaginatedEvents {
  data: EventListItem[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
}

/**
 * GET /api/events
 * Discovery list event dengan filter & pagination.
 * EventController::index mengembalikan Laravel ResourceCollection (pagination)
 * yang TIDAK dibungkus envelope { data, message, success }.
 */
export async function apiGetEvents(
  params: ListEventsParams = {}
): Promise<PaginatedEvents> {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.category) query.set("category", params.category);
  if (params.subOrg) query.set("subOrg", params.subOrg);
  if (params.scope) query.set("scope", params.scope);
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.dateTo) query.set("dateTo", params.dateTo);
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.perPage) query.set("perPage", String(params.perPage));

  const qs = query.toString();
  const path = qs ? `api/events?${qs}` : "api/events";
  const url = `${BASE_URL}/${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (networkErr) {
    throw {
      message: "Tidak dapat terhubung ke server.",
      errors: undefined,
      status: 0,
    } satisfies ApiError;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as Record<string, unknown>;
    throw {
      message: (err?.message as string) ?? `HTTP ${res.status}`,
      errors: (err?.errors as Record<string, string[]>) ?? undefined,
      status: res.status,
    } satisfies ApiError;
  }

  return res.json() as Promise<PaginatedEvents>;
}

/**
 * GET /api/events/{slug}
 * Detail event (hanya yang published).
 * EventDetailResource mengembalikan { data: { ...fields } } (JsonResource wraps in data key).
 */
export async function apiGetEventBySlug(slug: string): Promise<EventDetail> {
  const url = `${BASE_URL}/api/events/${encodeURIComponent(slug)}`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  } catch (networkErr) {
    throw {
      message: "Tidak dapat terhubung ke server.",
      errors: undefined,
      status: 0,
    } satisfies ApiError;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as Record<string, unknown>;
    throw {
      message: (err?.message as string) ?? `HTTP ${res.status}`,
      errors: (err?.errors as Record<string, string[]>) ?? undefined,
      status: res.status,
    } satisfies ApiError;
  }

  const body = await res.json() as { data: EventDetail };
  return body.data;
}
