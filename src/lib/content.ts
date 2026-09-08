import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import type { Site, Work } from "@/db/schema";

const { works, site } = schema;

function db() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) throw new Error("POSTGRES_URL is not set");
  return drizzle(url, { schema });
}

/**
 * A page should still render if the database is unreachable or the editor
 * has not created the tables yet, so every read swallows errors and logs.
 */
async function safe<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error("content:", e instanceof Error ? e.message : e);
    return fallback;
  }
}

export const EMPTY_SITE: Site = {
  id: 1,
  siteName: "FRED LICH",
  introText: "",
  seoTitle: "",
  seoDescription: "",
  aboutTitle: "About",
  aboutSubtitle: "",
  aboutPhoto: null,
  aboutBio: "",
  social: [],
  updatedAt: new Date(0),
};

export function getSite(): Promise<Site> {
  return safe(EMPTY_SITE, async () => {
    const [row] = await db().select().from(site).where(eq(site.id, 1)).limit(1);
    return row ?? EMPTY_SITE;
  });
}

export function listWorks(): Promise<Work[]> {
  return safe([], () =>
    db().select().from(works).where(eq(works.published, true)).orderBy(desc(works.creationDate), desc(works.createdAt)),
  );
}

export function getWork(slug: string): Promise<Work | null> {
  return safe(null, async () => {
    const [row] = await db().select().from(works).where(and(eq(works.slug, slug), eq(works.published, true))).limit(1);
    return row ?? null;
  });
}

/** "2021-06-14" -> "14-06-2021", the format the old site used. */
export function showDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : iso;
}
