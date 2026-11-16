import { details } from "../content/details";
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
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-amber" data-reveal>The details</p>
            <h2 id="details-title" className="mt-4 text-[2.6rem] sm:text-[3.4rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              Thoughtful, <em className="text-sage-deep">down to the honeycomb</em>
            </h2>
            <p className="mt-6 max-w-sm text-ink/75" data-reveal style={{ ["--d" as string]: "160ms" }}>
              Everything listed here appears in the photographs. Full listing details are on the booking page.
            </p>
            <div className="mt-10 hidden aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[999px] lg:block" data-reveal="mask">
              <Picture id="bathroom" sizes="30vw" className="h-full w-full" />
            </div>
          </div>
        </div>
        <ul className="grid gap-px self-start overflow-hidden rounded-[4px] bg-charcoal/10 sm:grid-cols-2 lg:col-span-8">
          {visible.map((d, i) => (
            <li
              key={d.title}
              className={`flex gap-5 bg-cream p-6 sm:p-8 ${d.status === "pending" ? "bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgb(185_120_41/0.05)_10px_20px)]" : ""}`}
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
      </div>
    </section>
  );
}
