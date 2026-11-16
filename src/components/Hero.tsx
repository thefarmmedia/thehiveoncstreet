import { useEffect, useRef, useState } from "react";
import { heroPoster, heroShots, heroVideo } from "../content/hero";
import { photo } from "../content/images";
import { site } from "../content/site";
import { gsap, useReducedMotion } from "../lib/motion";
import { Bee, flyBee } from "./Bee";
import { BookButton } from "./BookButton";
import { Picture } from "./Picture";

const OVERLAP = 1.3;

export function Hero() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const cams = useRef<(HTMLDivElement | null)[]>([]);
  const bee = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const userPaused = useRef(false);
  const useVideo = !!heroVideo;

  useEffect(() => {
    if (reduced || useVideo) return;
    const el = root.current!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, onComplete: () => setDone(true) });
      let t = 0;
      heroShots.forEach((s, i) => {
        const layer = layers.current[i]!;
        const cam = cams.current[i]!;
        const camDur = s.seconds + OVERLAP * 2;
        const o = (p: [number, number]) => `${p[0]}% ${p[1]}%`;
        gsap.set(layer, { zIndex: i + 1, opacity: 0 });
        gsap.set(cam, { scale: s.from.scale, transformOrigin: o(s.from.origin) });

        tl.call(() => setIndex(i), [], t);
        tl.fromTo(cam, { scale: s.from.scale, transformOrigin: o(s.from.origin) }, { scale: s.to.scale, transformOrigin: o(s.to.origin), duration: camDur, ease: "sine.inOut", immediateRender: false }, t);

        if (i === 0) {
          tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out" }, t);
        } else if (s.enter === "arch") {
          const w = el.clientWidth;
          const r = Math.round(w * 0.14);
          tl.set(layer, { opacity: 1, clipPath: `inset(24% 36% 0% 36% round ${r}px ${r}px 0px 0px)` }, t);
          tl.to(layer, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", duration: 1.9, ease: "expo.inOut" }, t);
        } else if (s.enter === "rise") {
          tl.fromTo(layer, { opacity: 0, yPercent: 5 }, { opacity: 1, yPercent: 0, duration: 1.6, ease: "power3.out", immediateRender: false }, t);
        } else {
          tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: s.enter === "dissolve" ? 1.8 : 1.2, ease: "sine.inOut", immediateRender: false }, t);
        }
        if (i > 0) tl.set(layers.current[i - 1], { opacity: 0 }, t + 2.2);
        if (s.bee) {
          tl.call(() => {
            const w = el.clientWidth, h = el.clientHeight;
            flyBee(bee.current, [
              { x: -40, y: h * 0.34 },
              { x: w * 0.3, y: h * 0.22 },
              { x: w * 0.55, y: h * 0.3 },
              { x: w * 0.8, y: h * 0.18 },
              { x: w + 40, y: h * 0.24 },
            ], { duration: 7.5 });
          }, [], t + 1.2);
        }
        t += s.seconds;
      });
      tlRef.current = tl;
      tl.play();
    }, el);

    // pause when off-screen or tab hidden (saves battery, keeps the story intact)
    const io = new IntersectionObserver(([e]) => {
      const tl = tlRef.current;
      if (!tl) return;
      if (e.isIntersecting && !userPaused.current) tl.resume();
      else tl.pause();
    }, { threshold: 0.15 });
    io.observe(el);
    const vis = () => {
      const tl = tlRef.current;
      if (!tl) return;
      if (document.hidden) tl.pause();
      else if (!userPaused.current) tl.resume();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
      ctx.revert();
      tlRef.current = null;
    };
  }, [reduced, useVideo]);

  const togglePause = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (done) {
      setDone(false);
      userPaused.current = false;
      setPaused(false);
      tl.restart();
      return;
    }
    userPaused.current = !userPaused.current;
    setPaused(userPaused.current);
    if (userPaused.current) tl.pause();
    else tl.resume();
  };

  const shot = heroShots[index];
  const animated = !reduced && !useVideo;

  return (
    <section ref={root} id="top" aria-label="Introduction" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-charcoal text-ivory">
      {/* Cinematic stage */}
      <div className="absolute inset-0" aria-hidden={animated ? "true" : undefined}>
        {useVideo && heroVideo ? (
          <HeroVideo />
        ) : animated ? (
          heroShots.map((s, i) => (
            <div key={i} ref={(n) => { layers.current[i] = n; }} className="absolute inset-0 overflow-hidden" style={{ opacity: i === 0 ? 1 : 0 }}>
              <div ref={(n) => { cams.current[i] = n; }} className="absolute inset-0 will-change-transform">
                <Picture id={s.photo} priority={i === 0} describe={false} className="h-full w-full" imgStyle={{ objectPosition: s.position ?? "50% 50%" }} />
              </div>
            </div>
          ))
        ) : (
          <Picture id={heroPoster} priority className="h-full w-full" />
        )}
      </div>

      {/* grading: keeps type legible without hiding the building */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-charcoal/45" />
      <div className="pointer-events-none absolute inset-0 z-20" style={{ background: "radial-gradient(120% 90% at 30% 80%, transparent 40%, rgb(34 32 28 / .55))" }} />

      {animated && <Bee ref={bee} size={30} className="absolute left-0 top-0 z-30 opacity-0" />}

      {/* Copy */}
      <div className="container-x relative z-40 flex h-full flex-col items-center justify-end pb-40 text-center sm:pb-32 md:items-start md:text-left">
        <p className="eyebrow text-honey-light">{site.secondaryTagline.replace(/\.$/, "")}</p>
        <h1 className="mt-4 max-w-[12ch] text-[3.4rem] leading-[0.92] sm:text-[5.2rem] lg:text-[7rem]">
          The Hive <span className="block text-[0.6em] italic text-honey-light">on C Street</span>
        </h1>
        <p className="mt-5 font-serif text-2xl italic text-ivory/90 sm:text-3xl">{site.tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          <a href="#explore" className="btn btn-ghost">Explore the Hive</a>
          <BookButton />
        </div>
      </div>

      {/* Chapter bar */}
      {animated && (
        <div className="absolute inset-x-0 bottom-0 z-40">
          <div className="container-x flex flex-col items-center gap-3 pb-5 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-6 sm:text-left">
            <div className="min-w-0" aria-live="polite">
              <p className="eyebrow whitespace-nowrap text-ivory/70">
                <span className="text-honey">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-2 opacity-50">/</span>
                {String(heroShots.length).padStart(2, "0")}
                <span className="mx-3 inline-block h-px w-6 translate-y-[-3px] bg-ivory/40" />
                {shot.label}
              </p>
              <p key={index} className="mt-1 min-h-6 font-serif text-lg leading-snug italic text-ivory/90 [animation:fadeup_.9s_var(--ease-cine)_both]">
                {shot.caption ?? ""}
              </p>
            </div>
            <button
              type="button"
              onClick={togglePause}
              className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-white/30 px-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ivory/90 backdrop-blur-sm transition hover:bg-white/10"
              aria-label={done ? "Replay the introduction" : paused ? "Play the introduction" : "Pause the introduction"}
            >
              {done ? "Replay" : paused ? "Play" : "Pause"}
            </button>
          </div>
          <div className="flex h-[2px] w-full gap-[3px] bg-transparent px-0">
            {heroShots.map((s, i) => (
              <span key={i} className="relative h-full flex-1 overflow-hidden bg-white/15">
                <span
                  className="absolute inset-0 origin-left bg-honey"
                  style={
                    i < index || done
                      ? { transform: "scaleX(1)" }
                      : i === index
                        ? { animation: `progress ${s.seconds}s linear both`, animationPlayState: paused ? "paused" : "running" }
                        : { transform: "scaleX(0)" }
                  }
                />
              </span>
            ))}
          </div>
        </div>
      )}
      <p className="sr-only">
        The introduction moves through real photographs of the home: the brick building on C Street, the storefront where
        Soozeezbeez Honey BEEtique began, the deck entry, hallway, living room, dining area, bedroom and deck.
      </p>
    </section>
  );
}

function HeroVideo() {
  const v = heroVideo!;
  const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const poster = photo(v.poster);
  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={`/images/${poster.id}-1280.jpg`}
      src={mobile && v.mobile ? v.mobile : v.desktop}
      aria-hidden="true"
    />
  );
}
