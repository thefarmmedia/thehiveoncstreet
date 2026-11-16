# Image Inventory

Every photo was classified by looking at the image itself. The machine-readable source of truth is
[`assets/image-manifest.json`](../assets/image-manifest.json). Originals are kept byte-for-byte in
`assets/originals/` (moved from the repo root, unmodified). Web versions (AVIF + WebP at 640/1280/2048px,
plus a 1280px JPEG for social previews) are generated into `public/images/` by `npm run images`.

| ID | Original | Space | Hero / camera use | Depth info | Gallery |
|---|---|---|---|---|---|
| `exterior-corner-mural` | 2f6b7e21… | Exterior: corner, flower mural, storefront | Establishing shot, push-in | High (strong perspective) | ★ |
| `exterior-front-storefront` | 29263f75… | Exterior: front facade, **Soozeezbeez Beetique decals** | Storefront → upstairs tilt | Medium | ★ |
| `exterior-rear-deck` | 4788e702… | Exterior: rear, deck, stairs, alley path | Bridge to deck | High | |
| `deck-view` | 0ca007c6… | Private deck, looking out over the street | Finale pull-back | High | ★ |
| `deck-entry` | 337933a6… | Deck and entry door (arched transom) | "Arrival" push | Medium | |
| `living-daylight` | c6206bb0… | Living room, daytime | Hero interior | High | ★ |
| `living-evening` | e46e8bd3… | Living room, evening, string lights | Day→night dissolve (same viewpoint) | High | ★ |
| `living-arch` | 5c4c3fcb… | Living room toward arch and hall | Reverse angle | High | |
| `living-brick-fireplace` | 17fe43b3… | Exposed brick, TV, electric fireplace console | Detail | Medium | ★ |
| `dining-workspace` | 1efb7444… | Desk, dining table, "Bee Our Guest" neon | Neon close-up → pull-out | High | ★ |
| `kitchen` | 413af6b9… | Kitchen | Slow push | Medium | ★ |
| `bedroom-window` | bf52ddf1… | Bedroom (bed, bee rug, window) | Lateral slide | Medium | ★ |
| `bedroom-dresser` | c1eae9a4… | Bedroom (dresser, bee pillows) | Detail | Medium | |
| `bathroom` | eeafb637… | Bathroom (backlit mirror, honeycomb shelves) | Detail | Low | ★ |
| `hallway` | f6974cd1… | Hallway (portrait), pine floors, brick, arch | Forward dolly; best depth shot | Very high | ★ |
| `storefront-decal` | *(crop of front storefront)* | Original window decal | Tribute section | n/a | |

## Notes and cautions

- **Bedrooms:** `bedroom-window` and `bedroom-dresser` show matching furniture; they may be one room or two. The site makes no bedroom-count claim.
- **Kitchen:** no stove or refrigerator is visible, so neither is listed.
- **Storefront:** a framed photo is visible inside the shop door (it may be Susi). It is not cropped or featured without family approval.
- **3D reconstruction:** not feasible from this set. See `docs/VIDEO_STORYBOARD.md` §1 for what footage would make it possible.
