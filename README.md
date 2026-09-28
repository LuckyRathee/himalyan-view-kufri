# Himalyan View Kufri — Hotel Website

Single-page React site for Himalyan View Kufri (Vite + React 19 + Tailwind CSS v4 + Lucide icons).

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, S3…).

## Before going live — edit `src/App.jsx`

1. **`HOTEL` config (top of file):** phone and WhatsApp are set; confirm the email, address, social links and check-in/out times.
2. **Room prices (`ROOMS`):** currently ₹6,000 / ₹7,000 / ₹8,000 per night; update here if the tariff changes.
3. **Inquiry form:** with `formEndpoint` left empty, the form opens the guest's email app pre-filled. To receive submissions directly, create a free Formspree / Web3Forms endpoint and paste its URL into `HOTEL.formEndpoint`.
4. **Domain:** replace `https://www.himalyanviewkufri.com/` in `index.html` (canonical, Open Graph and JSON-LD tags) with your real domain.

## Photos

All photos live in `public/images/`. The four primary slots are keyed by their placeholder labels in the `IMAGES` object in `src/App.jsx`. Each rendered `<img>` also carries a matching `data-placeholder` attribute.

| Slot | File | Where |
| --- | --- | --- |
| `[IMAGE_PLACEHOLDER_1_HERO_VIEW]` | `hero-balcony-view.jpg` | Full-screen hero background |
| `[IMAGE_PLACEHOLDER_2_PROPERTY_EXTERNAL]` | `exterior.jpg` | About section, beside the text |
| `[IMAGE_PLACEHOLDER_3_DELUXE_ROOM]` | `deluxe-room.jpg` | Featured room card |
| `[IMAGE_PLACEHOLDER_4_DINING_OR_BALCONY]` | `dining.jpg` | Large gallery tile |

To swap a photo, drop the new file into `public/images/` and update `src`, `width` and `height` in `IMAGES` (or `PHOTOS` for the secondary gallery images).
