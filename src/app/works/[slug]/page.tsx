import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWork } from "@/lib/content";
import { render } from "@/lib/markdown";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.excerpt || undefined,
    openGraph: work.coverImage
      ? { images: [{ url: work.coverImage.url, width: work.coverImage.width, height: work.coverImage.height }] }
      : undefined,
  };
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) notFound();

  return (
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">{work.title}</h1>
        <p className="sheet__lead">{work.excerpt}</p>
        {work.gallery.length > 0 && (
          <div className="sheet__slider">
            <div className="strip">
              {work.gallery.map((img) => (
                <div key={img.url} className="strip__item">
                  <Image
                    src={img.url}
                    alt={img.alt || work.title}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 900px) 40vw, 90vw"
                    placeholder={img.blur ? "blur" : "empty"}
                    blurDataURL={img.blur || undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="sheet__body" dangerouslySetInnerHTML={{ __html: render(work.description) }} />
        {work.coverImage && (
          <div className="sheet__gallery">
            <div className="sheet__image">
              <Image
                src={work.coverImage.url}
                alt={work.coverImage.alt || work.title}
                width={work.coverImage.width}
                height={work.coverImage.height}
                sizes="(min-width: 900px) 800px, 100vw"
                placeholder={work.coverImage.blur ? "blur" : "empty"}
                blurDataURL={work.coverImage.blur || undefined}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
