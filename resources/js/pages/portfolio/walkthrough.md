# Walkthrough: Dark Mode Card Styling & Document Root Theme Sync Fix

We fixed the issue where cards, metrics, terminal widgets, and profile buttons rendered with a light grey background in Dark Mode.

---

## Root Cause & Solution Implemented

### 1. **Document Root Dark Class Synchronization (`PortfolioLayout.tsx`)**
- Added `useEffect` hook in `PortfolioLayout.tsx` to automatically toggle `document.documentElement.classList.add('dark')` / `remove('dark')` whenever `isDark` state changes.
- Ensured Tailwind CSS `dark:` variant is active across all components on document root.

### 2. **Explicit Dark Card Styling (`home.tsx` & `skills.tsx`)**
- Updated all cards, metric boxes (`99.99%`, `50k+`, `5+ Yrs`, `15+`), terminal containers, GitHub profile button, architecture pillars, featured projects, code playground, and testimonials to use explicit rich dark obsidian containers (`bg-[#090914]/90` / `bg-[#0c0c16]` / `bg-[#0f0f1c]`) with subtle `border-white/10` borders and high-contrast text in Dark Mode.

---

## Verification Results

- **Asset Compilation**: `npm run build` completed cleanly in 2.65s.
- **HTTP Endpoint**: `GET /` returned `200 OK`.
