import { useEffect, useState } from "react";
import { BookButton } from "./BookButton";
import { Logo } from "./Logo";

export interface NavItem {
  href: string;
  label: string;
}

export function Header({ nav }: { nav: NavItem[] }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const dark = solid && !open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        dark ? "bg-ivory/85 shadow-[0_1px_0_rgb(34_32_28/0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ivory focus:px-4 focus:py-2 focus:text-charcoal">
        Skip to content
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="#top" aria-label="The Hive on C Street, back to top" className="relative z-50">
          <Logo tone={dark ? "dark" : "light"} />
        </a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className={`flex items-center gap-7 text-[0.74rem] font-semibold uppercase tracking-[0.18em] ${dark ? "text-ink" : "text-ivory"}`}>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="relative py-2 opacity-85 transition hover:opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-honey after:transition-transform after:duration-500 hover:after:scale-x-100">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="relative z-50 flex items-center gap-2">
          <BookButton className="btn btn-honey !min-h-11 !px-5 !text-[0.7rem]">Book</BookButton>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${dark ? "text-charcoal" : "text-ivory"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-[1.5px] w-6 bg-current transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-charcoal text-ivory transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="honeycomb-bg absolute inset-0 opacity-30" aria-hidden="true" />
        <nav aria-label="Mobile" className="container-x relative flex h-full flex-col items-center justify-center gap-2 pt-16 text-center">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-serif text-[2.4rem] leading-tight transition hover:text-honey"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {n.label}
            </a>
          ))}
          <div className="mt-8">
            <BookButton onClick={() => setOpen(false)} />
          </div>
        </nav>
      </div>
    </header>
  );
}
