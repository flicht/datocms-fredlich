import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">Page not found</h1>
        <p className="sheet__lead">
          That page doesn&apos;t exist. <Link href="/">Back to the home page.</Link>
        </p>
      </div>
    </article>
  );
}
