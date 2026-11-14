# Fonty's Beach Bar & Venue

A seven-page static website for Fonty's Beach Bar & Venue in Gaire Village, Central Province, Papua New Guinea.

## Included

- `index.html` — Home
- `about.html` — About Fonty's and April Sardi
- `menu.html` — Food & Drinks overview
- `online-menu.html` — Structured online menu categories and enquiry actions
- `events.html` — Events & Entertainment ideas
- `calendar.html` — Interactive month-by-month events calendar
- `contact.html` — Contact, exact map pin, hours, and table/private-event WhatsApp booking form
- `style.css` — Shared responsive visual system
- `script.js` — Mobile navigation, current year, WhatsApp form handoff, and calendar rendering
- `assets/` — Supplied Fonty's logo, optimized WebP reference photography, and image credits
- `manus-routes.json` — Route manifest for the managed preview

## Run locally

Because the site is plain HTML, CSS and JavaScript, it needs no install step. From this folder run:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deploy

Upload the contents of this folder directly to Cloudflare Pages or another static host. Use the project root as the publish directory and do not add a build command.

## Content notes

The supplied Fonty's logo is used in the site header, footer and project metadata. General tropical beach and hospitality reference images remain in use because no official venue photography was supplied; replace them with approved venue photography when available. The menu pages intentionally stay at the category level until actual item names and pricing are confirmed. The contact form supports both table reservations and private events, collecting booking type, contact details, date, time, guest count, occasion/event type, and an additional message before opening WhatsApp. The events calendar is functional but contains no fabricated dates; add confirmed `YYYY-MM-DD: 'Event title'` entries to `confirmedEvents` in `script.js` when Fonty's supplies the schedule. The TikTok label remains non-clickable until the exact profile URL is confirmed.

The provided Google Maps location link is used for directions, and the resolved map pin is embedded at `-9.645374, 147.398919`.
