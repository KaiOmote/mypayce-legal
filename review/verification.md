# Verification evidence

## Automated checks

Performed October 27, 2026 in the separate `mypayce-legal` checkout using Node.js 22.18.0, without installing dependencies or starting a preview server/browser instance.

- `npm run build`: generated six committed static draft pages. Pages needs no Node/build process at runtime.
- `npm run check`: verifies committed pages match their bilingual sources; **37 tests passed, zero failed**.
- Tests cover all six pages: one H1, correct language, skip/main landmarks, unique anchors, internal links/assets under `/mypayce-legal/`, matching-document language switches, draft/noindex/tentative date/contact, no interactive third-party embeds/runtime scripts, restrictive resource policy and no third-party background assets.
- Cross-document checks cover EN/JA section correspondence, same-language privacy links, Lifetime coverage/exclusions, separate cancellation/data deletion, international distribution wording and disclosures for SQLite, RevenueCat, Apple, Expo, Gmail, GitHub and device backups.
- Shared text/background contrast pairs pass the 4.5:1 calculation. CSS checks cover responsive wrapping, reduced motion, visible focus and print styling. These checks are not a substitute for rendered accessibility evaluation.
- `git diff --check`: whitespace validation, including the new files once staged.
- The main application's working tree is unchanged at audited commit `8292e496c6e0ef2805a139614e98c5b95327f383`. No app checks/builds were necessary because that repository was read-only.

No published website is claimed, and future URL availability cannot be tested before owner-approved Pages activation. External legal/provider links were inspected against official sources during research; the static tests do not continuously crawl them or prove future availability.

## Manual appearance and accessibility — not performed

No actual browser-rendered or physical-device layout was inspected. Remaining owner QA:

1. At 320/375/390 px widths and 200% text/zoom, inspect header/language wrapping, navigation, long contact address, document cards, section list and legal text in EN/JA. No horizontal clipping or tiny text.
2. Use keyboard only: skip link, visible focus, navigation, same-document language switch, in-page contents links, provider links and contact composer. Confirm order and focus destinations.
3. Use VoiceOver on iPhone: language pronunciation, main/heading landmarks, link names and draft status. Confirm it does not imply final legal approval.
4. Print/save each document: no clipped text, readable headings, retained draft/effective-date status and contact information.
5. After authorized publication, reload each nested URL directly under `/mypayce-legal/`, verify HTTPS/assets, and test mailto recipient/subject. Opening a composer must not be confused with sending mail.

## Legal and privacy limits

Automated checks cannot establish legal adequacy, accurate remote dashboard/provider configuration, operational readiness to handle requests, lawful international transfers, or owner identity. The absence of telephone links/postal addresses in generated pages and manual source review is a safeguard, not a general personal-data detector. No private operator details were supplied for inclusion.

All unresolved matters remain in `legal-review.md` and `publication-checklist.md`. No jurisdiction-wide compliance certification is made.
