import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const { id } = await params;
    
    // Prevent deleting the last admin
    const userCount = await prisma.user.count();
    if (userCount <= 1) {
      return Response.json({ error: "Sistemde en az 1 yönetici kalmalıdır" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Kullanıcı silinemedi" }, { status: 400 });
  }
}
