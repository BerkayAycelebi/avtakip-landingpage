"use client";

import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    categoryId: "",
    readTime: "4 dk",
    date: new Date().toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    image: "/images/blog-default.png",
    content: "",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) {
            setForm((prev) => ({ ...prev, categoryId: data[0].id }));
          }
        }
      });
  }, []);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        const data = await res.json();
        setError(data.error || "Kaydetme başarısız");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setSaving(false);
    }
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

      <h1 className="mb-8 text-2xl font-semibold text-white">
        Yeni Blog Yazısı
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="post-title"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            Başlık
          </label>
          <input
            id="post-title"
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            placeholder="Yazı başlığını girin"
            className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="post-excerpt"
            className="mb-2 block text-sm font-medium text-stone-300"
          >
            Özet
          </label>
          <textarea
            id="post-excerpt"
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            rows={2}
            placeholder="Kısa açıklama..."
            className="w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 py-3 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
          />
        </div>

        {/* Meta row */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="post-category"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Kategori
            </label>
            <select
              id="post-category"
              value={form.categoryId}
              onChange={(e) => updateField("categoryId", e.target.value)}
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="post-readtime"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Okuma Süresi
            </label>
            <input
              id="post-readtime"
              type="text"
              value={form.readTime}
              onChange={(e) => updateField("readTime", e.target.value)}
              placeholder="ör. 4 dk"
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            />
          </div>
          <div>
            <label
              htmlFor="post-date"
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              Tarih
            </label>
            <input
              id="post-date"
              type="text"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              placeholder="ör. 12 Haziran 2026"
              className="h-12 w-full rounded-xl border border-white/12 bg-[#0d1d17] px-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/20"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="post-image"
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
                id="post-image"
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
            htmlFor="post-content"
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
            Yayınla
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
