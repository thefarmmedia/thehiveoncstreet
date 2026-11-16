import { useEffect, useRef } from "react";
import { tribute } from "../content/story";
import { TRIBUTE_APPROVED } from "../content/approvals";
import { SHOW_DRAFTS } from "../lib/drafts";
import { Bee, flyBee } from "./Bee";
import { HiveMark } from "./Logo";
import { Picture } from "./Picture";

/** "The Heart Behind the Hive". Rendered only when approved, or in draft previews. */
export function Tribute() {
  const section = useRef<HTMLElement>(null);
  const bee = useRef<SVGSVGElement>(null);
  const approved = TRIBUTE_APPROVED;

  // A single bee crosses just before the story is revealed
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const w = el.clientWidth;
        flyBee(bee.current, [
          { x: w + 30, y: 150 },
          { x: w * 0.7, y: 70 },
          { x: w * 0.45, y: 130 },
          { x: w * 0.2, y: 60 },
          { x: -40, y: 110 },
        ], { duration: 6.5 });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32 lg:py-40">
      <Bee ref={bee} size={26} className="absolute left-0 top-0 z-20 opacity-0" />
      <div className="honeycomb-bg absolute inset-x-0 top-0 h-24 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />

      {!approved && (
        <div className="container-x relative mb-10">
          <p className="draft-badge">Draft · pending family approval · hidden on the live site</p>
        </div>
      )}

      <div className="container-x relative">
        <p className="mx-auto max-w-4xl text-center font-serif text-[1.9rem] italic leading-snug text-charcoal sm:text-[2.6rem] lg:text-[3.1rem]" data-reveal>
          {tribute.opening.split("Soozeezbeez Honey BEEtique")[0]}
          <span className="whitespace-nowrap text-amber">Soozeezbeez Honey BEEtique</span>.
        </p>
        <div className="mx-auto mt-10 flex items-center justify-center gap-4 text-honey" aria-hidden="true">
          <span className="h-px w-16 bg-honey/50" />
          <HiveMark className="h-7 w-7 text-charcoal" />
          <span className="h-px w-16 bg-honey/50" />
        </div>

        <div className="mt-16 grid items-start gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pr-6">
            <p className="eyebrow text-amber" data-reveal>{tribute.eyebrow}</p>
            <h2 id="story-title" className="mt-4 text-[2.8rem] sm:text-[3.8rem] lg:text-[4.4rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              {tribute.title}
            </h2>
            <p className="mt-4 font-serif text-xl italic text-sage-deep sm:text-2xl" data-reveal style={{ ["--d" as string]: "140ms" }}>
              {tribute.subtitle}
            </p>
            <div className="mt-10 space-y-5 text-[1.08rem] leading-[1.8] text-ink/85">
              {tribute.paragraphs.map((p, i) => (
                <p key={i} data-reveal style={{ ["--d" as string]: `${120 + i * 70}ms` }} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-amber" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-10 font-serif text-3xl italic text-amber" data-reveal>{tribute.closing}</p>
            {tribute.signature.src && <img src={tribute.signature.src} alt={tribute.signature.alt} className="mt-6 h-16 w-auto opacity-80" loading="lazy" />}
          </div>

          <div className="relative lg:col-span-6">
            <figure className="relative" data-reveal="mask">
              <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] border border-honey/40 p-2">
                <Picture
                  id="exterior-front-storefront"
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="h-full w-full overflow-hidden rounded-t-[999px]"
                  imgStyle={{ objectPosition: "44% 60%" }}
                />
              </div>
              <figcaption className="mt-4 text-sm text-muted">The storefront downstairs, home of Soozeezbeez Honey BEEtique. The Hive is upstairs.</figcaption>
            </figure>

            <figure className="relative mx-auto mt-8 w-[56%] max-w-[230px] sm:absolute sm:-left-10 sm:top-[46%] sm:mt-0 sm:w-[46%]" data-reveal style={{ ["--d" as string]: "250ms" }}>
              <div className="aspect-square overflow-hidden bg-cream p-1.5 shadow-2xl shadow-charcoal/25 [clip-path:polygon(25%_3%,75%_3%,100%_50%,75%_97%,25%_97%,0_50%)]">
                <Picture id="storefront-decal" sizes="230px" className="h-full w-full [clip-path:polygon(25%_3%,75%_3%,100%_50%,75%_97%,25%_97%,0_50%)]" />
              </div>
              <figcaption className="mt-2 text-center text-xs text-muted">The original window decal</figcaption>
            </figure>

            {tribute.portrait.src ? (
              <figure className="mt-10">
                <img src={tribute.portrait.src} alt={tribute.portrait.alt} className="w-full rounded-[4px]" loading="lazy" />
              </figure>
            ) : SHOW_DRAFTS && (
              <div className="mt-10 rounded-[4px] border border-dashed border-amber/50 p-6 text-sm text-amber">
                <span className="draft-badge">Placeholder</span>
                <p className="mt-3">
                  Space for a family-provided photo of Susi, ideally in her shop. Add it in <code>src/content/story.ts</code>; it
                  won&rsquo;t show until provided.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
