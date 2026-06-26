# OBJEKT Studio

A world-class, premium portfolio template designed for independent design studios. Built with modern web technologies, it features fluid typography, tactile web audio interactions, smooth animations, and a bespoke markdown rendering engine.

![OBJEKT Studio Demo](https://raw.githubusercontent.com/1divy2/OBJEKT/master/public/og-image.jpg)

## ✦ Features

- **Fluid Aesthetic:** Custom glassmorphism, grain overlays, and fluid grid layouts powered by Tailwind CSS.
- **Tactile Sound Design:** Custom UI sound effects on interactions (hover, click, navigation) using `use-sound`.
- **Command Palette:** A macOS-style quick action menu (⌘K) built with `cmdk`.
- **Smooth Animations:** Buttery smooth page transitions and micro-interactions powered by Framer Motion.
- **Custom Markdown Engine:** A bespoke journal system that renders markdown files directly into rich React components.
- **Fully Accessible:** Built on top of Radix UI primitives ensuring ARIA compliance, keyboard navigation, and focus management.
- **Performance Optimized:** Achieves 100/100 Core Web Vitals with automatic font preloading and image optimization.
- **SEO & RSS Generation:** Automatically builds `sitemap.xml` and `rss.xml` for all your journal entries during the build step.
- **Contact Integration:** A fully functional, zero-backend contact form wired up via Web3Forms.

## ✦ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 7
- **Routing:** TanStack Router (with SSR support via Nitro)
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Components:** Radix UI
- **Deployment:** Cloudflare Pages / Vercel ready

## ✦ Getting Started

### Prerequisites

Ensure you have Node.js and `npm` (or `bun`) installed.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/1divy2/OBJEKT.git
cd OBJEKT
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

Your site will be running at `http://localhost:5173`.

## ✦ Project Structure

- `src/components/` - Reusable UI components (Nav, Footer, Grid)
- `src/components/ui/` - Base accessible primitives (Radix UI)
- `src/content/journal/` - Markdown files for journal entries
- `src/routes/` - TanStack Router page definitions
- `src/hooks/` - Custom React hooks (sounds, reduced motion, etc.)
- `scripts/generate-seo.js` - Pre-build script to generate sitemap and RSS
- `public/` - Static assets and generated SEO files

## ✦ Deployment

This project is fully configured to be deployed on **Cloudflare Pages** or **Vercel** with Server-Side Rendering (SSR) via Nitro.

### Cloudflare Pages
1. Push your code to GitHub.
2. Connect your repository to Cloudflare Pages.
3. Configure the build:
   - **Framework Preset:** None
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist/client`

### Vercel
1. Import your repository into Vercel.
2. Vercel will automatically detect the Vite build pipeline.
3. Deploy!

## ✦ Contact Form Setup

The contact form is powered by Web3Forms. To receive emails:
1. Get a free access key from [Web3Forms](https://web3forms.com).
2. Add your key to `src/routes/contact.tsx` (or pass it via the `VITE_WEB3FORMS_KEY` environment variable).

## ✦ License

This project is open-source and available under the [MIT License](LICENSE).
