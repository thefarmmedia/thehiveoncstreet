# Hero Film: Storyboard, Feasibility & Shot Prompts

The site already plays a **photo-based cinematic intro** in the browser (`src/content/hero.ts`):
real photographs, moved by a virtual camera (push, tilt, drift, dissolve, arch-masked reveal).
It invents nothing, so it is safe to publish today.

This document covers the next step: a **true video** for the hero. When it exists, set
`heroVideo` in `src/content/hero.ts` and drop the files into `public/video/`. The photo
sequence stays as the fallback for slow connections and reduced-motion visitors.

---

## 1. What the current photos can and can't support

| Technique | Verdict with the 15 supplied photos | Why |
|---|---|---|
| **2.5D camera moves on stills** (what the site does now) | ✅ Done | Accurate by construction: only the real frame is shown. |
| **Depth-map parallax** (e.g. Depth Anything V2 → displacement) | ⚠️ Possible for a few shots, small moves only | Wide-angle real-estate frames have lots of thin geometry (vines, chair legs, railings) that tears at the edges when displaced. Usable on `hallway`, `exterior-corner-mural`, `living-daylight` with ≤3% motion. |
| **Image-to-video AI** (Runway, Kling, Veo, Luma) | ⚠️ Possible per shot, with strict review | Good at short, slow pushes. Risky: furniture morphing, new doors or windows, text corruption on the storefront decals. Every clip must be checked frame by frame against the source photo. |
| **Photogrammetry / Gaussian splatting** | ❌ Not feasible | Needs 50–300 overlapping photos or a video walk-through per room. We have 1–4 single frames per space with little overlap (see `assets/image-manifest.json` → `reconstruction`). |
| **360° virtual tour** | ❌ Not feasible | No panoramas. Most walls of every room are unseen; filling them would mean inventing the home. |
| **3D model from measurements** | ❌ Not without a site visit | No floor plan or measurements supplied. |

### Footage that would unlock a genuine walkthrough

1. **Gimbal walk-through video** (4K, 24/30 fps, slow, steady), one continuous take per route:
   street → storefront → up to the deck → entry door → hallway → living room → kitchen → bedroom(s) → bathroom.
   This alone is enough for a real hero film *and* Gaussian-splat scenes of the main rooms.
2. **Phone LiDAR / Polycam or Luma capture** of the living room and deck, for interactive 3D in "Explore the Hive".
3. **Equirectangular 360° photos** (e.g. Insta360) from the centre of each room, for an honest 360 tour.
4. **Golden-hour exterior** from across C Street, plus a slow drone pull-up from the storefront to the
   upstairs windows, if local rules allow. This is the "downstairs to upstairs" story beat done for real.
5. **Family material**: a photo of Susi in Soozeezbeez Honey BEEtique, shop products, the original logo artwork.

---

## 2. Storyboard (≈ 45 s, 16:9 master, 9:16 mobile cut)

| # | Beat | Source photo | Camera | Duration | On-screen text |
|---|---|---|---|---|---|
| 1 | Establishing | `exterior-corner-mural` | Slow push toward the mural corner, 2° clockwise drift. A single small bee crosses the upper third, left → right. | 6 s | — |
| 2 | Where it began | `exterior-front-storefront` | Tight on the left window decal and teal awning; gentle hold. | 4.5 s | "Downstairs, Soozeezbeez Honey BEEtique." |
| 3 | A new chapter | `exterior-front-storefront` | Continuous tilt up from the decal to the three arched upstairs windows, easing out. | 4.5 s | "Upstairs, a new chapter." |
| 4 | Arrival | `deck-entry` | Slow push toward the white entry door and its arched transom. | 4.5 s | — |
| 5 | Step inside | `hallway` | Arch-shaped mask opens (echoing the transom), then a forward dolly down the pine floor to the far arch. | 4.5 s | — |
| 6 | Living room | `living-daylight` | Gentle pull-back revealing beams, ductwork, three windows. Bee passes the window light. | 5 s | — |
| 7 | Evening | `living-evening` | Cross-dissolve from day (same viewpoint), string lights warming, slow push to the "Bee Our Guest" sign. | 4.5 s | — |
| 8 | Bee our guest | `dining-workspace` | Start close on the neon sign and ivy, pull out to the desk and dining table. | 4.5 s | — |
| 9 | Rest | `bedroom-window` | Slow lateral slide left → right across the bed toward the window. | 4.5 s | — |
| 10 | The deck | `deck-view` | Pull back from the umbrella to the full deck and street view. Title resolves. | 6 s | "The Hive on C Street. A Little Sweetness Lives On." |

Music: warm, acoustic and unhurried (felt piano, light strings). No vocals. Keep any bee sound
very subtle or leave it out.

