
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/providers/AuthProvider";
import { siteImages } from "@/data/site-images";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [show, setShow] = useState(false);
  const [tab, setTab] = useState("Masuk");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("error");
  const [loading, setLoading] = useState(false);

  // Redirect pengguna yang sudah login
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/profile");
    }
  }, [user, authLoading, router]);

  // Terjemahan error Firebase
  const getFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Email ini sudah terdaftar. Silakan masuk.";

      case "auth/invalid-email":
        return "Format email tidak valid.";

      case "auth/weak-password":
        return "Password terlalu lemah. Gunakan minimal 6 karakter.";

      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Email atau password yang kamu masukkan salah.";

      case "auth/too-many-requests":
        return "Terlalu banyak percobaan. Coba lagi beberapa saat.";

      case "auth/network-request-failed":
        return "Koneksi internet bermasalah. Periksa jaringanmu.";

      case "auth/user-disabled":
        return "Akun ini telah dinonaktifkan.";

      case "auth/operation-not-allowed":
        return "Login email/password belum diaktifkan di Firebase.";

      default:
        return "Terjadi kesalahan. Silakan coba lagi.";
    }
  };

  // Menampilkan notifikasi
  const showNotice = (message, type = "error") => {
    setNotice(message);
    setNoticeType(type);
  };

  // Login dan registrasi
  const handleSubmit = async (e) => {
    e.preventDefault();

    setNotice("");
    setLoading(true);

    try {
      if (tab === "Daftar") {
        if (!name.trim()) {
          showNotice("Nama lengkap wajib diisi.");
          return;
        }

        const result = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        await updateProfile(result.user, {
          displayName: name.trim(),
        });

        showNotice(
          "Akun berhasil dibuat! Selamat datang di Wisata Seribu Pura.",
          "success"
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        showNotice(
          "Login berhasil! Selamat datang kembali.",
          "success"
        );
      }

      router.push("/profile");

    } catch (error) {
      console.error("Authentication error:", error);
      showNotice(getFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const handleForgotPassword = async () => {
    if (!email.trim()) {
      showNotice(
        "Masukkan email terlebih dahulu untuk reset password."
      );
      return;
    }

    setLoading(true);
    setNotice("");

    try {
      await sendPasswordResetEmail(auth, email.trim());

      showNotice(
        "Link reset password berhasil dikirim. Silakan periksa email kamu.",
        "success"
      );
    } catch (error) {
      console.error("Password reset error:", error);
      showNotice(getFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  // Berpindah tab
  const switchTab = (newTab) => {
    setTab(newTab);
    setNotice("");
    setPassword("");
  };

  // Tampilan loading saat memeriksa sesi
  if (authLoading || user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#eeece3]">
        <p className="text-sm text-stone-500">
          Memeriksa akun...
        </p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-[calc(100vh-150px)] items-center justify-center overflow-hidden bg-[#eeece3] px-5 py-16">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 opacity-25 image-cover"
        style={{
          backgroundImage:
            `url(${siteImages.loginBackground})`,
        }}
      />

      <section className="relative w-full max-w-md rounded-3xl border border-white/70 bg-white/95 p-8 shadow-soft backdrop-blur">

        {/* TAB MASUK DAN DAFTAR */}
        <div className="mb-7 grid grid-cols-2 rounded-full bg-stone-100 p-1">
          {["Masuk", "Daftar"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => switchTab(t)}
              className={`rounded-full py-3 text-sm font-bold ${
                tab === t
                  ? "bg-forest text-white shadow"
                  : "text-stone-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* HEADER */}
        <p className="eyebrow">Wisata Seribu Pura</p>

        <h1 className="mt-2 text-3xl font-extrabold">
          {tab === "Masuk"
            ? "Selamat Datang Kembali!"
            : "Buat Akun Baru"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-stone-500">
          {tab === "Masuk"
            ? "Masuk untuk melanjutkan perjalanan bersama Wisata Seribu Pura."
            : "Daftar untuk menyimpan destinasi dan merencanakan perjalananmu."}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">

          {/* NAMA */}
          {tab === "Daftar" && (
            <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-forest">
              <User size={17} className="text-stone-400" />

              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full text-sm outline-none"
              />
            </label>
          )}

          {/* EMAIL */}
          <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-forest">
            <Mail size={17} className="text-stone-400" />

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full text-sm outline-none"
            />
          </label>

          {/* PASSWORD */}
          <label className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 focus-within:border-forest">
            <LockKeyhole size={17} className="text-stone-400" />

            <input
              required
              minLength={6}
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full text-sm outline-none"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-stone-400"
              aria-label="Tampilkan password"
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </label>

          {/* LUPA PASSWORD */}
          {tab === "Masuk" && (
            <div className="flex items-center justify-end text-xs text-stone-500">
              <button
                type="button"
                disabled={loading}
                onClick={handleForgotPassword}
                className="font-semibold text-forest hover:underline disabled:opacity-50"
              >
                Lupa password?
              </button>
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-forest py-3.5 text-sm font-bold text-white transition hover:bg-lime-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Memproses..."
              : tab === "Masuk"
                ? "Masuk"
                : "Daftar"}

            {!loading && <span aria-hidden> →</span>}
          </button>
        </form>

        {/* NOTIFIKASI */}
        {notice && (
          <p
            role="status"
            className={`mt-4 rounded-xl p-3 text-xs leading-5 ${
              noticeType === "success"
                ? "bg-green-50 text-green-800"
                : "bg-amber-50 text-amber-800"
            }`}
          >
            {notice}
          </p>
        )}

        {/* PINDAH TAB */}
        <p className="mt-6 text-center text-sm text-stone-500">
          {tab === "Masuk"
            ? "Belum punya akun?"
            : "Sudah punya akun?"}

          <button
            type="button"
            onClick={() =>
              switchTab(tab === "Masuk" ? "Daftar" : "Masuk")
            }
            className="ml-1 font-bold text-forest"
          >
            {tab === "Masuk"
              ? "Daftar di sini"
              : "Masuk di sini"}
          </button>
        </p>

        {/* KEMBALI */}
        <Link
          href="/"
          className="mt-7 block text-center text-xs text-stone-400 hover:text-forest"
        >
          ← Kembali ke beranda
        </Link>
      </section>
    </main>
  );
}
