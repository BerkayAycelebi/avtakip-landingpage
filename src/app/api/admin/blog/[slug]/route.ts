import { isAuthenticated } from "@/lib/auth";
import { getBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return Response.json({ error: "Yazı bulunamadı" }, { status: 404 });
  }

  return Response.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = await request.json();
    
    // Yalnızca güncellenecek alanları al
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.date !== undefined) updateData.date = body.date;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.readTime !== undefined) updateData.readTime = body.readTime;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.content !== undefined) updateData.content = body.content;

    const post = await updateBlogPost(slug, updateData);
    return Response.json(post);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return Response.json({ error: "Yazı bulunamadı" }, { status: 404 });
    }
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    await deleteBlogPost(slug);
    return Response.json({ success: true });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return Response.json({ error: "Yazı bulunamadı" }, { status: 404 });
    }
    return Response.json({ error: "Silme işlemi başarısız" }, { status: 400 });
  }
}
