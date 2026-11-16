import { FOOTER_TRIBUTE_APPROVED } from "../content/approvals";
import { footerTribute } from "../content/story";
import { site } from "../content/site";
import { SHOW_DRAFTS } from "../lib/drafts";
import { BookButton } from "./BookButton";
import type { NavItem } from "./Header";
import { Logo } from "./Logo";

export function Footer({ nav }: { nav: NavItem[] }) {
  const showTribute = __SHOW_FOOTER_TRIBUTE__;
  const { email, phone, instagram } = site.contact;
  return (
    <footer className="relative overflow-hidden bg-charcoal pb-28 pt-20 text-ivory/80 md:pb-12">
      <div className="honeycomb-bg absolute inset-0 opacity-[0.12]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm font-serif text-2xl italic text-ivory/90">{site.tagline}</p>
            <div className="mt-8">
              <BookButton />
            </div>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-[0.62rem] text-honey">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="transition hover:text-honey">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow text-[0.62rem] text-honey">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {email && <li><a href={`mailto:${email}`} className="hover:text-honey">{email}</a></li>}
              {phone && <li><a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-honey">{phone}</a></li>}
              {instagram && <li><a href={instagram} target="_blank" rel="noopener" className="hover:text-honey">Instagram</a></li>}
              {site.bookingUrl && <li><a href={site.bookingUrl} target="_blank" rel="noopener" className="hover:text-honey">Message us on the booking page</a></li>}
              {!email && !phone && !site.bookingUrl && SHOW_DRAFTS && <li><span className="draft-badge">Placeholder · contact details needed</span></li>}
            </ul>
          </div>
        </div>

        {__SHOW_FOOTER_TRIBUTE__ && (
          <p className="mt-16 border-t border-white/10 pt-8 text-center font-serif text-lg italic text-ivory/70">
            {footerTribute}
            {!FOOTER_TRIBUTE_APPROVED && <span className="draft-badge ml-3 align-middle not-italic">Pending approval</span>}
          </p>
        )}
        <div className={`flex flex-col items-center justify-between gap-3 text-xs text-ivory/45 sm:flex-row ${showTribute ? "mt-8" : "mt-16 border-t border-white/10 pt-8"}`}>
          <p>&copy; {new Date().getFullYear()} {site.name}</p>
          <p>
            Website by{" "}
            <a href={site.credit.url} target="_blank" rel="noopener" className="text-ivory/70 underline-offset-4 hover:text-honey hover:underline">
              {site.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
