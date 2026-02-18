# LIC Premium Calculator Pro (PWA)

React 18 + Vite PWA app for LIC premium estimation with offline-first data storage.

## Stack
- React 18 + Vite
- Tailwind CSS 4
- Framer Motion
- Zustand
- React Router (HashRouter)
- Dexie (IndexedDB)
- jsPDF + html2canvas
- Vite PWA (Workbox)

## Run
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Data + Compliance Notes
- Plan catalog and metadata are in `src/data/plans.ts`.
- Research references are in `src/data/research.ts`.
- Premium rates in this build are representative quick-quote rates; import official actuarial tables for final binding quotes.
- GST logic is date-aware in `src/utils/gst.ts` and includes legacy calculation support.

## Key Paths
- Premium engine: `src/utils/premium-engine.ts`
- Calculator UI: `src/components/calculator/PremiumForm.tsx`, `src/components/calculator/ResultCard.tsx`
- Plan encyclopedia: `src/pages/PlansPage.tsx`
- PWA config: `vite.config.ts`
