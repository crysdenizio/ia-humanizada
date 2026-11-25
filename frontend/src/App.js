import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import AIDemo from "./components/sections/AIDemo";
import Benefits from "./components/sections/Benefits";
import Clinics from "./components/sections/Clinics";
import SitesApps from "./components/sections/SitesApps";
import LocalServices from "./components/sections/LocalServices";
import Testimonials from "./components/sections/Testimonials";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";
import FloatingWhatsApp from "./components/sections/FloatingWhatsApp";
import FloatingAIChat from "./components/sections/FloatingAIChat";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";
import { useSeo } from "./lib/useSeo";
import seo from "./lib/seoPages.json";

// Ao chegar na home vindo de outra página com âncora (ex.: /#solucao),
// rola até a seção depois que o React terminou de montar a página.
const useScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(t);
  }, [hash]);
};

// Ao trocar de página (sem âncora), volta para o topo. Sem isso, o navegador
// mantém a rolagem da página anterior e a nova abre no meio ou no rodapé.
// "instant" evita a animação do `scroll-behavior: smooth` do CSS global.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
};

const Home = () => {
  useSeo({ title: seo.home.title, description: seo.home.description, path: "/" });
  useScrollToHash();

  return (
    <main className="bg-black min-h-screen text-white" data-testid="home-page">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <AIDemo />
      <Benefits />
      <Clinics />
      <SitesApps />
      <LocalServices />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
      <FloatingAIChat />
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          {seo.pages.map((page) => (
            <Route key={page.slug} path={`/${page.slug}`} element={<ServicePage page={page} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
