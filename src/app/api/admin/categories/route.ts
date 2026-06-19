import { isAuthenticated } from "@/lib/auth";
import { getCategories, createCategory, deleteCategory } from "@/lib/data";

export async function GET() {
  const categories = await getCategories();
  return Response.json(categories);
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const { name, slug } = await request.json();
    const category = await createCategory({ name, slug });
    return Response.json(category);
  } catch {
    return Response.json({ error: "Kategori oluşturulamadı" }, { status: 400 });
  }
}
