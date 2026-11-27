# Arsenal Fans Club Nigeria: membership app

Next.js 15 (App Router) + Firebase (Firestore, Admin SDK) + Squad payments, with a pluggable gateway layer.

## The flow

1. `/register`: the member fills the form and adds a passport photo (cropped to 4:5 and compressed to a small JPEG in the browser). `POST /api/register` validates it server-side (zod), saves it to Firestore as `pending_payment`, and starts a payment (the fee comes from the server, never the browser).
2. The browser is redirected to the gateway's hosted checkout (Squad by default).
3. After paying, the gateway sends the member to `/payment/callback/{reference}`. That page calls `/api/payment/verify`, which asks the gateway directly whether the payment succeeded, checks amount and currency, then marks the member `paid` and assigns a membership number (`AFCN-2026-00001`).
4. The member is redirected to `/ecard/{id}?k={key}` and sees their e-ID card with the photo they uploaded (flip front/back, download as PNG).
5. In parallel, the gateway calls `/api/webhooks/{gateway}`. If the member paid but closed the tab, the webhook still activates the membership. Both paths use the same idempotent `settlePayment()`.
6. The QR code on the card opens `/verify/{membershipNumber}` (shows first name and last initial only).

## Setup

```bash
npm install
cp .env.example .env.local      # fill it in (see below)
npm run dev
```

**Firebase**
1. Create a project and enable **Firestore** (production mode).
2. Project settings > Service accounts > *Generate new private key*. Copy `project_id`, `client_email` and `private_key` into `.env.local`.
3. Deploy the lock-down rules: `firebase deploy --only firestore:rules`. Browsers never touch Firestore; only the server does.

**Squad**
1. Create a sandbox account and copy the secret key (`sandbox_sk_...`) into `SQUAD_SECRET_KEY`.
2. Dashboard > Profile > API & Webhooks: set the webhook URL to `https://YOUR-DOMAIN/api/webhooks/squad`.
3. For local testing, expose your machine with a tunnel (e.g. ngrok) and set `APP_URL` to the tunnel URL.
4. To go live: use your live secret key (the base URL switches automatically because live keys don't start with `sandbox_`) and complete Squad KYC.

**Secrets**: `CARD_SIGNING_SECRET` is any long random string (`openssl rand -hex 32`). Changing it invalidates existing card links.

## Switching payment gateways

All provider code sits behind one interface (`src/lib/payments/types.ts`). Squad and Paystack are implemented.

- **Automatic failover**: if the first gateway errors or times out when starting a payment, the next one is tried automatically, and the failed one is skipped for 60 seconds.
- **Switch by config**: set `PAYMENT_GATEWAYS=squad,paystack` (env, needs a restart). Or, with no redeploy, create the Firestore document `settings/payments` with a field `order` (array of strings), e.g. `["paystack", "squad"]`. It is re-read every 30 seconds.
- **In-flight payments are safe**: each payment remembers which gateway started it and is verified with that gateway even after you switch.
- **Add another provider** (e.g. Flutterwave): copy `src/lib/payments/paystack.ts`, implement `initialize`, `verify` and `parseWebhook`, add its id to `GatewayId` in `types.ts` and register it in `registry.ts`. Point that gateway's webhook at `/api/webhooks/<id>`.

## Data (Firestore)

| Collection | Purpose |
|---|---|
| `members` | Registration details, `status` (`pending_payment` / `paid`), `membershipNumber`, `paidAt`, `validThru` |
| `photos` | Member photo (JPEG data URL, ~30-60 KB) keyed by member id, kept apart from `members` so those documents stay small |
| `payments` | One doc per payment attempt (doc id = reference): gateway, amount (kobo), status |
| `counters/membership` | Sequence for membership numbers |
| `settings/payments` | Optional live gateway order |

## Tests

`npm test` runs unit tests (mocked gateway HTTP and an in-memory Firestore) covering signature checks, failover, the circuit breaker, settlement, idempotency and amount-mismatch rejection. `npm run build` type-checks and builds.

## Before launch checklist

- [ ] Run a full **sandbox** payment end to end and confirm Squad's verify response reports `transaction_amount` in kobo (the code expects kobo and refuses to activate the member on a mismatch).
- [ ] Test the Paystack standby in its own test mode before relying on it.
- [ ] Move the logo and crest images (currently hosted on googleusercontent) into `/public`, then update `CREST_URL` in `src/lib/config.ts` and the logo URL in `Header.tsx`.
- [ ] Confirm the business rules in `src/lib/config.ts` and `src/lib/card.ts` (fee, 12-month validity, season label, chapter = member's state, category and matchday-access text).
- [ ] Add Privacy / Terms / Disclaimer pages (the consent links are still `#`).
- [ ] Photos are stored inside Firestore (simple, no extra Firebase service needed). If you later expect many thousands of members, or want bigger photos, move them to Firebase Storage: only `upsertPendingMember`/`getPhoto` in `src/lib/members.ts` need to change.
- [ ] Add rate limiting (e.g. Firebase App Check or a WAF) on `/api/register`. There is a honeypot field but no rate limit yet.
- [ ] Optional next step: email the member their card link after payment, so a closed tab doesn't strand them.

## Deploying on HostAfrica HCode

Checked against the HCode docs (https://hcode.hostafrica.com/docs). The app is a plain Node server, so it fits HCode's automatic build; no Dockerfile is needed.

1. **Create a project** (New project > GitHub, or Upload the zip; a single top-level folder in the zip is handled automatically). Uploads are not inspected, so confirm in step 2:
   - Build mode **Automatic**, framework **Next.js**
   - App type **Web app**, port **3000** (HCode sets `PORT`; the `start` script is `next start -H 0.0.0.0`)
   - Node is pinned to 22 by `.nvmrc`
2. **Environment variables** (Settings > Environment variables). Enter values **without quotes** (HCode keeps quotes as part of the value) and mark the secrets as **Secret**:
   - `APP_URL`: the project's generated `https://....hcode.site` address, or your custom domain once connected
   - `CARD_SIGNING_SECRET`, `REGISTRATION_FEE_NGN`, `MEMBERSHIP_VALIDITY_MONTHS`
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (paste the key on one line with the literal `\n` sequences)
   - `PAYMENT_GATEWAYS`, `SQUAD_SECRET_KEY`, `PAYSTACK_SECRET_KEY`
   Saving doesn't restart anything: click **Apply settings** afterwards. None of these are `NEXT_PUBLIC_*`, so changing them never needs a rebuild.
3. **Health check path** (Settings): `/api/health`.
4. **Webhook**: in the Squad dashboard set the webhook URL to `https://YOUR-HCODE-ADDRESS/api/webhooks/squad`.
5. Deploy, then run one sandbox payment end to end.

Things to know:
- Firestore is reached over the internet from HCode. Outbound HTTPS is not blocked (only SMTP/IMAP/POP are), but pick the Firestore region closest to your users when you create the database, as it can't be changed later.
- HCode's outgoing traffic leaves from IP addresses shared with other customers. If Squad (or Paystack) ever requires IP whitelisting on your live account, ask HostAfrica whether a fixed outbound IP is available.
- The default app size is 512 MB of memory; that is enough for this app, but check your plan's limits and build minutes.
- A deploy keeps the old version running until the new one answers, so updates don't drop traffic. Zip projects keep the last upload for 48 hours for redeploys.

## Other hosts

Firebase App Hosting or Vercel also work. Set every variable from `.env.example` in the host's environment settings. On Firebase App Hosting, credentials come from the platform, so you can omit the three `FIREBASE_*` key variables.
