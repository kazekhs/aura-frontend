import { Construction, Wrench } from "lucide-react";

// Dot warna di depan label (status tidak hanya dibedakan lewat warna).
const DOT = "before:mr-1.5 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:content-['']";

export const CATEGORY_LABEL = {
  jalan_berlubang: "Jalan Berlubang",
  trotoar_rusak: "Fasilitas Umum Rusak",
} as const;

export const CATEGORY_ICON = {
  jalan_berlubang: Construction,
  trotoar_rusak: Wrench,
};

export const STATUS_LABEL = {
  pending: "Menunggu Verifikasi Petugas",
  verified: "Terverifikasi",
  in_progress: "Dikerjakan Petugas",
  resolved: "Selesai Diperbaiki",
  rejected: "Laporan Ditolak",
} as const;

export const STATUS_TONE: Record<keyof typeof STATUS_LABEL, string> = {
  pending: `${DOT} before:bg-warning bg-warning/15 text-warning-foreground border-warning/30`,
  verified: `${DOT} before:bg-info bg-info/15 text-[#1F5A94] border-info/30`,
  in_progress: `${DOT} before:bg-orange bg-orange/15 text-[#A34710] border-orange/30`,
  resolved: `${DOT} before:bg-success bg-success/15 text-[#1F7A44] border-success/30`,
  rejected: `${DOT} before:bg-destructive bg-destructive/15 text-[#A82E2E] border-destructive/30`,
};

export const URGENCY_LABEL = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
  critical: "Kritis",
} as const;

export const URGENCY_TONE: Record<keyof typeof URGENCY_LABEL, string> = {
  low: `${DOT} before:bg-urgency-low bg-sage text-forest`,
  medium: `${DOT} before:bg-urgency-medium bg-warning/20 text-warning-foreground`,
  high: `${DOT} before:bg-urgency-high bg-orange/20 text-[#A34710]`,
  critical: `${DOT} before:bg-urgency-critical bg-destructive/20 text-[#A82E2E]`,
};
