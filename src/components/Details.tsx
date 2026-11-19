import { amenityGroups, details } from "../content/details";
import { site } from "../content/site";
import { SHOW_DRAFTS } from "../lib/drafts";
import { DetailIcon } from "./Icons";
import { Picture } from "./Picture";

export function Details() {
  const visible = details.filter((d) => d.status !== "pending" || SHOW_DRAFTS);
  return (
    <section id="details" aria-labelledby="details-title" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="honeycomb-bg pointer-events-none absolute -right-20 top-0 h-full w-1/2 opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="text-center lg:sticky lg:top-28 lg:text-left">
            <p className="eyebrow text-amber" data-reveal>Amenities</p>
            <h2 id="details-title" className="mt-4 text-[2.6rem] sm:text-[3.4rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              Thoughtful, <em className="text-sage-deep">down to the honeycomb</em>
            </h2>
            <p className="mx-auto mt-6 max-w-sm text-ink/75 lg:mx-0" data-reveal style={{ ["--d" as string]: "160ms" }}>
              An entire upstairs apartment for up to {site.listing.guests} guests: {site.listing.bedrooms} bedroom,{" "}
              {site.listing.beds} bed, {site.listing.baths} bath, and everything you need for a night or a week.
            </p>
            <div className="mt-10 hidden aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[999px] lg:block" data-reveal="mask">
              <Picture id="bathroom" sizes="30vw" className="h-full w-full" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="grid gap-px self-start overflow-hidden rounded-[4px] bg-charcoal/10 sm:grid-cols-2">
            {visible.map((d, i) => (
              <li
                key={d.title}
                className={`flex flex-col items-center gap-4 bg-cream p-6 text-center sm:p-8 lg:flex-row lg:items-start lg:gap-5 lg:text-left ${d.status === "pending" ? "bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgb(185_120_41/0.05)_10px_20px)]" : ""}`}
                data-reveal
                style={{ ["--d" as string]: `${(i % 2) * 90}ms` }}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-honey/50 text-amber">
                  <DetailIcon name={d.icon} />
                </span>
                <div>
                  <h3 className="font-serif text-[1.55rem] leading-tight text-charcoal">{d.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-ink/70">{d.text}</p>
                  {d.status === "pending" && <span className="draft-badge mt-3">Placeholder · owner to confirm</span>}
                </div>
              </li>
            ))}
          </ul>

          {/* Full list */}
          <div className="mt-16 text-center lg:text-left" data-reveal>
            <p className="eyebrow text-amber">Everything included</p>
            <h3 className="mt-3 font-serif text-[2rem] leading-tight text-charcoal sm:text-[2.4rem]">The complete list</h3>
          </div>
          <div className="mt-8 grid gap-x-10 gap-y-8 text-center sm:grid-cols-2 lg:text-left xl:grid-cols-3">
            {amenityGroups.map((g, i) => (
              <div key={g.title} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
                <p className="eyebrow border-b border-charcoal/10 pb-2 text-[0.64rem] text-ink/60">{g.title}</p>
                <ul className="mt-3 space-y-1.5 text-[0.95rem] text-ink/80">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start justify-center gap-2 lg:justify-start">
                      <svg viewBox="0 0 12 12" className="mt-[0.45rem] h-2.5 w-2.5 shrink-0 text-honey" aria-hidden="true">
                        <path d="M6 .5 10.8 3.2v5.6L6 11.5 1.2 8.8V3.2Z" fill="currentColor" />
                      </svg>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
