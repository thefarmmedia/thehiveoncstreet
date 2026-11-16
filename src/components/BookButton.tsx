import type { ReactNode } from "react";
import { site } from "../content/site";

/**
 * Every "Book" action goes through here. With site.bookingUrl set it opens the
 * booking platform; until then it scrolls to the Book section.
 */
export function BookButton({ className = "btn btn-honey", children = "Book Your Stay", onClick }: { className?: string; children?: ReactNode; onClick?: () => void }) {
  if (site.bookingUrl) {
    return (
      <a href={site.bookingUrl} target="_blank" rel="noopener" className={className} onClick={onClick}>
        {children}
        <span className="sr-only"> (opens booking site in a new tab)</span>
      </a>
    );
  }
  return (
    <a href="#book" className={className} onClick={onClick}>
      {children}
    </a>
  );
}
