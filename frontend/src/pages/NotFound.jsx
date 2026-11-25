import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/sections/Navbar";
import Footer from "../components/sections/Footer";
import { useSeo } from "../lib/useSeo";
import seo from "../lib/seoPages.json";

export const NotFound = () => {
  useSeo({
    title: "Página não encontrada | Denizio's IA",
    description: "A página que você procura não existe. Volte para o início da Denizio's IA Global Solutions.",
    path: "/",
    robots: "noindex, follow",
  });

  return (
    <main className="bg-black min-h-screen text-white" data-testid="not-found-page">
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 md:px-12 pt-44 pb-28 text-center">
        <div className="font-['Outfit'] text-7xl md:text-8xl text-gold-shine font-medium">404</div>
        <h1 className="mt-6 font-['Outfit'] text-3xl md:text-4xl font-light tracking-tighter">Página não encontrada</h1>
        <p className="mt-5 text-white/65 text-lg">
          O endereço que você abriu não existe ou foi movido. Que tal começar pelo início ou por um destes serviços?
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black font-semibold rounded-full px-7 py-3.5"
          >
            Voltar para o início
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {seo.pages.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/${p.slug}`}
                className="inline-block glass-card rounded-full px-5 py-2 text-sm text-white/75 hover:text-[#FFD700] transition-colors"
              >
                {p.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
};

export default NotFound;
