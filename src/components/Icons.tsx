import type { Detail } from "../content/details";

const paths: Record<Detail["icon"], string> = {
  deck: "M4 20h16M6 20v-6h12v6M12 4v10M5 9c2-4 12-4 14 0Z",
  sofa: "M4 12v5h16v-5M6 12V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M4 12a2 2 0 1 1 4 0v2h8v-2a2 2 0 1 1 4 0M6 17v2M18 17v2",
  kitchen: "M5 4v16M5 10h3V4M19 4c-2 0-3 2-3 5s1 4 3 4v7",
  dining: "M4 10h16M6 10v9M18 10v9M8 6h8",
  desk: "M3 10h18M5 10v9M19 10v9M14 10v5h5M8 6h3v4",
  fire: "M12 3c3 4 6 6 6 10a6 6 0 0 1-12 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3 0-5 2-8.5Z",
  fan: "M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M12 10.5C11 6 13 4 15.5 5S15 10 13.3 11M13.5 12.5c4 1.5 5 4 3 5.5s-4.5-2.5-4.8-4.5M10.6 12.6C7 15 4.5 14 4.6 11.5s4.5-1.5 6-.6M12 3v1",
  brick: "M3 6h18v12H3ZM3 10h18M3 14h18M9 6v4M15 6v4M6 10v4M12 10v4M18 10v4M9 14v4M15 14v4",
  bed: "M3 18v-7h18v7M3 15h18M5 11V7h6v4M13 11V8h6v3",
  bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM6 12V6a2 2 0 0 1 4 0",
  guests: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 5a3 3 0 0 1 0 6M18 14c2 .8 3 3 3 6",
  wifi: "M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h0",
  parking: "M6 20V4h6a4 4 0 0 1 0 8H6",
  key: "M14 10a4 4 0 1 0-1 2.6L20 20M17 17l2-2",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
};

export function DetailIcon({ name, className = "h-6 w-6" }: { name: Detail["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
