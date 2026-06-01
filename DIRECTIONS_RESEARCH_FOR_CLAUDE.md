# Directions / Landmark Research For Claude

Research date: 2026-06-01

Goal: improve the site's Visit/Directions experience so people can confidently
find Lewandowski's General Store, recognize the storefront, and understand nearby
landmarks before they arrive.

## Source Patterns Reviewed

Large retail:

- Apple Store pages expose address, phone, store hours, and clear store-service
  actions. Example: Apple Fifth Avenue.
  Source: https://www.apple.com/retail/fifthavenue
- Target location pages expose address, phone, "Directions," "Call Store," "Store
  map," hours, and in-store amenities. This is practical and action-first.
  Example: https://www.target.com/sl/location/1299
- Whole Foods' store finder sets the customer expectation around "store hours and
  directions" plus shopping actions.
  Source: https://www.wholefoodsmarket.com/stores

Destination / museum pages:

- The Broad's "Directions and Parking" page pairs a map image with "Get Directions,"
  parking entrance details, parking rates, bike parking, transit, and nearby garage
  caveats.
  Source: https://www.thebroad.org/visit/directions-and-parking
- APEX Museum explicitly says it wants the visit to begin with "ease and
  confidence" and includes driving, transit, accessible parking, and walking
  directions from nearby landmarks.
  Source: https://www.apexmuseum.org/directions-parking
- The Skyscraper Museum gives corner/cross-street context and step-by-step walking
  directions using visible intersections and landmarks.
  Source: https://skyscraper.org/map-and-directions/
- Pardee Home Museum gives corner context and a nearby garage location.
  Source: https://pardeehome.org/map-directions/

Map technology:

- Google Maps Embed API supports iframe maps with place, view, directions,
  streetview, and search modes. Official API use requires an API key and allows
  interactive maps without custom JavaScript.
  Source: https://developers.google.com/maps/documentation/embed/embedding-map
- Google Maps Embed API overview says embeds are iframe-based and free to use,
  but still require Google Cloud/API-key setup.
  Source: https://developers.google.com/maps/documentation/embed/get-started
- Google Maps URLs can be used as plain links for directions without embedding
  a third-party iframe into the page.
  Source: https://developers.google.com/maps/documentation/urls/get-started

Local/source facts:

- Moore Choices lists Lewandowski's at `124 Pennsylvania Ave.`, "In the Belvedere
  Plaza," Southern Pines, NC 28387, and describes vintage toys, nostalgic candies,
  antiques, clothing, unique finds, a fridge, and antique jukebox.
  Source: https://www.moorechoices.net/shop-moore-county-shopping
- Visit Pinehurst describes Southern Pines Historic Downtown around Broad Street
  between Connecticut and Indiana, on both sides of the railroad tracks, with
  specialty shops, galleries, cafes, trees, flowers, and courtyards.
  Source: https://homeofgolf.com/directory/southern-pines-historic-downtown/
- Sunrise Theater is a recognizable downtown landmark at 250 NW Broad St.
  Source: https://sunrisetheater.com/contact
- Southern Pines historic district design guidelines note that the 100 block of
  W Pennsylvania Avenue contains some of downtown's oldest buildings, including
  the Belvedere Hotel at 120 W Pennsylvania Avenue.
  Source: https://www.southernpines.net/DocumentCenter/View/9147/Southern-Pines-Design-Guidelines---February-3-2025?bidId=

## Pattern Synthesis

High-performing location pages do four jobs:

1. Give one-tap actions: Directions, call, store hours, map.
2. Confirm identity: address, storefront photo, local landmark context.
3. Reduce arrival friction: parking, entrance, cross streets, "look for..." notes.
4. Serve different modes: driving, walking from nearby landmarks, transit if relevant.

For Lewandowski's, the highest-value version is not a complex route planner. It is a
simple "you'll recognize us when you get here" section with:

- Exact address.
- A large "Get directions" button.
- A local static map/snapshot.
- Storefront or arcade photo.
- Landmark bullets: Belvedere Plaza, W Pennsylvania Ave, downtown Southern Pines,
  near Broad Street/Sunrise Theater context.
- Parking/entrance notes after John verifies them.

## Recommended Implementation

Default approach: no external dependency.

Use a self-contained "Find us" section with:

- Local image: storefront/exterior or arcade entrance.
- Local static map graphic: simple SVG or PNG, stored in `assets/`.
- Buttons linking out to Google Maps and Apple Maps.
- Landmark cards with concise directions.

This respects the repo's "no external CDN dependencies" constraint and still gives
visitors the key directional context.

Optional approach: Google Maps iframe.

Only add an iframe if John explicitly approves a third-party map embed/API key. If
approved, use official Google Maps Embed API, not random embed generators. Keep a
static fallback image and text directions for privacy, performance, and failed-load
cases.

## Proposed Section Structure

Replace or expand the existing Visit section into:

```text
Find us downtown

124 W Pennsylvania Ave
Southern Pines, NC 28387

[Get directions] [Open in Apple Maps]

Look for us:
- In Belvedere Plaza on W Pennsylvania Ave.
- A short walk from Broad Street and the downtown shops.
- Near the Sunrise Theater side of downtown Southern Pines.

Before you go:
- Hours can shift; check Instagram for today's hours.
- Parking note: [VERIFY WITH JOHN].
- Entrance note: [VERIFY WITH JOHN].
```

Recommended visual layout:

