"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState("Masuk");
  const [notice, setNotice] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setNotice("Ini adalah demo tampilan frontend. Autentikasi belum dihubungkan ke backend.");
  }
  return <main className="relative flex min-h-[calc(100vh-150px)] items-center justify-center overflow-hidden bg-[#eeece3] px-5 py-16">
    <div className="absolute inset-0 opacity-25 image-cover" style={{backgroundImage:"url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=80)"}}/>
    <section className="relative w-full max-w-md rounded-3xl border border-white/70 bg-white/95 p-8 shadow-soft backdrop-blur">
      <div className="mb-7 grid grid-cols-2 rounded-full bg-stone-100 p-1">
        {["Masuk","Daftar"].map(t=><button key={t} onClick={()=>{setTab(t);setNotice("");}} className={`rounded-full py-3 text-sm font-bold ${tab===t?"bg-forest text-white shadow":"text-stone-500"}`}>{t}</button>)}
      </div>
      <p className="eyebrow">Wisata Seribu Pura</p>
      <h1 className="mt-2 text-3xl font-extrabold">{tab==="Masuk"?"Selamat Datang Kembali!":"Buat Akun Baru"}</h1>
      <p className="mt-3 text-sm leading-6 text-stone-500">{tab==="Masuk"?"Masuk untuk melanjutkan perjalanan bersama Wisata Seribu Pura.":"Daftar untuk menyimpan destinasi dan merencanakan perjalananmu."}</p>
      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        {tab==="Daftar" && <input required placeholder="Nama lengkap" className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-forest"/>}
        <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-forest"><Mail size={17} className="text-stone-400"/><input required type="email" placeholder="Email" className="w-full text-sm outline-none"/></label>
        <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-forest"><LockKeyhole size={17} className="text-stone-400"/><input required minLength={6} type={show?"text":"password"} placeholder="Password" className="w-full text-sm outline-none"/><button type="button" onClick={()=>setShow(!show)} className="text-stone-400">{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></label>
        {tab==="Masuk" && <div className="flex items-center justify-between text-xs text-stone-500"><label className="flex items-center gap-2"><input type="checkbox"/> Ingat saya</label><button type="button" className="font-semibold text-forest">Lupa password?</button></div>}
        <button className="w-full rounded-full bg-forest py-3.5 text-sm font-bold text-white transition hover:bg-lime-900">{tab==="Masuk"?"Masuk":"Daftar"} <span aria-hidden>→</span></button>
      </form>
      {notice && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">{notice}</p>}
      <p className="mt-6 text-center text-sm text-stone-500">{tab==="Masuk"?"Belum punya akun?":"Sudah punya akun?"} <button onClick={()=>{setTab(tab==="Masuk"?"Daftar":"Masuk");setNotice("");}} className="font-bold text-forest">{tab==="Masuk"?"Daftar di sini":"Masuk di sini"}</button></p>
      <Link href="/" className="mt-7 block text-center text-xs text-stone-400 hover:text-forest">← Kembali ke beranda</Link>
    </section>
  </main>;
}
