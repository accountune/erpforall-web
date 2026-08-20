# ERP for All — marketing website

Next.js 15 (App Router) + Tailwind v4 + TypeScript. Two pages: the home page and the
privacy policy. Everything prerenders as static HTML.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Before you go live

Everything that changes between a demo and the real site lives in one file:
[lib/site.ts](lib/site.ts). Replace the block marked `replace before launch`:

| Field              | Currently                                     |
| ------------------ | --------------------------------------------- |
| `url`              | `https://erpforall.in`                        |
| `APP_URL`          | `https://app.erpforall.com` (top of the file) |
| `legalEntity`      | `ERP for All Technologies Private Limited`    |
| `address`          | **placeholder text**                          |
| `email`            | `support@erpforall.in`                        |
| `privacyEmail`     | `privacy@erpforall.in`                        |
| `grievanceOfficer` | **placeholder text**                          |

Also worth a look before launch:

- **The privacy policy is a well-researched draft, not legal advice.** It is written
  against the DPDP Act 2023, the IT Act / SPDI Rules, and the CGST and Companies Act
  retention periods, and it makes concrete promises (India-only hosting, 30-day
  backups, 90-day export window, 180-day logs). Have your counsel confirm each one is
  true of your actual setup, then keep them in sync.
- **Sign-up and log-in leave this site.** Both hand off to the app subdomain,
  derived from the single `APP_URL` constant at the top of `lib/site.ts`
  (`/signup` and `/login`). If your app does not serve those paths, point both at
  `APP_URL` itself — one edit, and every button on the site follows.
- **The site publishes no prices and no phone number.** Email is the only contact
  channel offered, in the footer, the closing band and the grievance section. If you
  add a number later, put it in `lib/site.ts` and it will not need to be repeated.
- **The hero invoice is fictional sample data** — the parties, GSTINs and items are
  invented, though the GST arithmetic is correct. It is labelled "Sample invoice".
- No fabricated customer logos, testimonials or "12,000+ businesses" counters were
  used anywhere. If you add social proof, make it real.

## Structure

Follows the conventions in `nextjs-guideline.md`: App Router, feature folders,
kebab-case filenames, `use client` confined to `components/ui` and
`features/**/components`.

```
app/                     routes, metadata, robots, sitemap, favicon
components/brand/        the logo — rebuilt as vector
components/layout/       masthead and footer
components/ui/           the two client components (mobile nav, scroll reveal)
features/marketing/      home page: content.ts holds every word and number
features/privacy/        policy sections and the sticky index
lib/site.ts              launch config
lib/format.ts            Indian number formatting
```

## The logo

The attached PNG could not be carried into the repo directly, so the mark was rebuilt
as vector in [components/brand/logo-mark.tsx](components/brand/logo-mark.tsx) — the
orbit sweep, the closing dot, and the four module discs with their icons. The wordmark
is live text in the site's display face rather than an image, so it stays crisp,
selectable and themeable.

The four disc colours are load-bearing, not decoration. Each one is bound to a product
area and reused wherever that area appears:

| Disc            | Token     | Stands for            |
| --------------- | --------- | --------------------- |
| Blue bar chart  | `report`  | GST returns, reports  |
| Green cart      | `sales`   | Billing and sales     |
| Amber people    | `party`   | Parties and customers |
| Violet gear     | `stock`   | Stock and operations  |

If you would rather ship the original raster logo, drop it in `public/` and swap the
`LogoMark` call inside [components/brand/logo.tsx](components/brand/logo.tsx) for a
`next/image`. Keep `app/icon.svg` in sync — it is the favicon.

## Design notes

The page borrows its structure from the artifact the product exists to produce: the GST
tax invoice. Hairline-ruled cells, tiny uppercase mono field labels, and tabular
figures throughout — every number on the site is set in IBM Plex Mono so columns align.
Type is Archivo held wide for headings (a form caption, not a magazine title), Public
Sans for body, Plex Mono for data.

Motion is deliberately concentrated in one place: the hero invoice assembles itself,
line items then tax split then total then the GSTR-1 stamp. Elsewhere there are only
quiet scroll reveals. `prefers-reduced-motion` skips straight to the final state.

Numbered markers appear exactly once, in the "how it works" section, because that
content genuinely is a sequence — it is the order the data moves in.
