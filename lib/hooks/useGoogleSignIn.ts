// ============================================================
// useGoogleSignIn — Hook untuk Google Identity Services (GSI)
// ============================================================
// Memuat script GSI secara lazy (tidak blocking halaman),
// lalu mengekspos fungsi `signIn(onSuccess, onError)` yang
// menampilkan One Tap / popup Google dan mengembalikan id_token.
//
// Cara pakai:
//   const { signIn, isLoading } = useGoogleSignIn();
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
  const scriptLoadedRef = useRef(false);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  // Inject script GSI sekali saat komponen pertama kali mount
  useEffect(() => {
    // Skip jika sudah ada atau SSR
    if (typeof document === "undefined") return;
    if (document.querySelector(`script[src="${GSI_SCRIPT_SRC}"]`)) {
      scriptLoadedRef.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = GSI_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
    };
    document.head.appendChild(script);

    return () => {
      // Bersihkan kalau komponen unmount sebelum script selesai load
      // (jarang terjadi, tapi defensive cleanup)
    };
  }, []);

  /**
   * Trigger Google Sign-In flow.
   * @param onSuccess dipanggil dengan id_token (JWT string) saat berhasil
   * @param onError   dipanggil dengan pesan error jika gagal / dibatalkan
   * @param context   "signin" | "signup" | "use" — teks yang ditampilkan Google
   */
  const signIn = useCallback(
    (
      onSuccess: (idToken: string) => void,
      onError?: (message: string) => void,
      context: GsiInitConfig["context"] = "signin"
    ) => {
      if (!clientId) {
        onError?.(
          "NEXT_PUBLIC_GOOGLE_CLIENT_ID belum dikonfigurasi. Hubungi administrator."
        );
        return;
      }

      setIsLoading(true);

      const tryInitAndPrompt = () => {
        if (!window.google?.accounts?.id) {
          setIsLoading(false);
          onError?.(
            "Gagal memuat Google Sign-In. Periksa koneksi internet dan coba lagi."
          );
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            setIsLoading(false);
            if (response.credential) {
              onSuccess(response.credential);
            } else {
              onError?.("Tidak mendapatkan credential dari Google.");
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
          context,
        });

        window.google.accounts.id.prompt((notification) => {
          // Prompt tidak tampil (browser memblokir, atau sudah pernah dismiss)
          if (notification.isNotDisplayed()) {
            setIsLoading(false);
            onError?.(
              `Login Google tidak dapat ditampilkan (${notification.getNotDisplayedReason()}). ` +
              "Pastikan popup tidak diblokir browser."
            );
          }
          // User menutup / skip One Tap
          if (notification.isSkippedMoment()) {
            setIsLoading(false);
          }
        });
      };

      // GSI script mungkin belum selesai load — polling singkat
      if (window.google?.accounts?.id) {
        tryInitAndPrompt();
      } else {
        let attempts = 0;
        const timer = setInterval(() => {
          attempts++;
          if (window.google?.accounts?.id) {
            clearInterval(timer);
            tryInitAndPrompt();
          } else if (attempts >= 30) {
            // Timeout setelah ~3 detik
            clearInterval(timer);
            setIsLoading(false);
            onError?.(
              "Gagal memuat Google Sign-In (timeout). Periksa koneksi internet."
            );
          }
        }, 100);
      }
    },
    [clientId]
  );

  return { signIn, isLoading };
}
