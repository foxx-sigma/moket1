// ============================================================
// useCountdown — Hook countdown timer untuk expired time tiket
// ============================================================
// Input : ISO 8601 datetime string (kapan tiket expired)
// Output: sisa waktu dalam detik, menit, jam, hari + status
// ============================================================

import { useState, useEffect } from "react";

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
  /** Format singkat: "2h 30m", "45m 10d", "Berakhir", dsb */
  formatted: string;
}

function calculateCountdown(targetDate: string): CountdownState {
  const now = Date.now();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
      formatted: "Berakhir",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formatted: string;
  if (days > 0) {
    formatted = `${days}h ${hours}j`;
  } else if (hours > 0) {
    formatted = `${hours}j ${minutes}m`;
  } else if (minutes > 0) {
    formatted = `${minutes}m ${seconds}d`;
  } else {
    formatted = `${seconds}d`;
  }

  return { days, hours, minutes, seconds, totalSeconds, isExpired: false, formatted };
}

/**
 * @param targetDate - ISO 8601 datetime string kapan waktu berakhir
 * @param enabled - set ke false untuk pause countdown (misal saat modal tutup)
 */
export function useCountdown(
  targetDate: string,
  enabled: boolean = true
): CountdownState {
  const [state, setState] = useState<CountdownState>(() =>
    calculateCountdown(targetDate)
  );

  useEffect(() => {
    if (!enabled || state.isExpired) return;

    const interval = setInterval(() => {
      const next = calculateCountdown(targetDate);
      setState(next);
      if (next.isExpired) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, enabled, state.isExpired]);

  return state;
}
