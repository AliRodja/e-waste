# CLAUDE.md — Context Project E-Waste

> File ini adalah sumber context utama untuk AI coding assistant. Baca file ini terlebih dahulu sebelum menjelajahi codebase. Update file ini setiap kali ada perubahan besar pada struktur, konvensi, atau stack.

---

## 1. Project Overview

**Nama:** E-Waste
**Tipe:** Web App (PWA-ready), bukan native mobile
**Deskripsi singkat:** Platform yang menghubungkan masyarakat (penyerah limbah elektronik) dengan mitra pengelola resmi (bank sampah elektronik/perusahaan daur ulang), dilengkapi sistem poin/reward, verifikasi berbasis foto, barcode/QR tracking, dan pelaporan periodik.

**3 Aktor:**
- `USER` — masyarakat yang menyerahkan e-waste
- `MITRA` — pengelola yang menerima & verifikasi e-waste
- `ADMIN` — pengelola sistem

---

## 2. Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router) — **full-stack**, backend via Route Handlers (BUKAN Server Actions sebagai pola utama) |
| Bahasa | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icon | **Lucide React** — satu-satunya icon set, jangan tambah library icon lain |
| ORM | Prisma |
| Database | PostgreSQL (hosting: Neon) |
| Auth | NextAuth.js (Auth.js v5) |
| Validasi | Zod |
| Upload gambar | Cloudinary |
| Peta | React Leaflet + OpenStreetMap (bukan Google Maps) |
| Barcode/QR | html5-qrcode (scan) + qrcode.react (generate) |
| PDF | @react-pdf/renderer |
| Email | Resend + React Email |
| PWA/Push | Serwist |
| SEO | Next.js Metadata API — **setiap page wajib punya `generateMetadata()` atau `export const metadata` dengan OpenGraph** |
| Deployment | Vercel |

---

## 3. Konvensi Struktur Folder

```
src/
├── app/
│   ├── (public)/        # landing, edukasi, login, register — akses tanpa auth
│   ├── (user)/           # dashboard USER
│   ├── (mitra)/          # dashboard MITRA
│   ├── (admin)/          # dashboard ADMIN
│   └── api/               # Route Handlers, satu folder per resource
│       └── [resource]/route.ts        # GET (list), POST (create)
│       └── [resource]/[id]/route.ts   # GET, PUT, DELETE per item
├── lib/
│   ├── prisma.ts          # Prisma client singleton
│   ├── auth.ts             # NextAuth config
│   └── metadata.ts          # helper default OpenGraph
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── [feature]/           # komponen spesifik per fitur
└── schemas/                  # Zod schema, satu file per resource
```

**Aturan:**
- Route Handlers = pola utama untuk semua mutasi/query data (bukan Server Actions).
- Setiap resource API punya Zod schema sendiri di `schemas/`.
- Route group `(public)`, `(user)`, `(mitra)`, `(admin)` memisahkan akses berdasarkan role.

---

## 4. Entitas Utama (konsep, sebelum finalisasi Prisma schema)

- `User` — id, nama, email, password, role (USER/MITRA/ADMIN), poin, createdAt
- `Pickup` — id, userId, kategori, deskripsi, fotoUrl, status (diajukan/diproses/dijemput/selesai), lokasi, createdAt
- `Verification` — id, pickupId, mitraId, jenis, jumlah/berat, kondisi, fotoBuktiUrl, poinDihasilkan
- `Reward` — id, nama, deskripsi, poinDibutuhkan, stok
- `Redemption` — id, userId, rewardId, status, createdAt
- `DropPoint` — id, nama, alamat, latitude, longitude, mitraId
- `Article` — id, judul, konten, kategori (untuk edukasi)

> Belum final — sesuaikan dengan `prisma/schema.prisma` begitu dibuat, dan update bagian ini.

---

## 5. Ringkasan Fitur (referensi ke UR/SR)

- Registrasi & autentikasi (semua role)
- Pengajuan pickup/drop-off dengan foto + kategori
- Peta interaktif titik pengumpulan
- Tracking status transaksi real-time
- Sistem poin otomatis dari hasil verifikasi
- Penukaran poin dengan reward
- Verifikasi limbah oleh mitra (foto wajib)
- Barcode/QR untuk tracking aset fisik
- Konten edukasi
- Notifikasi (push + email)
- Dashboard admin (CRUD data + laporan PDF/Excel periodik)

Detail lengkap UR/SR ada di dokumen `Deskripsi_Aplikasi_EWaste.md`.

---

## 6. Environment Variables (placeholder — isi sesuai setup asli)

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
```

---

## 7. Do's & Don'ts untuk AI Assistant

**Do:**
- Gunakan Route Handlers untuk semua backend logic.
- Gunakan Zod untuk validasi setiap input di Route Handler.
- Gunakan Lucide React untuk semua icon.
- Tambahkan `generateMetadata()`/OpenGraph di setiap page baru.
- Ikuti struktur folder route group berdasarkan role.

**Don't:**
- Jangan pakai Server Actions sebagai pola utama mutasi data.
- Jangan tambah library icon selain Lucide.
- Jangan pakai Google Maps API (pakai Leaflet + OpenStreetMap).
- Jangan baca seluruh isi folder `node_modules` atau file besar lain kecuali diminta eksplisit.