Delivery: `hero-desktop.mp4` (1920×1080, H.264, ≤ 8 MB, no audio track), `hero-mobile.mp4`
(1080×1920 or 1080×1350, ≤ 4 MB), plus WebM/AV1 versions if available. The poster is `exterior-corner-mural`.

---

## 3. Master prompt (apply to every shot)

> Create a premium, ultra-photorealistic cinematic architectural video of the actual Airbnb property known as
> The Hive on C Street. Use the supplied real property photograph as a strict visual reference. Preserve all
> architectural geometry, existing furnishings, windows, doors, finishes, lighting fixtures, colors, and room
> proportions. Realistic, stabilized cinematic camera movement that reveals depth while remaining physically
> plausible. Natural, warm light; understated luxury hospitality cinematography. No warped furniture, changing
> room geometry, fictional rooms, flickering, morphing architecture, fabricated entrances, or new signage.
> The result must resemble authentic professional real-estate footage.

Negative prompt (all shots): `morphing, warping, melting furniture, extra doors, extra windows, new rooms,
text changes, garbled lettering, people, pets, cartoon, fisheye wobble, flicker, fast motion, handheld shake`.

## 4. Shot-specific prompts

Use the named photo as the **first frame / image reference**. Keep clips 4–5 s and the camera slow.

**Shot 1: `exterior-corner-mural`**
> Slow, steady dolly-in toward the corner of a two-story red-brick building with a tall painted mural of pink
> coneflowers on a golden sky, teal scalloped awning, black lamp post with a red bow. Late-afternoon sun, clear
> blue sky with soft clouds. Camera rises very slightly. A single small, realistic honeybee drifts across the
> upper third of frame. Keep every brick course, window and the mural exactly as in the reference.

**Shot 2: `exterior-front-storefront` (close)**
> Locked-off, almost still close-up of the left storefront window with its round bee-and-flowers decal under the
> teal scalloped awning. Subtle reflections move across the glass. Do NOT redraw or alter the decal or its
> lettering. Light breeze moves the shrubs in the foreground.

**Shot 3: `exterior-front-storefront` (tilt)**
> Smooth vertical tilt and slight pull-back from the storefront awning up to the three arched, green-framed
> upstairs windows of the brick facade. Cornice and brick detailing preserved exactly. Warm daylight.

**Shot 4: `deck-entry`**
> Slow push across an upstairs brick deck toward a white door with an arched transom window. Wicker sectional
> with cream cushions, glass coffee table, patterned outdoor rug, tan umbrella casting a soft shadow. Shadow
> shapes stay consistent; no new furniture.

**Shot 5: `hallway`**
> Forward gimbal dolly down a narrow hallway with original honey-toned pine floorboards, sage walls, a partly
> exposed brick wall and a cage-style wall sconce, toward a white arched doorway opening onto a bright room.
> Constant speed, eye height. Floor seams and board widths stay fixed.

**Shot 6: `living-daylight`**
> Gentle pull-back in a sunlit loft living room: curved grey tufted sofa, round ottoman, colourful floral rug on
> worn hardwood, exposed timber beams, silver spiral ductwork, ceiling fan (blades may turn slowly), three tall
> windows with sheer curtains. A single small honeybee drifts through the window light. Geometry unchanged.

**Shot 7: `living-evening`** (or day→night dissolve from shot 6)
> Same living room at dusk, curtains drawn, warm fairy lights glowing on the branch decor, "Bee Our Guest" sign,
> honeycomb shelves on the ivy-draped wall. Very slow push toward the sign. Lights may twinkle softly; nothing
> else changes.

**Shot 8: `dining-workspace`**
> Start close on the glowing neon "Bee Our Guest" script sign amid trailing ivy on a sage wall, then ease back to
> reveal the wood desk with leather chair, dining table and two tall windows. Neon lettering must stay legible
> and unchanged.

**Shot 9: `bedroom-window`**
> Slow lateral slide across a bedroom: white carved bed with grey tufted headboard, white pin-tuck duvet, navy
> throw, bee-print pillows, floral rug with a bee motif, tall window with navy curtain, potted dracaena.
> Soft daylight. No changes to furniture shape.

**Shot 10: `deck-view`**
> Pull-back across a sunny upstairs deck: wicker loveseat with cream cushions, glass table, tan umbrella, fern in
> a planter, iron railing, view over brick neighbours and the street. Gentle breeze in the umbrella fringe.
> Final frame holds for the title.

## 5. Review checklist for every generated clip

- [ ] Compare the first and last frames side by side with the source photo. Same walls, windows, doors, furniture?
- [ ] Storefront decals and the neon sign lettering unchanged
- [ ] No objects appearing or disappearing
- [ ] Motion slow and stabilised; no flicker
- [ ] Bee (if any) small, realistic, and in at most two shots
- [ ] Approved by the owner before publishing
