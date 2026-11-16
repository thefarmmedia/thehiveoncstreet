import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { exploreViews } from "../content/explorer";
import { imgBase, photo, srcSet } from "../content/images";
import { gsap, useReducedMotion } from "../lib/motion";
import { Picture } from "./Picture";

interface Layer {
  k: number;
  id: string;
}

const preloaded = new Set<string>();
function preload(id: string) {
  if (preloaded.has(id)) return;
  preloaded.add(id);
  const img = new Image();
  img.sizes = "100vw";
  img.srcset = srcSet(photo(id), "avif");
  img.src = `${imgBase}${id}-1280.webp`;
}

/**
 * "Explore the Hive": a camera-style viewer for the real photos. Each move is
 * a push/drift on the actual frame. Nothing is reconstructed or invented.
 */
export function Explorer() {
  const reduced = useReducedMotion();
  const [view, setView] = useState(0);
  const [shot, setShot] = useState(0);
  const [layers, setLayers] = useState<Layer[]>([{ k: 0, id: exploreViews[0].shots[0] }]);
  const keyRef = useRef(0);
  const stage = useRef<HTMLDivElement>(null);
  const parallax = useRef<HTMLDivElement>(null);
  const layerEls = useRef(new Map<number, HTMLDivElement>());
  const drift = useRef<gsap.core.Tween | null>(null);

  const current = exploreViews[view];
  const currentId = current.shots[shot];
  const p = photo(currentId);

  const go = useCallback((v: number, s: number) => {
    const id = exploreViews[v].shots[s];
    setView(v);
    setShot(s);
    setLayers((ls) => (ls[ls.length - 1]?.id === id ? ls : [...ls, { k: ++keyRef.current, id }]));
  }, []);

  // Camera transition whenever a new layer is added
  useLayoutEffect(() => {
    const top = layers[layers.length - 1];
    const el = layerEls.current.get(top.k);
    if (!el) return;
    const ph = photo(top.id);
    const origin = `${ph.focal[0]}% ${ph.focal[1]}%`;
    const prev = layers.length > 1 ? layerEls.current.get(layers[layers.length - 2].k) : null;
    drift.current?.kill();

    const cleanup = () => setLayers((ls) => (ls.length > 1 ? [ls[ls.length - 1]] : ls));

    if (reduced) {
      gsap.set(el, { opacity: 1, scale: 1 });
      if (prev) cleanup();
      return;
    }
    if (prev) {
      const prevPh = photo(layers[layers.length - 2].id);
      gsap.to(prev, {
        scale: 1.14,
        opacity: 0,
        filter: "blur(6px)",
        transformOrigin: `${prevPh.focal[0]}% ${prevPh.focal[1]}%`,
        duration: 1.1,
        ease: "power2.in",
      });
    }
    gsap.fromTo(
      el,
      { opacity: 0, scale: 1.2, transformOrigin: origin, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1.04,
        filter: "blur(0px)",
        duration: prev ? 1.5 : 0.01,
        delay: prev ? 0.35 : 0,
        ease: "expo.out",
        onComplete: () => {
          if (prev) cleanup();
          drift.current = gsap.to(el, { scale: 1.1, duration: 16, ease: "sine.inOut", yoyo: true, repeat: -1 });
        },
      },
    );
  }, [layers, reduced]);

  // Pointer parallax: a gentle shift, as if the camera floats
  useEffect(() => {
    if (reduced || !stage.current || !parallax.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(parallax.current, "x", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(parallax.current, "y", { duration: 1.2, ease: "power3.out" });
    const s = stage.current;
    const move = (e: PointerEvent) => {
      const r = s.getBoundingClientRect();
      xTo(((e.clientX - r.left) / r.width - 0.5) * -22);
      yTo(((e.clientY - r.top) / r.height - 0.5) * -14);
    };
    const leave = () => { xTo(0); yTo(0); };
    s.addEventListener("pointermove", move);
    s.addEventListener("pointerleave", leave);
    return () => {
      s.removeEventListener("pointermove", move);
      s.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);

  // Swipe between angles on touch
  useEffect(() => {
    const s = stage.current;
    if (!s) return;
    let x0 = 0, y0 = 0, tracking = false;
    const down = (e: PointerEvent) => { if (e.pointerType !== "mouse") { tracking = true; x0 = e.clientX; y0 = e.clientY; } };
    const up = (e: PointerEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    };
    s.addEventListener("pointerdown", down);
    s.addEventListener("pointerup", up);
    return () => { s.removeEventListener("pointerdown", down); s.removeEventListener("pointerup", up); };
  });

  // Next angle; rolls over into the next view so the tour can continue
  const step = (dir: 1 | -1) => {
    const n = current.shots.length;
    const s = shot + dir;
    if (s >= 0 && s < n) return go(view, s);
    const v = (view + dir + exploreViews.length) % exploreViews.length;
    go(v, dir === 1 ? 0 : exploreViews[v].shots.length - 1);
  };

  return (
    <section id="explore" aria-labelledby="explore-title" className="relative bg-charcoal py-20 text-ivory sm:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-honey" data-reveal>Choose your view</p>
            <h2 id="explore-title" className="mt-4 text-[2.6rem] sm:text-[3.6rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              Explore the Hive
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ivory/60" data-reveal style={{ ["--d" as string]: "160ms" }}>
            Every view is a real photograph of the home, so what you see is what you&rsquo;ll find.
          </p>
        </div>
      </div>

      <div className="container-x mt-10">
        <div className="relative">
          {/* Stage */}
          <div
            ref={stage}
            tabIndex={0}
            role="region"
            aria-roledescription="viewer"
            aria-label={`${current.label}: ${p.title}. Use left and right arrow keys to change angle.`}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
            }}
            className="relative aspect-[4/5] w-full touch-pan-y overflow-hidden rounded-[4px] bg-ink sm:aspect-[16/10] lg:aspect-[16/8.5]"
          >
            <div ref={parallax} className="absolute -inset-4">
              {layers.map((l, i) => (
                <div
                  key={l.k}
                  ref={(n) => { if (n) layerEls.current.set(l.k, n); else layerEls.current.delete(l.k); }}
                  className="absolute inset-0 will-change-transform"
                  style={{ zIndex: i + 1 }}
                >
                  <Picture
                    id={l.id}
                    sizes="(min-width: 1320px) 1320px, 100vw"
                    className="h-full w-full"
                    describe={i === layers.length - 1}
                    imgStyle={{ objectPosition: `${photo(l.id).focal[0]}% ${photo(l.id).focal[1]}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/20" />

            {/* Caption + angle controls */}
            <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 p-5 sm:p-8">
              <div className="max-w-xl" aria-live="polite">
                <p className="eyebrow text-honey-light">{current.label}</p>
                <p className="mt-2 font-serif text-[1.7rem] leading-tight sm:text-4xl">{p.title}</p>
                <p className="mt-2 hidden max-w-md text-sm text-ivory/75 sm:block">{current.blurb}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" onClick={() => step(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 backdrop-blur transition hover:bg-white/15" aria-label="Previous angle">
                  <Arrow dir="left" />
                </button>
                <span className="min-w-[3.2rem] text-center text-xs tabular-nums tracking-[0.2em] text-ivory/80">
                  {shot + 1} / {current.shots.length}
                </span>
                <button type="button" onClick={() => step(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 backdrop-blur transition hover:bg-white/15" aria-label="Next angle">
                  <Arrow dir="right" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating "Choose your view" panel (desktop) */}
          <nav
            aria-label="Choose a view"
            className="absolute right-6 top-6 z-40 hidden w-60 rounded-[6px] border border-white/15 bg-charcoal/55 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl lg:block"
          >
            <p className="eyebrow px-3 pb-2 pt-1 text-[0.62rem] text-ivory/60">Choose your view</p>
            <ul>
              {exploreViews.map((v, i) => (
                <li key={v.key}>
                  <button
                    type="button"
                    aria-pressed={i === view}
                    onClick={() => go(i, 0)}
                    onPointerEnter={() => preload(v.shots[0])}
                    onFocus={() => preload(v.shots[0])}
                    className={`group flex w-full items-center gap-3 rounded-[4px] px-3 py-2.5 text-left text-sm transition ${
                      i === view ? "bg-white/12 text-ivory" : "text-ivory/70 hover:bg-white/6 hover:text-ivory"
                    }`}
                  >
                    <span className={`text-[0.65rem] tabular-nums tracking-[0.2em] ${i === view ? "text-honey" : "text-ivory/40"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{v.label}</span>
                    <span className={`h-px transition-all duration-500 ${i === view ? "w-6 bg-honey" : "w-0 bg-ivory/40 group-hover:w-3"}`} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile/tablet view chips */}
        <nav aria-label="Choose a view" className="-mx-4 mt-4 overflow-x-auto px-4 pb-2 lg:hidden [scrollbar-width:none]">
          <ul className="flex w-max gap-2">
            {exploreViews.map((v, i) => (
              <li key={v.key}>
                <button
                  type="button"
                  aria-pressed={i === view}
                  onClick={() => go(i, 0)}
                  className={`min-h-11 whitespace-nowrap rounded-full border px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition ${
                    i === view ? "border-honey bg-honey text-charcoal" : "border-white/20 text-ivory/80"
                  }`}
                >
                  {v.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-3 text-sm text-ivory/70 sm:hidden">{current.blurb}</p>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
