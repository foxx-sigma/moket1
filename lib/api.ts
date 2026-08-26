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

export interface ForgotPasswordPayload {
  email: string;
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
 * GET /api/auth/me
 * Mengembalikan user yang sedang login berdasarkan Bearer token.
 * Response backend: { success, message, data: { user: AuthUser } }
 */
export async function apiGetMe(): Promise<AuthUser> {
  // Backend wraps user satu level lebih dalam: data.user
  const data = await request<{ user: AuthUser }>("api/auth/me", {}, true);
  return data.user;
}

/**
 * POST /api/auth/forgot-password
 */
export async function apiForgotPassword(
  payload: ForgotPasswordPayload
): Promise<{ message: string }> {
  return request<{ message: string }>("api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
