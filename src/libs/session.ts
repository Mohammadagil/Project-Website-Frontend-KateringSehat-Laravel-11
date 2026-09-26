import { cookies } from "next/headers";
import { TOKEN_COOKIE, USER_COOKIE } from "@/libs/auth-cookies";

export type TSessionUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

// Samakan dengan masa berlaku token Sanctum di backend
// (config/sanctum.php -> 'expiration' => 60 menit).
const MAX_AGE_SECONDS = 60 * 60;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};

export function getToken(): string | null {
  return cookies().get(TOKEN_COOKIE)?.value ?? null;
}

export function getSessionUser(): TSessionUser | null {
  const raw = cookies().get(USER_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TSessionUser;
  } catch {
    return null;
  }
}

// setSession & clearSession hanya boleh dipanggil dari Server Action / Route Handler,
// karena Next.js hanya mengizinkan mengubah cookie di sana.
export function setSession(token: string, user: TSessionUser) {
  cookies().set(TOKEN_COOKIE, token, cookieOptions);
  cookies().set(USER_COOKIE, JSON.stringify(user), cookieOptions);
}

export function clearSession() {
  cookies().delete(TOKEN_COOKIE);
  cookies().delete(USER_COOKIE);
}