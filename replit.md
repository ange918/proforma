# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Artifacts

- **proforma-africa** (`/`) — ProformaAfrica: single-page invoice/quote/proforma generator for francophone African freelancers and SMEs. React + Vite, frontend-only (no routing, no backend, no DB). Form on left + live preview on right + PDF download. PDF generation via `@react-pdf/renderer` + `file-saver`. QR code generation via `qrcode` (Mobile Money payment info, encoded as scannable text payload). LocalStorage auto-save under key `proforma-africa:donnees:v1` with 400ms debounce + reset confirm dialog. Phosphor icons, Unbounded + Plus Jakarta Sans typography, custom green/gold design system via raw CSS variables in `src/index.css`. Key files: `src/App.tsx` (single page + persistence), `src/components/Formulaire.tsx` (includes Mobile Money operator + RIB/IBAN/SWIFT bank fields, conditional on payment mode), `src/components/Apercu.tsx` (live preview + QR rendering via `useEffect` + `QRCode.toDataURL`, exports `buildMobileMoneyPayload`), `src/components/FacturePDF.tsx` (`generatePDF` is async — pre-generates QR data URL before rendering PDF Image), `src/lib/utils.ts`, `src/types.ts`.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
