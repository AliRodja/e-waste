# Deskripsi Lengkap Aplikasi

## E-Waste — Sistem Informasi Pengelolaan Limbah Elektronik Berbasis Web

---

## 1. Latar Belakang

Pertumbuhan konsumsi perangkat elektronik yang pesat di masyarakat turut memicu peningkatan volume limbah elektronik (*electronic waste* atau *e-waste*) secara signifikan. Limbah elektronik seperti telepon seluler, laptop, kabel, baterai, dan komponen elektronik lainnya umumnya mengandung Bahan Berbahaya dan Beracun (B3) yang berpotensi mencemari lingkungan apabila tidak dikelola dengan tepat. Di sisi lain, kesadaran serta akses masyarakat terhadap layanan pengelolaan limbah elektronik yang resmi dan bertanggung jawab masih tergolong rendah, salah satunya disebabkan oleh minimnya informasi mengenai lokasi titik pengumpulan (*drop point*) dan proses penyerahan yang belum terstandarisasi.

Berdasarkan permasalahan tersebut, dibutuhkan sebuah sistem yang mampu menjembatani masyarakat dengan pihak pengelola limbah elektronik secara terintegrasi, transparan, dan memberikan nilai tambah berupa insentif bagi partisipasi aktif pengguna.

---

## 2. Deskripsi Umum Aplikasi

**E-Waste** merupakan platform berbasis web yang menghubungkan masyarakat (individu maupun instansi) yang memiliki limbah elektronik dengan mitra pengelola resmi, seperti bank sampah elektronik atau perusahaan daur ulang bersertifikasi. Melalui aplikasi ini, pengguna dapat mengajukan permintaan penjemputan atau pengantaran limbah elektronik, memantau status transaksi secara real-time, serta memperoleh poin sebagai bentuk apresiasi yang dapat ditukarkan dengan berbagai hadiah.

Aplikasi ini dibangun dengan pendekatan *web application* (bukan aplikasi mobile native) yang dikemas dalam bentuk *Progressive Web App* (PWA), sehingga dapat diakses secara lintas perangkat melalui peramban (browser) sekaligus dapat dipasang (*installable*) layaknya aplikasi native pada perangkat seluler, tanpa memerlukan proses distribusi melalui toko aplikasi.

---

## 3. Tujuan Pengembangan

1. Menyediakan sarana bagi masyarakat untuk menyerahkan limbah elektronik secara mudah, terjadwal, dan tertelusur.
2. Meningkatkan kesadaran masyarakat mengenai bahaya limbah elektronik melalui konten edukasi yang terintegrasi dalam aplikasi.
3. Membantu mitra pengelola dalam melakukan verifikasi dan pencatatan limbah elektronik yang diterima secara digital.
4. Mendorong partisipasi masyarakat melalui sistem insentif berbasis poin dan reward.
5. Menyediakan data statistik pengumpulan limbah elektronik secara periodik bagi kebutuhan pelaporan dan pengambilan keputusan.

---

## 4. Ruang Lingkup Aplikasi

Ruang lingkup pengembangan aplikasi mencakup tiga peran pengguna utama, yaitu masyarakat (pengguna), mitra pengelola, dan admin, dengan cakupan fungsional sebagai berikut:

- Pengelolaan akun dan profil pengguna.
- Pengajuan dan pelacakan permintaan penjemputan/pengantaran limbah elektronik.
- Visualisasi lokasi titik pengumpulan melalui peta interaktif.
- Verifikasi limbah elektronik oleh mitra pengelola berbasis foto dan kategori.
- Sistem poin dan penukaran reward.
- Konten edukasi terkait pengelolaan limbah elektronik.
- Pelaporan statistik periodik bagi admin.
- Notifikasi status transaksi bagi pengguna dan mitra.

Ruang lingkup ini tidak mencakup proses pengolahan fisik limbah elektronik itu sendiri (daur ulang, pemusnahan komponen B3, dsb.), karena aplikasi berperan sebagai sistem informasi dan penghubung, bukan sebagai sistem pengelolaan limbah secara fisik.

---

## 5. Aktor dan Peran Pengguna

| Aktor | Deskripsi Peran |
|---|---|
| **Pengguna/Masyarakat** | Pihak yang menyerahkan limbah elektronik, mengajukan permintaan pickup/drop-off, memantau status transaksi, dan mengumpulkan poin |
| **Mitra Pengelola** | Bank sampah elektronik atau perusahaan daur ulang bersertifikasi yang menerima, memverifikasi, dan mengelola limbah elektronik dari pengguna |
| **Admin** | Pengelola sistem yang bertanggung jawab atas manajemen data pengguna, mitra, transaksi, serta penyusunan laporan statistik |

---

## 6. Ringkasan Fitur Utama

