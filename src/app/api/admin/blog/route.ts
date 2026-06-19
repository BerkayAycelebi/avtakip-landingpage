import { isAuthenticated } from "@/lib/auth";
import { getBlogPosts, createBlogPost } from "@/lib/data";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  const posts = await getBlogPosts();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ü/g, "u")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newPost = await createBlogPost({
      slug,
      title: body.title || "",
      excerpt: body.excerpt || "",
      date: body.date || new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }),
      categoryId: body.categoryId || "",
      readTime: body.readTime || "3 dk",
      image: body.image || "/images/blog-default.png",
      content: body.content || "",
    });

    return Response.json(newPost, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return Response.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
    }
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}
