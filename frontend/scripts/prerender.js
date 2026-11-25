#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Pós-build: gera um HTML estático para cada página do site.
 *
 * Por quê: o site é um app React (Create React App). Sem este passo, toda URL
 * devolve o mesmo index.html (mesmo title, canonical e texto da home) e só o
 * JavaScript troca o conteúdo. Aqui cada rota ganha seu próprio HTML, com
 * title, description, canonical, dados estruturados e um texto de apoio já
 * escritos, e o React assume por cima quando carrega.
 *
 * Também gera: build/sitemap.xml (todas as páginas) e build/404.html.
 *
 * Fonte dos dados: src/lib/seoPages.json (a mesma que alimenta o React).
 */
const fs = require("fs");
const path = require("path");
const seo = require("../src/lib/seoPages.json");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const TEMPLATE_PATH = path.join(BUILD_DIR, "index.html");
const SITE = seo.site;
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

// ---------- utilidades ----------
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

const pageUrl = (slug) => (slug ? `${SITE.url}/${slug}` : `${SITE.url}/`);

// Troca uma tag do HTML. `required` interrompe o build se a tag não existir,
// para nunca publicar uma página com canonical ou title errados em silêncio.
const replaceTag = (html, regex, replacement, label, required) => {
  if (!regex.test(html)) {
    const msg = `[prerender] tag não encontrada no template: ${label}`;
    if (required) throw new Error(msg);
    console.warn(msg);
    return html;
  }
  return html.replace(regex, () => replacement);
};

const metaRegex = (attr, value) =>
  new RegExp(`<meta\\s+${attr}="${value}"\\s+content="[^"]*"\\s*/?>`, "i");

// ---------- dados estruturados ----------
const organization = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: SITE.logo,
  image: SITE.logo,
  description:
    "Agentes de IA para WhatsApp, sites, cardápios digitais e aplicativos MicroSaaS para clínicas, restaurantes, barbearias, pet shops e outros negócios.",
  telephone: SITE.phone,
  email: SITE.email,
  sameAs: [SITE.instagram],
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: [
    { "@type": "City", name: SITE.city },
    { "@type": "Country", name: "Brasil" },
  ],
  knowsLanguage: "pt-BR",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: [
      "Automação de WhatsApp com IA",
      "CRM com IA",
      "Sites institucionais e lojas virtuais",
      "Cardápios digitais",
      "Aplicativos e MicroSaaS",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
});

const pageSchemas = (page) => {
  const url = pageUrl(page.slug);
  const out = [organization()];

  if (page.slug !== "sobre") {
    out.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.serviceName,
      serviceType: page.serviceType,
      description: page.description,
      url,
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: [
        { "@type": "City", name: SITE.city },
        { "@type": "Country", name: "Brasil" },
      ],
    });
  }

  if (page.faq && page.faq.length) {
    out.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  out.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: page.navLabel, item: url },
    ],
  });
  return out;
};

// ---------- texto estático (vale para quem não executa JavaScript) ----------
const MAIN_STYLE =
  "font-family: sans-serif; color: #f5f5f5; padding: 32px; max-width: 720px; margin: 0 auto; line-height: 1.6;";
const LINK_STYLE = "color: #FFD700";

const navList = (pages) =>
  `<ul>${pages.map((p) => `<li><a href="/${p.slug}" style="${LINK_STYLE}">${esc(p.navLabel)}</a></li>`).join("")}</ul>`;

const contactBlock = () =>
  `<h2>Contato</h2><p>WhatsApp: ${esc(SITE.phoneDisplay)}<br>E-mail: ${esc(SITE.email)}<br>` +
  `Instagram: <a href="${esc(SITE.instagram)}" style="${LINK_STYLE}">@deniziosautomacao</a><br>` +
  `${esc(SITE.city)} - ${esc(SITE.region)}</p>`;

const homeFallback = () =>
  `<main style="${MAIN_STYLE}"><h1>${esc(seo.home.h1)}</h1><p>${esc(seo.home.lead)}</p>` +
  `<h2>Serviços</h2>${navList(seo.pages)}${contactBlock()}</main>`;

