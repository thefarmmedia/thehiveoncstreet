import { checkoutSteps, houseRules, safety } from "../content/houseRules";
import { site } from "../content/site";
import { BookButton } from "./BookButton";
import { DetailIcon } from "./Icons";

/** "Know before you go": times, house rules and checkout steps from the listing. */
export function StayInfo() {
  const l = site.listing;
  const facts: { icon: "clock" | "key" | "guests" | "parking"; label: string; value: string }[] = [
    { icon: "clock", label: "Check-in", value: `After ${l.checkIn}` },
    { icon: "clock", label: "Checkout", value: `By ${l.checkOut}` },
    { icon: "key", label: "Self check-in", value: l.selfCheckIn },
    { icon: "guests", label: "Sleeps", value: `Up to ${l.guests}` },
  ];

  return (
    <section id="stay-info" aria-labelledby="stay-title" className="relative overflow-hidden bg-sage-deep py-24 text-ivory sm:py-32">
      <div className="honeycomb-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="text-center lg:text-left">
          <p className="eyebrow text-honey-light" data-reveal>Know before you go</p>
          <h2 id="stay-title" className="mt-4 text-[2.6rem] sm:text-[3.4rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
            Check-in, house rules <em className="text-honey-light">&amp; checkout</em>
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-white/15 lg:grid-cols-4">
          {facts.map((f, i) => (
            <li key={f.label} className="flex flex-col items-center gap-2 bg-sage-deep p-6 text-center sm:p-8" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
              <DetailIcon name={f.icon} className="h-6 w-6 text-honey-light" />
              <span className="eyebrow text-[0.62rem] text-ivory/75">{f.label}</span>
              <span className="font-serif text-[1.7rem] leading-tight sm:text-[2rem]">{f.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-ivory/70 lg:text-left">All times are {l.timezone}.</p>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h3 className="text-center font-serif text-[2rem] leading-tight lg:text-left">House rules</h3>
            <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
              {houseRules.map((r) => (
                <li key={r} className="py-3.5 text-center text-[0.98rem] text-ivory/90 lg:text-left">{r}</li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ ["--d" as string]: "100ms" }}>
            <h3 className="text-center font-serif text-[2rem] leading-tight lg:text-left">Before you leave</h3>
            <ol className="mt-6 divide-y divide-white/15 border-y border-white/15">
              {checkoutSteps.map((s, i) => (
                <li key={s} className="flex flex-col items-center gap-1 py-3.5 text-center text-[0.98rem] text-ivory/90 lg:flex-row lg:items-baseline lg:gap-4 lg:text-left">
                  <span className="font-serif text-lg text-honey-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-white/15 pt-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="eyebrow text-[0.62rem] text-honey-light">Safety</p>
            <p className="mt-2 max-w-2xl text-sm text-ivory/85">{safety.join(" · ")}</p>
          </div>
          <BookButton className="btn btn-honey shrink-0">Check availability</BookButton>
        </div>
        <p className="mt-6 text-center text-xs text-ivory/70 lg:text-left">
          The {site.bookingPlatform} listing has the official house rules and cancellation policy for your dates.
        </p>
      </div>
    </section>
  );
}
