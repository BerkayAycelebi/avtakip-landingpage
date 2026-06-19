"use client";

import { Check, Download, Plus, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

type HomepageData = {
  stats: {
    downloads: string;
    rating: number;
    totalReviews: number;
    cityCount: number;
    satisfaction: number;
    playStoreUrl: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    appLogoUrl: string;
    appMockupUrl: string;
    appFeaturesUrl: string;
  };
  features: {
    sectionLabel: string;
    sectionTitle: string;
    items: FeatureItem[];
  };
  screens: {
    sectionLabel: string;
    sectionTitle: string;
    description: string;
    checklist: string[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    satisfactionLabel: string;
    satisfactionDescription: string;
  };
};

const ICON_OPTIONS = [
  "CalendarDays",
  "MapPin",
  "Radio",
  "CloudSun",
  "Users",
  "ShieldCheck",
  "Compass",
  "Star",
  "Target",
  "Zap",
  "Clock",
  "Eye",
];

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d1d17] p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-stone-400"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-white/12 bg-[#07130f] px-3 text-sm text-white placeholder-stone-500 outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/15"
      />
    </div>
  );
}

export default function AdminHomepagePage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/homepage");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const d = await res.json();
        setError(d.error || "Kaydetme başarısız");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d7f26f] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Ana Sayfa Yönetimi
          </h1>
          <p className="mt-1 text-sm text-stone-400">
            Ana sayfadaki tüm içerikleri buradan düzenleyin
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#d7f26f] px-5 py-2.5 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] hover:shadow-lg hover:shadow-[#d7f26f]/20 disabled:opacity-50"
        >
          {saving ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#102015] border-t-transparent" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {saved ? "Kaydedildi!" : "Tümünü Kaydet"}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* İstatistikler */}
        <SectionCard title="📊 İstatistikler">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InputField
              id="stat-downloads"
              label="İndirme Sayısı"
              value={data.stats.downloads}
              onChange={(v) =>
                setData({ ...data, stats: { ...data.stats, downloads: v } })
              }
            />
            <InputField
              id="stat-rating"
              label="Puan (ör: 4.8)"
              type="number"
              value={data.stats.rating}
              onChange={(v) =>
                setData({
                  ...data,
                  stats: { ...data.stats, rating: parseFloat(v) || 0 },
                })
              }
            />
            <InputField
              id="stat-reviews"
              label="Değerlendirme Sayısı"
              type="number"
              value={data.stats.totalReviews}
              onChange={(v) =>
                setData({
                  ...data,
                  stats: { ...data.stats, totalReviews: parseInt(v) || 0 },
                })
              }
            />
            <InputField
              id="stat-cities"
              label="Şehir Sayısı"
              type="number"
              value={data.stats.cityCount}
              onChange={(v) =>
                setData({
                  ...data,
                  stats: { ...data.stats, cityCount: parseInt(v) || 0 },
                })
              }
            />
            <InputField
              id="stat-satisfaction"
              label="Memnuniyet %"
              type="number"
              value={data.stats.satisfaction}
              onChange={(v) =>
                setData({
                  ...data,
                  stats: { ...data.stats, satisfaction: parseInt(v) || 0 },
                })
              }
            />
            <InputField
              id="stat-playstore"
              label="Play Store URL"
              value={data.stats.playStoreUrl}
              onChange={(v) =>
                setData({
                  ...data,
                  stats: { ...data.stats, playStoreUrl: v },
                })
              }
            />
          </div>
        </SectionCard>

        {/* Hero Bölümü */}
        <SectionCard title="🏠 Hero Bölümü">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="hero-title"
                label="Başlık"
                value={data.hero.title}
                onChange={(v) =>
                  setData({ ...data, hero: { ...data.hero, title: v } })
                }
              />
              <InputField
                id="hero-badge"
                label="Badge Metni"
                value={data.hero.badge}
                onChange={(v) =>
                  setData({ ...data, hero: { ...data.hero, badge: v } })
                }
              />
            </div>
            <div>
              <label
                htmlFor="hero-subtitle"
                className="mb-1.5 block text-xs font-medium text-stone-400"
              >
                Alt Başlık
              </label>
              <textarea
                id="hero-subtitle"
                value={data.hero.subtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, subtitle: e.target.value },
                  })
                }
                rows={2}
                className="w-full rounded-lg border border-white/12 bg-[#07130f] px-3 py-2 text-sm text-white outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/15"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="hero-cta1"
                label="CTA Birincil"
                value={data.hero.ctaPrimary}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, ctaPrimary: v },
                  })
                }
              />
              <InputField
                id="hero-cta2"
                label="CTA İkincil"
                value={data.hero.ctaSecondary}
                onChange={(v) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, ctaSecondary: v },
                  })
                }
              />
            </div>
            <InputField
              id="hero-logo"
              label="Uygulama Logo URL"
              value={data.hero.appLogoUrl}
              onChange={(v) =>
                setData({ ...data, hero: { ...data.hero, appLogoUrl: v } })
              }
            />
            <InputField
              id="hero-mockup"
              label="Uygulama Mockup URL"
              value={data.hero.appMockupUrl}
              onChange={(v) =>
                setData({ ...data, hero: { ...data.hero, appMockupUrl: v } })
              }
            />
            <InputField
              id="hero-features-img"
              label="Özellik Görseli URL"
              value={data.hero.appFeaturesUrl}
              onChange={(v) =>
                setData({
                  ...data,
                  hero: { ...data.hero, appFeaturesUrl: v },
                })
              }
            />
          </div>
        </SectionCard>

        {/* Özellikler */}
        <SectionCard title="⚡ Özellikler Bölümü">
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <InputField
              id="feat-label"
              label="Bölüm Etiketi"
              value={data.features.sectionLabel}
              onChange={(v) =>
                setData({
                  ...data,
                  features: { ...data.features, sectionLabel: v },
                })
              }
            />
            <InputField
              id="feat-title"
              label="Bölüm Başlığı"
              value={data.features.sectionTitle}
              onChange={(v) =>
                setData({
                  ...data,
                  features: { ...data.features, sectionTitle: v },
                })
              }
            />
          </div>

          <div className="space-y-3">
            {data.features.items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/8 bg-[#07130f] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-500">
                    Özellik {idx + 1}
                  </span>
                  {data.features.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const items = data.features.items.filter(
                          (_, i) => i !== idx
                        );
                        setData({
                          ...data,
                          features: { ...data.features, items },
                        });
                      }}
                      className="rounded-md p-1 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const items = [...data.features.items];
                      items[idx] = { ...items[idx], title: e.target.value };
                      setData({
                        ...data,
                        features: { ...data.features, items },
                      });
                    }}
                    placeholder="Başlık"
                    className="h-9 rounded-lg border border-white/10 bg-[#0d1d17] px-3 text-sm text-white outline-none focus:border-[#d7f26f]/40"
                  />
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const items = [...data.features.items];
                      items[idx] = {
                        ...items[idx],
                        description: e.target.value,
                      };
                      setData({
                        ...data,
                        features: { ...data.features, items },
                      });
                    }}
                    placeholder="Açıklama"
                    className="h-9 rounded-lg border border-white/10 bg-[#0d1d17] px-3 text-sm text-white outline-none focus:border-[#d7f26f]/40"
                  />
                  <select
                    value={item.icon}
                    onChange={(e) => {
                      const items = [...data.features.items];
                      items[idx] = { ...items[idx], icon: e.target.value };
                      setData({
                        ...data,
                        features: { ...data.features, items },
                      });
                    }}
                    className="h-9 rounded-lg border border-white/10 bg-[#0d1d17] px-2 text-xs text-white outline-none focus:border-[#d7f26f]/40"
                  >
                    {ICON_OPTIONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const items = [
                ...data.features.items,
                { title: "", description: "", icon: "Star" },
              ];
              setData({ ...data, features: { ...data.features, items } });
            }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-xs font-medium text-stone-400 transition-colors hover:border-[#d7f26f]/30 hover:text-[#d7f26f]"
          >
            <Plus className="h-3.5 w-3.5" />
            Özellik Ekle
          </button>
        </SectionCard>

        {/* Ekranlar Bölümü */}
        <SectionCard title="📱 Ekranlar Bölümü">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="screen-label"
                label="Bölüm Etiketi"
                value={data.screens.sectionLabel}
                onChange={(v) =>
                  setData({
                    ...data,
                    screens: { ...data.screens, sectionLabel: v },
                  })
                }
              />
              <InputField
                id="screen-title"
                label="Bölüm Başlığı"
                value={data.screens.sectionTitle}
                onChange={(v) =>
                  setData({
                    ...data,
                    screens: { ...data.screens, sectionTitle: v },
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="screen-desc"
                className="mb-1.5 block text-xs font-medium text-stone-400"
              >
                Açıklama
              </label>
              <textarea
                id="screen-desc"
                value={data.screens.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    screens: { ...data.screens, description: e.target.value },
                  })
                }
                rows={2}
                className="w-full rounded-lg border border-white/12 bg-[#07130f] px-3 py-2 text-sm text-white outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/15"
              />
            </div>

            <div>
              <span className="mb-2 block text-xs font-medium text-stone-400">
                Kontrol Listesi
              </span>
              {data.screens.checklist.map((item, idx) => (
                <div key={idx} className="mb-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const checklist = [...data.screens.checklist];
                      checklist[idx] = e.target.value;
                      setData({
                        ...data,
                        screens: { ...data.screens, checklist },
                      });
                    }}
                    className="h-9 flex-1 rounded-lg border border-white/10 bg-[#07130f] px-3 text-sm text-white outline-none focus:border-[#d7f26f]/40"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const checklist = data.screens.checklist.filter(
                        (_, i) => i !== idx
                      );
                      setData({
                        ...data,
                        screens: { ...data.screens, checklist },
                      });
                    }}
                    className="rounded-md p-1 text-red-400 hover:bg-red-500/10"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const checklist = [...data.screens.checklist, ""];
                  setData({
                    ...data,
                    screens: { ...data.screens, checklist },
                  });
                }}
                className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-2 text-xs font-medium text-stone-400 transition-colors hover:border-[#d7f26f]/30 hover:text-[#d7f26f]"
              >
                <Plus className="h-3.5 w-3.5" />
                Madde Ekle
              </button>
            </div>
          </div>
        </SectionCard>

        {/* CTA Bölümü */}
        <SectionCard title="🚀 CTA Bölümü">
          <div className="space-y-4">
            <InputField
              id="cta-title"
              label="Başlık"
              value={data.cta.title}
              onChange={(v) =>
                setData({ ...data, cta: { ...data.cta, title: v } })
              }
            />
            <div>
              <label
                htmlFor="cta-desc"
                className="mb-1.5 block text-xs font-medium text-stone-400"
              >
                Açıklama
              </label>
              <textarea
                id="cta-desc"
                value={data.cta.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    cta: { ...data.cta, description: e.target.value },
                  })
                }
                rows={2}
                className="w-full rounded-lg border border-white/12 bg-[#07130f] px-3 py-2 text-sm text-white outline-none transition-all focus:border-[#d7f26f]/50 focus:ring-2 focus:ring-[#d7f26f]/15"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <InputField
                id="cta-btn"
                label="Buton Metni"
                value={data.cta.buttonText}
                onChange={(v) =>
                  setData({ ...data, cta: { ...data.cta, buttonText: v } })
                }
              />
              <InputField
                id="cta-sat-label"
                label="Memnuniyet Etiketi"
                value={data.cta.satisfactionLabel}
                onChange={(v) =>
                  setData({
                    ...data,
                    cta: { ...data.cta, satisfactionLabel: v },
                  })
                }
              />
              <InputField
                id="cta-sat-desc"
                label="Memnuniyet Açıklaması"
                value={data.cta.satisfactionDescription}
                onChange={(v) =>
                  setData({
                    ...data,
                    cta: { ...data.cta, satisfactionDescription: v },
                  })
                }
              />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Bottom save bar */}
      <div className="sticky bottom-0 mt-6 flex items-center justify-end rounded-xl border border-white/10 bg-[#0d1d17]/95 px-6 py-4 backdrop-blur-lg">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#d7f26f] px-6 py-3 text-sm font-semibold text-[#102015] transition-all hover:bg-[#e7ff89] hover:shadow-lg hover:shadow-[#d7f26f]/20 disabled:opacity-50"
        >
          {saving ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#102015] border-t-transparent" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {saved ? "Kaydedildi!" : "Tümünü Kaydet"}
        </button>
      </div>
    </div>
  );
}
