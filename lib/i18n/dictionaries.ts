export const dictionaries = {
  id: {
    nav: {
      home: "Beranda",
      events: "Event",
      about: "Tentang",
      signIn: "Masuk",
      signUp: "Daftar",
      dashboard: "Dashboard",
      myTickets: "Tiket Saya",
      profile: "Profil",
      logout: "Keluar",
    },
    hero: {
      headline: "Temukan Event Seru di Moklet",
      subheadline:
        "Platform ticketing event digital SMK Telkom Malang. Beli tiket, dapatkan e-ticket QR, dan nikmati eventnya!",
      cta: "Lihat Event",
      ctaSecondary: "Pelajari Lebih Lanjut",
    },
    sections: {
      featuredEvents: "Event Unggulan",
      featuredEventsDesc: "Event terdekat yang tidak boleh kamu lewatkan",
      subOrganizations: "Penyelenggara",
      subOrganizationsDesc:
        "Sub-organisasi siswa yang menggelar event di SMK Telkom Malang",
      talent: "Talent Unggulan",
      talentDesc: "Kenali para talenta berbakat dari SMK Telkom Malang",
      howItWorks: "Cara Kerja",
      howItWorksDesc: "Cuma 4 langkah mudah untuk menikmati event",
      testimonials: "Apa Kata Mereka",
      testimonialsDesc:
        "Pengalaman pengguna MokeT dalam mengikuti event sekolah",
      ctaFooter: "Siap Ikut Event?",
      ctaFooterDesc:
        "Jangan sampai ketinggalan event seru di SMK Telkom Malang",
      ctaFooterButton: "Jelajahi Event Sekarang",
    },
    eventCard: {
      startFrom: "Mulai dari",
      free: "Gratis",
      upcoming: "Segera",
      ongoing: "Berlangsung",
      soldOut: "Habis",
      closed: "Ditutup",
    },
    footer: {
      description:
        "Platform ticketing event digital untuk mendukung program Moklet Go Global di SMK Telkom Malang.",
      quickLinks: "Tautan Cepat",
      contact: "Kontak",
      followUs: "Ikuti Kami",
      rights: "Hak cipta dilindungi.",
    },
    common: {
      loading: "Memuat...",
      error: "Terjadi kesalahan",
      retry: "Coba Lagi",
      noData: "Tidak ada data",
      search: "Cari...",
      filter: "Filter",
      clearFilters: "Hapus Filter",
      exportCsv: "Ekspor CSV",
      viewAll: "Lihat Semua",
      viewDetails: "Lihat Detail",
      back: "Kembali",
      next: "Selanjutnya",
      previous: "Sebelumnya",
      save: "Simpan",
      cancel: "Batal",
      delete: "Hapus",
      edit: "Edit",
      confirm: "Konfirmasi",
    },
  },
  en: {
    nav: {
      home: "Home",
      events: "Events",
      about: "About",
      signIn: "Sign In",
      signUp: "Sign Up",
      dashboard: "Dashboard",
      myTickets: "My Tickets",
      profile: "Profile",
      logout: "Logout",
    },
    hero: {
      headline: "Discover Exciting Events at Moklet",
      subheadline:
        "Digital event ticketing platform for SMK Telkom Malang. Buy tickets, get your QR e-ticket, and enjoy the event!",
      cta: "Browse Events",
      ctaSecondary: "Learn More",
    },
    sections: {
      featuredEvents: "Featured Events",
      featuredEventsDesc: "Upcoming events you don't want to miss",
      subOrganizations: "Organizers",
      subOrganizationsDesc:
        "Student sub-organizations hosting events at SMK Telkom Malang",
      talent: "Featured Talent",
      talentDesc:
        "Meet the talented individuals from SMK Telkom Malang",
      howItWorks: "How It Works",
      howItWorksDesc: "Just 4 easy steps to enjoy the event",
      testimonials: "What They Say",
      testimonialsDesc: "MokeT users' experience attending school events",
      ctaFooter: "Ready to Join an Event?",
      ctaFooterDesc: "Don't miss out on exciting events at SMK Telkom Malang",
      ctaFooterButton: "Explore Events Now",
    },
    eventCard: {
      startFrom: "Start from",
      free: "Free",
      upcoming: "Upcoming",
      ongoing: "Ongoing",
      soldOut: "Sold Out",
      closed: "Closed",
    },
    footer: {
      description:
        "Digital event ticketing platform supporting the Moklet Go Global program at SMK Telkom Malang.",
      quickLinks: "Quick Links",
      contact: "Contact",
      followUs: "Follow Us",
      rights: "All rights reserved.",
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      noData: "No data",
      search: "Search...",
      filter: "Filter",
      clearFilters: "Clear Filters",
      exportCsv: "Export CSV",
      viewAll: "View All",
      viewDetails: "View Details",
      back: "Back",
      next: "Next",
      previous: "Previous",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      confirm: "Confirm",
    },
  },
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale = "id"): Dictionary {
  return dictionaries[locale];
}
