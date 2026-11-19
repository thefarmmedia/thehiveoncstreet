/**
 * The cinematic intro. It plays in the browser from the real photos using
 * camera moves only (push, pan, tilt, dissolve, masked reveal), with no
 * generated pixels.
 *
 * To swap in a finished film later, drop files into public/video/ and set
 * `video` below. The photo sequence then becomes the fallback.
 */
export interface HeroShot {
  photo: string;
  /** chapter label shown bottom-left */
  label: string;
  caption?: string;
  seconds: number;
  /** camera: scale + transform-origin (focal point, %) at start and end */
  from: { scale: number; origin: [number, number] };
  to: { scale: number; origin: [number, number] };
  /** how this shot enters */
  enter: "fade" | "arch" | "dissolve" | "rise";
  /** object-position for portrait photos on landscape screens */
  position?: string;
  bee?: boolean;
}

export const heroShots: HeroShot[] = [
  {
    photo: "exterior-corner-mural",
    label: "C Street",
    seconds: 6,
    from: { scale: 1.02, origin: [50, 55] },
    to: { scale: 1.16, origin: [56, 45] },
    enter: "fade",
    bee: true,
  },
  {
    photo: "exterior-front-storefront",
    label: "Where it began",
    caption: "Downstairs, Soozeezbeez Honey BEEtique.",
    seconds: 4.5,
    from: { scale: 2.2, origin: [40, 62] },
    to: { scale: 1.9, origin: [40, 60] },
    enter: "dissolve",
  },
  {
    photo: "exterior-front-storefront",
    label: "A new chapter",
    caption: "Upstairs, a new chapter.",
    seconds: 4.5,
    from: { scale: 1.9, origin: [40, 60] },
    to: { scale: 1.25, origin: [52, 12] },
    enter: "fade",
  },
  {
    photo: "deck-entry",
    label: "Arrival",
    seconds: 4.5,
    from: { scale: 1.05, origin: [52, 45] },
    to: { scale: 1.3, origin: [53, 40] },
    enter: "dissolve",
  },
  {
    photo: "hallway",
    label: "Step inside",
    seconds: 4.5,
    position: "50% 32%",
    from: { scale: 1, origin: [41, 32] },
    to: { scale: 1.55, origin: [41, 30] },
    enter: "arch",
  },
  {
    photo: "living-daylight",
    label: "The living room",
    seconds: 5,
    from: { scale: 1.18, origin: [55, 50] },
    to: { scale: 1.04, origin: [52, 52] },
    enter: "rise",
    bee: true,
  },
  {
    photo: "living-evening",
    label: "Evening",
    seconds: 4.5,
    from: { scale: 1.04, origin: [52, 52] },
    to: { scale: 1.12, origin: [40, 40] },
    enter: "dissolve",
  },
  {
    photo: "dining-workspace",
    label: "Bee our guest",
    seconds: 4.5,
    from: { scale: 1.35, origin: [18, 18] },
    to: { scale: 1.08, origin: [40, 40] },
    enter: "fade",
  },
  {
    photo: "bedroom-window",
    label: "Rest",
    seconds: 4.5,
    from: { scale: 1.12, origin: [40, 50] },
    to: { scale: 1.12, origin: [62, 50] },
    enter: "dissolve",
  },
  {
    photo: "deck-view",
    label: "The balcony",
    seconds: 6,
    from: { scale: 1.2, origin: [70, 60] },
    to: { scale: 1.03, origin: [50, 50] },
    enter: "fade",
  },
];

export const heroVideo: { desktop: string; mobile: string; poster: string } | null = null;
// Example once the film exists:
// export const heroVideo = { desktop: "/video/hero-desktop.mp4", mobile: "/video/hero-mobile.mp4", poster: "exterior-corner-mural" };

/** Static frame for reduced-motion visitors and while the sequence loads. */
export const heroPoster = "exterior-corner-mural";
