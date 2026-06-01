# SEO / Local Visibility Implementation Notes For Claude

Research date: 2026-06-01

Role lens: senior Google data engineer + CMO. Optimize for real local foot traffic,
not vanity SEO. The site should help Google understand the entity, help customers
decide to visit, and reinforce the Google Business Profile.

## Source Guidance Used

- Google SEO Starter Guide:
  https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Business Profile local ranking guidance:
  https://support.google.com/business/answer/4454429
- Google Local Business structured data:
  https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google title link guidance:
  https://developers.google.com/search/docs/appearance/title-link
- Google meta tags supported by Search:
  https://developers.google.com/search/docs/crawling-indexing/special-tags
- Google canonical URL guidance:
  https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google sitemap guidance:
  https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google image SEO best practices:
  https://developers.google.com/search/docs/appearance/google-images
- Google Business Profile photos/videos guidance:
  https://support.google.com/business/answer/6103862
- Google Business Profile in-store products guidance:
  https://support.google.com/business/answer/9934993
- Google Search Console ownership verification:
  https://support.google.com/webmasters/answer/9008080
- Google Search Console URL Inspection:
  https://support.google.com/webmasters/answer/9012289

## Current Site SEO Audit

Strong points already present:

- One fast static page with no framework dependency.
- Good location language: downtown Southern Pines, NC.
- Clear category language: gifts, antiques, clothing, cards, vintage finds, useful
  oddities.
- Address is visible in the Visit section and footer.
- Instagram and Google Maps links are present.
- Content is crawlable HTML, not hidden behind client-rendered app state.

Missing or risky:

- No canonical URL.
- No JSON-LD structured data for the local business.
- No `robots.txt` or `sitemap.xml`.
- `og:image` is relative and points to the logo; better social/local previews need
  an absolute 1200x630-ish image.
- H1 is currently "Welcome in." That is good brand voice but weak entity labeling.
- Header links to `/cart`, but there is no committed cart page. This can produce a
  crawl/UX dead end unless a real cart page exists at deployment.
- All gallery image alt text is generic. Better alt text can improve accessibility
  and image understanding.
- No verified hours, phone number, Google rating, or review excerpts. Do not invent
  them.
- No Search Console verification token or analytics/measurement plan yet.

## Priority 0: Protect Crawlability And Trust

1. Remove or neutralize the `/cart` nav link until there is a real cart page.
   - If e-commerce is not active, remove the cart icon from global nav.
   - If John wants it visible, create a simple `cart.html` placeholder that clearly
     says online checkout is not available yet and links back to the shop/contact.
   - Do not let users and crawlers hit a 404 from the primary navigation.

2. Add a canonical link in `index.html`:

```html
<link rel="canonical" href="https://www.leweysgeneralstore.com/" />
```

3. Make Open Graph URLs absolute:

```html
<meta property="og:url" content="https://www.leweysgeneralstore.com/" />
<meta property="og:image" content="https://www.leweysgeneralstore.com/assets/og-image.jpg" />
```

Do not add `og-image.jpg` unless the file exists.

## Priority 1: Entity Clarity On The Page

Google's title-link guidance says Google may use the `<title>`, visible page title,
H1, `og:title`, prominent text, and link text to generate title links. The current
H1 "Welcome in." is warm but does not reinforce the business entity.

Recommended H1 structure:

```html
<h1 class="hero__heading" id="hero-heading">Lewandowski's General Store</h1>
<p class="hero__lede">Gifts, antiques, clothing, cards, and useful oddities in downtown Southern Pines.</p>
```

Keep "Welcome in." as an eyebrow or supporting line:

```html
<p class="hero__eyebrow">Welcome in. Downtown Southern Pines, North Carolina</p>
```

Recommended title/meta:

```html
<title>Lewandowski's General Store | Gifts & Antiques in Southern Pines, NC</title>
<meta name="description" content="Visit Lewandowski's General Store in downtown Southern Pines, NC for gifts, antiques, clothing, cards, vintage finds, and useful oddities." />
```

