"use client";

import { Eye, EyeOff, LayoutDashboard, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Giriş başarısız");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07130f] px-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7f26f]/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d7f26f] to-[#a8c644] shadow-lg shadow-[#d7f26f]/20">
            <LayoutDashboard className="h-8 w-8 text-[#102015]" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
          <p className="mt-2 text-sm text-stone-400">
            Av Takip yönetim paneline erişmek için giriş yapın
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#0d1d17]/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <div className="mb-4">
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              E-posta
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                autoFocus
                required
                className="h-12 w-full rounded-xl border border-white/12 bg-[#07130f] pl-10 pr-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Parola
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolanız"
                required
                className="h-12 w-full rounded-xl border border-white/12 bg-[#07130f] pl-10 pr-12 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-500 hover:text-stone-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password || !email}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#d7f26f] text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] hover:shadow-lg hover:shadow-[#d7f26f]/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#102015] border-t-transparent" />
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-stone-600">
          Av Takip © 2026 — Yönetim Paneli
        </p>
      </div>
    </div>
  );
}
