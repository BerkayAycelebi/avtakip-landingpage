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

  return (
    <main className="min-h-screen bg-[#07130f] text-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07130f]/80 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,15,0.4),rgba(7,19,15,0.95)),url('/images/blog-bg.jpg')] bg-cover bg-center" />
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

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">

        {/* ── Featured Image ── */}
        <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-2xl bg-black/20 ring-1 ring-white/10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* ── Content ── */}
        <div
          className="prose prose-invert prose-stone mx-auto max-w-none prose-headings:font-semibold prose-a:text-[#d7f26f] prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
