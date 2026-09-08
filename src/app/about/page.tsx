import type { Metadata } from "next";
import Image from "next/image";
import { getSite } from "@/lib/content";
import { render } from "@/lib/markdown";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSite();
  return { title: s.aboutTitle, description: s.aboutSubtitle || undefined };
}

export default async function About() {
  const s = await getSite();
  return (
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">{s.aboutTitle}</h1>
        <p className="sheet__lead">{s.aboutSubtitle}</p>
        {s.aboutPhoto && (
          <div className="sheet__gallery">
            <Image
              src={s.aboutPhoto.url}
              alt={s.aboutPhoto.alt || s.aboutTitle}
              width={s.aboutPhoto.width}
              height={s.aboutPhoto.height}
              sizes="(min-width: 900px) 800px, 100vw"
              placeholder={s.aboutPhoto.blur ? "blur" : "empty"}
              blurDataURL={s.aboutPhoto.blur || undefined}
            />
          </div>
        )}
        <div className="sheet__body" dangerouslySetInnerHTML={{ __html: render(s.aboutBio) }} />
      </div>
    </article>
  );
}
