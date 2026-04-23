import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Read inside the function so Vercel Edge Runtime evaluates it per-request
  const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";

  const { pathname } = request.nextUrl;

  // Always pass pathname as a header so layouts can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (!MAINTENANCE_MODE) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Allow the maintenance page itself and all static/internal Next.js assets
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Redirect everything else to /maintenance
  return NextResponse.redirect(new URL("/maintenance", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
