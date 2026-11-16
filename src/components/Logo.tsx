/** Wordmark: a single honeycomb cell holding a small bee, set beside a serif name. */
export function HiveMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M32 3 57 17.5v29L32 61 7 46.5v-29Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <g transform="translate(32 34)">
        <ellipse cx="-8" cy="-9" rx="8" ry="4.4" fill="currentColor" opacity=".35" transform="rotate(-30 -8 -9)" />
        <ellipse cx="8" cy="-9" rx="8" ry="4.4" fill="currentColor" opacity=".35" transform="rotate(30 8 -9)" />
        <ellipse rx="6.4" ry="10" fill="#D9A441" />
        <path d="M-6-2.6h12M-6.1 2.8h12.2M-4.4 7.6h8.8" stroke="#22201C" strokeWidth="2.3" />
        <circle cy="-11.2" r="4" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const c = tone === "light" ? "text-ivory" : "text-charcoal";
  return (
    <span className={`inline-flex items-center gap-3 ${c}`}>
      <HiveMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-medium tracking-[0.02em] sm:text-[1.6rem]">The Hive</span>
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.42em] opacity-80">on C Street</span>
      </span>
    </span>
  );
}
