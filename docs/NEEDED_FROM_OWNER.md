# What's still needed

The site is built so each item below drops into one content file. Nothing here has been guessed.

## Done
- [x] **Booking URL**: Airbnb listing https://www.airbnb.com/rooms/1750192248487782452 (`src/content/site.ts`)
- [x] Listing facts from Airbnb (read 2026-11-19): 3 guests, 1 bedroom (queen + air mattress), 1 bath, keypad self check-in, check-in after 3 PM, checkout 11 AM, host Nichole, registration BUS2026-01059 (`src/content/site.ts`)
- [x] All 27 Airbnb amenities (`src/content/details.ts`), house rules and checkout steps (`src/content/houseRules.ts`), FAQ answers (`src/content/faq.ts`)
- [x] Tribute switched on (2026-11-15) with the draft copy. Family to review and adjust `src/content/story.ts`
- [x] A photo of Susi in Soozeezbeez Honey BEEtique (added 2026-11-15)
- [x] District info from https://historiccstreet.org/plan-your-visit/

## Still open
- [ ] **Final domain** → `src/content/site.ts` `siteUrl` (enables canonical and social-preview URLs)
- [ ] **7 more photos**: the Airbnb listing has 22 photos; this repo has 15. Upload the rest to GitHub to add them to the gallery.
- [ ] Stairs / accessibility notes (the FAQ question stays hidden until answered)
- [ ] Street address, if the owner wants it public (Airbnb shares it after booking). Enables VacationRental structured data.
- [ ] Contact email / phone, if guests should be able to reach the host outside Airbnb
- [ ] Owner's named neighborhood favourites, with walking times
- [ ] Photos of the shop interior, Susi's honey products, the original logo artwork (optional)
- [ ] Whether Soozeezbeez Honey BEEtique is still operating (copy uses "began", which is neutral)

## Keep in sync
When the Airbnb listing changes (amenities, rules, times, guests), update `src/content/site.ts`,
`src/content/details.ts`, `src/content/houseRules.ts` and `src/content/faq.ts` to match.
