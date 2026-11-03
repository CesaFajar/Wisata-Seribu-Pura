import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star, Clock, Ticket, ArrowLeft } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function DestinationDetailPage({ slug }) {
  const item = destinations.find(d => d.slug === slug);
  if (!item) notFound();
  return <main className="container-page py-12">
    <Link href="/destinasi" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-forest"><ArrowLeft size={16}/> Kembali ke destinasi</Link>
    <div className="image-cover h-[360px] rounded-3xl md:h-[500px]" style={{backgroundImage:`url(${item.image})`}}/>
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
      <div><span className="rounded-full bg-[#e8eddf] px-4 py-2 text-xs font-bold text-forest">{item.category}</span><h1 className="mt-5 text-4xl font-extrabold">{item.name}</h1><p className="mt-3 flex items-center gap-2 text-stone-500"><MapPin size={17}/>{item.location}</p><p className="mt-7 max-w-3xl leading-8 text-stone-600">{item.description}</p><h2 className="mt-9 text-xl font-bold">Informasi Kunjungan</h2><p className="mt-3 leading-7 text-stone-600">Hormati aturan setempat, gunakan pakaian yang sopan ketika memasuki area suci, dan jaga kebersihan lingkungan selama berkunjung.</p></div>
      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-soft"><div className="flex items-center justify-between"><span className="font-semibold">Informasi singkat</span><span className="flex items-center gap-1 text-sm"><Star size={14} fill="#C69B42" className="text-amber-600"/>{item.rating}</span></div><div className="mt-6 space-y-5 text-sm text-stone-600"><p className="flex gap-3"><MapPin className="text-forest" size={18}/>{item.location}</p><p className="flex gap-3"><Clock className="text-forest" size={18}/>Periksa jam kunjungan sebelum berangkat</p><p className="flex gap-3"><Ticket className="text-forest" size={18}/>Harga tiket mengikuti ketentuan pengelola</p></div><a href={item.map} target="_blank" rel="noreferrer" className="mt-7 block rounded-full bg-forest px-5 py-3 text-center text-sm font-semibold text-white hover:bg-lime-900">Lihat Lokasi di Peta</a></aside>
    </div>
  </main>;
}
