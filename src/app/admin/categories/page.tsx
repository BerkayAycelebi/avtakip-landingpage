"use client";

import { useEffect, useState } from "react";
import { Plus, Trash } from "lucide-react";

type Category = { id: string; name: string; slug: string; createdAt: string };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setAdding(true);
    setError("");

    try {
      // Slugify name
      const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
      
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      if (res.ok) {
        setName("");
        fetchCategories();
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
    if (!confirm("Kategoriyi silmek istediğinize emin misiniz? (Bağlı yazılar olabilir)")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCategories();
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
        <h1 className="text-2xl font-semibold text-white">Kategoriler</h1>
        <p className="mt-2 text-stone-400">
          Blog yazılarınızı gruplandırmak için kategorileri yönetin.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <form onSubmit={handleAdd} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Yeni kategori adı (ör. Kamp İpuçları)"
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            />
          </div>
          <button
            type="submit"
            disabled={adding || !name.trim()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#d7f26f] px-6 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Ekle
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <table className="w-full text-left text-sm text-stone-300">
          <thead className="border-b border-white/10 bg-white/5 text-stone-400">
            <tr>
              <th className="px-6 py-4 font-medium">Kategori Adı</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 text-right font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {categories.map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-white/5">
                <td className="px-6 py-4 font-medium text-white">{c.name}</td>
                <td className="px-6 py-4 font-mono text-xs text-stone-400">{c.slug}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-stone-500">
                  Henüz kategori eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
