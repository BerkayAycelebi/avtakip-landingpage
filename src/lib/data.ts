import { prisma } from "./prisma";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categoryId: string;
  readTime: string;
  image: string;
  content: string;
};

export type HomepageData = {
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
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
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

const DEFAULT_HOMEPAGE_DATA: HomepageData = {
  stats: {
    downloads: "1.000+",
    rating: 4.8,
    totalReviews: 52,
    cityCount: 81,
    satisfaction: 98,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.berkayaycelebi.avtakip",
  },
  hero: {
    badge: "Android için saha takip uygulaması",
    title: "Av Takip",
    subtitle: "Avlak noktaları, solunar takvim, canlı harita, hava durumu ve ekip iletişimi. Doğaya çıkmadan önce planla, sahadayken kontrolü elinde tut.",
    ctaPrimary: "Google Play'den indir",
    ctaSecondary: "Özellikleri incele",
    appLogoUrl: "https://lh3.googleusercontent.com/c2jHs_n3MWtvUNyGqNxQbcb5U1VDai7d8NOmzEgy05D0SdURi4eGxHnGHkB5UU9y1ttcii8ShXcIJiEMT0-O=s512",
    appMockupUrl: "https://lh3.googleusercontent.com/j3pJuOBaKcl2qb9DxyhXvMc5gMCMZxO68exgg-Fl_fsBxwxUHBqP8j9u22aP5ie7d8tK1feZ2FRmks9v6PJY5Pk=s1043",
    appFeaturesUrl: "https://lh3.googleusercontent.com/Xl-wKeCyAncaPBkKOYbrgKxz8E9UJK-IVLJr8KsPCRun9T4tO0CV1AXkSIL6vZ95qltEHQ_pjfmds2f7BqqWDA=s1024",
  },
  features: {
    sectionLabel: "Tek Uygulama",
    sectionTitle: "Av gününü planlamak için gereken temel araçlar.",
    items: [
      {
        title: "Solunar Takvim",
        description: "Ay evreleri, gün doğumu ve gün batımı verileriyle av için doğru saatleri tek bakışta görün.",
        icon: "CalendarDays",
      },
      {
        title: "Canlı Harita",
        description: "Avlak noktalarını kaydedin, rota oluşturun ve ekibinizin konumunu sahada takip edin.",
        icon: "MapPin",
      },
      {
        title: "Bas-Konuş Telsiz",
        description: "Ekip arkadaşlarınızla telefondan hızlı sesli iletişim kurun, koordinasyonu koparmayın.",
        icon: "Radio",
      },
      {
        title: "Hava ve Basınç",
        description: "Rüzgar, sıcaklık, basınç ve hava durumu bilgilerini karar anında yanınızda taşıyın.",
        icon: "CloudSun",
      },
      {
        title: "Ekip Yönetimi",
        description: "Davet bağlantısı, ekip listesi ve skor görünümüyle av grubunuzu düzenli tutun.",
        icon: "Users",
      },
      {
        title: "Gizlilik Kontrolü",
        description: "Konum ve profil verilerinizi sadece seçtiğiniz ekiple paylaşmaya odaklanan güvenli yapı.",
        icon: "ShieldCheck",
      },
    ],
  },
  screens: {
    sectionLabel: "Gerçek Ekranlar",
    sectionTitle: "Harita, takvim ve ekip akışı aynı yerde.",
    description: "Av Takip; saha notlarını, konum bilgisini, hava tahminini ve ekip iletişimini ayrı ayrı aramak yerine düzenli bir mobil deneyimde toplar.",
    checklist: [
      "Avlak, rota ve not kayıtları",
      "Türkiye geneli il desteği",
      "Mobil öncelikli hızlı kullanım",
      "Av ve balıkçılık için tek panel",
    ],
  },
  cta: {
    title: "Bir sonraki av gününü daha planlı başlat.",
    description: "Ücretsiz indir, ekibini kur, favori noktalarını kaydet ve sahada hızlı karar al.",
    buttonText: "Hemen indir",
    satisfactionLabel: "Kullanıcı",
    satisfactionDescription: "Memnuniyet odağıyla geliştirilen sade, hızlı ve mobil bir saha deneyimi.",
  },
};

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createCategory(data: { name: string; slug: string }) {
  return prisma.category.create({ data });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({ where: { id } });
}

export async function getBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return posts.map((post: any) => ({
    ...post,
    categoryName: post.category?.name || "Bilinmeyen",
  }));
}

export async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post) return null;
  return {
    ...post,
    categoryName: post.category?.name || "Bilinmeyen",
  };
}

export async function createBlogPost(data: BlogPost) {
  return prisma.blogPost.create({
    data,
  });
}

export async function updateBlogPost(slug: string, data: Partial<BlogPost>) {
  return prisma.blogPost.update({
    where: { slug },
    data,
  });
}

export async function deleteBlogPost(slug: string) {
  return prisma.blogPost.delete({
    where: { slug },
  });
}

export async function getHomepageData(): Promise<HomepageData> {
  const setting = await prisma.setting.findUnique({
    where: { key: "homepage_data" },
  });

  if (!setting) {
    return DEFAULT_HOMEPAGE_DATA;
  }

  return JSON.parse(setting.value) as HomepageData;
}

export async function saveHomepageData(data: HomepageData) {
  return prisma.setting.upsert({
    where: { key: "homepage_data" },
    update: { value: JSON.stringify(data) },
    create: {
      key: "homepage_data",
      value: JSON.stringify(data),
    },
  });
}
