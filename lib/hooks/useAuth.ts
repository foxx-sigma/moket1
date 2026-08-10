// ============================================================
// useAuth — Hook untuk membaca state autentikasi
// ============================================================
// Implementasi sementara (mock) — swap ke session/cookie/API
// saat integrasi backend Laravel Sanctum.
// ============================================================

import { useState, useEffect } from "react";
import type { User, UserRole, OrgMemberRole } from "@/lib/types";

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

// Mock user — diganti dengan fetch ke /api/auth/me saat integrasi
const MOCK_USER: User = {
  id: "usr-fadhil",
  name: "Ahmad Fadhil",
  email: "fadhil@smktelkom-mlg.sch.id",
  role: "user",
  status: "active",
  createdAt: "2026-01-01T00:00:00+07:00",
  updatedAt: "2026-01-01T00:00:00+07:00",
};

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
    // TODO: Ganti dengan fetch ke /api/auth/me menggunakan Sanctum token dari cookie/localStorage
    const timer = setTimeout(() => {
      setState({
        user: MOCK_USER,
        role: MOCK_USER.role,
        orgMemberRole: null,
        activeOrgId: null,
        isLoading: false,
        isAuthenticated: true,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return state;
}
