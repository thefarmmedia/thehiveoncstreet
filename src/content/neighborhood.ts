/**
 * Explore C Street.
 *
 * `area` is district-level information paraphrased from the official Historic
 * C-Street "Plan Your Visit" page (source below), as provided by the owner.
 * Shop hours, market dates and events change, so each item links back to the
 * district site rather than repeating details that can go stale.
 *
 * `places` is for the owner's own named recommendations. Add only places the
 * owner has verified. Never invent distances.
 *   { name: "Example Coffee", kind: "Coffee", note: "Owner's go-to latte.", url: "https://…", walk: "2 min walk" }
 */
export const areaSource = {
  label: "Historic C-Street",
  url: "https://historiccstreet.org/plan-your-visit/",
  directory: "https://historiccstreet.org/",
};

export const area = {
  name: "Historic C-Street",
  city: "Springfield, Missouri",
  intro:
    "The Hive sits on Historic C-Street: six walkable blocks of restored brick storefronts along Commercial Street, just north of downtown Springfield. It's a National Register historic district, built by the railroad.",
};

export interface Highlight {
  title: string;
  text: string;
}

export const highlights: Highlight[] = [
  { title: "Eat & drink", text: "A surprisingly global line-up for a few blocks (Peruvian, Dutch and Lebanese among them), plus local coffee, bakeries and bars." },
  { title: "Shop local", text: "Independent boutiques for apparel, jewellery, art, books, spices and tea, vintage finds and more." },
  { title: "City Market", text: "On Saturdays from spring through fall, the C-Street City Market fills the street with local food, crafts and makers." },
  { title: "Chocolate tours", text: "A bean-to-bar chocolate maker in the district offers factory tours." },
  { title: "Music & shows", text: "Evenings bring live music, dancing and improv comedy to the district's venues." },
  { title: "Watch the trains", text: "The historic rail yards still run. Watch from the Jefferson Avenue Footbridge." },
  { title: "History walk", text: "Explore the district's building histories and how a railroad created the town." },
];

export const gettingAround = [
  { label: "Downtown Springfield", value: "≈ 5 min drive" },
  { label: "Interstate 44", value: "≈ 5–7 min drive" },
  { label: "Springfield-Branson National Airport", value: "≈ 15 min drive" },
];

export interface Place {
  name: string;
  kind: "Coffee" | "Food" | "Drinks" | "Shops" | "Sights" | "Outdoors";
  note: string;
  url?: string;
  walk?: string;
}

export const places: Place[] = [];

/** Shown only in dev/previews to explain what is still needed. */
export const neighborhoodTodo = [
  "Owner's own favourite coffee, breakfast, dinner and evening spots (by name).",
  "Approximate walking times from the door, measured by the owner.",
];
