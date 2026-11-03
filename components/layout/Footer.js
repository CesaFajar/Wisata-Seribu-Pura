import Link from "next/link";
import { Trees, Instagram, MapPin, Mail } from "lucide-react";
export default function Footer() {
 return <footer id="tentang" className="border-t border-stone-200 bg-[#efede5]">
  <div className="container-page grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
   <div><Link href="/" className="flex items-center gap-2 text-forest"><Trees size={28}/><span className="font-extrabold text-ink">Wisata Seribu Pura</span></Link><p className="mt-3 max-w-sm text-sm leading-6 text-stone-600">Jelajahi Bali, kenali budayanya. Temukan inspirasi perjalananmu bersama kami.</p><p className="mt-5 text-xs text-stone-500">© 2026 Wisata Seribu Pura.</p></div>
   <div><h3 className="font-bold">Navigasi</h3><div className="mt-4 grid gap-3 text-sm text-stone-600"><Link href="/">Beranda</Link><Link href="/destinasi">Destinasi</Link><Link href="/budaya">Budaya</Link><Link href="/login">Login</Link></div></div>
   <div><h3 className="font-bold">Kontak</h3><div className="mt-4 grid gap-3 text-sm text-stone-600"><p className="flex items-center gap-2"><Mail size={15}/> info@wisataseribupura.id</p><p className="flex items-center gap-2"><MapPin size={15}/> Bali, Indonesia</p><p className="flex items-center gap-2"><Instagram size={15}/> @wisataseribupura</p></div></div>
  </div>
 </footer>
}
