import { forwardRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

/**
 * A small, naturalistic honeybee (faces right so it can auto-rotate along a path).
 * Purely decorative: aria-hidden, pointer-events none, never over controls.
 */
export const Bee = forwardRef<SVGSVGElement, { size?: number; className?: string }>(function Bee(
  { size = 30, className = "" },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 64 44"
      width={size}
      height={(size * 44) / 64}
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none ${className}`}
      style={{ filter: "drop-shadow(0 6px 6px rgb(0 0 0 / .28))" }}
    >
      <defs>
        <radialGradient id="bee-abd" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#f3c55d" />
          <stop offset=".6" stopColor="#d49a32" />
          <stop offset="1" stopColor="#8a5a17" />
        </radialGradient>
        <radialGradient id="bee-thx" cx="45%" cy="35%" r="65%">
          <stop offset="0" stopColor="#8a6a3a" />
          <stop offset="1" stopColor="#2b2012" />
        </radialGradient>
        <linearGradient id="bee-wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".75" />
          <stop offset="1" stopColor="#dfe9ee" stopOpacity=".35" />
        </linearGradient>
        <clipPath id="bee-abd-clip">
          <ellipse cx="22" cy="27" rx="15" ry="9.5" />
        </clipPath>
      </defs>
      {/* legs */}
      <g stroke="#2a2014" strokeWidth="1.1" strokeLinecap="round" fill="none">
        <path d="M34 31q-2 5-6 7M38 31q0 5-3 8M42 30q2 5 1 8" />
      </g>
      {/* abdomen with stripes */}
      <ellipse cx="22" cy="27" rx="15" ry="9.5" fill="url(#bee-abd)" />
      <g clipPath="url(#bee-abd-clip)" fill="#2a1d0e" opacity=".88">
        <rect x="13" y="14" width="3.4" height="26" rx="1.5" transform="rotate(8 14 27)" />
        <rect x="20" y="14" width="3.6" height="26" rx="1.5" transform="rotate(6 21 27)" />
        <rect x="27" y="14" width="3.2" height="26" rx="1.5" transform="rotate(4 28 27)" />
        <path d="M7 20q-3 7 0 14h3q-2-7 0-14Z" />
      </g>
      <path d="M7.4 27 3 27.6" stroke="#2a1d0e" strokeWidth="1.4" strokeLinecap="round" />
      {/* thorax (fuzzy) */}
      <circle cx="39" cy="24" r="8" fill="url(#bee-thx)" />
      <circle cx="39" cy="24" r="8" fill="none" stroke="#c99a45" strokeWidth="1.2" strokeDasharray="1 1.6" opacity=".8" />
      {/* head */}
      <circle cx="49.5" cy="25.5" r="5.6" fill="#1f180f" />
      <ellipse cx="51.5" cy="24" rx="2" ry="2.8" fill="#3c3326" />
      <path d="M51 20.5q3-6 8-6.5M49 20q1-6 5-8.5" stroke="#1f180f" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* wings */}
      <g className="bee-wing">
        <ellipse cx="33" cy="11" rx="12" ry="6" fill="url(#bee-wing)" stroke="#9fb2ba" strokeWidth=".6" transform="rotate(-18 33 11)" />
        <ellipse cx="38" cy="13" rx="8" ry="4.2" fill="url(#bee-wing)" stroke="#9fb2ba" strokeWidth=".5" transform="rotate(-6 38 13)" />
      </g>
    </svg>
  );
});

/**
 * Flies a bee element along a gentle curved path (points in px relative to its
 * positioned parent). Returns the timeline, or null for reduced motion.
 */
export function flyBee(
  el: SVGSVGElement | null,
  points: { x: number; y: number }[],
  { duration = 6, delay = 0 }: { duration?: number; delay?: number } = {},
) {
  if (!el || prefersReducedMotion()) return null;
  const tl = gsap.timeline({ delay });
  tl.set(el, { opacity: 0, x: points[0].x, y: points[0].y });
  tl.to(el, { opacity: 1, duration: 0.6, ease: "sine.out" }, 0);
  tl.to(
    el,
    {
      duration,
      ease: "sine.inOut",
      motionPath: { path: points, curviness: 1.4, autoRotate: true, alignOrigin: [0.5, 0.5] },
    },
    0,
  );
  tl.to(el, { opacity: 0, duration: 0.6, ease: "sine.in" }, duration - 0.6);
  return tl;
}
