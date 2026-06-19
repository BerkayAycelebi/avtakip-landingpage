"use client";

import { motion, useInView, useMotionValue, useTransform, animate as motionAnimate } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CloudSun,
  Compass,
  Download,
  MapPin,
  Menu,
  Radio,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HomepageData } from "@/lib/data";

const navItems = [
  { label: "Özellikler", href: "#ozellikler" },
  { label: "Ekranlar", href: "#ekranlar" },
  { label: "Blog", href: "/blog" },
];

/* ── Icons Map ── */
const Icons: Record<string, any> = {
  CalendarDays,
  MapPin,
  Radio,
  CloudSun,
  Users,
  ShieldCheck,
  Compass,
  Star,
  Download,
  Check,
};

/* ── Animation Variants ── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Animated Counter Hook ── */
function AnimatedCounter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = motionAnimate(motionVal, target, {
      duration,
      ease: [0.22, 1, 0.36, 1] as const,
    });
    const unsub = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [isInView, target, duration, motionVal, rounded]);

  return <span ref={ref}>{displayValue}</span>;
}

/* ── Smooth Scroll Handler ── */
function useSmoothScroll() {
  return useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const targetId = href.slice(1);
    const el = document.getElementById(targetId);
    if (!el) return;
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: "smooth",
    });
  }, []);
}

/* ── Play Store Icon ── */
function PlayStoreIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.6 1.8 13.8 12 3.6 22.2a1 1 0 0 1-.6-.9V2.7a1 1 0 0 1 .6-.9Zm10.9 10.9 2.3 2.3-10.9 6.3 8.6-8.6Zm3.2-3.2 2.3 2.3-2 1.2-2.3-2.3 2-1.2ZM5.9 2.7 16.8 9l-2.3 2.3-8.6-8.6Z" />
    </svg>
  );
}

