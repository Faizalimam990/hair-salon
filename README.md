# Mens&WomensFamilySalon

An editorial salon website built with Vite, React, TypeScript, Material UI and GSAP. Includes a responsive navigation, animated hero, filterable service collection, family service tabs, treatment selector, keyboard-operated gallery, verified Google rating, map, FAQs and a validated WhatsApp appointment enquiry.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. To test the production build:

```sh
npm run build
npm run preview -- --port 4173
```

## Check the project

```sh
npm run check
npm audit --audit-level=high
```

`check` runs formatting, TypeScript, booking unit tests and the production build. Browser verification is documented in `docs/QA_REPORT.md`. `npm run format` applies Prettier. The automated unit tests cover the India timezone boundary, required fields, past/invalid calendar dates, future dates, WhatsApp URL encoding and message content.

## Content and configuration

Edit `src/data/salon.ts` for business details, service content and inspiration-gallery items. WhatsApp is configured as **+91 62607 16380**, the user-provided number with India's country code inferred from the verified Mumbai address.

Optional settings in `.env.local` (see `.env.example`):

- `VITE_WHATSAPP_NUMBER`: override the default using international digits only.
- `VITE_SITE_URL`: final public origin for the canonical tag. No deployment domain was provided.

Google listing: https://share.google/zvJQ0sWInvbvRdooP. Address, coordinates, hours and rating were checked on 28 September 2026. Normal hours: daily 10 am–9:30 pm. Holiday hours can differ. The rating is a dated snapshot, not an automatically synchronized feed.

Written customer reviews were unavailable in both Google Search and Maps during implementation. The site therefore shows the verified 5.0 rating from 3 reviews and links to Google, without inventing testimonial quotations or identities. Approved quotes can be added later.

Photographs are licensed illustrative stock, not actual clients, before/after results or salon premises. The gallery and interior image are labelled accordingly. Replace them with owner photographs when available. See `docs/ASSETS.md` for provenance.

## Architecture

- `src/components`: navigation, reusable branding, lazy-loaded booking and gallery dialogs.
- `src/sections`: independent page sections.
- `src/data`: business configuration and content.
- `src/theme`: customized MUI theme and self-hosted fonts.
- `src/utils`: appointment validation, message generation and scoped GSAP animation helpers.
- `public/images`: optimized local photographs; no image CDN dependency at runtime.
- `tests`: booking validation and handoff regression tests.

Native browser scrolling remains intact. GSAP effects are scoped and cleaned up with `useGSAP`; parallax runs only on desktop. Reduced-motion preferences disable scroll effects and transitions. Gallery and booking dialogs load only when opened. The location card links directly to the salon on Google Maps.

## Signature motion

- A custom SVG haircut scene follows scroll with metallic scissors, hinged blades, falling strands and a three-step progress sequence. Scrolling back reverses the cut.
- The scene pins only on screens at least 1000 pixels wide and 700 pixels tall. Phones, tablets and short windows use a compact, unpinned version.
- A small scissor marker tracks page progress on wide screens; the service ribbon shifts and its flowers rotate with scroll.
- Service cards arrive in a stagger. The treatment section pairs image reveals and parallax with a serum pipette, drops, an expanding face mask and orbit lines.
- Primary hero/footer buttons respond subtly to a mouse pointer. The closing invitation has a coordinated flower, heading and outline reveal.

`src/sections/Craft.tsx` owns the haircut timeline; `src/components/MotionDetails.tsx` owns the ribbon, page progress, pointer effects and layout refresh coordination. `src/motion.css` contains motion-specific presentation. `gsap.matchMedia()` removes movement and pinning when reduced motion is requested. All content remains present in that static layout. A ResizeObserver refreshes scroll measurements after service filters, tabs or FAQs change the layout. No scroll replacement library, video or new runtime dependency was added.

## Booking and privacy

The form creates an enquiry, not a reservation. It stores no data in a database, local storage, cookies or analytics. Details remain in React state until the visitor explicitly opens WhatsApp, then are passed to WhatsApp through an encoded URL; the visitor still has to send the message. The salon must confirm availability and pricing. No message was sent during testing.

The preferred date uses the salon's Asia/Kolkata timezone. Times are broad preferences, not advertised live availability. No payments, authentication, server API or database are required for this workflow.

## Deploy

Run `npm ci && npm run build` and serve `dist/` from a static host with HTTPS. A Netlify-compatible `public/_headers` file is included; configure equivalent headers on other hosts. Set the actual canonical origin through `VITE_SITE_URL` before the production build, and update social metadata to use an absolute image URL on that origin. This project has not been published.

Use long immutable cache lifetimes for `/assets/` hashed files. Keep `index.html` revalidating and avoid long immutable caches for `/images/` unless filenames change when content changes. Retain the previous `dist` release for rollback; redeploy it if needed. No migrations are necessary.

Before launch, review the service menu, replace stock with salon imagery if desired, reconfirm hours and rating, and test WhatsApp from a phone with the salon owner. Add a sitemap and robots policy once the final domain is known. Add static prerendering if full HTML indexing without JavaScript is a launch requirement.

## Troubleshooting and security

If a WhatsApp app isn't installed, the link hands off to WhatsApp's web flow. The map card opens Google Maps directly; no embedded map resources are loaded. A missing VITE_SITE_URL doesn't block rendering. Report code issues privately to the repository maintainer; don't include customer personal information in reports.

The site accepts no server-side submissions. User text is rendered through React escaping and encoded with `encodeURIComponent` at the WhatsApp boundary. Third-party links use `noopener noreferrer`; there are no secrets in the client. Dependencies are pinned by the lockfile. The supplied security headers restrict plugin embedding, MIME sniffing, permissions and framing.
# hair-salon
