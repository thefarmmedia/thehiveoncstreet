/**
 * FAQ. Answers marked `confirmed: false` are placeholders: they show in
 * dev and deploy previews but are hidden on the production site.
 *
 * Area answers are paraphrased from https://historiccstreet.org/plan-your-visit/
 * (source supplied by the owner). Property answers need the owner.
 */
export interface FaqItem {
  q: string;
  a: string;
  confirmed: boolean;
  link?: { label: string; url: string };
}

const cstreet = { label: "Plan your visit at historiccstreet.org", url: "https://historiccstreet.org/plan-your-visit/" };

export const faq: FaqItem[] = [
  // ── The area (confirmed from the Historic C-Street site) ─────────────────
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
    q: "Is there public parking in the district?",
    a: "Yes. Parking on C-Street is free, in several public lots and on the street along Commercial, with accessible spaces in the lots.",
    confirmed: true,
  },
  {
    q: "How far is it to the airport and downtown?",
    a: "By car, downtown Springfield is about 5 minutes away, Interstate 44 about 5–7 minutes, and Springfield-Branson National Airport about 15 minutes.",
    confirmed: true,
  },

  // ── The home (needs the owner) ───────────────────────────────────────────
  { q: "What time is check-in and check-out?", a: "TO CONFIRM: check-in and check-out times.", confirmed: false },
  { q: "How do I get in?", a: "TO CONFIRM: entry method (keypad, lockbox, host greeting).", confirmed: false },
  { q: "Is there dedicated parking for guests?", a: "TO CONFIRM: whether The Hive has its own parking or guests use the public lots.", confirmed: false },
  { q: "Is the home up a flight of stairs?", a: "TO CONFIRM: stair access and any accessibility notes.", confirmed: false },
  { q: "How many guests can stay?", a: "TO CONFIRM: maximum occupancy and bed layout.", confirmed: false },
  { q: "Are pets allowed?", a: "TO CONFIRM: pet policy.", confirmed: false },
  { q: "What are the house rules?", a: "TO CONFIRM: quiet hours, smoking, events.", confirmed: false },
];
