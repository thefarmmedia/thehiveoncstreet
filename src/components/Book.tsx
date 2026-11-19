import { site } from "../content/site";
import { SHOW_DRAFTS } from "../lib/drafts";
import { BookButton } from "./BookButton";
import { HiveMark } from "./Logo";
import { Picture } from "./Picture";

export function Book() {
  const l = site.listing;
  const facts = [`${l.guests} guests`, `${l.bedrooms} bedroom`, `${l.beds} queen bed`, `${l.baths} bath`, "Self check-in", "Free parking"];
  return (
    <section id="book" aria-labelledby="book-title" className="relative isolate overflow-hidden bg-charcoal py-28 text-center text-ivory sm:py-40">
      <Picture id="living-evening" sizes="100vw" className="absolute inset-0 -z-10 h-full w-full opacity-45" describe={false} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_50%,rgb(34_32_28/0.55),rgb(34_32_28/0.92))]" />
      <div className="container-x">
        <HiveMark className="mx-auto h-12 w-12 text-honey" />
        <p className="eyebrow mt-6 text-honey" data-reveal>Now booking on {site.bookingPlatform}</p>
        <h2 id="book-title" className="mx-auto mt-5 max-w-3xl text-[2.8rem] sm:text-[4.4rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
          Come stay at The Hive.
        </h2>
        <p className="mx-auto mt-5 max-w-lg font-serif text-2xl italic text-ivory/80" data-reveal style={{ ["--d" as string]: "160ms" }}>
          {site.tagline}
        </p>
        <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ivory/80" data-reveal style={{ ["--d" as string]: "200ms" }}>
          {facts.map((f, i) => (
            <li key={f} className="flex items-center gap-5">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-honey" aria-hidden="true" />}
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center" data-reveal style={{ ["--d" as string]: "240ms" }}>
          {site.bookingUrl ? (
            <BookButton className="btn btn-honey !min-h-14 !px-10">Check availability on {site.bookingPlatform}</BookButton>
          ) : (
            <p className="max-w-md text-ivory/70">Online booking is opening soon.</p>
          )}
        </div>
        {!site.bookingUrl && SHOW_DRAFTS && (
          <p className="draft-badge mt-6">Placeholder · set bookingUrl in src/content/site.ts</p>
        )}
        <p className="mx-auto mt-6 max-w-md text-sm text-ivory/70">
          Hosted by {l.host}. Add your dates on {site.bookingPlatform} to see pricing and the cancellation policy, and message
          your host there with any questions.
        </p>
      </div>
    </section>
  );
}
