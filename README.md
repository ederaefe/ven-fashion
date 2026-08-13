# Venn Fashion | Contemporary Luxury & Headless CMS Workspace

A modern serverless digital flagship architecture reimagining luxury fashion retail on the edge. Built with React 18, Vite, Tailwind CSS v4, and Cloudflare Workers KV.

---

## 📁 Workspace Architecture

The workspace consists of three modular sub-projects:

1. **`venn-fashion-app` (Digital Flagship Storefront)**:
   - A highly refined, responsive frontend utilizing glassmorphic aesthetics.
   - Features a custom **Progressive GIF Motion Preview Engine** rendering 5-second fashion previews on desktop hover and auto-playing on mobile quick-view modal taps.
   - Interactive overlays: Slide-over Shopping Cart, Wishlist panel, Size Guide modal, Live Search overlay, and Toast notifications.

2. **`venn-cms-admin` (Headless CMS Dashboard)**:
   - A standalone dashboard running concurrently to manage product catalogs, collections, and homepage slideshows.
   - Fully loaded with Gist integration hooks and a Raw JSON Payload Exporter.

3. **`venn-cms-worker` (Edge Database API)**:
   - A serverless Cloudflare Worker acting as a low-latency API router, reading/writing catalog states directly from **Cloudflare Workers KV**.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js (v18+) installed.

### Installation & Launching Dev Servers

To launch the entire workspace ecosystem concurrently:

```bash
# 1. Start the main Storefront (Port 5173)
cd venn-fashion-app
npm install
npm run dev

# 2. Start the CMS Admin Dashboard (Port 5174)
cd venn-cms-admin
npm install
npm run dev -- --port 5174

# 3. Start the Cloudflare Worker API (Port 8787)
cd venn-cms-worker
npm install
npm run dev
```

---

## ⚡ Production Compilation

Verify compilation compliance across both client frontends:

```bash
# Build storefront
cd venn-fashion-app && npm run build

# Build CMS dashboard
cd venn-cms-admin && npm run build
```
