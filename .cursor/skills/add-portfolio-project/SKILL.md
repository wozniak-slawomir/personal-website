---
name: add-portfolio-project
description: Add a live website to the personal-website portfolio with a mobile screenshot and PL/EN copy. Use when the user asks to add a site, client, or project to the portfolio, create a mobile screenshot of a URL for portfolio, or update RealizedProjects.
---

# Add Portfolio Project

Add an external website to the homepage/portfolio masonry. Newest items go last in `contentItems` (the UI `.reverse()`s them).

## Workflow

1. Capture a mobile screenshot
2. Append a `contentItems` entry
3. Add `projects.<key>` strings in PL and EN
4. Verify the PNG looks like a clean above-the-fold mobile hero (no cookie banner)

## Screenshot

Run the script (needs Chrome; use unrestricted permissions):

```bash
node .cursor/skills/add-portfolio-project/scripts/mobile-screenshot.mjs \
  "https://example.com/" \
  public/projects/<slug>.png
```

Defaults: iPhone viewport `390x844`, `deviceScaleFactor: 2`, viewport-only (not full page), cookie UI stripped.

- Filename: `public/projects/<slug>.png` (lowercase, no spaces)
- No phone frame
- Inspect the PNG after capture; recapture if the cookie widget, desktop layout, or a blank/loading state remains

## contentItems

Append to `const/contentItems.ts`:

```ts
{
  name: 'example.com',
  image: 'projects/<slug>.png',
  description: (t) => t('projects.<key>'),
  tags: ['portfolio'],
  link: 'https://example.com/',
}
```

- `name`: domain when that is the brand (`schnellrezept.net`); otherwise the product name (`MyDr`)
- `image`: path relative to `public/` (no leading slash)
- `link`: full `https://` URL
- Do not add `lastmod` for portfolio items (that field is for blog posts)

## Copy

Add matching keys in:

- `i18n/locales/pl/services.json`
- `i18n/locales/en/services.json`

1–2 sentences: what the site is and who it is for. Match the tone of existing `projects.*` strings.

```json
"projects.<key>": "…"
```

## Do not

- Do not add blog-tagged items or update `llms` in `nuxt.config.ts`
- Do not put the screenshot script in `scripts/` at the repo root
- Do not commit unless the user asks
