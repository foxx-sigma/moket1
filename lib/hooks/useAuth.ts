// ============================================================
// useAuth — Hook untuk membaca state autentikasi
// ============================================================
// Fetch user aktif dari GET /api/auth/me menggunakan cookie
// Sanctum. Jika belum login (401), isAuthenticated = false.
// ============================================================

import { useState, useEffect } from "react";
import type { User, UserRole, OrgMemberRole } from "@/lib/types";
import { apiGetMe, type ApiError } from "@/lib/api";

export interface AuthState {
  user: User | null;
  role: UserRole | null;
  /** Role kontekstual di dalam organisasi yang sedang aktif */
  orgMemberRole: OrgMemberRole | null;
  /** ID organisasi yang sedang aktif (jika user adalah anggota organisasi) */
  activeOrgId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    orgMemberRole: null,
    activeOrgId: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    let cancelled = false;

    apiGetMe()
      .then((apiUser) => {
        if (cancelled) return;

        // Map snake_case API response ke camelCase User type
        const user: User = {
          id: apiUser.id,
          name: apiUser.name,
          email: apiUser.email,
          role: apiUser.role as UserRole,
          status: apiUser.status as User["status"],
          createdAt: apiUser.created_at,
          updatedAt: apiUser.updated_at,
        };

        setState({
          user,
          role: user.role,
          orgMemberRole: null,
          activeOrgId: null,
          isLoading: false,
          isAuthenticated: true,
        });
      })
      .catch((err: ApiError) => {
        if (cancelled) return;
        // 401 = belum login; lainnya = error jaringan dll
        setState({
          user: null,
          role: null,
          orgMemberRole: null,
          activeOrgId: null,
          isLoading: false,
          isAuthenticated: false,
        });
        if (err.status !== 401) {
          console.error("[useAuth] Gagal fetch /api/auth/me:", err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