Fitur-fitur utama aplikasi disusun berdasarkan kebutuhan masing-masing aktor sebagaimana telah dirumuskan dalam User Requirements (UR) dan System Requirements (SR), meliputi:

- **Registrasi dan autentikasi** akun untuk seluruh aktor.
- **Pengajuan permintaan** penjemputan/pengantaran limbah elektronik dengan unggah foto dan kategori limbah.
- **Peta interaktif** untuk menampilkan lokasi titik pengumpulan terdekat.
- **Pelacakan status transaksi** secara real-time.
- **Sistem poin dan reward** berdasarkan kategori dan jumlah/berat limbah yang diverifikasi.
- **Verifikasi limbah elektronik** oleh mitra pengelola berbasis foto dan formulir kondisi barang.
- **Barcode/QR code** untuk pelacakan aset limbah elektronik secara fisik.
- **Konten edukasi** mengenai bahaya dan tata cara pengelolaan limbah elektronik.
- **Notifikasi** status transaksi melalui push notification dan/atau email.
- **Dashboard admin** untuk manajemen data dan pelaporan statistik periodik (PDF/Excel).

---

## 7. Arsitektur Teknologi (Tech Stack)

Aplikasi dikembangkan menggunakan pendekatan **Next.js Full-Stack**, di mana frontend dan backend berada dalam satu basis kode (*codebase*) yang sama, dengan Route Handlers sebagai pola utama penanganan permintaan data (mengikuti pola REST API).

| Layer | Teknologi | Keterangan |
|---|---|---|
| Framework | Next.js 15 (App Router) | Frontend dan backend dalam satu aplikasi |
| Bahasa Pemrograman | TypeScript | Menjamin keamanan tipe data end-to-end |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Komponen UI | shadcn/ui | Komponen dashboard (table, form, modal) |
| Ikon | Lucide React | Set ikon yang konsisten dengan shadcn/ui |
| Backend API | Route Handlers (Next.js) | Pola REST API berbasis file (`route.ts`) |
| ORM | Prisma | Query database yang type-safe |
| Basis Data | PostgreSQL (hosting: Neon) | Basis data relasional |
| Autentikasi | NextAuth.js (Auth.js v5) | Manajemen sesi dan login |
| Validasi Data | Zod | Validasi input pada Route Handlers |
| Penyimpanan Gambar | Cloudinary | Unggah dan optimasi foto bukti limbah elektronik |
| Peta Interaktif | React Leaflet + OpenStreetMap | Visualisasi lokasi titik pengumpulan |
| Barcode/QR | html5-qrcode, qrcode.react | Pemindaian dan pembuatan kode aset |
| Dokumen PDF | @react-pdf/renderer | Pembuatan surat elektronik dan laporan |
| Email | Resend + React Email | Pengiriman notifikasi dan surat elektronik |
| PWA & Push Notification | Serwist | Instalasi aplikasi dan notifikasi push |
| SEO/Metadata | Next.js Metadata API (OpenGraph) | Optimasi tampilan tautan saat dibagikan |
| Deployment | Vercel | Hosting terintegrasi untuk Next.js |

---

## 8. Alur Kerja Sistem Secara Umum

1. Pengguna melakukan registrasi/login ke dalam aplikasi.
2. Pengguna mengajukan permintaan penjemputan atau pengantaran limbah elektronik dengan melampirkan foto dan kategori barang.
3. Sistem meneruskan permintaan kepada mitra pengelola terdekat berdasarkan lokasi.
4. Mitra pengelola menerima permintaan dan melakukan verifikasi limbah elektronik (jenis, jumlah/berat, kondisi) disertai bukti foto.
5. Sistem menghitung dan menambahkan poin ke akun pengguna secara otomatis berdasarkan hasil verifikasi.
6. Pengguna dapat menukarkan poin dengan reward yang tersedia atau memantau riwayat transaksinya.
7. Admin memantau keseluruhan aktivitas sistem dan menghasilkan laporan statistik secara periodik.

---

## 9. Manfaat yang Diharapkan

1. Memudahkan masyarakat dalam menyerahkan limbah elektronik secara resmi dan terjadwal.
2. Mengurangi risiko pencemaran lingkungan akibat penanganan limbah elektronik yang tidak tepat.
3. Meningkatkan partisipasi masyarakat melalui sistem insentif yang transparan.
4. Memberikan kemudahan bagi mitra pengelola dalam mencatat dan memverifikasi limbah elektronik secara digital.
5. Menghasilkan data dan laporan yang akurat sebagai dasar evaluasi program pengelolaan limbah elektronik.

---

*Dokumen ini merupakan deskripsi awal aplikasi E-Waste yang dapat dikembangkan lebih lanjut menjadi proposal, dokumen SRS (Software Requirements Specification), maupun bahan pendukung perancangan sistem (Use Case Diagram, ERD, dan lain-lain).*
