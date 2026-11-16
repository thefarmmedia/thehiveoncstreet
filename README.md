# The Hive on C Street

*A Little Sweetness Lives On.*

Website for The Hive on C Street, an upstairs stay on Historic C-Street in Springfield, Missouri, above the
storefront where **Soozeezbeez Honey BEEtique** began.

Built with React, Vite, TypeScript, Tailwind CSS v4 and GSAP. Deploys to Netlify.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173 (drafts visible)
npm run build      # production build → dist/ (drafts stripped)
npm run preview    # serve the production build locally
npm run images     # regenerate web images after adding/changing photos
```

## What's on the page

| Section | Component | Content file |
|---|---|---|
| Cinematic hero (10-shot camera sequence over the real photos, single bee) | `Hero.tsx` | `content/hero.ts` |
| Welcome | `Welcome.tsx` | inline copy |
| Explore the Hive ("Choose your view" viewer) | `Explorer.tsx` | `content/explorer.ts` |
| Gallery + lightbox (filters, swipe, keyboard) | `Gallery.tsx` | `assets/image-manifest.json` |
| The Details | `Details.tsx` | `content/details.ts` |
| The Heart Behind the Hive (tribute) | `Tribute.tsx` | `content/story.ts` |
| Explore C Street | `Neighborhood.tsx` | `content/neighborhood.ts` |
| Book your stay | `Book.tsx`, `BookButton.tsx`, `StickyBook.tsx` | `content/site.ts` |
| FAQ | `Faq.tsx` | `content/faq.ts` |
| Footer | `Footer.tsx` | `content/site.ts`, `content/story.ts` |

## Content guide: where to change things

| To change… | Edit |
|---|---|
| **Booking link** | `src/content/site.ts` → `bookingUrl`. Every Book button updates. Until it's set, buttons scroll to the Book section, which says "booking is opening soon". |
| Site URL (canonical / social tags) | `src/content/site.ts` → `siteUrl` |
| Contact details | `src/content/site.ts` → `contact` |
| Address / structured data | `src/content/site.ts` → `location` (set `confirmed: true` + `streetAddress` to emit VacationRental schema) |
| **Family approval** of the tribute | `src/content/approvals.ts` → `TRIBUTE_APPROVED`, `FOOTER_TRIBUTE_APPROVED` |
| Tribute copy, Susi's photo, signature | `src/content/story.ts` |
| Amenities | `src/content/details.ts` (`pending` items are hidden in production) |
| FAQ | `src/content/faq.ts` (`confirmed: false` answers are hidden in production) |
| Neighborhood | `src/content/neighborhood.ts` (area info from historiccstreet.org; add owner favourites to `places`) |
| Hero shots / camera moves | `src/content/hero.ts` |
| **Hero video** (when produced) | Put files in `public/video/`, set `heroVideo` in `src/content/hero.ts` |
| Explorer rooms | `src/content/explorer.ts` |
| Photos | Add the original to `assets/originals/`, add an entry to `assets/image-manifest.json`, run `npm run images` |
| Colours / fonts | `src/styles.css` → `@theme` |

## Drafts and approvals (important)

Content that isn't verified or approved is a **draft**:

- Drafts **show** in `npm run dev` and on Netlify **deploy previews / branch deploys** (`VITE_SHOW_DRAFTS=true` in `netlify.toml`), marked with dashed "Placeholder" / "Draft" badges.
- Drafts are **removed from the production bundle** (not just hidden). The tribute text does not appear in the shipped JavaScript until `TRIBUTE_APPROVED` is `true`.

Currently drafts: unconfirmed amenities, home-specific FAQ answers, and the owner-favourites list.

## Accuracy rules this site follows

- Only the real photographs are used. Camera moves never warp or invent geometry.
- No invented capacity, bed counts, rates, availability, Wi-Fi, parking or address.
- "Soozeezbeez Honey BEEtique" is spelled exactly that way everywhere.
- Nothing about Susi's illness or passing is published. No invented quotes or biography.
- No health claims about honey.

## Docs

- [`docs/IMAGE_MANIFEST.md`](docs/IMAGE_MANIFEST.md): photo inventory and classification
- [`docs/VIDEO_STORYBOARD.md`](docs/VIDEO_STORYBOARD.md): hero film storyboard, feasibility, per-shot AI prompts, footage wish-list
- [`docs/NEEDED_FROM_OWNER.md`](docs/NEEDED_FROM_OWNER.md): checklist of missing information

## Accessibility & performance

- Respects `prefers-reduced-motion`: static hero, no bees, no reveals.
- Hero has a Pause/Play control and pauses when off-screen or the tab is hidden.
- Keyboard: skip link, focus styles, arrow keys in the explorer and lightbox, Escape to close.
- Images: AVIF/WebP `srcset`, blurred placeholders, lazy-loading, hero image preloaded.
- Fonts self-hosted (Cormorant Garamond + Inter). No external requests at runtime.

---

Website by [The Farm Media](https://thefarmmedia.com).
