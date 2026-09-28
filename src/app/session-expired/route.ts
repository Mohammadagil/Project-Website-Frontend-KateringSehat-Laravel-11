import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE, USER_COOKIE } from "@/libs/auth-cookies";

// Hapus cookie sesi yang tokennya sudah ditolak backend, lalu arahkan ke halaman masuk.
// Tanpa ini, cookie lama membuat middleware mengira pengguna masih login dan menolak membuka /login.
export function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get("next") ?? "/";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(safeNext)}&expired=1`;

  const res = NextResponse.redirect(url);
  res.cookies.delete(TOKEN_COOKIE);
  res.cookies.delete(USER_COOKIE);
  return res;
}
