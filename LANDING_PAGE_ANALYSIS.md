# Landing Page V2 — Manzeli Web Platform

**Source:** [app/[locale]/page.tsx](app/[locale]/page.tsx)
**Stack:** Next.js (App Router, locale-segmented) · React 19 · TypeScript · Tailwind CSS · `motion/react` · `react-i18next` · `lucide-react`
**Brand:** Manzeli — Algeria's real estate marketplace (`#0078FD` primary, `#064BCD` deep blue, `#2FE0D7` teal accent)

---

## Page Map (Top → Bottom)

| # | Section | Status | Component / Location |
|---|---------|--------|----------------------|
| 1 | Header (global nav) | ✅ Exists | [components/shared/header.tsx](components/shared/header.tsx) |
| 2 | Chatbot popover | ✅ Exists | [components/shared/chat-bot-popover.tsx](components/shared/chat-bot-popover.tsx) |
| 3 | Hero — video + search | ✅ Exists | [components/landing/hero-section.tsx](components/landing/hero-section.tsx) |
| 4 | Featured Listings grid | ✅ Exists | inline in [app/[locale]/page.tsx](app/[locale]/page.tsx) |
| 5 | **How It Works** | 🆕 New | `components/landing/how-it-works-section.tsx` |
| 6 | **Property Categories** | 🆕 New | `components/landing/categories-section.tsx` |
| 7 | **Why Manzeli** | 🆕 New | `components/landing/why-manzeli-section.tsx` |
| 8 | **Stats & Social Proof** | 🆕 New | `components/landing/stats-section.tsx` |
| 9 | **AI Chatbot Promo** | 🆕 New | `components/landing/ai-promo-section.tsx` |
| 10 | **Coin Boost Promo** | 🆕 New | `components/landing/boost-promo-section.tsx` |
| 11 | **Testimonials / Reviews** | 🆕 New | `components/landing/testimonials-section.tsx` |
| 12 | **For Agents & Owners** | 🆕 New | `components/landing/for-agents-section.tsx` |
| 13 | **FAQ** | 🆕 New | `components/landing/faq-section.tsx` |
| 14 | App Download CTA | ✅ Exists | [components/landing/app-download-section.tsx](components/landing/app-download-section.tsx) |
| 15 | Footer | ✅ Exists | [components/shared/footer.tsx](components/shared/footer.tsx) |

---

## Existing Sections — Issues to Fix

### Hero Section — [hero-section.tsx](components/landing/hero-section.tsx)

**Pending fixes (from V1 analysis):**
- Add a `posterSrc` prop to avoid black flash before video loads. Candidate: `/public/images/heroSection.png` or a compressed still from the Pexels video.
- Consider hosting the Pexels MP4 locally — third-party CDN dependency can break the hero silently.

**Hero Search** — [hero-search.tsx](components/landing/hero-search.tsx)
- Filter empty params on submit: skip keys whose value is `""` when building `URLSearchParams`.
- Add a `min-price` field alongside `maxPrice` (translation key `min_price` already exists).

### Featured Listings — [page.tsx:50-108](app/[locale]/page.tsx#L50-L108)

- Split `featured.title` into `featured.eyebrow` (pill) + `featured.title` (H2). Both currently use the same key.
- Replace `locale as "en"` cast on `PropertyCard` with a proper type.
- Cache `searchListings` with `next: { revalidate: 300 }` to protect TTFB.

### App Download Section — [app-download-section.tsx](components/landing/app-download-section.tsx)

- Move the three hard-coded French stat labels (`10K+ Annonces`, `4.8★ Note app`, `50K+ Utilisateurs`) into i18n keys: `app.stat_listings`, `app.stat_rating`, `app.stat_users`.
- Wire real App Store / Google Play URLs when available. Replace `href="#"` placeholders.

---

## New Sections — Full Specifications

---

### Section 5 — How It Works

**File:** `components/landing/how-it-works-section.tsx`

**Purpose:** Reduce friction for first-time visitors by showing the 3-step path from "open app" to "live listing / found home."

