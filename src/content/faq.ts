import { site } from "./site";

/**
 * FAQ. Answers marked `confirmed: false` are placeholders: they show in
 * dev and deploy previews but are hidden on the production site.
 *
 * Home answers come from the Airbnb listing (read 2026-11-19).
 * Area answers are paraphrased from https://historiccstreet.org/plan-your-visit/
 * (source supplied by the owner).
 */
export interface FaqItem {
  q: string;
  a: string;
  confirmed: boolean;
  link?: { label: string; url: string };
}

const cstreet = { label: "Plan your visit at historiccstreet.org", url: "https://historiccstreet.org/plan-your-visit/" };
const listing = { label: "See dates and prices on Airbnb", url: site.bookingUrl };
const l = site.listing;

export const faq: FaqItem[] = [
  // ── The home (from the Airbnb listing) ───────────────────────────────────
  {
    q: "How do I book?",
    a: "The Hive is booked through Airbnb. Add your dates there to see the price, availability and the cancellation policy for your stay.",
    confirmed: true,
    link: listing,
  },
  {
    q: "What time is check-in and checkout?",
    a: `Check-in is any time after ${l.checkIn}, and checkout is by ${l.checkOut} (${l.timezone}).`,
    confirmed: true,
  },
  {
    q: "How do I get in?",
    a: "It's self check-in: let yourself in with the keypad door code.",
    confirmed: true,
  },
  {
    q: "How many guests can stay?",
    a: `Up to ${l.guests} guests. There's one bedroom with a queen bed, plus an air mattress, and one bathroom.`,
    confirmed: true,
  },
  {
    q: "Is there parking?",
    a: "Yes, free parking on the premises. A camera on the outside of the building faces the parking area to keep an eye on cars at night. C-Street also has free public lots and street parking.",
    confirmed: true,
  },
  {
    q: "Is there Wi-Fi and somewhere to work?",
    a: "Yes. There's Wi-Fi and a dedicated workspace with a desk and chair.",
    confirmed: true,
  },
  {
    q: "What's in the kitchen?",
    a: "A full kitchen for cooking your own meals, with pots and pans, oil, salt and pepper, a coffee maker and a dishwasher.",
    confirmed: true,
  },
  {
    q: "Is there laundry?",
    a: "Yes, a washer and dryer, plus an iron and hangers. Towels, bed sheets, soap and toilet paper are provided.",
    confirmed: true,
  },
  {
    q: "Are pets allowed?",
    a: "No pets, but service animals are welcome.",
    confirmed: true,
  },
  {
    q: "Can I smoke?",
    a: "Not indoors (that includes vaping and e-cigarettes). Smoking is allowed on the balcony only, with an ashtray provided.",
    confirmed: true,
  },
  {
    q: "Can I have visitors?",
    a: `Up to ${l.guests} registered guests can stay overnight. Other visitors are welcome until midnight, and quiet hours run from 12:00 AM to 6:00 AM.`,
    confirmed: true,
  },
  { q: "Is the home up a flight of stairs?", a: "TO CONFIRM: stair access and any accessibility notes.", confirmed: false },

  // ── The area (from the Historic C-Street site) ───────────────────────────
  {
    q: "What is there to do nearby?",
    a: "You're staying on Historic C-Street, a walkable National Register district of restored brick storefronts. Expect restaurants with a global range, local coffee and bakeries, independent shops, live music and improv in the evenings, bean-to-bar chocolate factory tours, and freight trains to watch from the Jefferson Avenue Footbridge.",
    confirmed: true,
    link: cstreet,
  },
  {
    q: "When is the C-Street City Market?",
    a: "Saturdays, April through October, with local food, crafts and handmade goods. The district also hosts seasonal events through the year, so check the events calendar for your dates.",
    confirmed: true,
    link: { label: "See upcoming C-Street events", url: "https://historiccstreet.org/" },
  },
  {
    q: "How far is it to the airport and downtown?",
    a: "By car, downtown Springfield is about 5 minutes away, Interstate 44 about 5–7 minutes, and Springfield-Branson National Airport about 15 minutes.",
    confirmed: true,
  },
];
