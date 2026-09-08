import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/shell";
import { getSite } from "@/lib/content";
import { render } from "@/lib/markdown";

// Pages are cached and re-read from the database at most once a minute;
// the editor also clears the cache on save through /api/revalidate.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSite();
  const title = s.seoTitle || s.siteName;
  return {
    title: { default: title, template: `%s | ${s.siteName}` },
    description: s.seoDescription || undefined,
    openGraph: { title, description: s.seoDescription || undefined, siteName: s.siteName, type: "website" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const s = await getSite();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout, so it loads on every page */}
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Shell siteName={s.siteName} introHtml={render(s.introText)} social={s.social}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
