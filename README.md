# SID Jamyl Ryad Portfolio

Next.js + Payload portfolio with an editorial visual system inspired by `hexxt.dev`, `skills.sh`, and the local `effect/website` references.

## Run

```bash
npm install
npm run dev
```

Open:

- Site: http://localhost:3000
- Payload admin: http://localhost:3000/admin

If port `3000` is busy:

```bash
npm run dev -- --port 3002
```

## Content

Payload manages:

- `projects`
- `jobs`
- `stacks`
- `categories`
- `titles`
- `media`

The CV-derived profile, hackathons, contact links, and project enrichments live in `app/(app)/lib/portfolio-content.ts`.

## Verification

```bash
npm run lint
npm run build
```

Current note: `next build` succeeds, but Payload's Next integration emits a non-blocking `turbopack` config warning with this dependency combination.
