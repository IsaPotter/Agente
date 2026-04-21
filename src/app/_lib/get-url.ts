import { NEXT_PUBLIC_APP_URL } from "@/types/env";

export function getUrl(path?: string) {
  const baseUrl = NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || "";
  
  // Se for apenas o path começando com /, retorna ele mesmo se baseUrl for vazia
  // Isso evita gerar strings como "undefined/app"
  return `${baseUrl}${normalizedPath}`;
}
