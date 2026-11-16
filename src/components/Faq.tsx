import { faq } from "../content/faq";
import { SHOW_DRAFTS } from "../lib/drafts";

export function visibleFaq() {
  return faq.filter((f) => f.confirmed || SHOW_DRAFTS);
}

export function Faq() {
  const items = visibleFaq();
  if (!items.length) return null;
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="text-center lg:col-span-4 lg:text-left">
          <p className="eyebrow text-amber" data-reveal>Good to know</p>
          <h2 id="faq-title" className="mt-4 text-[2.6rem] sm:text-[3.4rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
            Questions, <em className="text-sage-deep">answered</em>
          </h2>
        </div>
        <div className="divide-y divide-charcoal/10 border-y border-charcoal/10 lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="group py-1" data-reveal="fade">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-center font-serif lg:gap-6 lg:text-left text-[1.45rem] leading-snug text-charcoal transition hover:text-amber [&::-webkit-details-marker]:hidden">
                <span className="w-4 shrink-0 lg:hidden" aria-hidden="true" />
                <span className="flex-1">{f.q}</span>
                <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-500 group-open:scale-y-0" />
                </span>
              </summary>
              <div className="pb-6 text-center text-ink/75 lg:pr-10 lg:text-left">
                <p>{f.a}</p>
                {f.link && (
                  <a href={f.link.url} target="_blank" rel="noopener" className="mt-3 inline-block text-sm font-semibold text-amber underline-offset-4 hover:underline">
                    {f.link.label} &rarr;
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                {!f.confirmed && <span className="draft-badge mt-3">Placeholder · not shown on live site</span>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
