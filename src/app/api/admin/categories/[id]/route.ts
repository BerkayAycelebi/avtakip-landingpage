import { isAuthenticated } from "@/lib/auth";
import { deleteCategory } from "@/lib/data";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const { id } = await params;
    await deleteCategory(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Kategori silinemedi" }, { status: 400 });
  }
}
