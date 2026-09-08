# Fred Lich portfolio

The public site at [fredlich.com](https://fredlich.com). Next.js on Vercel. Content comes from the editor at [tools.fredlich.com](https://tools.fredlich.com) ([flicht/fredlich-tools](https://github.com/flicht/fredlich-tools)), which writes to a Neon Postgres database that this site reads. Photos are on Vercel Blob.

There is no build step when content changes: pages are cached and re-read at most once a minute, and the editor clears the cache on every save.

![Preview](preview.png)

## Structure

- `src/app/page.tsx` renders the grid of works (CSS columns).
- `src/app/works/[slug]/page.tsx` renders a single work: gallery strip, Markdown description, cover image.
- `src/app/about/page.tsx` renders the about page.
- `src/app/layout.tsx` and `src/components/shell.tsx` hold the sidebar, mobile header and site-wide metadata.
- `src/lib/content.ts` is every database read. Reads never throw; an unreachable database renders an empty page and logs.
- `src/db/schema.ts` mirrors the editor's schema. The editor owns and creates the tables; keep this in step with `fredlich-tools/src/db/schema.ts`.
- `src/app/api/revalidate/route.ts` drops the page cache when the editor asks.
- `src/app/globals.css` is the old Sass, flattened.

## Setup on Vercel

1. Import this repo as a Vercel project. Framework preset: Next.js.
2. Storage: connect the **same** Neon database the tools project uses (Storage > Connect Store > pick the existing one). That sets `POSTGRES_URL`.
3. Environment variables: `REVALIDATE_SECRET`, any long random string. Put the same value in the tools project together with `PUBLIC_SITE_URL=https://fredlich.com`.
4. Domains: add `fredlich.com` and move the DNS record from wherever the Gatsby build was hosted.

## Local development

```
# .env.local
POSTGRES_URL=...          # vercel env pull, or from the Neon console
REVALIDATE_SECRET=...     # optional locally

npm install
npm run dev
```

| Command         | What it does                |
| --------------- | --------------------------- |
| `npm run dev`   | Development server on :3000 |
| `npm run build` | Production build            |
| `npm run start` | Serve the production build  |
| `npm run lint`  | ESLint                      |

## History

Until version 3 this was a Gatsby 5 site sourcing from DatoCMS (`gatsby-source-datocms`). The Dato content was imported with `npm run migrate:dato` in fredlich-tools.
