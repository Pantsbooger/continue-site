# Continue?

Games, books, telly and board games, for people with actual lives.

A plain static site — no build step, no framework. Open `index.html` directly
or serve the folder with any static file server to preview locally.

## Structure

```
index.html              homepage
about.html               about page
articles/*.html          one file per article
assets/css/style.css     shared styles (design tokens + components)
assets/js/site.js        renders the retro illustrations / photo panels on <canvas class="retro-art">
assets/fonts/            Nunito (self-hosted, embedded via @font-face)
assets/images/           real photos used in articles, credited in-page
```

## Adding a new article

1. Copy an existing file in `articles/` as a starting point.
2. Update the `<title>`, `<meta name="description">`, tag, headline, dek, byline date/read time.
3. Write the body inside `.prose` — plain `<p>`, `<h2>`, `<blockquote>`, `<ul>` all pick up house styling automatically.
4. Drop in `<figure class="inline-image">` blocks to break up long sections (see existing articles for the pattern) — either a real photo via `data-photo="../assets/images/your-image.jpg"`, or a plain illustrated panel via `data-icon="..."` (see the `drawIcon` types in `assets/js/site.js`: cartridge, tv, ticket, plant, controller, hourglass, book, calendar).
5. Add a card for it on `index.html` linking to the new file.

## Images

Real photos are used only when they come from a publisher's own press/media
site, credited in-page ("Image: ..."). Everything else is an original
canvas-drawn illustration — no stock photography, no copyrighted game art
used without a credited, editorial-context source.

## Deploying

This repo is set up for GitHub Pages. Push to `main`, then in the repo's
**Settings → Pages**, set the source to "Deploy from a branch" → `main` → `/ (root)`.
