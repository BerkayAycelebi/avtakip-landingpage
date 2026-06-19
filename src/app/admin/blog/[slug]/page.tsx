"use client";

import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditBlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    categoryId: "",
    readTime: "",
    date: "",
    image: "",
    content: "",
  });

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/blog/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.title || "",
          excerpt: data.excerpt || "",
          categoryId: data.categoryId || "",
          readTime: data.readTime || "",
          date: data.date || "",
          image: data.image || "",
          content: data.content || "",
        });
      } else {
        setError("Yazı bulunamadı");
      }
    } catch {
      setError("Veri alınamadı");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, [fetchCategories, fetchPost]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/blog/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const data = await res.json();
        setError(data.error || "Güncelleme başarısız");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Bu yazıyı kalıcı olarak silmek istediğinize emin misiniz?"))
      return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/blog");
      }
    } catch {
      /* ignore */
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d7f26f] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Blog Yönetimi
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Yazıyı Düzenle</h1>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-2 rounded-xl border border-red-500/25 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
        >
          Sil
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="edit-title"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            Başlık
          </label>
          <input
            id="edit-title"
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="edit-excerpt"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            Özet
          </label>
          <textarea
            id="edit-excerpt"
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
          />
        </div>

        {/* Meta row */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="edit-category"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Kategori
            </label>
            <select
              id="edit-category"
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            >
              <option value="" disabled>Seçiniz</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="edit-readtime"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Okuma Süresi
            </label>
            <input
              id="edit-readtime"
              type="text"
              value={form.readTime}
              onChange={(e) => updateField("readTime", e.target.value)}
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            />
          </div>
          <div>
            <label
              htmlFor="edit-date"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Tarih
            </label>
            <input
              id="edit-date"
              type="text"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="edit-image"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            Kapak Görseli
          </label>
          
          <div className="flex flex-col gap-3">
            {form.image && (
              <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-black/20">
                <img src={form.image} alt="Kapak önizleme" className="h-full w-full object-cover" />
              </div>
            )}
            
            <div className="relative">
              <input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const formData = new FormData();
                  formData.append("file", file);
                  
                  try {
                    const res = await fetch("/api/admin/upload", {
                      method: "POST",
                      body: formData,
                    });
                    if (res.ok) {
                      const data = await res.json();
                      updateField("image", data.url);
                    } else {
                      alert("Görsel yüklenemedi!");
                    }
                  } catch {
                    alert("Görsel yükleme hatası!");
                  }
                }}
                className="block w-full text-sm text-stone-400 file:mr-4 file:rounded-full file:border-0 file:bg-[#d7f26f]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#d7f26f] hover:file:bg-[#d7f26f]/20"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="edit-content"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            İçerik
          </label>
          <RichTextEditor
            content={form.content}
            onChange={(content) => updateField("content", content)}
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 border-t border-white/10 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#d7f26f] px-6 py-3 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] hover:shadow-lg hover:shadow-[#d7f26f]/20 disabled:opacity-50"
          >
            {saving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#102015] border-t-transparent" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Kaydet
          </button>
          <Link
            href="/admin/blog"
            className="rounded-xl border border-white/12 px-6 py-3 text-sm font-medium text-stone-300 transition-colors hover:bg-white/6 hover:text-white"
          >
            İptal
          </Link>
        </div>
      </form>
    </div>
  );
}