const pageFallback = (page) => {
  const benefits = (page.benefits || [])
    .map((b) => `<h3>${esc(b.title)}</h3><p>${esc(b.desc)}</p>`)
    .join("");
  const sections = page.sections
    .map(
      (s) =>
        `<h2>${esc(s.heading)}</h2>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}` +
        (s.link ? `<p><a href="${esc(s.link.href)}" style="${LINK_STYLE}">${esc(s.link.label)}</a></p>` : "")
    )
    .join("");
  const steps = page.showSteps
    ? `<h2>Como a gente trabalha</h2><ol>${seo.steps
        .map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.desc)}</li>`)
        .join("")}</ol>`
    : "";
  const faq = (page.faq || []).length
    ? `<h2>Perguntas frequentes</h2>${page.faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}`
    : "";
  const related = (page.related || [])
    .map((slug) => seo.pages.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    `<main style="${MAIN_STYLE}">` +
    `<p><a href="/" style="${LINK_STYLE}">Início</a> / ${esc(page.navLabel)}</p>` +
    `<h1>${esc(page.h1)}</h1><p>${esc(page.lead)}</p>` +
    `${benefits ? `<h2>O que você ganha</h2>${benefits}` : ""}${sections}${steps}${faq}` +
    `${related.length ? `<h2>Veja também</h2>${navList(related)}` : ""}${contactBlock()}</main>`
  );
};

const notFoundFallback = () =>
  `<main style="${MAIN_STYLE}"><h1>Página não encontrada</h1>` +
  `<p>O endereço que você abriu não existe ou foi movido. <a href="/" style="${LINK_STYLE}">Voltar para o início</a>.</p>` +
  `${navList(seo.pages)}</main>`;

// ---------- montagem do HTML de cada página ----------
const buildHtml = (template, { title, description, canonical, robots, schemas, fallback }) => {
  let html = template;
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`, "<title>", true);
  html = replaceTag(
    html,
    metaRegex("name", "description"),
    `<meta name="description" content="${esc(description)}"/>`,
    'meta name="description"',
    true
  );
  html = replaceTag(
    html,
    metaRegex("name", "robots"),
    `<meta name="robots" content="${robots || DEFAULT_ROBOTS}"/>`,
    'meta name="robots"',
    false
  );

  const canonicalRegex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  html = replaceTag(
    html,
    canonicalRegex,
    canonical ? `<link rel="canonical" href="${esc(canonical)}"/>` : "",
    'link rel="canonical"',
    true
  );

  if (canonical) {
    html = replaceTag(html, metaRegex("property", "og:url"), `<meta property="og:url" content="${esc(canonical)}"/>`, "og:url", false);
  }
  html = replaceTag(html, metaRegex("property", "og:title"), `<meta property="og:title" content="${esc(title)}"/>`, "og:title", false);
  html = replaceTag(
    html,
    metaRegex("property", "og:description"),
    `<meta property="og:description" content="${esc(description)}"/>`,
    "og:description",
    false
  );
  html = replaceTag(html, metaRegex("name", "twitter:title"), `<meta name="twitter:title" content="${esc(title)}"/>`, "twitter:title", false);
  html = replaceTag(
    html,
    metaRegex("name", "twitter:description"),
    `<meta name="twitter:description" content="${esc(description)}"/>`,
    "twitter:description",
    false
  );

  // Dados estruturados: remove os antigos e insere os da página.
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  if (schemas && schemas.length) {
    html = replaceTag(html, /<\/head>/i, `${schemas.map(jsonLd).join("")}</head>`, "</head>", true);
  }

  // Texto de apoio dentro do #root (o React substitui quando carrega).
  html = replaceTag(
    html,
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${fallback}</div>`,
    '<div id="root">',
    true
  );
  return html;
};

const write = (relPath, content) => {
  const full = path.join(BUILD_DIR, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log(`[prerender] ${relPath}`);
};

// ---------- execução ----------
const main = () => {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(`[prerender] ${TEMPLATE_PATH} não existe. Rode o build do React antes.`);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

  // Home
  write(
    "index.html",
    buildHtml(template, {
      title: seo.home.title,
      description: seo.home.description,
      canonical: pageUrl(""),
      schemas: [organization()],
      fallback: homeFallback(),
    })
  );

  // Páginas internas: build/<slug>/index.html
  seo.pages.forEach((page) => {
    write(
      `${page.slug}/index.html`,
      buildHtml(template, {
        title: page.title,
        description: page.description,
        canonical: pageUrl(page.slug),
        schemas: pageSchemas(page),
        fallback: pageFallback(page),
      })
    );
  });

  // 404 de verdade (a Vercel serve este arquivo com status 404)
  write(
    "404.html",
    buildHtml(template, {
      title: "Página não encontrada | Denizio's IA",
      description: "A página que você procura não existe. Volte para o início da Denizio's IA Global Solutions.",
      canonical: null,
      robots: "noindex, follow",
      schemas: [],
      fallback: notFoundFallback(),
    })
  );

  // Sitemap com todas as páginas
  const today = new Date().toISOString().slice(0, 10);
  const urls = [pageUrl(""), ...seo.pages.map((p) => pageUrl(p.slug))];
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n") +
    `\n</urlset>\n`;
  write("sitemap.xml", sitemap);

  console.log(`[prerender] ok: ${urls.length} páginas + 404.html + sitemap.xml`);
};

try {
  main();
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
