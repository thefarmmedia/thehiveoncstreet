/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SITE SETTINGS: the one file to edit for links, contact details, location.
 * ────────────────────────────────────────────────────────────────────────────
 *  Anything left as "" is treated as "not provided yet": the site hides it in
 *  production and shows a labelled placeholder in development and deploy
 *  previews. See README.md → Content guide.
 */
export const site = {
  name: "The Hive on C Street",
  tagline: "A Little Sweetness Lives On.",
  secondaryTagline: "A Sweet Place to Stay.",

  /** Short description for search results and link previews (facts from the Airbnb listing). */
  description:
    "An upstairs apartment for up to 3 guests on Historic C-Street in Springfield, Missouri: one bedroom with a queen bed, exposed brick and timber beams, self check-in, free parking, and a honeybee story that began downstairs.",

  /**
   * Official booking link: the Airbnb listing. Every "Book" button uses it.
   * (Tracking parameters from the shared link were removed.)
   */
  bookingUrl: "https://www.airbnb.com/rooms/1750192248487782452",
  bookingPlatform: "Airbnb",

  /**
   * Listing facts, copied from the Airbnb listing on 2026-11-19.
   * Update here if the listing changes.
   */
  listing: {
    type: "Entire rental unit",
    guests: 3,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    sleeping: "1 queen bed and 1 air mattress",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    timezone: "Central Time",
    selfCheckIn: "Keypad",
    host: "Nichole",
    /** Short-term rental registration shown on the listing. */
    registration: "BUS2026-01059",
  },

  /** Final public URL of this website, e.g. "https://thehiveoncstreet.com". Used for canonical + social tags. */
  siteUrl: "",

  /**
   * Location. Springfield, Missouri is confirmed by the owner and the Airbnb
   * listing. The street address is NOT published (Airbnb shares it after
   * booking). Lodging structured data is emitted only when confirmed = true
   * and streetAddress is set.
   */
  location: {
    confirmed: false,
    streetAddress: "",
    city: "Springfield",
    region: "MO",
    postalCode: "",
    country: "US",
  },

  contact: {
    email: "",
    phone: "",
    instagram: "",
  },

  credit: { name: "The Farm Media", url: "https://thefarmmedia.com" },
};
