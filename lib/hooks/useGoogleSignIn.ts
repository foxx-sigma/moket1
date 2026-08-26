// ============================================================
// useGoogleSignIn — Hook untuk Google Identity Services (GSI)
// ============================================================
// Memuat script GSI secara lazy (tidak blocking halaman),
// lalu me-render tombol Google asli secara TERSEMBUNYI dan
// memicu klik-nya secara programatik saat user klik tombol custom.
// Ini memunculkan layar "Pilih Akun" Google yang sesungguhnya,
// bukan One Tap card yang melayang.
//
// Cara pakai:
//   const { signIn, isLoading, isGsiReady, hiddenButtonRef } = useGoogleSignIn();
//
//   // Di JSX, letakkan div tersembunyi di dekat tombol custom:
//   <div ref={hiddenButtonRef} style={{ visibility: "hidden", position: "absolute", pointerEvents: "none" }} />
//
//   // Tombol custom:
//   <Button onClick={() => signIn(handleToken, handleError)}>
//     Masuk dengan Google
//   </Button>
// ============================================================

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ── Type declarations untuk Google GSI global ──────────────

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GsiInitConfig) => void;
          renderButton: (
            parent: HTMLElement,
            options: GsiButtonConfig
          ) => void;
          prompt: (callback?: (n: PromptNotification) => void) => void;
          cancel: () => void;
        };
      };
    };
  }
}

interface GsiInitConfig {
  client_id: string;
  callback: (response: { credential: string }) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  context?: "signin" | "signup" | "use";
}

interface GsiButtonConfig {
  type?: "standard" | "icon";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
}

interface PromptNotification {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  getNotDisplayedReason: () => string;
  getDismissedReason: () => string;
}

// ── Konstanta ──────────────────────────────────────────────

const GSI_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

// ── Hook ──────────────────────────────────────────────────

export function useGoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGsiReady, setIsGsiReady] = useState(false);

  // Ref untuk container tombol Google tersembunyi.
  // Komponen pemanggil harus memasang ref ini ke <div> di JSX-nya.
  const hiddenButtonRef = useRef<HTMLDivElement>(null);

  // Menyimpan callback signIn terakhir agar bisa diakses di dalam
  // initialize() yang di-call ulang setiap klik (callback-nya harus fresh).
  const onSuccessRef = useRef<((idToken: string) => void) | null>(null);
  const onErrorRef = useRef<((message: string) => void) | undefined>(
    undefined
  );
  const contextRef = useRef<GsiInitConfig["context"]>("signin");

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  // ── Inisialisasi + render tombol tersembunyi saat GSI siap ──

  useEffect(() => {
    if (typeof document === "undefined") return;

    const tryInit = () => {
      const container = hiddenButtonRef.current;
      if (!window.google?.accounts?.id || !container) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          setIsLoading(false);
          if (response.credential) {
            onSuccessRef.current?.(response.credential);
          } else {
            onErrorRef.current?.("Tidak mendapatkan credential dari Google.");
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        context: contextRef.current,
      });

      window.google.accounts.id.renderButton(container, {
        type: "standard",
        theme: "outline",
        size: "large",
      });

      setIsGsiReady(true);
    };

    // Jika script sudah ada di DOM (misalnya dari hot-reload atau page lain)
    if (window.google?.accounts?.id) {
      // Defer agar hiddenButtonRef.current sudah ter-attach
      requestAnimationFrame(tryInit);
      return;
    }

    // Cegah inject script ganda
    if (document.querySelector(`script[src="${GSI_SCRIPT_SRC}"]`)) {
      // Script sudah di-inject tapi belum selesai load — polling
      let attempts = 0;
      const timer = setInterval(() => {
        attempts++;
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          tryInit();
        } else if (attempts >= 50) {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }

    // Inject script GSI
    const script = document.createElement("script");
    script.src = GSI_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Sedikit jeda agar GSI selesai inisialisasi internalnya
      setTimeout(tryInit, 100);
    };
    document.head.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  /**
   * Trigger Google Sign-In flow via hidden rendered button.
   * @param onSuccess dipanggil dengan id_token (JWT string) saat berhasil
   * @param onError   dipanggil dengan pesan error jika gagal
   * @param context   "signin" | "signup" | "use" — konteks alur
   */
  const signIn = useCallback(
    (
      onSuccess: (idToken: string) => void,
      onError?: (message: string) => void,
      context: GsiInitConfig["context"] = "signin"
    ) => {
      // Validasi client ID
      if (!clientId) {
        onError?.(
          "NEXT_PUBLIC_GOOGLE_CLIENT_ID belum dikonfigurasi. Hubungi administrator."
        );
        return;
      }

      // GSI belum siap
      if (!isGsiReady) {
        onError?.("Google Sign-In belum siap, coba lagi sebentar lagi.");
        return;
      }

      // Simpan callback terbaru ke ref agar closure di initialize() selalu fresh
      onSuccessRef.current = onSuccess;
      onErrorRef.current = onError;
      contextRef.current = context;

      setIsLoading(true);

      // Cari tombol asli Google di dalam container tersembunyi lalu klik
      const container = hiddenButtonRef.current;
      if (!container) {
        setIsLoading(false);
        onError?.("Komponen Google Sign-In tidak ditemukan. Coba muat ulang halaman.");
        return;
      }

      const googleBtn = container.querySelector<HTMLElement>("div[role='button']");
      if (!googleBtn) {
        setIsLoading(false);
        onError?.(
          "Tombol Google Sign-In tidak ditemukan. Coba muat ulang halaman."
        );
        return;
      }

      googleBtn.click();
    },
    [clientId, isGsiReady]
  );

  return { signIn, isLoading, isGsiReady, hiddenButtonRef };
}
