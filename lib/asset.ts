export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Uploaded images are stored as /uploads/...; prefix the repo path when served from GitHub Pages
export const asset = (src: string) => (src.startsWith("/") ? `${basePath}${src}` : src);
