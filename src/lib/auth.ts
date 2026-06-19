import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (!token) return false;

  const session = await prisma.session.findUnique({
    where: { token },
  });

  if (!session) return false;

  // Check expiration
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { token } });
    return false;
  }

  return true;
}

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!session || session.expiresAt < new Date()) return null;

  return session.user;
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || "differentiate.function@gmail.com";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "12345";
}

export { SESSION_COOKIE, SESSION_VALUE };
