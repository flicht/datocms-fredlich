import Image from "next/image";
import Link from "next/link";
import { listWorks, showDate } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const works = await listWorks();
  return (
    <div className="showcase">
      {works.map((work) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            {work.coverImage && (
              <Link href={`/works/${work.slug}`} className="card__image">
                <Image
                  src={work.coverImage.url}
                  alt={work.coverImage.alt || work.title}
                  width={work.coverImage.width}
                  height={work.coverImage.height}
                  sizes="(min-width: 1400px) 30vw, (min-width: 501px) 45vw, 100vw"
                  placeholder={work.coverImage.blur ? "blur" : "empty"}
                  blurDataURL={work.coverImage.blur || undefined}
                />
              </Link>
            )}
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link href={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              {work.creationDate && (
                <div className="card__date">
                  <p>{showDate(work.creationDate)}</p>
                </div>
              )}
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
