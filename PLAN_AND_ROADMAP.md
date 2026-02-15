# 🏛️ History Encyclopedia Project - Action Plan & Roadmap

## 🎯 Goal
Create an outstanding, premium-quality history encyclopedia website inspired by WorldHistory.org, but with a modern, dynamic, and "cool" UI.

## 🛠️ Technology Stack
*   **Framework:** Next.js (React) - For best performance, SEO, and developer experience.
*   **Styling:** Tailwind CSS - For rapid, flexible, and modern styling.
*   **UI Library:** Lucide React (Icons), Framer Motion (Animations).
*   **Font:** Google Fonts (e.g., *Merriweather* for headings, *Inter* or *Lato* for body text) to give a classic yet modern feel.
*   **Deployment:** Vercel (recommended for later).

## 🗄️ Content Management Strategy (How you will add articles)
Since you are not a developer, we will separate the "Code" from the "Content".
*   **The "Frontend" (What we build):** This is the beautiful website visitors see.
*   **The "CMS" (Content Management System):** This is a private "Admin Dashboard" for you.
    *   You log in to a simple dashboard (like WordPress or Notion).
    *   You click "New Article", type your text, upload images, and hit "Publish".
    *   The website automatically pulls this new content and displays it beautifully.
    *   *Recommendation:* **Sanity.io** or **Contentful** (Easy to use, free tiers available).

## 🎨 Design Aesthetics "The Cool Factor"
*   **Theme:** "Modern Classic". Deep, rich colors (Royal Blue, Crimson, Gold) mixed with clean whites and parchment textures.
*   **Interactive Elements:**
    *   Smooth page transitions.
    *   Hover effects on article cards (scale, glow).
    *   Interactive Timeline (horizontal scrolling with parallax).
    *   Glassmorphism effects for navigation and overlays.
*   **Layout:**
    *   **Hero Section:** Full-width immersive background images with bold typography.
    *   **Grid System:** Masonry or clean grid layouts for article browsing.

## 🗺️ Roadmap

### Phase 1: Foundation & Setup (Current Focus)
1.  **Initialize Project:** Set up Next.js with Tailwind CSS.
2.  **Configure Design System:**
    *   Define Color Palette in `tailwind.config.js`.
    *   Set up Fonts.
    *   Create global styles (CSS variables).
3.  **Core Layout Components:**
    *   Responsive Navbar (Mega-menu style).
    *   Footer (Rich links, newsletter signup).

### Phase 2: Core Components Usage
1.  **UI Components:**
    *   buttons (Primary, Secondary, Ghost).
    *   Article Cards (Image, Title, Excerpt, Tags).
    *   Section Headers.
2.  **Home Page:**
    *   Featured Article Hero.
    *   "On This Day" section.
    *   Recent Articles Grid.

### Phase 3: Advanced Features
1.  **Article Page:**
    *   Beautiful typography for reading.
    *   Table of Contents (Sticky).
    *   Image Gallery.
2.  **Interactive Timeline:** A scrollable horizontal timeline component.
3.  **Search Functionality:** A robust search bar with filters (Era, Region).

### Phase 4: Content & Refinement
1.  **Mock Data:** Create JSON/TS files with sample historical data.
2.  **Performance Optimization:** Image optimization, lazy loading.
3.  **SEO Setup:** Meta tags, Open Graph images.

## 🚀 Next Steps
1.  Initialize the Next.js app in the current folder.
2.  Install necessary dependencies (`framer-motion`, `lucide-react`, etc.).
3.  Clean up the default boilerplate and verify the server runs.
