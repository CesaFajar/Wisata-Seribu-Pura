"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  UserRound,
  Mail,
  Edit3,
  Save,
  X,
  LogOut,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";

import { updateProfile, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }

    if (user) {
      setName(user.displayName || "");
    }
  }, [user, loading, router]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(true);
      setNotice("Nama tidak boleh kosong.");
      return;
    }

    setSaving(true);
    setNotice("");

    try {
      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
      });

      setEditMode(false);
      setError(false);
      setNotice("Nama profil berhasil diperbarui!");
    } catch (err) {
      console.error(err);
      setError(true);
      setNotice("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.replace("/");
  } catch (err) {
    console.error(err);
    setError(true);
    setNotice("Gagal logout. Silakan coba lagi.");
  }
};

  if (loading || !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-stone-500">
          <LoaderCircle className="animate-spin" size={22} />
          <span className="text-sm">Memuat profil...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-150px)] bg-[#f5f3eb] px-5 py-16">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="eyebrow">Akun Pengguna</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink">
            Profil Saya
          </h1>
          <p className="mt-3 text-sm text-stone-500">
            Kelola informasi akun Wisata Seribu Pura milikmu.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">

          {/* TOP BANNER */}
          <div className="h-32 bg-forest" />

          <div className="px-6 pb-8 md:px-9">

            {/* AVATAR */}
            <div className="-mt-12 mb-6 flex items-end justify-between">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#e9eee2] text-forest shadow">
                <UserRound size={43} />
              </div>

              <span className="mb-2 flex items-center gap-1 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                <ShieldCheck size={15} />
                Akun Aktif
              </span>
            </div>

            {/* USER INFORMATION */}
            {!editMode ? (
              <>
                <h2 className="text-2xl font-extrabold text-ink">
                  {user.displayName || "Pengguna Wisata"}
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Anggota Wisata Seribu Pura
                </p>

                <div className="mt-8 space-y-5">

                  <div className="flex items-center gap-4 rounded-2xl bg-stone-50 p-4">
                    <div className="rounded-xl bg-[#e9eee2] p-3 text-forest">
                      <UserRound size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-stone-400">
                        Nama Lengkap
                      </p>
                      <p className="break-words text-sm font-semibold text-ink">
                        {user.displayName || "Belum diatur"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-stone-50 p-4">
                    <div className="rounded-xl bg-[#e9eee2] p-3 text-forest">
                      <Mail size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-stone-400">
                        Alamat Email
                      </p>
                      <p className="break-all text-sm font-semibold text-ink">
                        {user.email}
                      </p>
                    </div>
                  </div>

                </div>

                <button
                  onClick={() => {
                    setName(user.displayName || "");
                    setNotice("");
                    setEditMode(true);
                  }}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3.5 text-sm font-bold text-white transition hover:bg-lime-900"
                >
                  <Edit3 size={17} />
                  Edit Profil
                </button>
              </>
            ) : (
              <form onSubmit={handleSave}>
                <h2 className="text-xl font-extrabold text-ink">
                  Edit Informasi Profil
                </h2>

                <label className="mt-6 block text-sm font-semibold text-ink">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="mt-2 w-full rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-forest"
                />

                <p className="mt-5 text-xs text-stone-400">
                  Email akun: {user.email}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest py-3 text-sm font-bold text-white hover:bg-lime-900 disabled:opacity-60"
                  >
                    <Save size={17} />
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setName(user.displayName || "");
                      setNotice("");
                    }}
                    className="flex items-center justify-center gap-2 rounded-full border border-stone-200 px-6 py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50"
                  >
                    <X size={17} />
                    Batal
                  </button>
                </div>
              </form>
            )}

            {/* NOTIFICATION */}
            {notice && (
              <p
                role="status"
                className={`mt-5 rounded-xl p-3 text-xs ${
                  error
                    ? "bg-amber-50 text-amber-800"
                    : "bg-green-50 text-green-800"
                }`}
              >
                {notice}
              </p>
            )}

            {/* LOGOUT */}
            {!editMode && (
              <div className="mt-8 border-t border-stone-100 pt-6">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Keluar dari Akun
                </button>
              </div>
            )}

          </div>
        </section>

        <p className="mt-6 text-center text-xs leading-6 text-stone-400">
          Terima kasih telah menjadi bagian dari Wisata Seribu Pura.
          Jelajahi keindahan Bali dan temukan pengalaman baru!
        </p>

      </div>
    </main>
  );
}
