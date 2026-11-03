
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Trees,
  UserCircle,
  LogOut,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  const links = [
    ["Beranda", "/"],
    ["Destinasi", "/destinasi"],
    ["Budaya", "/budaya"],
    ["Tentang Kami", "/#tentang"],
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
    } catch (error) {
      console.error("Logout gagal:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fbfaf7]/95 backdrop-blur">
      <div className="container-page flex h-[76px] items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-forest"
        >
          <Trees size={29} />
          <span className="text-sm font-extrabold leading-tight text-ink">
            Wisata<br />Seribu Pura
          </span>
        </Link>

        {/* NAVIGASI DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, url]) => (
            <Link
              key={label}
              href={url}
              className="text-sm font-medium text-stone-600 transition hover:text-forest"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* AKSI DESKTOP */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/destinasi"
            aria-label="Cari destinasi"
            className="rounded-full p-2 text-stone-600 hover:bg-stone-100"
          >
            <Search size={18} />
          </Link>

          {!loading && (
            user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-forest hover:bg-stone-100"
                >
                  <UserCircle size={18} />
                  Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-lime-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white hover:bg-lime-900"
              >
                Login
              </Link>
            )
          )}
        </div>

        {/* TOMBOL MOBILE */}
        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* NAVIGASI MOBILE */}
      {open && (
        <nav className="container-page grid gap-1 pb-5 md:hidden">
          {links.map(([label, url]) => (
            <Link
              onClick={() => setOpen(false)}
              key={label}
              href={url}
              className="rounded-lg px-3 py-3 text-sm hover:bg-stone-100"
            >
              {label}
            </Link>
          ))}

          {!loading && (
            user ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  href="/profile"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full border border-stone-200 px-4 py-3 text-sm font-semibold text-forest"
                >
                  <UserCircle size={18} />
                  Profil
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-full bg-forest px-4 py-3 text-sm font-semibold text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                href="/login"
                className="mt-2 rounded-full bg-forest px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
