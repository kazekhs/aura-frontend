
#### Install Dependencies
Gunakan Bun (rekomendasi) atau npm untuk menginstall seluruh dependensi package:
```bash
# Menggunakan Bun (Rekomendasi)
bun install

# Atau menggunakan npm
npm install
```

#### Setup Environment Variables
Buat file bernama `.env` pada root directory project dan salin variabel berikut. Sesuaikan dengan Supabase project Anda sendiri:
```env
SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
SUPABASE_URL="https://your-supabase-project-id.supabase.co"
VITE_SUPABASE_PROJECT_ID="your-supabase-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
VITE_SUPABASE_URL="https://your-supabase-project-id.supabase.co"
```

#### Jalankan Aplikasi secara Lokal (Development Mode)
Jalankan dev server lokal untuk memulai proses koding:
```bash
# Menggunakan Bun (Rekomendasi)
bun run dev

# Atau menggunakan npm
npm run dev
```
Setelah dijalankan, buka browser di alamat: `http://localhost:8080` (atau port lain yang tertera di terminal).

---

## Build dan Deploy

### Build untuk Produksi
Gunakan perintah build untuk mengompilasi aset klien & server ke folder `dist`:
```bash
# Menggunakan Bun
bun run build

# Atau menggunakan npm
npm run build
```


## Struktur Folder 

```text
├── components/          # Komponen UI Reusable (Site Header, Site Footer, dll)
│   ├── ui/              # Komponen dasar UI Shadcn (Button, Card, Badge, dll)
│   └── jakarta-diorama  # Map 3D Diorama menggunakan MapLibre GL
├── hooks/               # Custom hooks React
├── lib/                 # Utilitas konfigurasi (auth, supabase client, helper API)
├── routes/              # Routing utama TanStack Start/Router
│   ├── _app/            # Wrapper layout dashboard
│   ├── admin/           # Dashboard khusus Admin dinas
│   ├── petugas/         # Portal khusus Petugas lapangan
│   ├── warga/           # Portal pelaporan warga
│   ├── index.tsx        # Homepage utama AURA
│   ├── tim.tsx          # Halaman Tim pengembang
│   └── tentang.tsx      # Halaman profil AURA
├── styles.css           # Custom theme design system & Tailwind layer
└── wrangler.jsonc       # Konfigurasi Cloudflare Workers/Pages
```

