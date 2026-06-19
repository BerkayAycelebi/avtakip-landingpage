"use client";

import { useState } from "react";
import { Check, Shield } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) return;
    
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, currentPassword, newPassword }),
      });

      if (res.ok) {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        const data = await res.json();
        setError(data.error || "Güncellenemedi");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Profilim</h1>
        <p className="mt-2 text-stone-400">
          Kişisel bilgilerinizi ve şifrenizi güncelleyin. Şifre değiştirmek için mevcut şifrenizi girmelisiniz.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-300">Görünen Adınız (İsteğe bağlı)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Yeni bir isim belirleyebilirsiniz"
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            />
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-medium text-white">
              <Shield className="h-5 w-5 text-[#d7f26f]" />
              Güvenlik
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-300">Mevcut Parolanız (Zorunlu)</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="Değişiklik yapabilmek için mevcut parolanız"
                  className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-300">Yeni Parola (Değiştirmek istiyorsanız)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="En az 6 karakter"
                  className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
                />
              </div>
            </div>
          </div>

          {error && <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
          {success && <div className="rounded-xl border border-[#d7f26f]/25 bg-[#d7f26f]/10 px-4 py-3 text-sm text-[#d7f26f]">Profiliniz başarıyla güncellendi!</div>}

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving || !currentPassword}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d7f26f] px-6 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] disabled:opacity-50"
            >
              {saving ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#102015] border-t-transparent" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
