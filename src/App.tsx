import { Book } from "./components/Book";
import { Details } from "./components/Details";
import { Explorer } from "./components/Explorer";
import { Faq, visibleFaq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header, type NavItem } from "./components/Header";
import { Hero } from "./components/Hero";
import { Neighborhood } from "./components/Neighborhood";
import { StickyBook } from "./components/StickyBook";
import { Tribute } from "./components/Tribute";
import { Welcome } from "./components/Welcome";
import { useReveal } from "./lib/motion";

const showTribute = __SHOW_TRIBUTE__;

const nav: NavItem[] = [
  { href: "#explore", label: "Explore" },
  { href: "#gallery", label: "Gallery" },
  { href: "#details", label: "Details" },
  ...(showTribute ? [{ href: "#story", label: "Our Story" }] : []),
  { href: "#c-street", label: "C Street" },
  ...(visibleFaq().length ? [{ href: "#faq", label: "FAQ" }] : []),
];

export default function App() {
  useReveal();
  return (
    <>
      <Header nav={nav} />
      <main id="main">
        <Hero />
        <Welcome />
        <Explorer />
        <Gallery />
        <Details />
        {__SHOW_TRIBUTE__ && <Tribute />}
        <Neighborhood />
        <Book />
        <Faq />
      </main>
      <Footer nav={nav} />
      <StickyBook />
    </>
  );
}
