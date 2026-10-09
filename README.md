# SID Jamyl Ryad Portfolio

Next.js + Payload portfolio styled after `hexxt.dev`, using SID Jamyl Ryad's own content.

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

Payload manages the visible portfolio content:

- `projects`: choose **Client work** or **Projects**, then set **Order**. Tags and three short highlights are editable.
- `jobs`: set **Order**, **Period**, and one accomplishment per line in the description.
- `stacks` and `categories`: set **Order** to control the skills grid.
- `media`: upload images and technology icons.

The profile and contact links live in `app/(app)/lib/portfolio-content.ts`. The English resume is `public/assets/Jamyl_Ryad_Resume.pdf`; edit the adjacent HTML source before regenerating it.

The tracked `menu.db` contains the updated schema and content. `node scripts/update-portfolio-data.mjs` checks it without changing data. `--apply` reapplies the original content migration and overwrites those portfolio fields, so use it only when restoring this snapshot.

## Verification

```bash
npm run lint
npm run build
node scripts/update-portfolio-data.mjs
node scripts/check-portfolio-ui.mjs http://localhost:3000 # with the site running
```

Current note: `next build` succeeds, but Payload's Next integration emits a non-blocking `turbopack` config warning with this dependency combination.

Animation checks (desktop, mobile, reduced motion): start Chrome with `--remote-debugging-port=9223`, then run `node scripts/check-portfolio-animations.mjs http://localhost:3000`. The check uses Chrome's native debugging protocol without extra dependencies.

The portrait uses SVG paths traced from Jamyl's photo. Client previews are in `public/assets`; the GIG preview shows its public sign-in screen. Mechanical scenes render rotating wireframe geometry in canvas and pause outside the viewport.
