# shinegallery — Modern & Contemporary Indian Fine Art Gallery

An elegant, multi-page fine art gallery web application recreation of **[Rhythm Art Gallery](https://rhythmartgallery.com/)** under the brand identity **shinegallery** (Shine Gallery), tailored for static hosting on **GitHub Pages** via **GitHub Actions**.

Built by GitHub user **[Aman22kr](https://github.com/Aman22kr)**.

---

## 1. Project Overview & Brand Identity

* **Reference Website:** [https://rhythmartgallery.com/](https://rhythmartgallery.com/) (Rhythm Art Gallery, Mumbai)
* **New Brand Name:** **shinegallery** (Shine Gallery)
* **GitHub Username:** `Aman22kr`
* **Repository Name:** `shinegallery`
* **Target Hosting:** GitHub Pages (Static SPA)
* **Routing Strategy:** Hash-based routing (`HashRouter`) for clean static hosting without server rewrite requirements
* **Animation Profile:** Normal speed with Strong expressive transitions

Shine Gallery connects discerning art collectors, interior designers, and corporate curators worldwide with masterworks of modern and contemporary Indian art. Featuring original oil and acrylic paintings, hand-cast bronze sculptures, signed limited-edition serigraphs, and bespoke art advisory services.

---

## 2. Implemented Pages & Features

| Route | Page | Description & Key Features |
| :--- | :--- | :--- |
| `#/` | **Homepage** | Hero showcase, master artist spotlight, category tiles, curated highlights with interactive filter tabs, 16:9 curator video walkthrough placeholder, testimonials, and sponsor ad placeholder. |
| `#/paintings` / `#/artworks` | **Artworks Catalog** | Faceted multi-filtering (Medium, Style, Orientation, Artist, Price Value), multi-column grid toggle, live search, sorting, and active filter reset pills. |
| `#/artwork/:slug` | **Artwork Detail** | Interactive zoom viewer, custom framing finish selector with dynamic pricing (Teak floating, Museum black, Stretched, Rolled), specs table, provenance dossier, authenticity certificate guarantee, and related art carousel. |
| `#/sculptures` | **Sculptures Gallery** | Specialized catalog for 3D cast bronze, hammered brass, and mixed-media sculptures. |
| `#/serigraphs` | **Serigraphs & Prints** | Hand-pulled, pencil-signed limited editions by modern masters (S.H. Raza, Thota Vaikuntam). |
| `#/artists` | **Artists Directory** | Comprehensive A-Z directory index, category filtering (Modern Masters, Contemporary, Emerging Voices), search, and artist cards. |
| `#/artist/:slug` | **Artist Profile** | In-depth biography, artistic statement, education, solo/group exhibition records, awards, and complete catalogue of available works. |
| `#/exhibitions` | **Exhibitions & Salons** | Current, Upcoming, and Past shows, dates, venue info, curator statements, and downloadable PDF catalogues. |
| `#/exhibition/:slug` | **Exhibition Detail** | Detailed curatorial note, featured artists roster, exhibition works grid, and private viewing RSVP reservation form. |
| `#/advisory` | **Art Advisory & Framing** | Residential & corporate curation consultancy, bespoke artist commissions, interactive framing studio preview, and inquiry brief form. |
| `#/about` | **About Shine Gallery** | 35-year gallery heritage, curatorial philosophy, 100% authenticity guarantee, and Khar West Mumbai gallery details. |
| `#/contact` | **Contact & Visit** | Physical gallery address, opening hours, interactive map visualizer, inquiry form, and collector FAQ accordion. |
| `#/blog` | **Art Journal** | Editorial collecting guides, framing advice, master artist retrospectives, and category filters. |
| `#/blog/:slug` | **Journal Article** | Comprehensive reading view, reading time, author credentials, tags, and related guides. |
| `#/wishlist` | **Saved Artworks** | Saved collector favorites persisted in `localStorage`, shareable link generator, and bulk inquiry trigger. |
| `#/cart` | **Acquisition Bag** | Inquiry cart with per-item framing selection, real-time currency conversions, and checkout reservation form. |
| `*` | **404 Not Found** | Custom curatorial archive missing notice with navigation shortcuts and search. |

### Standout Interactive Elements

* **Interactive Room AR Simulator (`RoomVisualizerModal`):** View any artwork dynamically rendered to scale on 4 interior walls (Contemporary Living Room, Executive Boardroom, Master Suite, Gallery Salon) with customizable wall colors and frame styles.
* **Multi-Currency Engine:** Instant price conversions between INR (₹), USD ($), EUR (€), and GBP (£) with localized formatting and persistent memory.
* **Global Real-Time Search:** Live autocomplete search index covering artists, titles, mediums, and styles with quick keyword chips.
* **Compact Ad Placeholders (`AdPlaceholder`):** Reusable, visually unobtrusive cultural sponsor placeholders positioned near the bottom of every page.
* **YouTube Aspect-Ratio Placeholder (`YouTubePlaceholder`):** Blank placeholder strictly preserving the standard 16:9 aspect ratio and video player aesthetics without embedding third-party tracking scripts.

---

## 3. Project Directory Structure

```text
shinegallery/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Authoritative GitHub Actions workflow for Pages
├── dist/                       # Production build output (generated via npm run build)
├── src/
│   ├── components/
│   │   ├── AdPlaceholder.tsx          # Reusable compact advertising placeholder
│   │   ├── ArtistCard.tsx             # Artist portfolio preview card
│   │   ├── ArtworkCard.tsx            # Artwork card with quick actions
│   │   ├── Breadcrumbs.tsx            # Accessible breadcrumbs navigation
│   │   ├── Footer.tsx                 # Gallery footer with directory & newsletter
│   │   ├── InquiryModal.tsx           # Direct curatorial inquiry modal
│   │   ├── Navbar.tsx                 # Header with live search, currency & menu
│   │   ├── QuickViewModal.tsx         # Fast inspection modal with zoom preview
│   │   ├── RoomVisualizerModal.tsx    # Interactive wall AR simulator
│   │   └── YouTubePlaceholder.tsx     # 16:9 blank video player placeholder
│   ├── context/
│   │   └── GalleryContext.tsx         # State management & localStorage persistence
│   ├── data/
│   │   ├── artists.ts                 # Modern & contemporary artist records
│   │   ├── artworks.ts                # Original paintings, sculptures & serigraphs
│   │   ├── blogPosts.ts               # Collector guides & art journal articles
│   │   └── exhibitions.ts             # Curated gallery exhibitions data
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Advisory.tsx
│   │   ├── ArtistDetail.tsx
│   │   ├── Artists.tsx
│   │   ├── ArtworkDetail.tsx
│   │   ├── Artworks.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Contact.tsx
│   │   ├── ExhibitionDetail.tsx
│   │   ├── Exhibitions.tsx
│   │   ├── Home.tsx
│   │   ├── InquiryBag.tsx
│   │   ├── NotFound.tsx
│   │   ├── Sculptures.tsx
│   │   ├── Serigraphs.tsx
│   │   └── Wishlist.tsx
│   ├── App.tsx                        # HashRouter setup, layout & global modals
│   ├── index.css                      # Tailwind CSS v4 & custom gallery typography
│   └── main.tsx                       # React 19 application entry point
├── .gitignore                         # Standard git ignore rules (includes node_modules & dist)
├── index.html                         # HTML5 entry with metadata, OpenGraph & Google Fonts
├── metadata.json                      # AI Studio applet metadata configuration
├── package.json                       # Dependencies & build scripts
├── package-lock.json                  # Deterministic lockfile (validated for npm ci)
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite build configuration with base: './'
└── README.md                          # Full documentation & deployment guide
```

---

## 4. Prerequisites & Environment Compatibility

* **Node.js:** `v20.x` or `v22.x` (LTS recommended; tested with Node.js 22)
* **npm:** `v10.x` or higher
* **Browser:** Chrome, Safari, Firefox, Edge (Modern evergreen browsers)

---

## 5. Local Setup & Development Commands

### 1. Clone the repository
```bash
git clone https://github.com/Aman22kr/shinegallery.git
cd shinegallery
```

### 2. Install dependencies (using deterministic lockfile)
```bash
npm ci
```
*(Or `npm install` if making dependency modifications)*

### 3. Start the local development server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 4. Verify TypeScript and syntax
```bash
npm run lint
```

### 5. Generate production build
```bash
npm run build
```
Build output is generated into the `dist/` directory with relative asset paths (`./assets/...`).

### 6. Preview production build locally
```bash
npm run preview
```

---

## 6. LocalStorage Data Persistence

The application uses browser `localStorage` to preserve user session state across refreshes:

| Storage Key | Type | Purpose |
| :--- | :--- | :--- |
| `shinegallery_wishlist` | `string[]` | Saved artwork IDs added to favorites |
| `shinegallery_inquiry_bag` | `BagItem[]` | Artworks added to the acquisition bag, including selected frame choice and quantity |
| `shinegallery_currency` | `'INR' \| 'USD' \| 'EUR' \| 'GBP'` | User's preferred currency selection |
| `shinegallery_recently_viewed` | `string[]` | Up to 8 recently inspected artwork IDs |
| `shinegallery_recent_searches` | `string[]` | Recent search keyword queries |
| `shinegallery_inquiries` | `InquirySubmission[]` | Logged client inquiry forms and reservation receipts |

### LocalStorage Limitations
* Data is stored exclusively in the user's local browser and device.
* Clearing browser cookies/cache resets stored favorites and cart items.
* Does not synchronize across multiple devices or private browser tabs.
* Never used for storing passwords, credit cards, or sensitive secrets.

---

## 7. GitHub Actions Deployment to GitHub Pages

The primary and authoritative deployment method is automated via GitHub Actions using `.github/workflows/deploy.yml`.

### Step-by-Step GitHub Pages Setup:

1. **Push the repository to GitHub:**
   ```bash
   git add .
   git commit -m "Initial release of shinegallery for GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages via Actions:**
   * Open your repository on GitHub: `https://github.com/Aman22kr/shinegallery`
   * Navigate to **Settings** > **Pages** (in the left sidebar).
   * Under **Build and deployment** > **Source**, select:
     **`GitHub Actions`** (do not select "Deploy from a branch").

3. **Automatic Deployment Trigger:**
   * Every push to the `main` branch automatically triggers `.github/workflows/deploy.yml`.
   * The workflow checks out the code, sets up Node.js 22, runs `npm ci`, builds the static bundle via `npm run build`, and uploads the `./dist` artifact to GitHub Pages.

4. **Access the Live Deployed Site:**
   * Once the workflow finishes, your site will be live at:
     **`https://aman22kr.github.io/shinegallery/`**

---

## 8. Troubleshooting Common Deployment Issues

* **Assets 404 on GitHub Pages:**
  * Ensure `base: './'` is configured in `vite.config.ts`. This ensures assets load relative to the repository subfolder path rather than the domain root.
* **404 on Direct Page Refresh:**
  * Because GitHub Pages does not support server-side routing rewrites, this application uses `HashRouter`. URLs look like `https://aman22kr.github.io/shinegallery/#/paintings`. Direct reloads and bookmarks will always resolve correctly without a custom `404.html` redirect hack.
* **`npm ci` failing in GitHub Actions:**
  * Ensure `package-lock.json` is committed and not ignored in `.gitignore`.
  * Ensure dependencies in `package.json` match `package-lock.json`.
* **Workflow permission errors:**
  * Ensure repository permissions grant `id-token: write` and `pages: write` as declared in `.github/workflows/deploy.yml`.

---

## 9. Customization & Reusing for Another Brand

To adapt this template for another gallery or brand:
1. **Brand Identity:** Update `metadata.json`, `index.html`, and `Navbar.tsx` brand titles.
2. **Catalog Data:** Update `src/data/artworks.ts`, `src/data/artists.ts`, and `src/data/exhibitions.ts`.
3. **Gallery Address & Contact:** Modify address and contact coordinates in `src/pages/Contact.tsx` and `src/components/Footer.tsx`.
4. **Theme Tokens:** Adjust color palette and typography in `src/index.css`.

---

## 10. Mock Implementations & Current Scope

* **No Backend Server Required:** All catalog filtering, searching, and inquiry submissions are executed client-side.
* **Payment Processing:** Checkout and acquisition forms simulate authentic art reserving behavior, storing customer inquiries in `localStorage` and presenting confirmed receipts without billing or charging real credit cards.
* **Video Placeholders:** Video areas utilize clean, 16:9 ratio placeholders as requested instead of embedding external YouTube tracking players.
