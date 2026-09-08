import { revalidatePath } from "next/cache";

/**
 * The editor at tools.fredlich.com calls this after a save so changes show
 * up straight away instead of at the next timed revalidation. Both sides
 * must have the same REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || given !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
