import { useEffect, useMemo, useRef, useState } from "react";
import { galleryFilters } from "../content/explorer";
import { allPhotos, type Photo } from "../content/images";
import { Picture } from "./Picture";

const ORDER = [
  "exterior-corner-mural", "living-daylight", "hallway", "dining-workspace", "living-evening", "bedroom-window",
  "kitchen", "deck-view", "living-brick-fireplace", "bathroom", "exterior-front-storefront", "living-arch",
  "bedroom-dresser", "deck-entry", "exterior-rear-deck",
];
const ordered = ORDER.map((id) => allPhotos.find((p) => p.id === id)!).filter(Boolean);

export function Gallery() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => {
    const f = galleryFilters.find((g) => g.key === filter)!;
    return f.categories.length ? ordered.filter((p) => f.categories.includes(p.category)) : ordered;
  }, [filter]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow text-amber" data-reveal>Gallery</p>
            <h2 id="gallery-title" className="mt-4 text-[2.6rem] sm:text-[3.6rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
              Every corner, <em className="text-sage-deep">in the light</em>
            </h2>
          </div>
          <div role="group" aria-label="Filter photos by room" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {galleryFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`min-h-11 whitespace-nowrap rounded-full border px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition ${
                  filter === f.key ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 text-ink/70 hover:border-charcoal/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-2 [grid-auto-flow:dense] sm:auto-rows-[220px] sm:gap-3 md:grid-cols-3 lg:auto-rows-[260px] lg:grid-cols-4">
          {list.map((p, i) => {
            const portrait = p.height > p.width;
            const big = filter === "all" && p.featured && i % 3 === 0 && !portrait;
            return (
              <li key={p.id} className={`${big ? "col-span-2 row-span-2" : ""} ${portrait ? "row-span-2" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden bg-cream"
                  aria-label={`Open photo: ${p.title}`}
                >
                  <Picture
                    id={p.id}
                    sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.06]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left font-serif text-lg text-ivory opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {p.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {open !== null && <Lightbox photos={list} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

function Lightbox({ photos, index, onChange, onClose }: { photos: Photo[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const p = photos[index];
  const n = photos.length;
  const go = (d: number) => onChange((index + d + n) % n);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  // swipe
  const start = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${n}: ${p.title}`}
      className="fixed inset-0 z-[60] flex flex-col bg-charcoal/97 text-ivory [animation:fadein_.4s_ease_both]"
      onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
      onPointerUp={(e) => {
        const s = start.current;
        start.current = null;
        if (!s) return;
        const dx = e.clientX - s.x, dy = e.clientY - s.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-8">
        <span className="text-xs tabular-nums tracking-[0.24em] text-ivory/60">{String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button ref={closeBtn} type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:bg-white/10" aria-label="Close gallery">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
        <Picture key={p.id} id={p.id} sizes="100vw" className="h-full w-full !bg-contain !bg-no-repeat [animation:fadein_.5s_ease_both]" imgClassName="!object-contain" />
        <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-charcoal/40 backdrop-blur transition hover:bg-white/10 sm:grid" aria-label="Previous photo">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-charcoal/40 backdrop-blur transition hover:bg-white/10 sm:grid" aria-label="Next photo">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="px-4 py-5 text-center sm:px-8">
        <p className="font-serif text-2xl">{p.title}</p>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-ivory/60">{p.alt}</p>
        <p className="mt-2 text-xs text-ivory/40 sm:hidden">Swipe to browse</p>
      </div>
    </div>
  );
}
