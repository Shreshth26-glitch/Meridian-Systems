# Meridian Elevate

Meridian Systems — UI/UX design prompt

Scope

This prompt covers visual design and frontend interactions only. Do not implement CMS integration, authentication, databases, or any backend logic — use static placeholder content where real data would eventually load. All of that is handled separately.

Brand

Meridian Systems is a premium enterprise digital-transformation company. The site should feel like Stripe's polish and Linear's precision applied to IBM/Accenture-level enterprise trust — confident, engineered, restrained. It must NOT look like a generic agency template or an obviously AI-generated site: no floating drop-shadow cards, no glassmorphism, no default centered-hero layouts, no stock rainbow gradients.

1. Color system

Two themes, same token names, values flip. Sky blue is the only color that stays identical in both themes.

Token Light Dark Background primary #FFFFFF #071C3C Background secondary #F5F8FC #050F24 Text primary #0A2540 #FFFFFF Text secondary #4A5A72 #9FB4CC Text muted #7D8DA3 #7D93AE Navy (buttons/text/borders) #0F4C81 #38BDF8 Accent sky blue #38BDF8 (same in both) #38BDF8 Accent cyan (interaction-only, never a fill) #00D4FF #00D4FF Border #E3EBF3 #123058

Hard rule: in the light theme, navy is for text, borders, and button fills only — never a large background surface. Sky blue carries the visual interest against white; navy never becomes a big flat panel in light mode. In dark theme, navy becomes the background and sky blue becomes the primary button/accent color.

2. Typography

Headings: General Sans or Inter Tight (fallback Inter if unavailable)

Body: Inter

Scale (modular, 1.25 ratio): H1 44–60px (use clamp(2.75rem, 5vw, 3.75rem)), H2 32px, H3 22px, H4 18px, body 16px, small/caption 13px

Line height: 1.05–1.1 for large headings, 1.6 for body text

Only one true <h1> per page. Do not use heading tags for visual styling on non-heading text — style paragraphs/labels to match a heading's visual weight using font-size/weight instead.

3. Global layout rules

Large whitespace, thin hairline dividers (0.5–1px solid border token), no drop shadows anywhere except a functional focus/hover ring (see button spec)

No glassmorphism, no neumorphism, no obvious/heavy gradients as background fills — the only gradient-like treatment allowed is soft radial glows (sky blue/cyan at low opacity) used sparingly for hero/card art, generated in code rather than photographed

Container max-width should use available width efficiently — avoid large unused side margins; content should feel like it's using the canvas, not floating in a narrow centered column

4. Header

Persistent across all pages, floating pill style

Left: circular logo mark (initial letter, navy fill/white text in light theme, sky-blue fill/navy text in dark theme) + wordmark

Center: pill-shaped nav bar — Services, Work, Company, Insights — white bg with hairline border (light) / translucent white on navy (dark)

Right: Ask AI trigger (small pill button, icon + label, solid navy fill in light / solid sky blue in dark — build as a UI trigger only, no working chat logic needed here) and a Book Consultation outlined CTA

Theme toggle (sun/moon icon) placed in the header, switches a data-theme attribute

Mobile: collapses to logo + hamburger + Ask AI icon; hamburger opens a full-height slide-in drawer with the same four links stacked, large tap targets, must trap focus and close on Escape

5. Hero section — build to this exact spec

This is the most important section to get right; follow every detail below.

Layout

Two-column split: text column 58–60% width, visual column 40–42% width

Content starts near the true left edge of the container (small side inset, roughly 24–48px) — do not leave large empty gutters on either side of the hero; the columns should use the full available width

Vertically centered within the hero

Background

A real, relatable background image or generated visual sits behind/within the hero — subtle, not overpowering the text. Options: a soft abstract engineering/network visual, a blueprint-grid pattern with faint sky-blue radial glows, or (once available) a real photographic image with a light-to-white gradient overlay so text stays legible. In dark theme, same treatment inverted (navy base, white-to-navy overlay)

Must not reduce text contrast — text needs to stay easily readable against whatever sits behind it

Text column content, in order

Small eyebrow label (not a heading tag) — short horizontal line + uppercase label, sky blue, 12–13px, letter-spacing ~1.2px. Example: "Digital transformation engineering"

Headline as the page's real <h1> — large (per type scale above), tight line-height, one word can carry the sky-blue accent color (e.g. "excellence")

