/** "Explore the Hive" destinations. Each view lists real photos (manifest ids). */
export interface ExploreView {
  key: string;
  label: string;
  blurb: string;
  shots: string[];
}

export const exploreViews: ExploreView[] = [
  {
    key: "exterior",
    label: "Exterior",
    blurb: "A brick building with a painted flower mural on the corner. The home is upstairs, above the storefront.",
    shots: ["exterior-corner-mural", "exterior-front-storefront", "exterior-rear-deck"],
  },
  {
    key: "living",
    label: "Living Room",
    blurb: "A curved tufted sofa under timber beams and tall windows, with ivy and honeycomb on the walls.",
    shots: ["living-daylight", "living-evening", "living-arch", "living-brick-fireplace"],
  },
  {
    key: "dining",
    label: "Dining & Desk",
    blurb: "A dining table by the windows and a desk under the glowing “Bee Our Guest” sign.",
    shots: ["dining-workspace"],
  },
  {
    key: "kitchen",
    label: "Kitchen",
    blurb: "Warm maple cabinets, a dishwasher, and a little beehive on the counter.",
    shots: ["kitchen"],
  },
  {
    key: "bedroom",
    label: "Bedroom",
    blurb: "A carved white bed, bee-embroidered pillows, and a floral rug with a honeybee woven in.",
    shots: ["bedroom-window", "bedroom-dresser"],
  },
  {
    key: "bathroom",
    label: "Bathroom",
    blurb: "A backlit mirror and honeycomb shelves on sage walls.",
    shots: ["bathroom"],
  },
  {
    key: "deck",
    label: "Balcony",
    blurb: "An upstairs balcony with an umbrella and wicker seating, looking out over the street.",
    shots: ["deck-view", "deck-entry"],
  },
  {
    key: "details",
    label: "Details",
    blurb: "Original pine floorboards, exposed brick, and arched doorways.",
    shots: ["hallway", "living-brick-fireplace"],
  },
];

export const galleryFilters: { key: string; label: string; categories: string[] }[] = [
  { key: "all", label: "All", categories: [] },
  { key: "exterior", label: "Exterior", categories: ["exterior"] },
  { key: "living", label: "Living", categories: ["living", "details"] },
  { key: "kitchen", label: "Kitchen & Dining", categories: ["kitchen", "dining"] },
  { key: "bedroom", label: "Bedroom", categories: ["bedroom"] },
  { key: "bathroom", label: "Bathroom", categories: ["bathroom"] },
  { key: "deck", label: "Balcony", categories: ["deck"] },
];
