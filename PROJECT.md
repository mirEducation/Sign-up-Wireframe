# Souvenote — Frontend Prototype

## What This Is

Souvenote is a high-fidelity frontend prototype for an AI-powered greeting card platform. Users can generate personalized greeting cards with AI imagery, attach custom songs and digital gift cards, and print-and-mail the final card. This prototype covers the full customer-facing journey — from sign-up through checkout — with rich mock data and a premium metallic luxury aesthetic. No backend or API integrations; all interactions are simulated.

## Core Value

The card creation experience must feel premium, intuitive, and emotionally engaging — every screen should look like a finished luxury product, not a wireframe or template.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User authentication UI (sign up, log in, password reset)
- [ ] Options page presenting three card creation methods
- [ ] "Build My Card" questionnaire flow with AI generation simulation
- [ ] "Personalize a Template" flow with marketplace browsing and customization
- [ ] "Ready to Send Cards" pre-designed card selection
- [ ] AI writing assistant UI (persistent suggestion widget in text fields)
- [ ] Image generation decision page (approve / edit / retry)
- [ ] Music generation questionnaire and playback UI
- [ ] Gift card attachment flow (retailer selection, amount, QR preview)
- [ ] Delivery/shipping information form with address entry
- [ ] Shopping cart and checkout flow
- [ ] Credit system UI (balance display, credit pack purchase)
- [ ] User dashboard (My Images & Songs, history, re-order)
- [ ] Language toggle (English, French, Spanish) and currency toggle (CAD, USD)
- [ ] Global header with navigation, credit balance, language/currency controls
- [ ] Rich mock data throughout (sample templates, demo cards, fake songs, placeholder credits)
- [ ] Premium metallic luxury visual identity (rose gold, gold, silver, bronze)
- [ ] Sophisticated typography, motion design, and atmospheric backgrounds
- [ ] Responsive layout

### Out of Scope

- Backend API / NestJS server — frontend prototype only
- Database / PostgreSQL — all data is mocked client-side
- Real AI image generation (Recraft.ai) — simulated with placeholder images
- Real music generation (Mureka.ai) — simulated with demo audio
- Real payment processing (Stripe) — simulated checkout
- Real gift card integration (Reloadly) — mocked selection and QR
- Real print/mail integration (PostGrid) — simulated delivery confirmation
- Admin console — customer-facing experience only
- Real authentication / sessions — simulated auth flows
- Content moderation — no real user-generated content to moderate
- Referral system — listed as future in PRD
- Pricing page, FAQ, Terms, Privacy, Contact, About pages — future modules

## Context

- **Source PRD**: Souvenote PRD v1.1 (March 2026) — covers full platform including backend, database, external APIs
- **Prototype scope**: Frontend-only, all API responses mocked with realistic demo data
- **Design mandate**: Premium metallic aesthetic — rose gold, gold, silver, bronze as primary palette. Luxury-grade polish: metallic gradients, reflective depth, layered surfaces, elegant lighting, sophisticated typography, controlled cinematic motion
- **Card creation methods**: Build My Card (AI questionnaire), Personalize a Template (marketplace customization), Ready to Send (pre-designed, no AI)
- **Card components**: AI artwork, personalized messages, custom song (QR code), optional gift card (QR code)
- **Credit system**: Image generation credits (from card packs) + music generation credits (from AI credit packs). Free signup bonus: 1 image + 1 song credit
- **Localization**: 3 languages (EN/FR/ES), 2 currencies (CAD/USD) — UI toggles in header
- **User dashboard**: 30-day content retention display, view/approve/re-order past creations

## Constraints

- **Tech stack**: Next.js + TailwindCSS + Zustand — as specified in PRD
- **No backend**: All data mocked via Zustand stores and static JSON/fixtures
- **Visual quality**: Must look production-ready, not like a wireframe or SaaS template
- **Design system**: Metallic luxury — rose gold, gold, silver, bronze palette with dark anchors (charcoal, black glass, smoky neutrals)
- **Typography**: Distinctive premium fonts — no generic defaults (no Arial, Inter, Roboto, Open Sans)
- **Motion**: Cinematic, fluid, tactile — page-load reveals, hover states, sheen passes, elevation changes
- **Backgrounds**: Atmospheric — layered gradients, metallic glows, soft reflections, ambient depth

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Frontend-only prototype | Focus on visual polish and UX flow, no backend complexity | — Pending |
| Next.js + TailwindCSS + Zustand | Matches PRD tech stack, production-ready foundation | — Pending |
| Skip admin console | Customer-facing experience is the priority for stakeholder demo | — Pending |
| Rich mock data throughout | Prototype should feel alive and populated, not empty-state | — Pending |
| Premium metallic luxury aesthetic | Distinctive brand identity — rose gold, gold, silver, bronze | — Pending |
| Include localization toggles | Shows multi-language/currency capability in prototype | — Pending |

---
*Last updated: 2026-03-12 after initialization*
