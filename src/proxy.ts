import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Only protect /admin/* routes, but allow the login page (/admin) itself
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin") {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      // Redirect to the login page
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
