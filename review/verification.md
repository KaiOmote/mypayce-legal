# Verification evidence

## Publication record — October 28, 2026

The owner subsequently explicitly authorized merging PR #1 and enabling GitHub Pages for live review. The reviewed commit was merged to main as `9ad9a91f03e311e282974d50f4bfa0c20f595d68`. Pages serves **main /docs**, with HTTPS enforced, at https://kaiomote.github.io/mypayce-legal/.

The 37 static tests passed again before publication. All six EN/JA page URLs and the stylesheet returned HTTP 200 and exactly matched the reviewed local files; language/effective-date checks passed and no draft/noindex markers were present. No app, EAS, RevenueCat or App Store configuration was changed. Publication authorization does not certify legal compliance or resolve the internal legal questions.

The pre-publication records below describe their historical authorization boundaries; the later express publication request supersedes those boundaries for this deployment.

## Finalization pass — October 28, 2026

The owner authorized clean reader-facing copy and visual checks, but **not merging, publication or Pages activation**. Public pages now use the effective date **November 1, 2026 / 2026年11月1日**, without draft/noindex notices, geographic exclusions or internal legal-review commentary. The draft PR and internal unresolved questions remain.

### Static and content checks

- `npm run build`: generated six static pages.
- `npm run check`: committed/source parity and **37 tests passed, zero failed**. Updated tests reject public draft/blocker text, geographic exclusions and noindex; preserve final date/contact, project-subpath links, matching language switches, semantic structure and static-resource restrictions.
- `git diff --check`: passed.
- A direct comparison to the previously reviewed commit confirmed **24 material disclosure sections are byte-for-byte unchanged** (12 per language): Privacy purchases, notifications, feedback, backups and website hosting; Terms functionality, local records, prices, subscriptions, Lifetime, restoration and third-party/privacy information. Other edits remove review commentary and clarify operator/contact text without inventing a legal entity or a working disclosure-on-request arrangement.
- No residential address, personal phone, credentials, runtime JavaScript, dependencies or publication workflow was added. The application repository remains unchanged.

### Actual rendered checks

Used the existing cached Playwright 1.58.2 package and installed Chromium in a short-lived headless process, with all page/CSS requests intercepted and fulfilled from local files at the exact proposed project subpath. **No preview server, Expo instance, installation, external page fetch or publication was required. The browser closed after checking.** This was a desktop Chromium rendering check, not an iPhone/Safari or VoiceOver test.

- All six EN/JA pages rendered at **320×800, 375×667, 390×844, 1280×900 and 1440×1000**.
- All six also rendered at 390×844 with **200% root text size**.
- **36 page/viewport checks passed**, with no horizontal overflow, console/page errors or external resource requests. Normal-size checks also verified visible content/link bounds.
- Keyboard skip-to-main and actual EN→JA navigation passed.
- Screenshots of desktop, mobile and enlarged-text views were visually inspected, along with lower-page privacy/terms/footer views. Normal typography, contact links, legal text and navigation remain readable and wrap. Enlarged text grows vertically and scrolls rather than being clipped.
- Visual review caught and corrected inherited duplicate contents numbering, unbalanced hero-title wrapping and an overflowing brand mark at enlarged text. Numbering now appears once; headings balance/hyphenate naturally and the mark uses a safe line height.

Evidence (outside the hosted folder, but public in GitHub):

- [Desktop EN/JA contact sheet](visual-checks/desktop.png) — 1440×1000 source views, displayed at half scale.
- [Mobile EN/JA contact sheet](visual-checks/mobile.png) — 390×844 source views.
- [200% text EN/JA contact sheet](visual-checks/large-text.png) — 390×844; screenshots show the first viewport, not a full-page crop.
- [Geometry/navigation results](visual-checks/results.json). Full-page/lower-page captures remain in the ignored local QA folder.

### Remaining acceptance

- Physical iPhone/Safari, VoiceOver, browser/OS-specific text rendering and actual print output still need owner QA. Viewport and enlarged-root-text checks do not prove native Dynamic Type behavior.
- Once publication is separately approved, verify all nested live URLs, HTTPS, assets and contact composer. No live-site availability is claimed now.
- Operator identity/disclosures, legal request handling, retention/provider arrangements and regional applicability remain in the internal legal/publication checklist. Removing public commentary is **not** a legal compliance finding or confirmation that those processes exist.

## Original draft baseline

The initial draft used visible draft/noindex/tentative-date markers and passed 37 structural/content tests. It was not rendered during that initial pass. This finalization supersedes those marker expectations and adds the rendered evidence above. No app repository, EAS/Apple/RevenueCat settings, build, submission, OTA release or Pages activation was involved.
