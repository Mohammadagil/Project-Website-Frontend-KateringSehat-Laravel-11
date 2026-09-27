import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE } from "@/libs/auth-cookies";

// Halaman yang wajib login
const PROTECTED = [/^\/orders(\/|$)/, /^\/account(\/|$)/, /^\/packages\/[^/]+\/booking(\/|$)/];

// Halaman khusus tamu: kalau sudah login, tidak perlu ke sini lagi
const GUEST_ONLY = ["/login", "/register", "/forgot-password"];

// true = halaman dibuka langsung di browser (ketik URL, refresh, buka dari link email).
// false = request data internal Next.js (navigasi di dalam aplikasi, refresh data setelah Server Action).
// Header internal "rsc" dibuang Next.js sebelum sampai ke middleware, jadi dipakai header standar browser.
function isDocumentRequest(req: NextRequest) {
  const mode = req.headers.get("sec-fetch-mode");
  if (mode) return mode === "navigate";
  return req.headers.get("accept")?.includes("text/html") ?? false;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const loggedIn = req.cookies.has(TOKEN_COOKIE);

  if (!loggedIn && PROTECTED.some((pattern) => pattern.test(pathname))) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  // Setelah login/daftar berhasil, Next.js memuat ulang data halaman /login atau /register.
  // Kalau request data itu ikut dialihkan ke "/", ia bentrok dengan redirect dari Server Action
  // dan halaman tidak berpindah. Jadi aturan ini hanya untuk halaman yang dibuka langsung.
  if (loggedIn && isDocumentRequest(req) && GUEST_ONLY.includes(pathname)) {
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