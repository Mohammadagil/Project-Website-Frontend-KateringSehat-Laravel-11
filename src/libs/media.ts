// Path file dari backend (mis. "thumbnails/abc.jpg") → URL lengkap untuk <Image>.
// Memakai NEXT_PUBLIC_HOST_API supaya bisa dipanggil dari server maupun browser.
export function mediaUrl(path?: string | null) {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_HOST_API}/${path.replace(/^\/+/, "")}`;
}
