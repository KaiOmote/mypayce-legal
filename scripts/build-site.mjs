import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../site.config.mjs";
import en from "../content/en.mjs";
import ja from "../content/ja.mjs";

export const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const translations = { en, ja };
export const pageKeys = ["home", "privacy", "terms"];
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
export function pagePath(language, key) {
  return `${site.basePath}${language === "ja" ? "ja/" : ""}${key === "home" ? "" : `${key}/`}`;
}
export function renderPage(language, key) {
  const text = translations[language];
  const page = text.pages[key];
  const otherLanguage = language === "en" ? "ja" : "en";
  const navigation = pageKeys.map((item) => `<a href="${pagePath(language, item)}"${item === key ? ' aria-current="page"' : ""}>${text.navigation[item]}</a>`).join("\n          ");
  const toc = key === "home" ? "" : `<nav class="contents" aria-label="${text.contents}"><p class="eyebrow">${text.contents}</p><ol>${page.sections.map((section) => `<li><a href="#${section.id}">${section.title}</a></li>`).join("")}</ol></nav>`;
  const cards = key !== "home" ? "" : `<div class="document-grid">${["privacy", "terms"].map((item) => `<a class="document-card" href="${pagePath(language, item)}"><span class="eyebrow">${text.cardLabels[item]}</span><h2>${text.navigation[item]}</h2><p>${text.cardDescriptions[item]}</p><span class="card-action">${text.readDocument}<span aria-hidden="true"> →</span></span></a>`).join("")}</div>`;
  const sections = page.sections.map((section) => `<section id="${section.id}" aria-labelledby="${section.id}-title"><h2 id="${section.id}-title">${section.title}</h2>${section.html}</section>`).join("\n        ");
  return `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(page.description)}">
  <meta name="robots" content="${site.draft ? "noindex, follow" : "index, follow"}">
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self'; img-src 'self'; connect-src 'none'; font-src 'none'; base-uri 'none'; form-action 'none'">
  <title>${escape(page.title)} · MyPayce</title>
  <link rel="canonical" href="${site.origin}${pagePath(language, key)}">
  <link rel="alternate" hreflang="en" href="${site.origin}${pagePath("en", key)}">
  <link rel="alternate" hreflang="ja" href="${site.origin}${pagePath("ja", key)}">
  <link rel="stylesheet" href="${site.basePath}assets/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">${text.skip}</a>
  <header class="site-header">
    <div class="header-main">
      <a class="brand" href="${pagePath(language, "home")}" aria-label="${text.brandHome}"><span class="brand-mark" aria-hidden="true">M</span><span>MyPayce<span class="brand-caption">${text.brandCaption}</span></span></a>
      <nav class="language-switch" aria-label="${text.language}"><a href="${pagePath(language, key)}" lang="${language}" hreflang="${language}" aria-current="true">${language === "en" ? "English" : "日本語"}</a><a href="${pagePath(otherLanguage, key)}" lang="${otherLanguage}" hreflang="${otherLanguage}">${otherLanguage === "en" ? "English" : "日本語"}</a></nav>
    </div>
    <nav class="primary-navigation" aria-label="${text.navigationLabel}">${navigation}</nav>
  </header>
  <main id="main" tabindex="-1">
    ${site.draft ? `<aside class="draft-notice" role="note"><strong>${text.draftTitle}</strong><span>${text.draftDescription}</span></aside>` : ""}
    <div class="page-heading ${key === "home" ? "hero" : ""}">
      <p class="eyebrow">${text.eyebrow}</p>
      <h1>${page.title}</h1>
      <p class="lead">${page.lead}</p>
      <p class="effective-date">${text.effectiveLabel} <time datetime="${site.proposedEffectiveDate}">${text.effectiveDate}</time> · ${text.tentative}</p>
    </div>
    ${cards}
    <article class="prose" aria-label="${escape(page.title)}">
      ${toc}
      ${sections}
    </article>
    <aside class="review-note" aria-label="${text.reviewLabel}"><strong>${text.reviewLabel}</strong><p>${text.reviewDescription}</p></aside>
  </main>
  <footer class="site-footer"><p>MyPayce · ${text.footer}</p><a href="mailto:${site.contact.replace("+", "%2B")}">${site.contact}</a></footer>
</body>
</html>
`.replace(/[ \t]+$/gm, "");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes("--check");
  for (const language of ["en", "ja"]) {
    for (const key of pageKeys) {
      const output = resolve(root, "docs", pagePath(language, key).slice(site.basePath.length), "index.html");
      const html = renderPage(language, key);
      if (check) {
        if (await readFile(output, "utf8") !== html) {
          throw new Error(`Generated page is stale: ${output}. Run npm run build.`);
        }
      } else {
        await mkdir(dirname(output), { recursive: true });
        await writeFile(output, html, "utf8");
      }
    }
  }
  if (!check) await writeFile(resolve(root, "docs/.nojekyll"), "");
  console.log(check ? "All six committed pages match their sources." : "Generated six draft static pages; no publication performed.");
}