One supporting paragraph, <p>, 15–18px, --text-secondary, font-weight ~500 for a bit more visual presence than typical body copy

Two CTA buttons, side by side (see button spec below)

Visual column

An engineering/network-style visualization (nodes + connecting lines) or the background image itself extending into this column — should feel intentional and technical, not decorative filler

Buttons — small, hover without color change

Padding 11px 20px (primary) / 10px 20px (secondary), font-size 13px, border-radius 6px — deliberately compact, not oversized

Primary: solid navy fill (light) / solid sky blue fill (dark), white/navy text respectively

Secondary: outlined, 1.5px border, transparent fill

Hover effect must NOT change the button's background or text color. Instead: transform: translateY(-2px) plus a solid accent ring via box-shadow: 0 0 0 3px rgba(56,189,248,0.35) (primary) or rgba(10,37,64,0.15) (secondary) — a sharp ring, not a soft glow/blur. Primary button's arrow icon slides translateX(4px) on hover. Active/pressed state: scale(0.97), ring and lift removed. Same ring treatment on keyboard focus-visible.

6. Signature solutions — 6 cards, Infosys-style, grow on hover

Below the hero, a section showcasing 6 flagship services (not all 15 — this is a curated highlight, the full list lives on /services).

Card anatomy (match the reference image style exactly):

Large image/art panel filling the top ~65–70% of the card — each of the 6 cards gets a visually distinct abstract art treatment (varied compositions of soft sky-blue/cyan radial glows and organic shapes, generated in code — not stock photography, not identical patterns repeated across cards)

White content panel below the image, rounded corners, containing: title (H4-weight), a 2–3 line description, and a "Learn more →" link (navy text, sky-blue underline accent)

Image panel and content panel form one continuous rounded card (matching the reference: image top, white bottom, one unified card shape)

Hover interaction

On hover, the entire card scales up noticeably larger than its resting size — transform: scale(1.05–1.08) — combined with a slight translateY(-4px) lift

Transition: smooth, 350–400ms cubic-bezier(.2,.8,.2,1) — should feel substantial and deliberate, not twitchy

No box-shadow drop — rely on the scale/lift alone plus a very subtle brightening of the image beneath (e.g. slight increase in the art's glow opacity) to sell the "coming forward" feeling

Since cards grow beyond their resting footprint, allow adjacent cards enough gap (at least 20–24px) that a hovered card doesn't visually collide with its neighbors

Grid

3 columns × 2 rows on desktop, 2 columns on tablet, 1 column on mobile

All 6 use the identical card structure — no card should be a different size/shape than the others (unlike the earlier "one large + two small" idea; this version is a uniform 6-card grid)

7. Full services directory (/services) — remaining pattern

This page lists all 15 services (including the 6 signature ones) using a different, more compact interaction — this is intentionally distinct from the signature cards above, since this is a scan-able directory, not a highlight reel.

Default state: icon + service name only, flat, no color, no image

Hover/focus state: a soft sky-blue radial art tint fades in behind the content, one-line description slides in, small sky-blue corner accent triangle appears — must work identically on keyboard focus, not just mouse hover

Grid: 5 columns desktop, 2 tablet, 1 mobile

Each card links to a service detail page

8. Service detail page template

One reusable template for each service:

Breadcrumb: Home / Services / [Service name]

Header: icon chip (pale sky-blue background) + title + one-line tagline

Two-column body: overview text + capabilities list (left, ~60%) and a white bordered sidebar card with quick facts — timeline, industries served, team size, tech stack — plus a "Book a scoping call" button (right, ~40%)

Related work: 2–3 case study cards below, each with a light sky-blue-tinted art thumbnail (same technique as elsewhere — never a navy fill), title, one-line tag

9. Footer

Light theme: soft gray background, navy text, sky-blue links

Dark theme: near-black navy background, white text, sky-blue links

Newsletter input, quick links column, Careers/Resources/Socials/Legal, copyright line

What to avoid (explicit)

No large navy/dark background fills anywhere in the light theme except buttons

No box-shadow "floating card" look — use hairline borders and the specified hover transforms only

No glassmorphism/blur panels

No identical repeated gradient patterns across the 6 signature cards — each must look distinct

No color-change hover on hero buttons — transform + ring only, as specified

No generic centered hero — content is left-aligned per the 58–60% / 40–42% split


## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
