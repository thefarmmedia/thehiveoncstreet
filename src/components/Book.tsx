import { site } from "../content/site";
import { SHOW_DRAFTS } from "../lib/drafts";
import { BookButton } from "./BookButton";
import { HiveMark } from "./Logo";
import { Picture } from "./Picture";

export function Book() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative isolate overflow-hidden bg-charcoal py-28 text-center text-ivory sm:py-40">
      <Picture id="living-evening" sizes="100vw" className="absolute inset-0 -z-10 h-full w-full opacity-45" describe={false} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_50%,rgb(34_32_28/0.55),rgb(34_32_28/0.92))]" />
      <div className="container-x">
        <HiveMark className="mx-auto h-12 w-12 text-honey" />
        <p className="eyebrow mt-6 text-honey" data-reveal>Book your stay</p>
        <h2 id="book-title" className="mx-auto mt-5 max-w-3xl text-[2.8rem] sm:text-[4.4rem]" data-reveal style={{ ["--d" as string]: "80ms" }}>
          Come stay at The Hive.
        </h2>
        <p className="mx-auto mt-5 max-w-lg font-serif text-2xl italic text-ivory/80" data-reveal style={{ ["--d" as string]: "160ms" }}>
          {site.tagline}
        </p>
        <div className="mt-10 flex justify-center" data-reveal style={{ ["--d" as string]: "240ms" }}>
          {site.bookingUrl ? (
            <BookButton className="btn btn-honey !min-h-14 !px-10">Check availability</BookButton>
          ) : (
            <p className="max-w-md text-ivory/70">Online booking is opening soon.</p>
          )}
        </div>
        {!site.bookingUrl && SHOW_DRAFTS && (
          <p className="draft-badge mt-6">Placeholder · set bookingUrl in src/content/site.ts</p>
        )}
        <p className="mt-6 text-xs text-ivory/45">Rates, availability and house rules are shown on the booking page.</p>
      </div>
    </section>
  );
}
