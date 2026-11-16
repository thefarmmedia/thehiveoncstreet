import { area, areaSource, gettingAround, highlights, neighborhoodTodo, places } from "../content/neighborhood";
import { SHOW_DRAFTS } from "../lib/drafts";
import { Picture } from "./Picture";

export function Neighborhood() {
  return (
    <section id="c-street" aria-labelledby="cstreet-title" className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[380px] lg:sticky lg:top-0 lg:col-span-5 lg:h-screen" data-reveal="fade">
          <Picture id="exterior-corner-mural" sizes="(min-width: 1024px) 42vw, 100vw" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal/40" />
          <p className="absolute inset-x-0 bottom-6 eyebrow text-center text-[0.62rem] text-ivory/80 lg:left-8 lg:right-auto lg:text-left">{area.name} · {area.city}</p>
        </div>

        <div className="px-4 py-20 text-center sm:px-10 lg:col-span-7 lg:px-16 lg:py-28 lg:text-left">
          <p className="eyebrow text-honey" data-reveal>Explore C Street</p>
          <h2 id="cstreet-title" className="mt-4 text-[2.6rem] sm:text-[3.6rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
            Step outside, <em className="text-honey-light">stay a while</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-ivory/75 lg:mx-0" data-reveal style={{ ["--d" as string]: "160ms" }}>
            {area.intro}
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-white/10 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <li key={h.title} className="bg-charcoal p-6" data-reveal style={{ ["--d" as string]: `${(i % 2) * 80}ms` }}>
                <p className="font-serif text-2xl text-ivory">{h.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/65">{h.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12" data-reveal>
            <p className="eyebrow text-[0.62rem] text-honey/90">Getting around by car</p>
            <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {gettingAround.map((g) => (
                <div key={g.label} className="flex flex-col items-center gap-0.5 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-ivory/75">{g.label}</dt>
                  <dd className="shrink-0 tabular-nums text-ivory">{g.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {places.length > 0 && (
            <div className="mt-12">
              <p className="eyebrow text-[0.62rem] text-honey/90">Our favourites</p>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {places.map((pl) => (
                  <li key={pl.name} className="flex flex-col items-center gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div>
                      <p className="eyebrow text-[0.62rem] text-honey/80">{pl.kind}</p>
                      {pl.url ? (
                        <a href={pl.url} target="_blank" rel="noopener" className="font-serif text-2xl underline-offset-4 hover:underline">{pl.name}</a>
                      ) : (
                        <p className="font-serif text-2xl">{pl.name}</p>
                      )}
                      <p className="text-sm text-ivory/60">{pl.note}</p>
                    </div>
                    {pl.walk && <span className="shrink-0 text-xs uppercase tracking-[0.16em] text-ivory/50">{pl.walk}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {places.length === 0 && SHOW_DRAFTS && (
            <div className="mt-12 rounded-[4px] border border-dashed border-honey/40 p-6 text-sm text-ivory/75">
              <span className="draft-badge">Placeholder · not shown on live site</span>
              <p className="mt-4">Optional: add the owner&rsquo;s own named recommendations:</p>
              <ul className="mt-2 list-inside list-disc space-y-1 lg:list-outside lg:pl-5">
                {neighborhoodTodo.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap">
            <a href={areaSource.url} target="_blank" rel="noopener" className="btn btn-ghost">
              Plan your visit
              <span className="sr-only"> on the Historic C-Street website (opens in a new tab)</span>
            </a>
            <p className="max-w-xs text-center text-xs text-ivory/50 lg:text-left">
              Shop hours, market days and events change, so check the{" "}
              <a href={areaSource.directory} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-honey">C-Street directory</a> before you go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
