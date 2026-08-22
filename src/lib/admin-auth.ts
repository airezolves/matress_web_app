import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Validates the `Authorization: Bearer <ADMIN_API_KEY>` header against the
 * `ADMIN_API_KEY` secret bound to the Worker. Returns true when authorized.
 */
export async function isAdminAuthorized(request: Request): Promise<boolean> {
  const { env } = await getCloudflareContext({ async: true });
  // Secret is injected at runtime via `wrangler secret put`, so it is not part
  // of the generated CloudflareEnv type; read it defensively.
  const expected = (env as unknown as Record<string, string | undefined>).ADMIN_API_KEY;

  if (!expected) {
    return false;
  }

  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";

  return token.length > 0 && token === expected;
}
