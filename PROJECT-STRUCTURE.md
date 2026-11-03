# Wisata Seribu Pura — struktur project

Project tetap menggunakan Next.js App Router. File `page.js` di dalam `app/` adalah pintu route; tampilan halaman dipisahkan ke `components/pages/` agar file route tetap singkat. Next.js menghasilkan HTML dari komponen React, jadi file HTML terpisah bukan pola normal App Router.

```text
app/
  layout.js                 # layout global + provider + navbar/footer
  globals.css               # style global
  page.js                   # route beranda
  budaya/page.js             # route budaya
  destinasi/page.js          # route daftar destinasi
  destinasi/[slug]/page.js   # route detail destinasi
  login/page.js              # route login/daftar
  profile/page.js            # route profil
components/
  layout/                    # Navbar dan Footer
  providers/                 # AuthProvider Firebase
  pages/                     # isi UI setiap halaman
data/
  destinations.js            # data destinasi wisata
  site-images.js              # pusat URL/path banner dan gambar section
lib/
  firebase.js                 # inisialisasi Firebase
public/
  images/                     # semua gambar lokal website
    banners/
    destinations/
    culture/
    general/
```

## Mengganti foto

1. Letakkan file foto di `public/images/` pada kategori yang sesuai.
2. Untuk banner/section beranda dan budaya, edit `data/site-images.js`.
3. Untuk foto destinasi, edit properti `image` pada objek yang sesuai di `data/destinations.js`.
4. Gunakan path seperti `/images/banners/home-bali.jpg` (jangan menulis `public` di URL).

Foto eksternal dari versi awal masih dipertahankan agar tampilan tidak rusak. Setelah foto lokal tersedia, ganti URL gambar di file data dengan path lokal.

## Setup

- Salin `.env.example` menjadi `.env.local`, lalu isi konfigurasi Firebase milik project.
- Jalankan `npm install`, kemudian `npm run dev`.
- Jangan commit atau membagikan `.env.local`.
