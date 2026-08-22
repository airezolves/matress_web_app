import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Returns the D1 database binding for the current request.
 *
 * Uses the async Cloudflare context so it works both in dynamically rendered
 * Server Components / Route Handlers and during the Next.js dev server (where
 * bindings are provided by miniflare via initOpenNextCloudflareForDev()).
 */
export async function getDB(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error("D1 binding `DB` is not available. Check wrangler.jsonc bindings.");
  }
  return env.DB;
}
