"use client";

import {
  Calendar,
  Plus,
  Search,
  Tag,
  Trash2,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: { id: string; name: string } | null;
  readTime: string;
  image: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  async function handleDelete(slug: string) {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch {
      /* ignore */
    } finally {
      setDeleting(null);
    }
  }

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Blog Yönetimi</h1>
          <p className="mt-1 text-sm text-stone-400">
            {posts.length} yazı bulundu
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#d7f26f] px-5 py-2.5 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] hover:shadow-lg hover:shadow-[#d7f26f]/20"
        >
          <Plus className="h-4 w-4" />
          Yeni Yazı
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
        <input
          type="text"
          placeholder="Başlık veya kategori ile ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full rounded-xl border border-white/10 bg-[#0d1d17] pl-11 pr-4 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/40 focus:ring-2 focus:ring-[#d7f26f]/15"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d7f26f] border-t-transparent" />
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0d1d17] py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d7f26f]/10">
            <Edit className="h-6 w-6 text-[#d7f26f]" />
          </div>
          <h3 className="text-lg font-medium text-white">Henüz yazı yok</h3>
          <p className="mt-2 text-sm text-stone-400">
            İlk blog yazınızı ekleyerek başlayın.
          </p>
        </div>
      )}

      {/* Posts grid */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((post) => (
            <div
              key={post.slug}
              className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-[#0d1d17] p-5 transition-all hover:border-[#d7f26f]/25 sm:flex-row sm:items-center"
            >
              {/* Post info */}
              <div className="flex-1 min-w-0">
                <h3 className="truncate text-base font-medium text-white group-hover:text-[#d7f26f]">
                  {post.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-stone-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="h-3 w-3" />
                    {post.category?.name || "Genel"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-stone-300 transition-colors hover:bg-white/6 hover:text-white"
                >
                  Görüntüle
                </Link>
                <Link
                  href={`/admin/blog/${post.slug}`}
                  className="rounded-lg border border-[#d7f26f]/25 bg-[#d7f26f]/8 px-3 py-2 text-xs font-medium text-[#d7f26f] transition-colors hover:bg-[#d7f26f]/15"
                >
                  <Edit className="inline h-3.5 w-3.5 mr-1" />
                  Düzenle
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post.slug)}
                  disabled={deleting === post.slug}
                  className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                >
                  {deleting === post.slug ? (
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border border-red-400 border-t-transparent" />
                  ) : (
                    <Trash2 className="inline h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
