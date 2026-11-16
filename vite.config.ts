import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/content/site";
import { FOOTER_TRIBUTE_APPROVED, TRIBUTE_APPROVED } from "./src/content/approvals";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Injects SEO + social metadata from src/content/site.ts so it lives in one place. */
function seo(): Plugin {
  return {
    name: "hive-seo",
    transformIndexHtml() {
      const url = site.siteUrl.replace(/\/$/, "");
      const ogImage = `${url}/images/exterior-corner-mural-1280.jpg`;
      const title = `${site.name} | ${site.tagline.replace(/\.$/, "")}`;
      const tags: { tag: string; attrs: Record<string, string>; children?: string; injectTo?: "head" }[] = [
        { tag: "meta", attrs: { name: "description", content: esc(site.description) } },
        { tag: "meta", attrs: { property: "og:type", content: "website" } },
        { tag: "meta", attrs: { property: "og:site_name", content: site.name } },
        { tag: "meta", attrs: { property: "og:title", content: esc(title) } },
        { tag: "meta", attrs: { property: "og:description", content: esc(site.description) } },
        { tag: "meta", attrs: { property: "og:image", content: ogImage } },
        { tag: "meta", attrs: { property: "og:image:alt", content: "The brick corner building on C Street with its flower mural" } },
        { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
        { tag: "meta", attrs: { name: "twitter:title", content: esc(title) } },
        { tag: "meta", attrs: { name: "twitter:description", content: esc(site.description) } },
        { tag: "meta", attrs: { name: "twitter:image", content: ogImage } },
      ];
      if (url) {
        tags.push({ tag: "link", attrs: { rel: "canonical", href: `${url}/` } });
        tags.push({ tag: "meta", attrs: { property: "og:url", content: `${url}/` } });
      }
      // Structured data: only facts we actually have. Lodging schema needs a
      // confirmed address, so it is emitted only once location.confirmed is true.
      const graph: Record<string, unknown>[] = [
        { "@type": "WebSite", name: site.name, ...(url ? { url: `${url}/` } : {}) },
      ];
      if (site.location.confirmed && site.location.streetAddress) {
        graph.push({
          "@type": "VacationRental",
          name: site.name,
          description: site.description,
          ...(url ? { url: `${url}/`, image: ogImage } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: site.location.streetAddress,
            addressLocality: site.location.city,
            addressRegion: site.location.region,
            postalCode: site.location.postalCode,
            addressCountry: site.location.country,
          },
        });
      }
      tags.push({
        tag: "script",
        attrs: { type: "application/ld+json" },
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      });
      return tags.map((t) => ({ ...t, injectTo: "head" as const }));
    },
  };
}

export default defineConfig(({ command }) => {
  // Build-time constants: anything gated off is removed from the bundle, not just hidden.
  const drafts = command === "serve" || process.env.VITE_SHOW_DRAFTS === "true";
  return {
  plugins: [react(), tailwindcss(), seo()],
  define: {
    __SHOW_DRAFTS__: JSON.stringify(drafts),
    __SHOW_TRIBUTE__: JSON.stringify(TRIBUTE_APPROVED || drafts),
    __SHOW_FOOTER_TRIBUTE__: JSON.stringify(FOOTER_TRIBUTE_APPROVED || drafts),
  },
  build: { target: "es2020", assetsInlineLimit: 0 },
};
});
