import { site } from "../content/site";
import { Picture } from "./Picture";

export function Welcome() {
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="text-center lg:col-span-5 lg:text-left">
          <p className="eyebrow text-amber" data-reveal>Welcome to The Hive</p>
          <h2 id="welcome-title" className="mt-5 text-[2.7rem] sm:text-[3.6rem] lg:text-[4.2rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
            {site.secondaryTagline.replace(/\.$/, "")}, <em className="text-sage-deep">upstairs on C Street.</em>
          </h2>
          <div className="mx-auto mt-8 max-w-[34rem] space-y-5 text-ink/80 lg:mx-0" data-reveal style={{ ["--d" as string]: "160ms" }}>
            <p>
              Upstairs, above a brick storefront, the rooms are full of light and character: original pine floors, exposed brick,
              timber beams, arched doorways and tall windows that fill the space with daylight.
            </p>
            <p>
              Sage walls, trailing ivy, honeycomb shelves and a glowing &ldquo;Bee Our Guest&rdquo; sign make it feel like a garden
              indoors, with a little bee hidden around almost every corner.
            </p>
            <p>
              It&rsquo;s the whole upstairs apartment, just for you: a bedroom with a queen bed, a full kitchen, a desk with Wi-Fi,
              a washer and dryer, a balcony with outdoor seating, and free parking. Self check-in means you can arrive any time
              after 3:00 PM.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-[34rem] grid-cols-2 gap-x-4 gap-y-6 border-t border-charcoal/10 pt-6 sm:grid-cols-4 lg:mx-0" data-reveal style={{ ["--d" as string]: "240ms" }}>
            {[
              [`${site.listing.guests}`, "guests"],
              [`${site.listing.bedrooms}`, "bedroom, queen bed"],
              [`${site.listing.baths}`, "bathroom"],
              ["Free", "parking on site"],
            ].map(([a, b]) => (
              <li key={b}>
                <span className="block font-serif text-2xl text-charcoal sm:text-3xl">{a}</span>
                <span className="text-[0.8rem] leading-snug text-muted">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative mx-auto aspect-[4/5] w-[88%] lg:mr-0 lg:ml-auto overflow-hidden rounded-t-[999px] sm:aspect-[5/5] lg:w-[82%]" data-reveal="mask">
            <Picture id="living-evening" sizes="(min-width: 1024px) 50vw, 90vw" className="h-full w-full" />
          </div>
          <div
            className="absolute -bottom-10 left-0 aspect-[4/5] w-[44%] overflow-hidden border-[6px] border-ivory shadow-2xl shadow-charcoal/20 sm:w-[38%]"
            data-reveal
            style={{ ["--d" as string]: "300ms" }}
          >
            <Picture id="hallway" sizes="(min-width: 1024px) 22vw, 44vw" className="h-full w-full" />
          </div>
          <svg className="absolute -top-8 left-[8%] hidden h-20 w-20 text-honey/70 lg:block" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M32 15 47 23.7v17.4L32 50l-15-8.9V23.7Z" fill="none" stroke="currentColor" strokeWidth="1" opacity=".6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