**Layout:**
- Light background `bg-[#F8F9FC]`, `py-24 sm:py-32`, centered `max-w-7xl`.
- Section header: eyebrow pill + H2 + subtitle (same header pattern as Featured Listings).
- Two side-by-side tabs: **"I'm looking"** (buyer/renter) and **"I'm listing"** (owner/agent). Active tab underlined in `#0078FD`.
- Below the tabs: a 3-step horizontal stepper (desktop) / vertical timeline (mobile).

**Steps — Buyer/Renter tab:**

| Step | Icon (lucide) | Title i18n key | Body i18n key |
|------|--------------|----------------|---------------|
| 1 | `Search` | `how.buyer.step1_title` | `how.buyer.step1_body` |
| 2 | `MapPin` | `how.buyer.step2_title` | `how.buyer.step2_body` |
| 3 | `Phone` | `how.buyer.step3_title` | `how.buyer.step3_body` |

Suggested copy (EN):
- Step 1 — **Search & Filter** — "Use location, property type, and price filters to narrow thousands of listings down to exactly what you need."
- Step 2 — **Explore Details** — "View full photos, floor details, nearby places, and the seller's verified badge before you decide."
- Step 3 — **Contact & Close** — "Call, WhatsApp, or message the owner directly — no intermediaries, no hidden fees."

**Steps — Owner/Agent tab:**

| Step | Icon | Title i18n key | Body i18n key |
|------|------|----------------|---------------|
| 1 | `Camera` | `how.seller.step1_title` | `how.seller.step1_body` |
| 2 | `Zap` | `how.seller.step2_title` | `how.seller.step2_body` |
| 3 | `Star` | `how.seller.step3_title` | `how.seller.step3_body` |

Suggested copy (EN):
- Step 1 — **Create Your Listing** — "Fill in the details, upload photos, and set your price. Takes under 5 minutes."
- Step 2 — **Boost & Get Seen** — "Spend coins to push your listing to the top. Outbid competitors and reach buyers faster."
- Step 3 — **Get Contacted** — "Buyers reach you directly via call or WhatsApp. Manage all your listings from one dashboard."

**Animations:** Steps fade-up with staggered delay (`index * 100ms`). Tab switch triggers a `fadeIn` on the new content.

**i18n keys to add (en/fr/ar):** `how.eyebrow`, `how.title`, `how.subtitle`, `how.tab_buyer`, `how.tab_seller`, `how.buyer.step{1-3}_title`, `how.buyer.step{1-3}_body`, `how.seller.step{1-3}_title`, `how.seller.step{1-3}_body`.

---

### Section 6 — Property Categories

**File:** `components/landing/categories-section.tsx`

**Purpose:** Let visitors jump directly into a filtered listing search by property type or listing intent (Rent / Sale / Exchange).

