# Fred Lich portfolio

Static portfolio site built with [Gatsby 5](https://www.gatsbyjs.com/) and content from [DatoCMS](https://www.datocms.com).

![Preview](preview.png)

## Requirements

- Node 20 (see `.nvmrc`)
- Yarn 1
- A read-only DatoCMS API token for the site

## Setup

```
yarn install
echo 'DATO_API_TOKEN=your-token' > .env
```

## Commands

| Command        | What it does                                 |
| -------------- | -------------------------------------------- |
| `yarn develop` | Development server with live reload          |
| `yarn build`   | Production build into `public/`              |
| `yarn serve`   | Serve the production build locally           |
| `yarn clean`   | Clear the Gatsby cache                       |
| `yarn format`  | Format source files with Prettier            |

## Structure

- `src/pages/index.js` renders the masonry grid of works.
- `src/templates/work.js` renders a single work; pages are created in `gatsby-node.js` from every `DatoCmsWork` slug.
- `src/pages/about.js` renders the about page from `DatoCmsAboutPage`.
- `src/components/layout.js` holds the sidebar, mobile header, and site-wide SEO tags.
- `src/styles/` contains the Sass, entry point `index.sass`.

## Content models

The site expects these DatoCMS models: `Site` (global SEO and favicon), `Home` (intro text and SEO), `Work` (title, slug, excerpt, creation date, cover image, gallery, description), `About page` (title, subtitle, photo, bio), and `Social profile` (profile type, URL, position).
