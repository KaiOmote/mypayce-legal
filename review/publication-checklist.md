# Publication checklist — owner approval required

**Stop: clean public copy is prepared for final owner approval, but publication is not approved.** A draft PR, passing tests and a set effective date are not permission to publish. Do not enable GitHub Pages or merge the website until the owner approves final EN/JA content after the required review. All repository content is public already; keep private information out of commits and PR comments.

## A. Resolve every legal/operational blocker

- [ ] Distinguish the individual legal operator from the MyPayce app/trade name. Privately establish any legally required identity/establishment information without placing residential address or personal phone in Git.
- [ ] Confirm applicable Japanese seller/operator disclosures and an actual lawful disclosure-on-request arrangement if relying on one. A generic notice, brand name or Apple's payment processing is not the compliance strategy by itself.
- [ ] Confirm the owner can fulfil relevant pre-purchase disclosure requests without delay and privacy requests using a suitable process. Approve any required commercial notice before use. Do not activate the candidate wording in `legal-review.md` until this is operational.
- [ ] Review APPI, relevant US laws and other intended distribution markets. Initial distribution is international excluding the 27 EU member countries, not only Japan/US. No worldwide-compliance or automatic exemption claim is approved.
- [ ] Confirm support/privacy mailbox monitoring, correspondence retention, access/security, proportionate verification, complaints, applicable response rules and any legally permitted fees.
- [ ] Confirm third-party roles, operator-controlled purchase records, provider retention and applicable international-transfer requirements. Do not promise to erase data outside the operator's control or direct all valid requests away without assessing responsibility.
- [ ] Resolve age audience/children's-data questions, any required notices, and regional consumer rights. Do not invent a product age restriction through the Terms.
- [ ] Verify the final purchase presentation and App Store terms; preserve current/future Local Pro coverage and the separately priced online/AI exclusion. Keep Apple cancellation/refund/statutory rights and purchase restoration distinct from financial-data recovery.
- [ ] Review both languages together, including any language-conflict approach. Neither language is assumed to override the other.
- [x] Set the effective date to November 1, 2026 / 2026年11月1日 in the pre-publication copy, as authorized by the owner.
- [ ] Recheck the app audit against the final release commit and reconcile any changed data practices or provider settings.

The owner may need qualified advice privately. Do not use the public PR to exchange private operator records or identity documents.

## B. Approve final content before changing publication state

1. Record explicit owner approval of the final documents and resolution of the blockers. Do not treat approval to prepare a draft as publication approval.
2. The requested finalization pass has removed public review/blocker language, geographic exclusions, draft notices and noindex, and set the effective date. Corresponding tests are updated. This is pre-publication preparation only: review any remaining operator/disclosure obligations privately and approve the actual public documents before merging. Do not interpret removal of public commentary as resolution of the internal checklist.
3. Run `npm run build`, `npm run check` and `git diff --check`; inspect the final generated HTML/CSS. Review mobile layout, large text, keyboard/screen-reader navigation and both languages. Automated structural checks do not prove rendered fit or legal adequacy.
4. Merge the reviewed final content to `main`. Verify that only `docs/` will be served. `review/` is outside that folder but remains public source in GitHub.

## C. Exact GitHub Pages setup (owner action only)

Repository: https://github.com/KaiOmote/mypayce-legal

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose **main** and **/docs**, then select **Save**.
4. Leave the custom-domain setting empty. Use the default `kaiomote.github.io` project URL. No CNAME, extra dependency or custom GitHub Actions deployment workflow is needed. GitHub may run its managed Pages deployment after this owner action.
5. Once deployment completes, confirm HTTPS is used (and **Enforce HTTPS** is enabled if the setting is available).
6. Verify the six URLs below and every language switch, navigation, contact link and document anchor. Directly open nested pages rather than testing only homepage navigation.

| Page | URL |
| --- | --- |
| English home | https://kaiomote.github.io/mypayce-legal/ |
| English privacy | https://kaiomote.github.io/mypayce-legal/privacy/ |
| English terms | https://kaiomote.github.io/mypayce-legal/terms/ |
| Japanese home | https://kaiomote.github.io/mypayce-legal/ja/ |
| Japanese privacy | https://kaiomote.github.io/mypayce-legal/ja/privacy/ |
| Japanese terms | https://kaiomote.github.io/mypayce-legal/ja/terms/ |

Reference: [GitHub publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Public repositories support free Pages hosting. Disabling runtime trackers does not disable GitHub's hosting/security logs.

## D. After publication, outside this draft task

- Verify public HTTPS URLs return the approved documents without authentication, missing assets or redirects to an unrelated site.
- Through a separately authorized release-configuration task, the owner can set `EXPO_PUBLIC_PRIVACY_POLICY_URL` and `EXPO_PUBLIC_TERMS_OF_USE_URL` in the correct production environment and update App Store Connect links as appropriate. Do not wire unpublished draft URLs into a purchase release.
- Confirm app privacy disclosures, purchase configuration and actual Apple sandbox behavior against the final binary. This website does not complete them automatically.
- Later edits must update both languages, evidence and effective-date handling as appropriate. Changes pushed to an enabled Pages source can publish automatically: use review before merging.

No site publication, repository-setting change, app modification, build, submission or OTA release is performed by this draft task.