Keep the copy human. Do not stuff "gift shop Southern Pines" repeatedly.

## Priority 2: Add LocalBusiness JSON-LD

Add inline JSON-LD in the `<head>` after the Open Graph tags. Use only verified
facts. It is fine to omit phone, hours, and reviews until John verifies them.

Suggested starting point:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://www.leweysgeneralstore.com/#store",
  "name": "Lewandowski's General Store",
  "url": "https://www.leweysgeneralstore.com/",
  "image": "https://www.leweysgeneralstore.com/assets/logo.png",
  "logo": "https://www.leweysgeneralstore.com/assets/logo.png",
  "description": "A downtown Southern Pines general store for gifts, antiques, clothing, cards, vintage finds, and useful oddities.",
  "email": "skisgeneralstore@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "124 W Pennsylvania Ave",
    "addressLocality": "Southern Pines",
    "addressRegion": "NC",
    "postalCode": "28387",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.instagram.com/lewandowskis_sp/"
  ]
}
</script>
```

After John verifies details, add:

- `telephone`
- `openingHoursSpecification`
- `hasMap`
- `geo` latitude/longitude, if verified
- `priceRange`, if John is comfortable with a broad value

Do not add `aggregateRating` or `review` unless review data is shown on the page
and John has rights/approval to publish it. Avoid marking up third-party Google
reviews copied from Maps unless policy and source rights are clear.

## Priority 3: Add `robots.txt` And `sitemap.xml`

For a one-page static site:

`robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://www.leweysgeneralstore.com/sitemap.xml
```

`sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.leweysgeneralstore.com/</loc>
    <lastmod>2026-06-01</lastmod>
  </url>
</urlset>
```

Update `lastmod` only when the shipped homepage content materially changes.

## Priority 4: Improve Image SEO And Social Preview

1. Replace generic gallery alt text with specific descriptions:
   - `Vintage-style cards, cap, and shelf goods at Lewandowski's General Store`
   - `Wood display drawers with cards, candles, and vintage finds in the shop`
   - `Yellow storefront arcade at 124 W Pennsylvania Ave in Southern Pines`

2. Keep alt text descriptive, not keyword-stuffed.

3. Add width/height attributes to gallery images if practical to reduce layout
   shift.

4. Create a real OG image:
   - 1200x630 JPG.
   - Use storefront or interior, not just logo.
   - Include readable store name only if the image remains clean.
   - Save as `assets/og-image.jpg`.

5. Consider renaming future image assets descriptively before use:
   - `lewandowskis-general-store-southern-pines-storefront.jpg`
   - `lewandowskis-general-store-vintage-gifts-cards.jpg`

Existing filenames can remain if renaming creates churn; descriptive alt text is
the first move.

## Priority 5: Google Business Profile Alignment

This is mostly owner-side, but the site should support it. Google says local
results are primarily based on relevance, distance, and prominence. The controllable
levers are completeness, accurate hours, reviews, photos, products, and consistency.

Owner/John tasks:

- Verify or claim the Google Business Profile.
- Confirm exact business name: `Lewandowski's General Store`.
- Confirm primary category. Likely candidates to evaluate in GBP:
  - Gift shop
  - General store
  - Antique store
  - Clothing store
  Pick the category that best matches real customer intent and GBP availability.
- Add secondary categories only if truly accurate.
- Add full address exactly as the site uses it:
  `124 W Pennsylvania Ave, Southern Pines, NC 28387`.
- Add phone number if the business has one for customers.
- Add regular and special hours. Keep holiday/special hours current.
- Add business description aligned with the site:
  `A downtown Southern Pines general store for gifts, antiques, clothing, cards, vintage finds, and useful oddities.`
- Upload owner photos:
  - storefront/exterior so visitors recognize the entrance
  - interior wide shot
  - cards/paper goods
  - vintage finds/antiques
  - clothing/accessories
  - logo
