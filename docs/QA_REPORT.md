# Verification report

Checked 28 September 2026. Browser testing used Codex's Chromium browser against local Vite development and production servers. No external message was sent and the site was not deployed.

| Area                         | Check                                                                    | Result                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Formatting                   | `npm run format:check`                                                   | Pass                                                                                                              |
| Type safety                  | `npm run typecheck`                                                      | Pass                                                                                                              |
| Booking logic                | `npm run test`                                                           | 6 tests pass: India timezone, required fields, past/impossible dates, valid request, URL encoding, optional notes |
| Build                        | `npm run build`                                                          | Pass; motion in its own cacheable chunk; booking/gallery lazy-loaded                                              |
| Dependencies                 | `npm audit --json`                                                       | Zero known vulnerabilities reported                                                                               |
| Booking browser flow         | Empty submit, complete preferences, review, encoded WhatsApp destination | Pass; destination +91 62607 16380; request is explicitly unconfirmed                                              |
| Service filters              | Skin & beauty shows 2 services; All restores 6                           | Pass                                                                                                              |
| Family selector              | Women/men/family, ArrowRight navigation                                  | Pass; matching panel changes with selected tab                                                                    |
| Treatment selector           | Hair therapy selection                                                   | Pass; image, heading, care steps and enquiry service change together                                              |
| Gallery                      | Open, next, ArrowLeft, Escape                                            | Pass                                                                                                              |
| Mobile navigation            | Open drawer, follow Services link                                        | Pass; drawer closes and section is reached                                                                        |
| Responsive reflow            | 320, 390, 768, 1280 CSS pixels                                           | Document width matches viewport; no horizontal page scroll                                                        |
| Visual review                | Desktop hero/treatment feature, mobile hero/services/lightbox            | Reviewed                                                                                                          |
| Automated accessibility      | axe-core WCAG A/AA through 2.2, reduced-motion page                      | 0 violations, 28 rules passed after fixing rating-label role                                                      |
| Automated form accessibility | axe-core against open booking dialog                                     | 0 violations, 25 rules passed                                                                                     |
| Reduced motion               | Emulated `prefers-reduced-motion: reduce`                                | All sections visible; GSAP movement reverted; CSS animation disabled                                              |
| Production runtime           | Browser errors and image failures                                        | No errors; no broken loaded images; one H1                                                                        |
| Content                      | Business profile and user phone                                          | Address, coordinates, hours and 5.0/3-review snapshot verified; +91 added to user number for Mumbai               |

## Performance

Initial JavaScript after the motion upgrade: approximately 189.5 kB gzip (135.1 kB application plus 54.4 kB GSAP including MotionPathPlugin). Main CSS: approximately 9.8 kB gzip. The booking dialog adds approximately 23.6 kB gzip including the shared dialog chunk; gallery UI is approximately 0.6 kB plus shared dialog. Hero JPEG is 165 kB. Eight photographic assets total approximately 737 kB; below-the-fold images use native lazy loading. Fonts are self-hosted. Google Maps opens via an external directions link without embedding third-party resources. Hero parallax is disabled below 900 pixels; the signature scene is unpinned below 1000 pixels wide or 700 pixels tall. No autoplay carousel or continuous animation loop.

These are production build sizes and local browser checks, not field Core Web Vitals or a mobile-network Lighthouse score. Real-device Safari/Firefox testing and live-site field measurements remain release follow-up work.

## Content limitations

Written Google reviews did not load in Search or Maps, even though the public aggregate was visible. The site uses the genuine dated rating with a Google link instead of fabricated testimonials. No invented prices, staff credentials, customer volumes, or before/after results are published. Stock photography is marked as inspiration. Final service list and salon photographs should be reviewed by the owner before publishing.

## Other coverage limits

No native screen-reader session, real iOS/Android device or externally sent WhatsApp message was tested. The date picker could not be filled reliably by the browser tool's high-level date-input action; its value was set through Chromium's development protocol for the booking-flow check, with ordinary React input/change events. Unit tests separately verify date validation. The production host, HTTPS headers, canonical domain, sitemap and social image URL must be checked after a deployment target exists.

## Google Maps fallback

Both the basic map embed and the official embed copied from the salon’s Google Maps share panel returned HTTP 404 with empty bodies in this environment. Replaced the blank iframe with an illustrated location card and direct Google Maps button. The verified address and Google directions links remain visible.

The repository quality gate completed with 5 passes, 0 failures and 5 skips (no separate linter, no Python project, ShellCheck/gitleaks/trivy unavailable). TypeScript strict checks and Prettier cover static typing and formatting; these skips are not reported as passed security scans.

## Motion upgrade verification

- Desktop 1440 × 960: reviewed the pinned SVG haircut scene mid-scroll. Both blades rotate around a shared hinge, scissors follow the cut line and passed strands fall away.
- Phone 390 × 844: reviewed the compact artwork and text spacing; the section scrolls normally without pinning.
- Reflow at 320, 390, 768, 1280 and 1440 CSS pixels: no horizontal document overflow. At 768 × 1024 and 1280 × 680, no pin spacer is created.
- Reduced motion: zero active ScrollTriggers, zero pin spacers and full-opacity hair strands. Desktop fallback retains a normal document section.
- Filtering to Skin & beauty leaves two cards and recalculates the pin start to the section's actual offset. Restoring all services restores six cards.
- Hair therapy selection updates the heading, image, steps and scroll animations.
- axe-core WCAG A/AA through 2.2 on the reduced-motion phone layout: zero violations, 29 rules passed after correcting the ribbon group role and step-number contrast.

The browser checks exercise emulated viewports, not physical devices. No numeric frame-rate or Core Web Vitals result is claimed.
