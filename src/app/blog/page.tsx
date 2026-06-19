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
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07130f]/80 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://lh3.googleusercontent.com/c2jHs_n3MWtvUNyGqNxQbcb5U1VDai7d8NOmzEgy05D0SdURi4eGxHnGHkB5UU9y1ttcii8ShXcIJiEMT0-O=s512"
              alt="Av Takip Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg"
            />
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

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-white/10 py-20 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,19,15,0.15),#07130f),url('/images/blog-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07130f] to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Av Takip Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            Avcılık ipuçları, yeni özellik duyuruları ve sahadan en iyi pratikler hakkında yazılarımız.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">

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
