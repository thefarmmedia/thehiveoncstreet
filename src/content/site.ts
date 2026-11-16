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

  /** Short description for search results and link previews (no unverified facts). */
  description:
    "Stay upstairs on Historic C-Street in Springfield, Missouri: exposed brick, timber beams, original hardwood floors, a private deck, and a honeybee story that began downstairs.",

  /** Official booking link (Airbnb listing or approved booking platform). */
  bookingUrl: "",

  /** Final public URL of this website, e.g. "https://thehiveoncstreet.com". Used for canonical + social tags. */
  siteUrl: "",

  /**
   * Location. District and city confirmed by the owner (Historic C-Street,
   * Springfield, MO). The street address is NOT confirmed yet. The storefront
   * in the photos is numbered 320, but don't publish it until the owner OKs it.
   * Lodging structured data is emitted only when confirmed = true and
   * streetAddress is set.
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

