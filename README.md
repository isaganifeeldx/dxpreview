# DX Interior / DXI AI

Next.js App Router site for DXI AI, structured like the DX Living reference project — with SEO metadata, sitemap, robots, and clean URL rewrites — **without WordPress**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Payload CMS (local)

1. Start Docker Postgres:

```bash
docker start dxi-postgres
# or first-time:
# docker run -d --name dxi-postgres -e POSTGRES_USER=payload -e POSTGRES_PASSWORD=payload -e POSTGRES_DB=dxi_cms -p 5432:5432 postgres:16-alpine
```

2. Ensure `.env` has `DATABASE_URI` and `PAYLOAD_SECRET` (see `.env.example`).

3. Open [http://localhost:3000/admin](http://localhost:3000/admin) and create the first admin user.

## Structure

- `src/app/(frontend)/pages/*` — marketing routes (rewritten to clean URLs via `next.config.ts`)
- `src/app/(payload)/*` — Payload admin (`/admin`) and API
- `src/collections/*` — Payload collections
- `src/components/pages/*` — page UI
- `src/components/layout/*` — header, footer, shell
- `src/data/*` — static content (being replaced by CMS over time)
- `src/lib/seo.ts` / `siteUrl.ts` — SEO helpers
- `docs/` — local planning docs (gitignored)
- `reference/` — DX Living reference implementation (not part of the build)