- Ask customers for reviews after good visits and respond to every review.
- If eligible, add in-store products through Google Business Profile / local
  inventory so people can see what is available before visiting.

Site tasks that support GBP:

- Make the website wording match the GBP description/categories.
- Keep NAP consistent everywhere: name, address, phone if added.
- Link prominently to Google Maps directions.
- If a phone number is added to GBP, add it visibly to the site and structured data.

## Priority 6: Local Citations And Prominence

Build consistent mentions from sources that make sense for Southern Pines / Moore
County. Do not spam low-quality directories.

Targets to verify/update:

- Moore Choices listing.
- The Pines Times event/listing.
- Southern Pines business/downtown association pages, if available.
- Chamber of commerce profile, if John is a member.
- Instagram bio link and profile name/address.
- Apple Maps, Bing Places, Yelp, Facebook, TripAdvisor only if relevant and
  maintainable.

Every citation should use the same NAP formatting as the site.

## Priority 7: Measurement Setup

Do not add analytics scripts until John approves privacy/tooling. Minimum Google
measurement stack:

1. Verify Search Console for `https://www.leweysgeneralstore.com/`.
   - If using HTML meta verification, John must provide the exact token.
   - Add it in the `<head>` only after receiving the token.

2. Submit `sitemap.xml` in Search Console.

3. Use URL Inspection after deployment to request indexing of the homepage.

4. Track baseline queries:
   - lewandowski's general store
   - lewandowskis general store
   - leweys general store
   - southern pines general store
   - gifts southern pines nc
   - antique store southern pines
   - gift shop downtown southern pines
   - cards southern pines
   - vintage gifts southern pines

5. Track local actions:
   - website clicks from GBP
   - direction requests
   - phone calls, if phone is added
   - review count and rating trend

## Priority 8: Future Content That Can Actually Rank

Do not create thin blog posts. For a small store, useful local pages beat generic
content.

Good future pages if the site grows beyond one page:

- `/visit/` with address, parking notes, storefront photo, hours, directions, and
  nearby downtown context.
- `/what-youll-find/` with category details and rotating shelf photos.
- `/events/` only if events are real and maintained.
- `/gift-cards/` only if gift cards exist.
- `/press/` only after real mentions are verified.

Potential page titles:

- `Visit Lewandowski's General Store in Downtown Southern Pines`
- `Gifts, Cards, Antiques & Vintage Finds in Southern Pines`

## Implementation Checklist

Claude should implement in this order:

1. Remove/fix `/cart` nav dead end.
2. Change H1 to the store name while preserving "Welcome in." as brand copy.
3. Add canonical URL.
4. Add LocalBusiness JSON-LD with verified facts only.
5. Add `robots.txt`.
6. Add `sitemap.xml`.
7. Improve gallery alt text.
8. Add absolute OG URL fields and create/use an actual OG image if available.
9. Update `context.md` if any verified facts are added.
10. Serve locally and check:
    - homepage loads
    - no missing asset paths
    - no unintended CDN dependencies
    - `/cart` no longer 404s from nav
    - JSON-LD is valid JSON

## Validation Commands

Static checks:

```bash
python3 -m http.server 8000
```

Then manually open:

- `http://localhost:8000/`
- `http://localhost:8000/robots.txt`
- `http://localhost:8000/sitemap.xml`

Useful command-line checks:

```bash
curl -I http://localhost:8000/
curl -s http://localhost:8000/ | rg "canonical|application/ld\\+json|og:image|Lewandowski"
curl -s http://localhost:8000/robots.txt
curl -s http://localhost:8000/sitemap.xml
```

External validation after deployment:

- Google Rich Results Test for structured data.
- Search Console URL Inspection.
- Search Console sitemap submission.

## Do Not Do

- Do not publish fake hours.
- Do not publish Google review count/rating until verified.
- Do not copy Google review text directly into the page without approval.
- Do not add keyword-stuffed city/category lists.
- Do not add external scripts, trackers, or CDNs without John approving.
- Do not create a blog just to have content.