- Desktop: two-column section.
  - Left: copy/actions/landmark bullets.
  - Right: stacked visuals: storefront snapshot above static local map.
- Mobile: copy, buttons, storefront image, map image, landmark bullets.

## Suggested Copy

Heading:

> Find us downtown

Lead:

> We're tucked into Belvedere Plaza on W Pennsylvania Ave, right in downtown
> Southern Pines.

Directions buttons:

- `Get directions`
- `Open in Apple Maps`
- `Check today's hours on Instagram`

Landmark bullets:

- `On W Pennsylvania Ave in Belvedere Plaza`
- `A short walk from Broad Street shops, cafes, and galleries`
- `Near the Sunrise Theater side of downtown Southern Pines`
- `Look for the yellow arcade and Lewandowski's sign`

Parking note placeholder:

> Parking: [John to verify the best visitor parking note.]

Entrance note placeholder:

> Entrance: [John to verify the exact "look for..." entrance guidance.]

Do not publish parking details until verified.

## Local Map Concept

Create a simple stylized map as a local asset, not a detailed navigational product.
It should be an arrival aid, not a replacement for Google Maps.

Elements to show:

- W Pennsylvania Ave.
- NW/SW Broad Street and railroad line as orientation.
- Marker for Lewandowski's / Belvedere Plaza.
- Marker for Sunrise Theater.
- Marker for "Downtown shops & cafes."
- Optional: "Southern Pines station" only if verified and useful.

Style:

- Warm paper background.
- Brick-red store marker matching brand accent.
- Thin dark street lines.
- Small labels, high contrast.
- 16:9 or 4:3 aspect ratio.
- Save as `assets/downtown-directions-map.svg` or `.png`.

If using SVG, keep it hand-authored and simple. Do not include live map tiles,
Google map styling, or copied map data beyond broad street/landmark orientation.

## Snapshot Recommendations

Use two local images:

1. Storefront / yellow arcade exterior.
   - Purpose: help visitors recognize the building before they park/walk.
   - Current candidate: `assets/gallery/photo-04.jpeg` or another exterior shot
     if Claude/John has a better one.

2. Entrance/detail image.
   - Purpose: show the doorway/sign/Belvedere Plaza approach.
   - Needs John photo if current gallery does not show the entrance clearly.

Alt text examples:

- `Yellow arcade storefront for Lewandowski's General Store on W Pennsylvania Ave`
- `Lewandowski's General Store entrance in Belvedere Plaza`
- `Simple downtown Southern Pines map showing Lewandowski's near Broad Street`

## Map Link URLs

Google Maps directions link:

```html
https://www.google.com/maps/dir/?api=1&destination=124%20W%20Pennsylvania%20Ave%2C%20Southern%20Pines%2C%20NC%2028387
```

Google Maps place/search link:

```html
https://www.google.com/maps/search/?api=1&query=Lewandowski%27s%20General%20Store%20124%20W%20Pennsylvania%20Ave%20Southern%20Pines%20NC
```

Apple Maps link:

```html
https://maps.apple.com/?q=Lewandowski%27s%20General%20Store&address=124%20W%20Pennsylvania%20Ave%2C%20Southern%20Pines%2C%20NC%2028387
```

Use Google Maps directions as the primary CTA. Apple Maps can be secondary.

## Optional Google Maps Embed

If John approves external embed/API setup:

```html
<iframe
  title="Map to Lewandowski's General Store"
  width="600"
  height="420"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=124%20W%20Pennsylvania%20Ave%2C%20Southern%20Pines%2C%20NC%2028387">
</iframe>
```

Requirements:

- Do not commit a real unrestricted API key casually.
- Restrict the API key by HTTP referrer in Google Cloud.
- Keep a static fallback map and directions text.
- Update `context.md` because this breaks the current "no external dependencies"
  assumption.

## SEO / Local Visibility Benefit

This section should improve:

- User confidence and foot traffic.
- Local relevance signals through clear NAP and neighborhood language.
- Accessibility for visitors who need parking/entrance details.
- Conversion from mobile search: the primary action becomes "Get directions."

It should not try to game SEO. Keep the text natural and useful.

## Claude Implementation Checklist

1. Confirm current Visit section in `index.html`.
2. Add a "Find us downtown" subsection or replace "Visit us" with that stronger
   direction-oriented block.
3. Use current verified facts only:
   - `124 W Pennsylvania Ave, Southern Pines, NC 28387`
   - Belvedere Plaza, based on Moore Choices public listing.
   - Downtown Southern Pines / W Pennsylvania Ave.
   - Sunrise Theater and Broad Street as nearby downtown context.
4. Add Google Maps and Apple Maps outbound buttons.
5. Add storefront snapshot with accurate alt text.
6. Add a static local map asset if feasible; otherwise create a clear placeholder
   note for John/Claude to add the map asset next.
7. Do not publish parking/entrance specifics until John verifies them.
8. If adding a Google Maps iframe, get explicit approval first and document it in
   `context.md`.
9. Preview mobile and desktop; ensure buttons are thumb-friendly and text does not
   crowd the images.

## Open Questions For John

- What is the best parking instruction for first-time visitors?
- Is "Belvedere Plaza" the preferred way to describe the exact location?
- What should people look for from the sidewalk or street?
- Can John provide a current storefront photo and a close entrance/sign photo?
- Is a Google Maps iframe acceptable, or should the site remain fully self-contained?
