"use client";

import { useEffect, useState } from "react";
import { Plus, Trash, User } from "lucide-react";

type AdminUser = { id: string; email: string; name: string | null; createdAt: string };

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    setAdding(true);
    setError("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (res.ok) {
        setEmail("");
        setPassword("");
        setName("");
        fetchUsers();
      } else {
        const data = await res.json();
        setError(data.error || "Eklenemedi");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Kullanıcıyı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || "Silinemedi");
      }
    } catch {
      alert("Bağlantı hatası");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d7f26f] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Yöneticiler</h1>
        <p className="mt-2 text-stone-400">
          Admin paneline erişebilecek kullanıcıları yönetin.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-300">İsim</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Ahmet"
                className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-300">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-300">Parola</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••"
                className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={adding || !email.trim() || !password.trim()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#d7f26f] px-6 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Yeni Yönetici Ekle
            </button>
          </div>
        </form>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <table className="w-full text-left text-sm text-stone-300">
          <thead className="border-b border-white/10 bg-white/5 text-stone-400">
            <tr>
              <th className="px-6 py-4 font-medium">Kullanıcı</th>
              <th className="px-6 py-4 font-medium">Kayıt Tarihi</th>
              <th className="px-6 py-4 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d7f26f]/10 text-[#d7f26f]">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{u.name || "İsimsiz"}</div>
                      <div className="text-xs text-stone-400">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-stone-400">
                  {new Date(u.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
