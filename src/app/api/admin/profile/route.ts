import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const { name, currentPassword, newPassword } = await request.json();

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return Response.json({ error: "Mevcut şifreniz yanlış" }, { status: 400 });
    }

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (newPassword) {
      dataToUpdate.password = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Profil güncellenemedi" }, { status: 400 });
  }
}
