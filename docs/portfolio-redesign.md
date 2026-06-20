# Portfolio Redesign Notes

## Decision

Use the existing Next.js + Payload app instead of creating a second app. The portfolio front is rebuilt as an editorial, section-numbered experience inspired by the referenced sites, while Payload remains the source for projects, jobs, stack categories, media, and rotating titles.

## Why

- The existing Payload database already contains useful portfolio data and uploaded assets.
- Keeping the current app avoids duplicate admin work.
- The visual system can be code-driven: large display type, hard borders, sticky side navigation, sketch-like image frames, hatching, dot grids, and a dark technical background.
- CV-only data is added as curated fallback content so the site is strong even before new CMS fields are filled.

## CMS Boundary

Editable in Payload today:

- Projects: title, description, image, type, GitHub link, live link.
- Jobs: position, description, image, order.
- Stacks: name, icon, category.
- Titles: rotating hero labels.
- Media: project and technology assets.

Static fallbacks from the CV:

- Bio, contact links, hero stats, work principles, hackathons, and project metadata enrichments.

This keeps the CMS lightweight: the admin only needs to manage recurring content, not every small presentation label.

## Follow-Up Candidates

- Add a `profile` global if every hero/contact line must become editable.
- Add project `order`, `year`, `role`, `metrics`, and `stack` fields if the enriched case-study metadata should move fully into Payload.
- Add an image optimization task for old uploaded project screenshots that are currently logos rather than full-page mockups.
