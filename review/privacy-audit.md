# Application privacy audit — owner-review evidence

**Audited application:** [KaiOmote/NewMoneyPace](https://github.com/KaiOmote/NewMoneyPace/tree/8292e496c6e0ef2805a139614e98c5b95327f383), commit `8292e496c6e0ef2805a139614e98c5b95327f383`. Read-only source audit performed October 27, 2026. The app working tree was clean before and after review.

This is an implementation audit, not packet capture, provider-contract review, App Store privacy approval or a legal compliance opinion. Runtime behavior must be rechecked if the app, native dependencies or service configuration changes. No new app instance, native build or EAS/Apple/RevenueCat resource was used.

## Evidence map

Paths below are relative to the audited application repository, not this legal website.

| Area | Verified source | Disclosure consequence |
| --- | --- | --- |
| Financial storage | `src/infrastructure/sqlite/schema.ts`, `runtimeDatabase.ts`, `runtimeLifecycle.ts` | Local SQLite stores financial settings, accounts, categories, transactions, Card plans, budgets and recurrence, including notes/merchants and recoverable states. No SQLCipher configuration or app-level encryption promise was found. |
| Deletion/recovery | Application archive/void/restore commands; archive/deleted columns | Removing records through ordinary UI may retain recoverable data. Never call that secure erasure or promise a permanent purge. |
| Preferences | `presentation/i18n/languagePreferenceStorage.ts`, `onboarding/onboardingPreferenceStorage.ts`, `scenario/scenarioDraftPreferenceStorage.ts`, `dev/developerModePreferenceStorage.ts` | Expo SQLite KV storage holds local preferences. Remembered Scenario Setup includes configuration/amounts/IDs but not calculated financial results. |
| Imports and calculations | CSV application/query/domain modules; `docs/money-semantics.md` | CSV processing and financial calculations are local. No bank connection, financial-data account, financial cloud sync or AI service is implemented. “Analytics” in domain modules means local spending calculations, not tracking telemetry. |
| Purchase access | `application/purchases/purchases.ts`, `infrastructure/purchases/revenueCat.ts` | `MyPaycePro`; exact Apple monthly/annual/lifetimelocal SKUs; SDK anonymous ID, customer-info listeners, purchases and restoration. No custom customer attributes or financial-repository input enters the adapter. |
| Purchase startup | `presentation/purchases/purchaseRuntime.ts`, `PurchasesProvider.tsx` | Native iOS SDK initialization occurs through the app provider, not only after purchase. Foreground refresh contacts the SDK; missing/test/secret keys are rejected. Dev Expo Go preview is isolated from release. |
| Reminders | `presentation/reminders/reminderNative.ts`, `reminderNotificationContent.ts`, `reminderStorage.ts`, `application/reminders/reminderPolicy.ts` | Local scheduling only; no remote push token registration. Copy includes type/timing, rule name and due date, not automatically added financial amounts. Names themselves may contain sensitive content. Permissions and OS preview settings matter. |
| Reminder retention | `reminderPolicy.ts`, `reminderCoordinator.ts` | Up to 50 real history entries and 10 separate retained developer tests. Upcoming previews are not delivered-event claims. Clear all records dismissals; pruning has lookback/live-reference conditions, not a simple fixed deletion time. |
| Feedback | `presentation/feedback/feedback.ts`, `controllers/feedbackController.ts` | A mailto composer with category subject; no automatic financial/diagnostic attachment. Sender/message/voluntary attachments go to the chosen email provider and recipient Gmail mailbox only if sent. Copy-address fallback exists. |
| Backups | `infrastructure/sqlite/nativeFinancialBackup.ts`, `financialBackup.ts`, `presentation/runtime/financialBackupRuntime.ts`, `docs/backup-restore.md` | Unencrypted financial-only SQLite snapshot; includes archived/deleted rows. User-selected sharing/provider can transfer or synchronize files. App preferences and purchase ownership are not financial-backup contents. Private staging/recovery artifacts exist and have cleanup rules, not guaranteed secure erasure. |
| Developer diagnostics | `runtimeDatabase.ts` diagnostic export; developer tools controller | User-initiated database export through the share sheet, not automatic crash uploads. Financial information can be present. Reset/test tools do not imply operator access to device data. |
| Updates | `app.json`, `eas.json`, installed `expo-updates` | EAS Update URL/runtime are configured; production environment/channel declared. Native update requests process technical information through Expo, even though no financial DB is uploaded. Remote channel readiness is separate from the privacy disclosure. |
| Other third-party SDKs | `package.json`; source search for network calls, analytics/crash/ad SDKs, custom attributes and push registration | No standalone Sentry/Bugsnag/Firebase/advertising/behavioral analytics integration or custom financial-upload endpoint was found. This is not a claim about all provider/platform diagnostic processing. |

## Purchase promises checked directly

- App EN: “Includes current and future Local Pro features. Separately priced online or AI services are not included.”
- App JA: “現在と今後のローカル Pro機能を利用できます。別料金のオンライン・AIサービスは対象外です。”
- App billing distinguishes monthly/annual auto-renewal from one-time non-consumable Lifetime.
- Both Terms preserve that coverage. They do not replace it with access only to current features or a discretionary subscription expiry. They also do not promise permanent development, universal OS support or free future separately priced online/AI services.
- Pro expiry preserves financial records. Purchases do not restore financial backups. RevenueCat restoration is intended to use Transfer to new App User ID, but current remote restore settings and actual Apple sandbox transactions were not independently verified in this website task.

## Service boundaries and references

- [RevenueCat App Privacy](https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy): purchase information and dashboard purchase analytics require accurate disclosure. Do not say no data is collected just because local financial records stay on-device.
- [RevenueCat privacy](https://www.revenuecat.com/privacy) and [anonymous identity](https://www.revenuecat.com/docs/customers/identifying-customers): service and purchase identifiers are not proof of legally anonymized data.
- [Expo privacy](https://expo.dev/privacy): EAS Update can process OS and randomized update identifiers; requests also involve provider/network information. No Expo push service is configured for reminders.
- [Apple privacy](https://www.apple.com/legal/privacy/) and [device backups](https://support.apple.com/en-us/108770): Apple billing and optional device backups are separate from MyPayce financial-data storage.
- [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection): visitor IP logging for security must not be hidden behind a no-tracking statement about our own site code.

## Limitations requiring owner confirmation

Provider retention, subprocessors, contracts and cross-border safeguards were not established from app code. Exact operator-held email retention, support access/security, request fulfilment and lawful operator disclosure are not implemented by a policy document. Apple analytics/privacy submissions, the intended age audience and real-device behavior still require owner review. The website does not claim a particular provider is always an independent controller or always a processor; actual roles must be assessed.