**Layout:**
- White background `bg-white`, `py-20`.
- Section header (eyebrow + H2).
- **Row 1 — Listing Type pills** (Rent / Sale / Exchange). These map to `home_tab_rent`, `home_tab_sale`, `home_tab_exchange`. Clicking routes to `/{locale}/listings?listingType=rent` etc.
- **Row 2 — Property Type cards** — responsive grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`. Each card:
  - Icon or illustration (SVG).
  - Label (from `usePropertyTypes` hook or static fallback).
  - On click: routes to `/{locale}/listings?propertyTypeId={id}`.

**Suggested property type icons (lucide-react):**

| Property Type | Icon |
|---------------|------|
| Apartment | `Building2` |
| Villa / House | `Home` |
| Studio | `LayoutDashboard` |
| Land / Plot | `Map` |
| Office / Commercial | `Briefcase` |
| Farm / Rural | `TreePine` |

**Styling per card:**
- `bg-[#F8F9FC]` default, `bg-[#0078FD]/10 ring-1 ring-[#0078FD]/30` on hover.
- Rounded-2xl, subtle shadow, `p-5`, icon `text-[#0078FD]`, label `text-sm font-medium text-[#111827]`.

**i18n keys:** `categories.eyebrow`, `categories.title`, `categories.subtitle`, `categories.all` (for "Browse all →" link).

**Animations:** Cards slide-up with stagger on viewport entry.

---

### Section 7 — Why Manzeli

**File:** `components/landing/why-manzeli-section.tsx`

**Purpose:** Feature differentiators — trust-builders for users who are comparing platforms.

**Layout:**
- Dark section `bg-[#0D0D0F]` with the same faint blue glow blobs as `AppDownloadSection`.
- Section header (eyebrow in teal `#2FE0D7`, H2 in white, subtitle in `#6B7280`).
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` of feature cards.

**Six feature cards:**

| # | Icon | Title i18n key | Body i18n key | Data source |
|---|------|----------------|---------------|-------------|
| 1 | `ShieldCheck` | `why.verified_title` | `why.verified_body` | KYC/Verified badge system |
| 2 | `Bot` | `why.ai_title` | `why.ai_body` | AI Chatbot (`chatBotTitle`) |
| 3 | `Zap` | `why.boost_title` | `why.boost_body` | Coin boost (`boost_description`) |
| 4 | `Globe` | `why.multilang_title` | `why.multilang_body` | AR / FR / EN + RTL |
| 5 | `MapPin` | `why.map_title` | `why.map_body` | Mapbox integration |
| 6 | `Star` | `why.reviews_title` | `why.reviews_body` | Reviews & ratings |

**Suggested copy (EN):**
1. **Verified Listings & Agents** — "Every agent and member can submit KYC documents. Look for the blue Verified badge before you call."
2. **AI Assistant, 24/7** — "Ask Manzeli AI about any property in Arabic, French, or English — voice or text, any time."
3. **Boost to the Top** — "Spend coins to outrank competitors. See your live rank before you bid — know exactly where you stand."
4. **Arabic-First, Trilingual** — "Full RTL support for Arabic with Français and English seamlessly alongside. No translation cut corners."
5. **Map-Based Search** — "Drop a pin, draw a radius, and search within it. MapBox-powered precision for every wilaya."
6. **Real Reviews, Real Trust** — "Buyers rate owners after every call. Transparent scores help you pick trustworthy sellers."

**Styling per card:**
- `bg-white/5 ring-1 ring-white/10 rounded-2xl p-6` with hover `bg-white/8`.
- Icon in a `bg-[#0078FD]/15 rounded-xl p-3` container.
- Title `text-white font-semibold`, body `text-[#6B7280] text-sm`.

**i18n keys:** `why.eyebrow`, `why.title`, `why.subtitle`, `why.{verified|ai|boost|multilang|map|reviews}_{title|body}`.

**Animations:** Cards fade-up with stagger on viewport entry.

---

### Section 8 — Stats & Social Proof

**File:** `components/landing/stats-section.tsx`

**Purpose:** Build instant credibility with numbers.

**Layout:**
- `bg-[#0078FD]` solid blue band, `py-16`.
- Single centered row (wraps on mobile): 4 stat cells separated by faint white dividers.

**Four stats:**

| Stat | Value | Label i18n key |
|------|-------|----------------|
| Listings | `10 000+` | `stats.listings` |
| Active users | `50 000+` | `stats.users` |
| App rating | `4.8 ★` | `stats.rating` |
| Wilayas covered | `48` | `stats.wilayas` |

**Styling:**
- Value: `text-5xl font-bold text-white`.
- Label: `text-white/70 text-sm mt-1 uppercase tracking-wide`.

**Animations:** Numbers count-up from 0 on first viewport entry (use `motion/react` with a custom `useCountUp` hook, or `framer-motion`'s `useMotionValue` + `useTransform`).

**i18n keys:** `stats.eyebrow` (optional), `stats.listings`, `stats.users`, `stats.rating`, `stats.wilayas`.

> **Note:** Replace `AppDownloadSection`'s hard-coded French stats with these shared i18n keys.

---

### Section 9 — AI Chatbot Promo

**File:** `components/landing/ai-promo-section.tsx`

**Purpose:** Showcase the AI Assistant as a differentiator, drive app downloads.

**Layout:**
- `bg-[#F8F9FC]`, `py-24`.
- Two columns on `lg`: chat mockup on the left, copy on the right (opposite of `AppDownloadSection` to create visual rhythm).

**Left column — Chat Mockup (static UI):**
- A phone-sized rounded card (`max-w-sm`) with `bg-[#0D0D0F]` and a simulated chat thread.
- Header: "Manzeli AI" title + blue dot "online" indicator.
- 3–4 mock message bubbles (user + AI) showing a property query conversation.
- Example exchange (uses existing `chatbotWelcomeTitle` / `chatbotWelcomeSubtitle` keys):
  - **User:** "I'm looking for a 3-room apartment in Algiers under 80 000 DZD/month"
  - **AI:** "I found 12 listings matching your criteria in Hydra, Bir Mourad Raïs, and El Biar. Want me to show the top 3?"
- Subtle animated typing indicator (three dots, looping) on the AI bubble — use `motion/react` with `opacity` keyframes.
- Blue `#0078FD` glow shadow around the card.

**Right column — Copy:**
- Eyebrow pill (`ai.badge`) in teal.
- H2 (`ai.title`) — e.g. "Your 24/7 Real Estate Expert"
- Subtitle (`ai.subtitle`) — "Ask in Arabic, French, or English. Type or speak. Manzeli AI understands the Algerian market and guides you to the right property."
- Three bullet points with `Check` icons:
  - `ai.bullet1` — Voice input in 3 languages
  - `ai.bullet2` — Instant property recommendations
  - `ai.bullet3` — Available around the clock
- CTA button: "Try it in the app" → links to app download anchor.

**i18n keys:** `ai.badge`, `ai.title`, `ai.subtitle`, `ai.bullet{1-3}`, `ai.cta`.

**Animations:** Chat bubbles animate in sequentially on viewport entry (`delay: index * 200ms`, `fadeIn + slideX`).

---

### Section 10 — Coin Boost Promo

**File:** `components/landing/boost-promo-section.tsx`

**Purpose:** Explain the coin economy to sellers; upsell the boost feature.

**Layout:**
- Dark `bg-[#0D0D0F]`, `py-24`.
- Two columns on `lg`: copy on the left, ranking widget mockup on the right.

**Left column — Copy:**
- Eyebrow pill (`boost.badge`) in amber/yellow `#F59E0B`.
- H2 (`boost.title`) — e.g. "Reach More Buyers with Coin Boosts"
- Subtitle (`boost.subtitle`).
- Three feature lines with icons:
  - `Zap` — `boost.point1` — "See your live rank before you spend a single coin"
  - `Trophy` — `boost.point2` — "Top 3 boosted listings get priority placement"
  - `Coins` / `CircleDollarSign` — `boost.point3` — "Multiple payment methods: Cash, Baridimob, Chargily Pay"
- CTA: "List & Boost" → `/{locale}/listings` (or app download anchor).

**Right column — Rank Widget Mockup:**
- Card `bg-white/5 ring-1 ring-white/10 rounded-2xl p-5` showing a leaderboard:
  - 🥇 Rank #1 — "Villa F5, Hydra" — `850 coins`
  - 🥈 Rank #2 — "Appart F3, Bab Ezzouar" — `620 coins`
  - 🥉 Rank #3 — "Studio, Cheraga" — `410 coins`
  - ⚡ **Your listing** (highlighted in `#0078FD/15`) — "F4, Kouba" — `300 coins` → `"You'd be #3 🥉"` badge.
- Below the leaderboard: a coin-input with a live preview line: `"Balance after: 200 coins"`.
- Uses translation strings from `boost_sheet_rank_top`, `boost_sheet_rank_third`, `boost_sheet_balance_after`, `boost_sheet_your_bid`.

**i18n keys:** `boost.badge`, `boost.title`, `boost.subtitle`, `boost.point{1-3}`, `boost.cta`.

**Animations:** Rank rows slide-in from the right with stagger on viewport entry.

---

### Section 11 — Testimonials / Reviews

**File:** `components/landing/testimonials-section.tsx`

**Purpose:** Social proof through user quotes. Anchors trust before the app download CTA.

**Layout:**
- `bg-[#F8F9FC]`, `py-24`.
- Section header (eyebrow + H2 centered).
- Horizontal scrolling carousel on mobile, `grid-cols-3 gap-6` on desktop.
- 6 testimonial cards (3 visible at once on desktop, auto-scroll every 5s on mobile).

**Each testimonial card:**
- Avatar (initials circle `bg-[#0078FD]/15 text-[#0078FD]` or a placeholder image).
- Name + role (e.g., "Karim B., Property Owner in Algiers").
- Star rating row (5 gold stars, `text-[#F59E0B]`).
- Quote in `"…"` marks, max 2 lines, `text-[#374151]`.
- Card style: `bg-white ring-1 ring-[#E5E7EB] rounded-2xl p-6 shadow-sm`.

**Sample testimonials (static — replace with real data when available):**

| Name | Role | Quote i18n key |
|------|------|----------------|
| Yacine M. | Owner in Algiers | `testimonial.1` |
| Amina K. | Renter in Oran | `testimonial.2` |
| Sofiane B. | Agent in Constantine | `testimonial.3` |
| Lyna D. | Buyer in Annaba | `testimonial.4` |
| Raouf T. | Owner in Blida | `testimonial.5` |
| Nadia S. | Renter in Tizi-Ouzou | `testimonial.6` |

**Data handling:** Static for now. When the API exposes reviews, fetch top-rated reviews server-side via `searchListings` or a dedicated `getReviews` endpoint and render dynamically.

**i18n keys:** `testimonials.eyebrow`, `testimonials.title`, `testimonials.subtitle`, `testimonial.{1-6}` (quote text), `testimonials.role_{1-6}` (role text).

**Animations:** Cards fade-up with stagger on viewport entry. Carousel on mobile uses `motion/react` drag or CSS scroll-snap.

---

### Section 12 — For Agents & Property Owners

**File:** `components/landing/for-agents-section.tsx`

**Purpose:** Dedicated pitch for the supply side (agents / sellers). Drives listing creation and identity verification.

**Layout:**
- White `bg-white`, `py-24`.
- Two-column layout on `lg`: copy on the left, visual panel on the right.
- Visual panel: a stylized listing card mockup showing a "Verified Agent" badge, boost rank indicator, and photo carousel — positioned on a subtle blue mesh gradient background.

**Left column:**
- Eyebrow pill (`agents.badge`) — "For Owners & Agents".
- H2 (`agents.title`) — e.g. "Reach Thousands of Buyers — For Free"
- Subtitle (`agents.subtitle`).
- Feature list (4 items with `Check` icons):
  - `agents.point1` — "Free listing creation — no upfront cost"
  - `agents.point2` — "Get a verified badge with KYC in minutes"
  - `agents.point3` — "Boost your listing to the top of search results"
  - `agents.point4` — "Manage all your listings from one place"
- Two CTAs side-by-side:
  - Primary: "Post a Listing" (`post_listing` key) → `/{locale}/add-listing/entry`
  - Secondary (ghost): "Verify Identity" (`verify_identity_now` key) → `/{locale}/profile/verify-identity`

**Right column — Listing Card Mockup:**
- A realistic `PropertyCard` mockup (not live data):
  - Photo placeholder (use `house-scaled.jpg` from `/assets/`).
  - Badge row: `VERIFIED AGENT` in green, `🥇 #1 BOOST` in amber.
  - Title: "Villa F5 in Hydra, Algiers"
  - Price: "95 000 DZD / month"
  - Details row: `3 beds · Floor 2 · 120 m²`
  - Stats: `👁 847 views` — `⭐ 4.9 (12 reviews)`
- Card: `bg-white ring-1 ring-[#E5E7EB] rounded-2xl overflow-hidden shadow-lg max-w-sm`.

**i18n keys:** `agents.badge`, `agents.title`, `agents.subtitle`, `agents.point{1-4}`, `agents.cta_post`, `agents.cta_verify`.

**Animations:** Visual panel slides in from right. Feature list items stagger-fade-up.

---

### Section 13 — FAQ

**File:** `components/landing/faq-section.tsx`

**Purpose:** Answer common objections pre-emptively. Reduces support load.

**Layout:**
- `bg-[#F8F9FC]`, `py-24`.
- Section header centered (eyebrow + H2 + subtitle).
- `max-w-3xl mx-auto` column of accordion items. Each item:
  - `flex justify-between items-center` row with question + `ChevronDown` icon.
  - Answer expands below with `motion/react` height animation (`AnimatePresence + motion.div` with `height: 0 → auto`).
  - Separator `border-b border-[#E5E7EB]` between items.

**12 FAQ items (6 displayed by default, "Show more" expands the rest):**

| # | Question i18n key | Topic |
|---|------------------|-------|
| 1 | `faq.q1` | Is Manzeli free to use? |
| 2 | `faq.q2` | How do I post a listing? |
| 3 | `faq.q3` | What are coins and how do I buy them? |
| 4 | `faq.q4` | How does the boost system work? |
| 5 | `faq.q5` | How do I contact a property owner? |
| 6 | `faq.q6` | Is my personal data safe? |
| 7 | `faq.q7` | How do I get a verified badge? |
| 8 | `faq.q8` | What payment methods are accepted for coins? |
| 9 | `faq.q9` | Can I list a property for exchange? |
| 10 | `faq.q10` | What wilayas are covered? |
| 11 | `faq.q11` | How does the AI chatbot work? |
| 12 | `faq.q12` | How do I delete or deactivate a listing? |

**Suggested answers (EN):**
1. **Free?** — "Browsing and contacting owners is completely free. Posting a listing is free. Coins are only needed if you want to boost a listing or run an ad."
2. **Post a listing?** — "Download the app, sign in with your phone number, tap 'Post a Listing', and follow the 6-step form. It takes under 5 minutes."
3. **What are coins?** — "Coins are the virtual currency inside Manzeli. Buy them via Cash (agent reference code), Baridimob receipt, or Chargily Pay online."
4. **Boost system?** — "When you boost, your listing competes with others in a transparent bidding system. The top 3 coin bids get priority placement. You see your rank before you confirm."
5. **Contact owner?** — "Open any listing and tap 'Call via Phone' or 'Contact via WhatsApp'. No account needed to browse; a free account is required to contact."
6. **Data safety?** — "Your phone number is used for login only. Personal data for KYC is stored securely and never shared with third parties."
7. **Verified badge?** — "Go to Profile → Verify Identity. Upload your ID card (member) or agent license (agent). Approval takes 1–2 business days."
8. **Payment methods?** — "Cash via agent reference code, Baridimob bank transfer with receipt upload, or Chargily Pay online card payment."
9. **Exchange listing?** — "Yes — when creating a listing, select 'Exchange' as the listing type. Buyers will know your property is open to a swap."
10. **Wilayas covered?** — "All 48 Algerian wilayas are supported in the location selector."
11. **AI chatbot?** — "The Manzeli AI Assistant understands Arabic, French, and English — type or speak. It can recommend listings, answer market questions, and guide you through the app."
12. **Delete a listing?** — "Go to Profile → My Listings, swipe the listing, and tap Delete. You can also Deactivate to hide it temporarily without losing data."

**i18n keys:** `faq.eyebrow`, `faq.title`, `faq.subtitle`, `faq.show_more`, `faq.show_less`, `faq.q{1-12}`, `faq.a{1-12}`.

**Animations:** Accordion open/close with `AnimatePresence` height transition (`duration: 250ms, ease: easeInOut`).

---

## Internationalization — Keys to Add

All new sections require keys added to `locales/en/common.json`, `locales/fr/common.json`, and `locales/ar/common.json`.

### Summary of all new i18n keys

```jsonc
// How It Works
"how.eyebrow": "How It Works",
"how.title": "From Search to Keys — in Minutes",
"how.subtitle": "Whether you're hunting for your next home or listing a property, Manzeli makes it fast.",
"how.tab_buyer": "I'm Looking",
"how.tab_seller": "I'm Listing",
"how.buyer.step1_title": "Search & Filter",
"how.buyer.step1_body": "Use location, property type, and price filters to narrow thousands of listings.",
"how.buyer.step2_title": "Explore Details",
"how.buyer.step2_body": "View photos, floor plan, nearby places, and the seller's verified badge.",
"how.buyer.step3_title": "Contact & Close",
"how.buyer.step3_body": "Call or WhatsApp the owner directly — no intermediaries, no hidden fees.",
"how.seller.step1_title": "Create Your Listing",
"how.seller.step1_body": "Fill in details, upload photos, and set your price. Takes under 5 minutes.",
"how.seller.step2_title": "Boost & Get Seen",
"how.seller.step2_body": "Spend coins to push your listing to the top and outbid competitors.",
"how.seller.step3_title": "Get Contacted",
"how.seller.step3_body": "Buyers reach you directly via call or WhatsApp.",

// Categories
"categories.eyebrow": "Explore by Category",
"categories.title": "Find What You're Looking For",
"categories.subtitle": "Browse listings by property type or what you want to do.",
"categories.all": "Browse all listings",

// Why Manzeli
"why.eyebrow": "Why Manzeli",
"why.title": "Built for the Algerian Real Estate Market",
"why.subtitle": "Six features that set us apart from every other platform.",
"why.verified_title": "Verified Listings & Agents",
"why.verified_body": "KYC-verified members and agents carry a blue badge — your signal to trust.",
"why.ai_title": "AI Assistant, 24/7",
"why.ai_body": "Ask Manzeli AI about any property in Arabic, French, or English — voice or text.",
"why.boost_title": "Transparent Boost System",
"why.boost_body": "See your live rank before you bid. Top 3 get priority placement across the app.",
"why.multilang_title": "Arabic-First, Trilingual",
"why.multilang_body": "Full RTL support for Arabic with French and English seamlessly alongside.",
"why.map_title": "Map-Based Search",
"why.map_body": "Drop a pin, draw a radius, and search within it — powered by Mapbox.",
"why.reviews_title": "Real Reviews, Real Trust",
"why.reviews_body": "Buyers rate owners after every call. Transparent scores help you pick wisely.",

// Stats
"stats.listings": "Active Listings",
"stats.users": "Registered Users",
"stats.rating": "App Rating",
"stats.wilayas": "Wilayas Covered",

// App Download (fix hard-coded French)
"app.stat_listings": "10K+ Listings",
"app.stat_rating": "4.8★ App Rating",
"app.stat_users": "50K+ Users",

// AI Promo
"ai.badge": "Manzeli AI",
"ai.title": "Your 24/7 Real Estate Expert",
"ai.subtitle": "Ask in Arabic, French, or English. Type or speak. Manzeli AI understands the Algerian market.",
"ai.bullet1": "Voice input in 3 languages",
"ai.bullet2": "Instant property recommendations",
"ai.bullet3": "Available around the clock",
"ai.cta": "Try it in the app",

// Boost Promo
"boost.badge": "Coin Boost",
"boost.title": "Reach More Buyers with Coin Boosts",
"boost.subtitle": "A transparent bidding system — see your rank before you spend a single coin.",
"boost.point1": "See your live rank before you spend a single coin",
"boost.point2": "Top 3 boosted listings get priority placement",
"boost.point3": "Pay with Cash, Baridimob, or Chargily Pay",
"boost.cta": "List & Boost",

// Testimonials
"testimonials.eyebrow": "What Our Users Say",
"testimonials.title": "Trusted by Thousands Across Algeria",
"testimonials.subtitle": "Real stories from real users — owners, renters, and agents.",

// For Agents
"agents.badge": "For Owners & Agents",
"agents.title": "Reach Thousands of Buyers — For Free",
"agents.subtitle": "Post your property in minutes and let the boost system handle the rest.",
"agents.point1": "Free listing creation — no upfront cost",
"agents.point2": "Get a verified badge with KYC in minutes",
"agents.point3": "Boost your listing to the top of search results",
"agents.point4": "Manage all your listings from one dashboard",
"agents.cta_post": "Post a Listing",
"agents.cta_verify": "Verify Identity",

// FAQ
"faq.eyebrow": "FAQ",
"faq.title": "Frequently Asked Questions",
"faq.subtitle": "Everything you need to know before you start.",
"faq.show_more": "Show more questions",
"faq.show_less": "Show less",
"faq.q1": "Is Manzeli free to use?",
"faq.a1": "Browsing and contacting owners is completely free. Posting a listing is also free. Coins are only needed to boost a listing or run an ad.",
"faq.q2": "How do I post a listing?",
"faq.a2": "Download the app, sign in with your phone number, tap 'Post a Listing', and follow the 6-step form. It takes under 5 minutes.",
"faq.q3": "What are coins and how do I buy them?",
"faq.a3": "Coins are Manzeli's virtual currency. Buy them via Cash (agent reference code), Baridimob bank transfer, or Chargily Pay online.",
"faq.q4": "How does the boost system work?",
"faq.a4": "Boosting enters your listing into a live coin bid. The top 3 bids get priority placement. You see your projected rank before confirming.",
"faq.q5": "How do I contact a property owner?",
"faq.a5": "Open any listing and tap 'Call via Phone' or 'Contact via WhatsApp'. A free account is required to send contact requests.",
"faq.q6": "Is my personal data safe?",
"faq.a6": "Your phone number is used for login only. KYC documents are stored securely and never shared with third parties.",
"faq.q7": "How do I get a verified badge?",
"faq.a7": "Go to Profile → Verify Identity. Upload your national ID (member) or agent license (agent). Approval takes 1–2 business days.",
"faq.q8": "What payment methods are accepted for coins?",
"faq.a8": "Cash via agent reference code, Baridimob bank transfer with receipt upload, or Chargily Pay online card payment.",
"faq.q9": "Can I list a property for exchange?",
"faq.a9": "Yes — when creating a listing, select 'Exchange' as the listing type. Buyers will know your property is open to a swap.",
"faq.q10": "What wilayas are covered?",
"faq.a10": "All 48 Algerian wilayas are selectable in the location filter.",
"faq.q11": "How does the AI chatbot work?",
"faq.a11": "The Manzeli AI Assistant understands Arabic, French, and English — type or speak. It recommends listings and answers real estate questions.",
"faq.q12": "How do I delete or deactivate a listing?",
"faq.a12": "Go to Profile → My Listings, tap the listing menu, and choose Delete (permanent) or Deactivate (hides it temporarily)."
```

---

## Performance Notes

| Item | Recommendation |
|------|----------------|
| `searchListings` (Featured) | Add `next: { revalidate: 300 }` — 5-min SSR cache |
| Hero video | Add `posterSrc` + host locally; add `<link rel="preload" as="video">` in `<head>` |
| `heroSection.png` (App Download) | Convert to AVIF/WebP; verify served dimensions match rendered size |
| New sections (static content) | Client components only where animations require it; keep data-less sections as server components |
| Stats counter animation | Trigger only on viewport entry (`useInView` from `motion/react`) to avoid running off-screen |
| Testimonials carousel | Use `scroll-snap-type` CSS + passive touch events; avoid heavy JS carousel libraries |
| FAQ accordion | Use `motion/react AnimatePresence` with `height: auto` via `useMeasure` (`react-use-measure`) |

---

## Color & Brand Reference

| Token | Hex | Usage in new sections |
|-------|-----|----------------------|
| Primary blue | `#0078FD` | CTAs, icons, active states, badge pills |
| Deep blue | `#064BCD` | Gradient backgrounds |
| Teal accent | `#2FE0D7` | AI section eyebrow, gradient accents |
| Amber | `#F59E0B` | Boost section, star ratings |
| Surface light | `#F8F9FC` | How It Works, Categories, Testimonials, FAQ bg |
| Surface dark | `#0D0D0F` | Why Manzeli, Boost Promo bg |
| Text primary | `#111827` | Headings |
| Text muted | `#6B7280` | Subtitles, body text |
| Border subtle | `#E5E7EB` | Card rings, separators |

---

## Implementation Order (Recommended)

1. **Fix existing sections first** (stats i18n, poster, empty params, cache) — zero new components needed.
2. **Stats Band** (Section 8) — simplest new section, standalone, no data fetch.
3. **Why Manzeli** (Section 7) — static copy, builds brand trust.
4. **How It Works** (Section 5) — interactive tabs, medium complexity.
5. **Property Categories** (Section 6) — reuses `usePropertyTypes` hook, medium complexity.
6. **For Agents** (Section 12) — static copy + mockup card.
7. **AI Chatbot Promo** (Section 9) — animated mockup, slightly complex.
8. **Coin Boost Promo** (Section 10) — animated rank widget.
9. **Testimonials** (Section 11) — carousel, needs real data pipeline later.
10. **FAQ** (Section 13) — accordion, purely static.
