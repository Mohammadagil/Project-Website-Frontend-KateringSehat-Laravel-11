import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE } from "@/libs/auth-cookies";

// Halaman yang wajib login
const PROTECTED = [/^\/orders(\/|$)/, /^\/account(\/|$)/, /^\/packages\/[^/]+\/booking(\/|$)/];

// Halaman khusus tamu: kalau sudah login, tidak perlu ke sini lagi
const GUEST_ONLY = ["/login", "/register", "/forgot-password"];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const loggedIn = req.cookies.has(TOKEN_COOKIE);

  if (!loggedIn && PROTECTED.some((pattern) => pattern.test(pathname))) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  if (loggedIn && GUEST_ONLY.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Middleware hanya dijalankan untuk path ini, supaya halaman lain tidak ikut diperiksa.
export const config = {
  matcher: ["/orders/:path*", "/account/:path*", "/packages/:slug/booking/:path*", "/login", "/register", "/forgot-password"],
};