/* ── Navbar ── */
function Navbar({
  data,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrolled,
}: {
  data: HomepageData;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  scrolled: boolean;
}) {
  const handleScroll = useSmoothScroll();

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[#07130f]/95 backdrop-blur-xl shadow-lg shadow-black/20"
          : "border-transparent bg-[#07130f]/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Av Takip ana sayfa">
          <Image
            src={data.hero.appLogoUrl}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg"
            priority
          />
          <span className="text-lg font-semibold tracking-normal">{data.hero.title}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </a>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={data.stats.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#d7f26f] px-4 py-2 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] hover:shadow-lg hover:shadow-[#d7f26f]/20"
          >
            <PlayStoreIcon />
            İndir
          </a>
        </div>

        <button
          type="button"
          aria-label="Menüyü aç veya kapat"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 text-white transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-white/10 bg-[#07130f] md:hidden"
      >
        <div className="px-4 py-3">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-stone-200 transition-colors hover:bg-white/8"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-stone-200 transition-colors hover:bg-white/8"
                onClick={(e) => {
                  handleScroll(e, item.href);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            )
          )}
          <a
            href={data.stats.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#d7f26f] px-4 py-3 text-sm font-semibold text-[#102015]"
          >
            <Download className="h-4 w-4" />
            Google Play&apos;den indir
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}

/* ── Main Component ── */
export function HomeClient({ data }: { data: HomepageData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = useSmoothScroll();

  return (
    <main className="min-h-screen bg-[#07130f] text-white">
      <Navbar
        data={data}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrolled={scrolled}
      />

      <section className="relative min-h-[92vh] overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,19,15,0.9),rgba(7,19,15,0.55)_48%,rgba(7,19,15,0.78)),url('/images/av-takip-hero-hunting.png')] bg-cover bg-center" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07130f] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#d7f26f]/35 bg-[#d7f26f]/10 px-3 py-2 text-sm font-medium text-[#e6ff86]"
            >
              <Compass className="h-4 w-4" />
              {data.hero.badge}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl"
            >
              {data.hero.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-stone-200 sm:text-xl"
            >
              {data.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                href={data.stats.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#d7f26f] px-6 py-4 text-base font-semibold text-[#102015] transition-shadow hover:shadow-lg hover:shadow-[#d7f26f]/25"
              >
                <PlayStoreIcon />
                {data.hero.ctaPrimary}
                <ArrowRight className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#ozellikler"
                onClick={(e) => handleScroll(e, "#ozellikler")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/18 bg-white/8 px-6 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/12"
              >
                {data.hero.ctaSecondary}
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm text-stone-300"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="rounded-lg border border-white/12 bg-black/22 p-4 backdrop-blur transition-colors hover:border-[#d7f26f]/25"
              >
                <strong className="block text-2xl text-white">{data.stats.downloads}</strong>
                indirme
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="rounded-lg border border-white/12 bg-black/22 p-4 backdrop-blur transition-colors hover:border-[#d7f26f]/25"
              >
                <strong className="flex items-center gap-1 text-2xl text-white">
                  {data.stats.rating}
                  <Star className="h-4 w-4 fill-[#d7f26f] text-[#d7f26f]" />
                </strong>
                puan
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="rounded-lg border border-white/12 bg-black/22 p-4 backdrop-blur transition-colors hover:border-[#d7f26f]/25"
              >
                <strong className="block text-2xl text-white">
                  <AnimatedCounter target={data.stats.cityCount} duration={1.5} />
                </strong>
                şehir
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[380px] md:max-w-[430px]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[9/16]"
            >
              <Image
                src={data.hero.appMockupUrl}
                alt="Av Takip uygulamasının mobil ekran görüntüsü"
                fill
                sizes="(max-width: 768px) 86vw, 430px"
                className="object-contain drop-shadow-[0_34px_70px_rgba(0,0,0,0.45)]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="ozellikler" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7f26f]"
            >
              {data.features.sectionLabel}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-5xl"
            >
              {data.features.sectionTitle}
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {data.features.items.map((feature, index) => {
              const Icon = Icons[feature.icon] || Star;
              return (
                <motion.article
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-xl border border-white/10 bg-[#0d1d17] p-6 transition-colors hover:border-[#d7f26f]/30 hover:bg-[#0d1d17]/80"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#d7f26f] text-[#102015] transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-stone-300">{feature.description}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section id="ekranlar" className="border-y border-white/10 bg-[#101816] px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7f26f]"
            >
              {data.screens.sectionLabel}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-semibold tracking-normal text-white sm:text-5xl"
            >
              {data.screens.sectionTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 leading-8 text-stone-300">
              {data.screens.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 grid gap-3">
              {data.screens.checklist.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-stone-200"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#d7f26f] text-[#102015]">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={scaleUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#07130f] shadow-2xl shadow-black/30"
          >
            <Image
              src={data.hero.appFeaturesUrl}
              alt="Av Takip uygulama özellik ekranları"
              width={1024}
              height={768}
              sizes="(max-width: 1024px) 100vw, 650px"
              className="h-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-xl border border-white/10 bg-[#16211d] p-8 md:col-span-2"
          >
            <h2 className="max-w-2xl text-3xl font-semibold tracking-normal text-white sm:text-5xl">
              {data.cta.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-stone-300">
              {data.cta.description}
            </p>
            <motion.a
              href={data.stats.playStoreUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#d7f26f] px-6 py-4 font-semibold text-[#102015] transition-shadow hover:shadow-lg hover:shadow-[#d7f26f]/25"
            >
              <Download className="h-5 w-5" />
              {data.cta.buttonText}
            </motion.a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-xl border border-white/10 bg-[#0d1d17] p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d7f26f]">
              {data.cta.satisfactionLabel}
            </p>
            <strong className="mt-4 block text-5xl text-white">
              %<AnimatedCounter target={data.stats.satisfaction} duration={1.8} />
            </strong>
            <p className="mt-4 leading-7 text-stone-300">
              {data.cta.satisfactionDescription}
            </p>
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image src={data.hero.appLogoUrl} alt="" width={32} height={32} className="rounded-lg" />
            <span className="font-semibold">{data.hero.title}</span>
          </Link>
          <div className="flex flex-wrap gap-5">
            <a
              href="#ozellikler"
              onClick={(e) => handleScroll(e, "#ozellikler")}
              className="transition-colors hover:text-white"
            >
              Özellikler
            </a>
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
            </Link>
            <a href="mailto:info@avtakip.com" className="transition-colors hover:text-white">
              İletişim
            </a>
          </div>
          <p>© 2026 {data.hero.title}. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  );
}
