# Technical Documentation: Venn Fashion Digital Platform

## Architecture Overview
Venn Fashion digital platform is built with modern high-performance semantic HTML5, custom Vanilla CSS layout system, and responsive interactive JavaScript modules.

## Brand Identity & Aesthetic Guidelines
- **Brand Name**: Venn Fashion
- **Design Language**: Minimalist Luxury & Contemporary High Fashion
- **Typography**: Google Fonts integration (*Syne* / *Playfair Display* for editorial headings, *Plus Jakarta Sans* / *Inter* for body copy)
- **Color Tokens**:
  - Primary Background: Crisp Neutral (#FFFFFF / #FAF8F5)
  - Surface Accent: Luxe Obsidian (#111111)
  - Highlight Accent: Terracotta Gold (#D4A373 / #C85A32)
  - Text Primary: Deep Charcoal (#1A1A1A)

## Legacy Site Architecture Analysis
- **Structure**: Static HTML page (`index.html`) scraped/exported from a Shopify Storefront theme (`Orange Culture`).
- **Styles**: Vendor grid, Shopify theme `base.css`, `modules.css`, `custom_style.css`, and bundled `css/inline_styles.css`.
- **Scripts**: Bundled Shopify theme scripts (`vendor.min.js`, `theme_global.js`, `product_list.js`, `inline_scripts.js`).
- **Asset Folders**: Local asset mirrors under `cdn/`, `cdn.shopify.com/`, `orangeculture.com.ng/`, `checkouts/`, and `shop.app/`.
- **Target Migration Stack**: React (Vite / Next.js) deployed to **Vercel**, fetching dynamic CMS content/collections directly from **GitHub Gists** via REST/GraphQL API.

## Upgraded Interactive Features
1. **Interactive Cart State Context**: Global React state management handling cart drawer toggle, item quantity adjustments, subtotal calculations, and checkout triggers.
2. **Hero Carousel Engine**: Autoplay slideshow with smooth CSS opacity keyframes, progress indicators, manual next/previous navigation controls, and mobile swipe triggers.
3. **Quick-View Modal**: Interactive pop-up presenting detailed product specs, gallery switching, size/color variant pickers, and quick add-to-cart functionality.
4. **Collection Filter & Search Engine**: Real-time category filtering and price/name sorting for product catalog browsing.
5. **Toast Notification System**: Instant feedback popups upon subscribing to newsletter or modifying cart items.
6. **Size Guide Modal**: Detailed measurement tables (Chest, Waist, Hips, Sleeve) and tailored fit recommendations.
7. **Recently Viewed Tracker**: Local storage persistence keeping track of browsed products for instant re-engagement.
9. **Dynamic Multi-Currency Engine**: Translates base USD prices into EUR, GBP, and NGN using context-bound rates and localized symbol layouts.
10. **Checkout Discount Engine**: Validates promo entries (such as `VENN10` for 10% off) and recalculates checkout subtotals dynamically.

