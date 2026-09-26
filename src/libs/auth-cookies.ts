// Nama cookie sesi. Dipisah dari session.ts karena middleware.ts
// (yang berjalan di Edge runtime) tidak boleh meng-import `next/headers`.
export const TOKEN_COOKIE = "ks_token";
export const USER_COOKIE = "ks_user";