# Thank You, Mr. Trump

A sarcastic site that highlights the main events of Donald Trump's presidency
as a timeline, newest first. Each entry "thanks" Trump or a member of his
circle for something they did, then states plainly what happened and links to
news coverage of it.

The gratitude is sarcastic; the facts are not. Every entry must cite at least
one source, and the build fails if one is missing.

## Adding an event

Create a Markdown file in `src/content/events/`, named
`YYYY-MM-DD-short-slug.md`:

```markdown
---
title: Neutral, factual headline of what happened
date: 2018-04-06
thanks: Thank you for ...
actors:
  - Donald Trump
scope: america          # america | world | both
category: immigration   # see src/content.config.ts for the full list
figure:                 # optional and rare: one telling number, shown large
  value: '14M'
  label: projected additional deaths by 2030
image:                  # optional: a photo, see below
  src: ../../assets/events/example.jpg
  alt: What the photo shows, for people who cannot see it.
  credit: Author, CC BY 4.0, cropped
  creditUrl: https://commons.wikimedia.org/wiki/File:Example.jpg
sources:
  - title: 'Outlet: Headline of the article'
    url: https://example.org/article
---

A few sentences stating what happened, in plain factual terms.
```

Keep the sarcasm in `thanks` and the facts in `title` and the body. Add
`draft: true` to keep an unfinished entry off the site.

### Photos

Use only public-domain or freely licensed photos, such as official US
government photos or files from
[Wikimedia Commons](https://commons.wikimedia.org). Photos from news articles
are copyrighted and must not be used. Save the file in `src/assets/events/`,
credit the author and license in `credit`, and link to the page it came from
in `creditUrl`. Photos are cropped to 16:9, so add "cropped" to the credit of a
Creative Commons photo; `position` (a CSS `object-position` value) steers the
crop.

## Development

The site is built with [Astro](https://astro.build).

```sh
npm install
npm run dev      # local server at http://localhost:4321
npm run build    # production build in dist/
```

Pushing to `main` deploys the site to GitHub Pages.
