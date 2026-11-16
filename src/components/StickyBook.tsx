import { useEffect, useState } from "react";
import { BookButton } from "./BookButton";

/** Mobile-only bottom bar so booking is always one tap away after the intro. */
export function StickyBook() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const book = document.getElementById("book");
    let pastHero = false, atBook = false;
    const update = () => setShow(pastHero && !atBook);
    const onScroll = () => { pastHero = window.scrollY > window.innerHeight * 0.85; update(); };
    const io = new IntersectionObserver(([e]) => { atBook = e.isIntersecting; update(); });
    if (book) io.observe(book);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-ivory/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-serif text-lg leading-tight text-charcoal">The Hive <span className="italic text-amber">on C Street</span></span>
        <BookButton className="btn btn-honey !min-h-11 !px-5 !text-[0.7rem]">Book</BookButton>
      </div>
    </div>
  );
}
