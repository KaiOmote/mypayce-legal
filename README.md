# MyPayce legal information

A responsive English/Japanese legal-information website for MyPayce, prepared for **owner and legal review**. The owner explicitly authorized merging and GitHub Pages publication on October 28, 2026 for live review.

**Status: published for owner review at https://kaiomote.github.io/mypayce-legal/.** Effective date set to **November 1, 2026 / 2026年11月1日**. Publication does not certify legal compliance; unresolved legal/operational questions remain in the review notes. MyPayce is an app/trade name, not a verified legal entity. No residential address or personal phone number belongs in this repository, Git history or PR discussions.

The owner intends broad international App Store distribution excluding the 27 EU member countries. Japan and the United States are primary research reference points, not the only distribution markets. No worldwide-compliance claim is made. EU exclusion is not treated as a blanket privacy-law exemption.

## Live URLs

| Document | English | Japanese |
| --- | --- | --- |
| Home | https://kaiomote.github.io/mypayce-legal/ | https://kaiomote.github.io/mypayce-legal/ja/ |
| Privacy | https://kaiomote.github.io/mypayce-legal/privacy/ | https://kaiomote.github.io/mypayce-legal/ja/privacy/ |
| Terms | https://kaiomote.github.io/mypayce-legal/terms/ | https://kaiomote.github.io/mypayce-legal/ja/terms/ |

Contact: **kaiomote10+MyPayce@gmail.com**, the same mailbox used for app feedback. A monitored shared mailbox is reasonable; the operator must establish how support and privacy/disclosure requests are separated and handled. Its presence alone does not fulfil every operator-identification requirement.

## Review first

- [Application privacy audit](review/privacy-audit.md): evidence, audited commit and limits.
- [Japan/US legal research and open decisions](review/legal-review.md): brand versus legal operator, Japanese disclosure-on-request conditions, international scope, Lifetime promise and third-party limitations.
- [Publication checklist and exact Pages setup](review/publication-checklist.md): unresolved blockers and owner-only release steps.
- [Verification evidence](review/verification.md): automated checks and manual QA still required.

At the owner's request, all six public pages now use finalized reader-facing copy and the effective date above, without draft banners, noindex or geographic-distribution commentary. Research, unresolved disclosure questions and distribution details remain only in this README and the review materials. PR #1 is merged. Pages is enabled from main and /docs with HTTPS enforced, as authorized by the owner. Removing public review commentary is not a finding that those legal/operational questions are resolved. Do not upload private identity documents or credentials.

## Files and maintenance

- `docs/`: committed static HTML/CSS plus `.nojekyll`; the only Pages publishing directory.
- `content/en.mjs`, `content/ja.mjs`: corresponding original EN/JA legal content.
- `site.config.mjs`: project subpath, public contact and effective date.
- `scripts/build-site.mjs`: dependency-free authoring helper sharing the shell/navigation across six static pages. Nothing executes in the visitor's browser.
- `tests/`: Node built-in tests; no installed packages or browser instance required.
- `review/`: source audit and owner/legal review records, outside the hosted folder (still public in GitHub).

With Node.js 22 or newer, no dependency installation is needed:

```text
npm run build
npm run check
```

Edit the bilingual sources together, regenerate the committed pages, and run the checks. GitHub Pages serves the committed output directly: it does not run Node, require a server or use a custom Actions workflow. Do not run a deployment as a substitute for owner review.

The design uses MyPayce-inspired warm surfaces and teal colors, system fonts, keyboard focus and skip links, responsive navigation, print styles and project-subpath-safe URLs. There are no cookies, browser storage, tracking scripts, embedded services, forms, third-party fonts or runtime JavaScript. External provider-policy links are ordinary user-initiated navigation. GitHub Pages itself logs visitor IP addresses; that limitation is disclosed.

## Publication boundary

The owner authorized merging and publication for live review on October 28, 2026. PR #1 was merged at 9ad9a91f03e311e282974d50f4bfa0c20f595d68 and Pages now serves main → /docs over HTTPS. All six live pages and the stylesheet returned HTTP 200 and matched the reviewed sources. Internal legal/operational questions remain for owner review; publication is not a legal-clearance finding. Future changes should continue through review.

Do not change App Store/EAS settings or wire these URLs into the app without separate authorization. The application repository was audited read-only and is not modified here.
