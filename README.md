# Wisata Seribu Pura

Website frontend bertema pariwisata Bali, dibuat menggunakan Next.js, React, Tailwind CSS, HTML, CSS, dan JavaScript.

## Fitur
- Landing page dengan hero, destinasi populer, budaya, dan rekomendasi.
- Navbar responsif untuk desktop dan mobile.
- Halaman daftar destinasi.
- Pencarian berdasarkan nama/lokasi dan filter kategori.
- Halaman detail destinasi dengan tautan Google Maps.
- Halaman login/daftar berupa demo UI frontend.
- Halaman budaya Bali.

## Teknologi dan alasan pemilihan
1. **HTML** — struktur konten yang semantik dan mudah diakses.
2. **CSS** — mengatur detail visual, layout, responsivitas, dan efek tampilan.
3. **JavaScript** — menangani interaksi seperti menu mobile, pencarian, filter kategori, tab login/daftar, dan toggle password.
4. **React.js** — membagi antarmuka menjadi komponen yang dapat digunakan ulang, misalnya Navbar, Footer, dan kartu destinasi.
5. **Next.js** — framework berbasis React untuk routing halaman, struktur proyek, optimasi, dan pengembangan yang lebih terorganisir.
6. **Tailwind CSS** — mempercepat styling melalui utility classes, menjaga konsistensi warna, jarak, dan responsivitas.

**Catatan Bootstrap:** Bootstrap tidak dipasang bersamaan dengan Tailwind karena keduanya sama-sama menyediakan sistem styling dan komponen. Menggabungkan keduanya untuk proyek ini berpotensi membuat aturan CSS tumpang tindih. Tailwind dipilih sebagai framework CSS utama agar tampilan lebih mudah disesuaikan dengan desain Wisata Seribu Pura.

## Menjalankan proyek
Pastikan Node.js versi 18.18 atau lebih baru sudah terpasang.

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Untuk build:
```bash
npm run build
npm start
```

## Catatan pengerjaan
- Proyek ini adalah **frontend prototype**. Login/registrasi belum menggunakan backend atau database.
- Data destinasi disimpan sebagai data contoh pada `lib/data.js`.
- Gambar menggunakan URL Unsplash, sehingga perlu koneksi internet.
- Ganti data, foto, email, dan tautan sesuai kebutuhan kelompok sebelum dikumpulkan.
