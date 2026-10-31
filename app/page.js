import Link from "next/link";
import { ArrowRight, MapPin, Star, Compass, Flower2 } from "lucide-react";
import { destinations } from "@/lib/data";

function DestinationCard({ item }) {
  return (
    <Link href={`/destinasi/${item.slug}`} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="image-cover relative h-48" style={{backgroundImage: `url(${item.image})`}}>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest">{item.category}</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-forest"><Star size={14} fill="currentColor"/></span>
      </div>
      <div className="p-4">
        <h3 className="font-bold group-hover:text-forest">{item.name}</h3>
        <p className="mt-2 flex items-center gap-1 text-sm text-stone-500"><MapPin size={14}/>{item.location}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[590px] items-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 image-cover" style={{backgroundImage:"url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=85)"}} />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-page relative z-10 py-24 text-white">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.28em] text-amber-100">Jelajahi keindahan Bali</p>
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.08] md:text-7xl">Temukan Destinasi Wisata Impian Anda</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">Dari pantai yang memukau hingga pura yang penuh makna, temukan pengalaman perjalanan yang tak terlupakan bersama Wisata Seribu Pura.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/destinasi" className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-white transition hover:bg-lime-900">Jelajahi Destinasi <ArrowRight size={17}/></Link>
            <Link href="/login" className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10">Masuk / Daftar</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="eyebrow">Pilihan pengunjung</p><h2 className="mt-2 text-3xl font-bold">Destinasi Populer</h2></div>
          <Link href="/destinasi" className="hidden items-center gap-2 text-sm font-semibold text-forest sm:flex">Lihat semua <ArrowRight size={16}/></Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(0,4).map(item => <DestinationCard key={item.slug} item={item}/>)}
        </div>
      </section>

      <section className="bg-[#eeece2] py-16">
        <div className="container-page grid items-center gap-10 md:grid-cols-2">
          <div className="image-cover min-h-[330px] rounded-3xl" style={{backgroundImage:"url(https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=85)"}} />
          <div>
            <p className="eyebrow">Rich culture & heritage</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">Lebih dari Sekadar Wisata</h2>
            <p className="mt-4 leading-7 text-stone-600">Bali bukan hanya tentang alam. Tradisi, upacara, pura, dan kesenian menjadi bagian dari kehidupan masyarakat yang menarik untuk dikenal dan dihargai.</p>
            <Link href="/budaya" className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest px-5 py-3 text-sm font-semibold text-forest hover:bg-forest hover:text-white">Kenali Budaya Bali <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mb-8 flex items-end justify-between">
          <div><p className="eyebrow">Kurasi untukmu</p><h2 className="mt-2 text-3xl font-bold">Rekomendasi Untuk Kamu</h2></div>
          <Compass className="text-forest" size={30}/>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.slice(4,8).map(item => <DestinationCard key={item.slug} item={item}/>)}
        </div>
      </section>
    </main>
  );
}
