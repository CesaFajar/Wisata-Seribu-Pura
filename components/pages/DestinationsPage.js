"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react";
import { destinations } from "@/data/destinations";

const categories = ["Semua", "Pantai", "Pura", "Alam", "Budaya"];

export default function DestinationsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const filtered = useMemo(() => destinations.filter(item =>
    (category === "Semua" || item.category === category) &&
    (item.name.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase()))
  ), [query, category]);

  return (
    <main>
      <section className="bg-[#e9e6dc] py-16">
        <div className="container-page">
          <p className="eyebrow">Jelajahi lebih banyak</p>
          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Destinasi Wisata di Bali</h1>
          <p className="mt-4 max-w-2xl text-stone-600">Temukan tempat-tempat menarik yang bisa menjadi tujuan perjalananmu berikutnya.</p>
        </div>
      </section>
      <section className="container-page py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex w-full items-center gap-3 rounded-full border border-stone-200 bg-white px-5 py-3 lg:max-w-md">
            <Search size={18} className="text-stone-400"/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari destinasi wisata..." className="w-full bg-transparent text-sm outline-none"/>
          </label>
          <div className="flex flex-wrap items-center gap-2"><SlidersHorizontal size={17} className="mr-1 text-stone-500"/>{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category===c?"bg-forest text-white":"bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-100"}`}>{c}</button>)}</div>
        </div>
        <p className="mb-5 mt-8 text-sm text-stone-500">Menampilkan {filtered.length} destinasi</p>
        {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(item=><Link key={item.slug} href={`/destinasi/${item.slug}`} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            <div className="image-cover relative h-56" style={{backgroundImage:`url(${item.image})`}}><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest">{item.category}</span></div>
            <div className="p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">{item.name}</h2><span className="flex items-center gap-1 text-sm"><Star size={14} fill="#C69B42" className="text-amber-600"/>{item.rating}</span></div><p className="mt-2 flex items-center gap-1 text-sm text-stone-500"><MapPin size={14}/>{item.location}</p><p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">{item.description}</p></div>
          </Link>)}
        </div> : <div className="rounded-2xl bg-stone-100 p-12 text-center text-stone-500">Destinasi tidak ditemukan. Coba kata kunci atau kategori lain.</div>}
      </section>
    </main>
  );
}
