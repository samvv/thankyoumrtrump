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
sources:
  - title: 'Outlet: Headline of the article'
    url: https://example.org/article
---

A few sentences stating what happened, in plain factual terms.
```

Keep the sarcasm in `thanks` and the facts in `title` and the body. Add
`draft: true` to keep an unfinished entry off the site.

## Development

The site is built with [Astro](https://astro.build).

```sh
npm install
npm run dev      # local server at http://localhost:4321
npm run build    # production build in dist/
```

Pushing to `main` deploys the site to GitHub Pages.
