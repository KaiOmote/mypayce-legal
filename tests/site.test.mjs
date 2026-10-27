import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";
import { pageKeys, pagePath, renderPage, root, translations } from "../scripts/build-site.mjs";
import { site } from "../site.config.mjs";

const documents = [];
for (const language of ["en", "ja"]) {
  for (const key of pageKeys) {
    const pathname = pagePath(language, key);
    const file = resolve(root, "docs", pathname.slice(site.basePath.length), "index.html");
    documents.push({ language, key, pathname, file, html: readFileSync(file, "utf8") });
  }
}
const byPath = new Map(documents.map((page) => [page.pathname, page]));
const ids = (html) => [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const references = (html) => [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1].replaceAll("&amp;", "&"));

for (const page of documents) {
  const label = `${page.language}/${page.key}`;
  test(`${label}: committed HTML is reproducible and fully static`, () => {
    assert.equal(page.html, renderPage(page.language, page.key));
    assert.ok(!/[ \t]+$/m.test(page.html), "Generated HTML has no trailing whitespace");
    assert.match(page.html, new RegExp(`<html lang="${page.language}">`));
    assert.equal((page.html.match(/<h1>/g) ?? []).length, 1);
    assert.ok(page.html.includes('<meta name="viewport" content="width=device-width, initial-scale=1">'));
    assert.ok(page.html.includes('<main id="main" tabindex="-1">'));
    assert.ok(page.html.includes('class="skip-link" href="#main"'));
    assert.equal(new Set(ids(page.html)).size, ids(page.html).length, "No duplicate anchors");
    assert.ok(!/<(?:script|iframe|form|object|embed|video|audio)\b/i.test(page.html));
    assert.ok(!/\son\w+\s*=/i.test(page.html), "No inline event handlers");
    assert.ok(page.html.includes("connect-src 'none'"));
    assert.ok(page.html.includes("font-src 'none'"));
    assert.ok(page.html.includes('<meta name="referrer" content="no-referrer">'));
  });

  test(`${label}: all local links, anchors and assets work beneath the Pages subpath`, () => {
    for (const href of references(page.html)) {
      const url = new URL(href, `${site.origin}${page.pathname}`);
      if (url.protocol === "mailto:") {
        assert.equal(decodeURIComponent(url.pathname), site.contact);
        continue;
      }
      assert.equal(url.protocol, "https:");
      if (url.origin !== site.origin) continue;
      assert.ok(url.pathname.startsWith(site.basePath), `Escapes project subpath: ${href}`);
      const target = byPath.get(url.pathname);
      if (target) {
        if (url.hash) assert.ok(ids(target.html).includes(decodeURIComponent(url.hash.slice(1))), `Missing anchor: ${href}`);
      } else {
        assert.ok(existsSync(resolve(root, "docs", url.pathname.slice(site.basePath.length))), `Missing asset: ${href}`);
      }
    }
  });

  test(`${label}: language switch preserves the selected document`, () => {
    const switcher = page.html.match(/<nav class="language-switch"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert.ok(switcher);
    for (const language of ["en", "ja"]) {
      assert.ok(switcher.includes(`href="${pagePath(language, page.key)}"`));
      assert.ok(switcher.includes(`lang="${language}" hreflang="${language}"`));
      assert.ok(page.html.includes(`hreflang="${language}" href="${site.origin}${pagePath(language, page.key)}"`));
    }
    assert.equal((switcher.match(/aria-current="true"/g) ?? []).length, 1);
  });

  test(`${label}: draft status, contact and operator review remain explicit`, () => {
    assert.ok(site.draft);
    assert.ok(page.html.includes('name="robots" content="noindex, follow"'));
    assert.ok(page.html.includes(translations[page.language].draftTitle));
    assert.ok(page.html.includes(translations[page.language].reviewDescription));
    assert.ok(page.html.includes('<time datetime="2026-11-01">'));
    assert.ok(page.html.includes(site.contact));
    assert.ok(!page.html.includes("tel:"));
    assert.ok(!page.html.includes("〒"));
    assert.ok(!page.html.includes("MyPayce Inc"));
  });

  test(`${label}: background resources are exclusively local`, () => {
    const resourceTags = [...page.html.matchAll(/<(?:link|img|source|script)\b[^>]*>/gi)].map((match) => match[0]);
    for (const tag of resourceTags) {
      if (tag.includes('rel="canonical"') || tag.includes('rel="alternate"')) continue;
      for (const href of references(tag)) assert.ok(href.startsWith(site.basePath), `Third-party resource: ${tag}`);
    }
  });
}

test("English and Japanese have corresponding legal sections in the same order", () => {
  for (const key of pageKeys) {
    assert.deepEqual(translations.en.pages[key].sections.map((section) => section.id), translations.ja.pages[key].sections.map((section) => section.id));
  }
});

test("Terms link the same-language privacy document", () => {
  for (const language of ["en", "ja"]) {
    const section = translations[language].pages.terms.sections.find((section) => section.id === "privacy");
    assert.ok(section.html.includes(`href="${pagePath(language, "privacy")}"`));
  }
});

test("Lifetime preserves current/future local features and separates subscription cancellation", () => {
  const english = translations.en.pages.terms.sections.find((section) => section.id === "lifetime").html;
  const japanese = translations.ja.pages.terms.sections.find((section) => section.id === "lifetime").html;
  assert.match(english, /current and future Local Pro features/);
  assert.match(english, /Separately priced online or AI services are not included/);
  assert.match(english, /one-time, non-consumable/);
  assert.match(japanese, /現在と今後のローカルPro機能/);
  assert.match(japanese, /別料金のオンライン・AIサービスは含まれません/);
  assert.match(japanese, /非消耗型/);
  const requests = translations.en.pages.privacy.sections.find((section) => section.id === "requests").html;
  assert.match(requests, /does not cancel an Apple subscription/);
  assert.match(requests, /cannot remotely inspect/);
});

test("international distribution is not reduced to Japan/US or sold as worldwide compliance", () => {
  for (const language of ["en", "ja"]) {
    const home = translations[language].pages.home.sections.find((section) => section.id === "audience").html;
    assert.ok(home.includes("27"));
    assert.ok(language === "en" ? home.includes("broad and international") : home.includes("広く海外"));
  }
});

test("privacy drafts disclose each actual external processing context", () => {
  for (const language of ["en", "ja"]) {
    const policy = translations[language].pages.privacy.sections.map((section) => section.html).join("\n");
    for (const name of ["SQLite", "RevenueCat", "Apple", "Expo", "Gmail", "GitHub", "iCloud"]) {
      assert.ok(policy.includes(name), `${language}: ${name}`);
    }
    assert.ok(language === "en" ? policy.includes("unencrypted") : policy.includes("暗号化されていない"));
    assert.ok(language === "en" ? policy.includes("lock screen") : policy.includes("ロック画面"));
  }
});

function contrast(foreground, background) {
  function luminance(hex) {
    const rgb = hex.match(/[a-f\d]{2}/gi).map((component) => parseInt(component, 16) / 255)
      .map((channel) => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
    return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
  }
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
}

test("shared CSS supports wrapping, small screens, print, focus and readable text contrast", () => {
  const css = readFileSync(join(root, "docs/assets/styles.css"), "utf8");
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /@media print/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /flex-wrap: wrap/);
  assert.ok(!/@import|url\s*\(/i.test(css));
  assert.ok(!/overflow:\s*hidden|text-overflow:\s*ellipsis|white-space:\s*nowrap/.test(css));
  for (const [ink, surface] of [["1a1c1b", "faf9f7"], ["40484b", "faf9f7"], ["dce7e3", "003741"], ["674716", "f5ede0"]]) {
    assert.ok(contrast(ink, surface) >= 4.5);
  }
});

test("hosting has no custom domain, application dependencies or deployment workflow", () => {
  assert.ok(existsSync(join(root, "docs/.nojekyll")));
  assert.ok(!existsSync(join(root, "docs/CNAME")));
  assert.ok(!existsSync(join(root, ".github/workflows")));
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(pkg.dependencies, undefined);
  assert.equal(pkg.devDependencies, undefined);
  const allowed = new Set(["assets", "index.html", "privacy", "terms", "ja", ".nojekyll"]);
  assert.ok(readdirSync(join(root, "docs")).every((name) => allowed.has(name)), "Review notes stay outside the hosted folder");
});
