/**
 * Amenities. Source: the Airbnb listing (27 amenities, read 2026-11-19) plus
 * what is visible in the photos (e.g. the dishwasher). Keep this in step with
 * the listing: if an amenity is removed there, remove it here.
 */
export type DetailIcon =
  | "deck" | "kitchen" | "desk" | "dining" | "sofa" | "fire" | "fan" | "brick" | "bed" | "bath"
  | "guests" | "wifi" | "parking" | "key" | "clock" | "laundry" | "climate" | "shield";

export interface Detail {
  icon: DetailIcon;
  title: string;
  text: string;
  /** "pending" items show only in dev/previews (owner to confirm). */
  status?: "confirmed" | "pending";
}

/** The highlight cards. */
export const details: Detail[] = [
  { icon: "bed", title: "The bedroom", text: "One bedroom with a queen bed, plus an air mattress, so up to 3 guests can stay." },
  { icon: "bath", title: "The bathroom", text: "One bathroom with hot water, a hair dryer, shampoo and fresh towels." },
  { icon: "kitchen", title: "Kitchen", text: "Cook your own meals with pots and pans, oil, salt and pepper, a coffee maker and a dishwasher." },
  { icon: "wifi", title: "Wi-Fi & a real desk", text: "Wi-Fi and a dedicated workspace beneath the glowing “Bee Our Guest” sign." },
  { icon: "laundry", title: "Washer & dryer", text: "Laundry is covered, with an iron and hangers too." },
  { icon: "climate", title: "Heating & cooling", text: "Air conditioning, heating, ceiling fans and an indoor fireplace for cozy evenings." },
  { icon: "parking", title: "Free parking", text: "Free parking on the premises, with a camera on the building watching the lot at night." },
  { icon: "key", title: "Self check-in", text: "Let yourself in with the keypad any time after 3:00 PM." },
  { icon: "deck", title: "The balcony", text: "Outdoor furniture and an umbrella for slow mornings and warm evenings." },
  { icon: "sofa", title: "Living room", text: "A curved tufted sofa, TV and fireplace console beneath timber beams." },
  { icon: "dining", title: "Dining table", text: "A table for meals by the tall windows." },
  { icon: "brick", title: "Original character", text: "Exposed brick, timber beams, arched doorways and original pine floors." },
];

/** The complete amenities list, grouped the way the listing groups them. */
export const amenityGroups: { title: string; items: string[] }[] = [
  { title: "Bedroom & laundry", items: ["Queen bed + air mattress", "Washer", "Dryer", "Towels, bed sheets, soap & toilet paper", "Hangers", "Iron"] },
  { title: "Bathroom", items: ["Hair dryer", "Shampoo", "Hot water"] },
  { title: "Kitchen & dining", items: ["Full kitchen for cooking", "Pots & pans, oil, salt & pepper", "Coffee maker", "Dishwasher", "Dining table"] },
  { title: "Heating & cooling", items: ["Air conditioning", "Heating", "Indoor fireplace", "Ceiling fans"] },
  { title: "Work & entertainment", items: ["Wi-Fi", "Dedicated workspace", "TV"] },
  { title: "Outside & parking", items: ["Balcony with outdoor furniture", "Free parking on premises"] },
  { title: "Check-in", items: ["Self check-in", "Keypad entry"] },
  {
    title: "Safety",
    items: ["Smoke alarm", "Carbon monoxide alarm", "Fire extinguisher", "First aid kit", "Exterior security camera (on the building, facing the parking area)"],
  },
];
