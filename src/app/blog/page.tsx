import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";

export const metadata = {
  title: "Blog - Av Takip",
  description: "Avcılık ipuçları, uygulama özellikleri ve saha rehberleri.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-[#07130f] text-white">
      {/* ── Header ── */}
      <header className="border-b border-white/10 bg-[#07130f]/95 px-4 py-6 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d7f26f] font-semibold text-[#102015]">
              AT
            </span>
            <span className="text-xl font-semibold">Blog</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-stone-400 transition-colors hover:text-white"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-16">
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
            Av Takip Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-400">
            Avcılık ipuçları, yeni özellik duyuruları ve sahadan en iyi
            pratikler hakkında yazılarımız.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1d17] transition-colors hover:border-[#d7f26f]/30 hover:bg-[#162a22]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/20">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-[#d7f26f] backdrop-blur-md">
                  {post.category?.name || "Genel"}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="mb-3 text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-400">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-stone-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-[#d7f26f]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
