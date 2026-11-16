/**
 * The Details. Two kinds of entries:
 *  - "seen": visible in the professional photos, so safe to publish.
 *  - "pending": needs the owner to confirm. Hidden in production until a
 *    value is filled in and status changed to "confirmed".
 */
export type DetailStatus = "seen" | "confirmed" | "pending";
export interface Detail {
  icon: "deck" | "kitchen" | "desk" | "dining" | "sofa" | "fire" | "fan" | "brick" | "bed" | "bath" | "guests" | "wifi" | "parking" | "key" | "clock";
  title: string;
  text: string;
  status: DetailStatus;
  photo?: string;
}

export const details: Detail[] = [
  { icon: "deck", title: "Private deck", text: "Wicker seating, a glass table and a patio umbrella, upstairs in the open air.", status: "seen", photo: "deck-view" },
  { icon: "sofa", title: "Living room", text: "A curved tufted sofa and round ottoman under timber beams and tall windows.", status: "seen", photo: "living-daylight" },
  { icon: "kitchen", title: "Kitchen", text: "Shaker cabinets, double sink and a dishwasher.", status: "seen", photo: "kitchen" },
  { icon: "dining", title: "Dining table", text: "Seating by the front windows.", status: "seen", photo: "dining-workspace" },
  { icon: "desk", title: "Desk space", text: "A desk and chair beneath the “Bee Our Guest” sign.", status: "seen", photo: "dining-workspace" },
  { icon: "fire", title: "Fireplace console & TV", text: "An electric fireplace console and wall-mounted TV against original brick.", status: "seen", photo: "living-brick-fireplace" },
  { icon: "fan", title: "Ceiling fans", text: "In the main living space.", status: "seen", photo: "living-daylight" },
  { icon: "brick", title: "Original character", text: "Exposed brick, timber beams, arched doorways and original pine floors.", status: "seen", photo: "hallway" },

  // ── Needs owner confirmation ─────────────────────────────────────────────
  { icon: "guests", title: "Guests", text: "Maximum guests: TO CONFIRM", status: "pending" },
  { icon: "bed", title: "Bedrooms & beds", text: "Bedroom count and bed sizes: TO CONFIRM", status: "pending" },
  { icon: "bath", title: "Bathrooms", text: "Bathroom count, shower or tub: TO CONFIRM", status: "pending" },
  { icon: "wifi", title: "Wi-Fi", text: "Wi-Fi availability and speed: TO CONFIRM", status: "pending" },
  { icon: "parking", title: "Parking", text: "Parking arrangements: TO CONFIRM", status: "pending" },
  { icon: "key", title: "Check-in", text: "Self check-in method: TO CONFIRM", status: "pending" },
];
