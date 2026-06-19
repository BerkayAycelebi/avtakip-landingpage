import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(users);
}

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) return Response.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const { email, password, name } = await request.json();
    
    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: "Bu e-posta kullanımda" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: passwordHash, name },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return Response.json(user);
  } catch {
    return Response.json({ error: "Kullanıcı oluşturulamadı" }, { status: 400 });
  }
}
