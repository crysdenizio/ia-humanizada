import { useEffect } from "react";
import seo from "./seoPages.json";

const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

// Cria ou atualiza uma tag <meta> ou <link> no <head>.
const upsert = (tag, matchAttr, matchValue, targetAttr, value) => {
  let el = document.head.querySelector(`${tag}[${matchAttr}="${matchValue}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(matchAttr, matchValue);
    document.head.appendChild(el);
  }
  el.setAttribute(targetAttr, value);
};

// Mantém title, description, canonical e Open Graph corretos quando o usuário
// navega entre páginas sem recarregar. O HTML estático de cada página (gerado
// em scripts/prerender.js) já sai com esses valores para o Google.
export const useSeo = ({ title, description, path = "/", robots = DEFAULT_ROBOTS }) => {
  useEffect(() => {
    const url = `${seo.site.url}${path === "/" ? "/" : path}`;
    document.title = title;
    upsert("meta", "name", "description", "content", description);
    upsert("meta", "name", "robots", "content", robots);
    upsert("link", "rel", "canonical", "href", url);
    upsert("meta", "property", "og:title", "content", title);
    upsert("meta", "property", "og:description", "content", description);
    upsert("meta", "property", "og:url", "content", url);
    upsert("meta", "name", "twitter:title", "content", title);
    upsert("meta", "name", "twitter:description", "content", description);
  }, [title, description, path, robots]);
};

export default useSeo;
