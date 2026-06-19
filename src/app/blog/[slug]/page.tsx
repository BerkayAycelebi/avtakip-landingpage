import { ArrowLeft, CalendarDays, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: "Yazı Bulunamadı - Av Takip",
    };
  }

  return {
    title: `${post.title} - Av Takip Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts of the same category
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.categoryId === post.categoryId && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#07130f] text-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07130f]/80 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-sm font-medium text-stone-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Blog&apos;a Dön
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Share2 className="h-3.5 w-3.5" />
            Paylaş
          </button>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-white/10 py-16 sm:py-20 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,19,15,0.15),#07130f),url('/images/blog-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07130f] to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-6 inline-flex rounded-full bg-[#d7f26f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#d7f26f]">
            {post.category?.name || "Genel"}
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl text-white">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-stone-300 sm:gap-6">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} okuma
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Layout with Sidebar ── */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          {/* Main Content Area */}
          <article className="min-w-0">
            {/* Featured Image */}
            <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Post Content */}
            <div
              className="prose prose-invert prose-stone max-w-none prose-headings:font-semibold prose-a:text-[#d7f26f] prose-img:rounded-xl prose-p:leading-relaxed prose-p:text-stone-300 prose-headings:text-white prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Sidebar */}
          <aside className="space-y-8 lg:border-l lg:border-white/10 lg:pl-8">
            <div>
              <h3 className="mb-6 text-lg font-semibold text-white">İlgili Makaleler</h3>
              {relatedPosts.length > 0 ? (
                <div className="space-y-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group block space-y-2"
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/20 ring-1 ring-white/10">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-medium text-white transition-colors group-hover:text-[#d7f26f] line-clamp-2 text-sm leading-snug">
                        {related.title}
                      </h4>
                      <p className="text-xs text-stone-500">{related.date}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-stone-500">Bu kategoride başka makale bulunmuyor.</p>
              )}
            </div>

            {/* Mobile App Promotion Card */}
            <div className="rounded-2xl border border-[#d7f26f]/20 bg-[#d7f26f]/5 p-6 shadow-xl">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#d7f26f]">
                Av Takip Mobil
              </h4>
              <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                Avlak yerlerini kaydetmek, ekibinizi canlı takip etmek ve solunar takvimi kullanmak için uygulamayı indirin.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.berkayaycelebi.avtakip"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#d7f26f] py-2 text-xs font-semibold text-[#102015] hover:bg-[#e7ff89] transition-all"
              >
                Google Play'den İndir
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
