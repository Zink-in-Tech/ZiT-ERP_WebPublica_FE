# Exploration: Ticket promedio micro-tool

> Phase: sdd-explore · Change: `ticket-promedio` · Branch: `ch0rch/ticket-promedio`
> Investigated read-only against the master plan and reference implementations.

## Current State

- `docs/microherramientas-comerciantes.md` (lines 45-51, 167-176) defines the tool: slug `ticket-promedio`, Mode A (list of sale amounts, manual/CSV → total/count/average) and Mode B (total facturado + cantidad de ventas → average), plus a "cómo mejorar tu ticket" text block. It also states the shared design criteria: one Astro page per tool, `Layout`/`Header`/`Footer`, short hero, `localStorage` with a **unique versioned key**, "Limpiar" action, scrollable list containers, optional CTA.
- `src/pages/recursos/index.astro` confirms the "Próximamente" card already exists (`upcomingTools`, lines 58-70) with copy that **already promises both modes, period comparison, and improvement tips** — but has no `link` field yet. `availableTools` (lines 6-56) is the array to add the shipped entry to.
- `src/pages/recursos/precios-inteligentes/index.astro` is the closest reference: hero → educational content → 3 steps → collapsible "+INFO" → `#herramienta` block → two WhatsApp CTA modals → final CTA. State lives in one inline `<script define:vars={{ WHATSAPP_CTA_NUMBER }}>` block using `localStorage` key `precios-inteligentes-v3`, hand-rolled `parseCSV`/CSV export (Blob + BOM), and a `confirm()`-gated "Limpiar".
- `src/pages/recursos/etiquetas-gondola/` + `src/scripts/etiquetas-gondola-app.ts` show the alternate pattern: a separate `src/scripts/<slug>-app.ts` module is used only when there's a real npm dependency (jsPDF, JsBarcode) or reusable typed interfaces — imported via a bare `<script>import '...'</script>`.
- `src/pages/recursos/caja-diaria/index.astro` **already computes and displays "Ticket Promedio"** (`totalIncome / incomeMovements.length`, lines 540-542) — i.e., Mode B's exact formula is live elsewhere today, using an unversioned `localStorage` key `movements` (an outlier vs. the documented versioned-key convention).
- `src/layouts/Layout.astro` takes `title`/`description`/`image`/`noindex` props, auto-derives canonical URL, wires `astro-seo`, and globally tags `<main>` for skip-links + `.animate-on-scroll` fade-ins.
- No shared `src/utils/csv.ts` or localStorage helper exists — CSV parsing is duplicated verbatim across `precios-inteligentes` (inline) and `codigos-de-barras-app.ts`.

## Affected Areas

- `src/pages/recursos/ticket-promedio/index.astro` — new page (does not exist yet).
- `src/pages/recursos/index.astro` — move the Ticket promedio entry from `upcomingTools` to `availableTools` (add `link`, drop "Próximamente" framing).
- Possibly `src/scripts/ticket-promedio-app.ts` — only if the inline-vs-separate-file fork resolves toward a separate module.
- `docs/microherramientas-comerciantes.md` — status table update once shipped (per the doc's own "Cómo usar este doc" instruction).

## Approaches

1. **Inline `<script>` in the .astro page (precios-inteligentes pattern)** — arithmetic + optional CSV, no heavy npm dependency.
   - Pros: matches the closest complexity analog; self-contained page, easy single-file review.
   - Cons: harder to unit-test in isolation if period-comparison logic grows.
   - Effort: Low.

2. **Separate `src/scripts/ticket-promedio-app.ts` module (etiquetas-gondola/codigos-de-barras pattern)** — used when there's an npm dependency or reusable typed module.
   - Pros: testable in isolation, exported TS types, consistent with "heavier tool" precedent.
   - Cons: over-engineered for the doc's "Baja complejidad" rating unless period comparison is confirmed in scope.
   - Effort: Low-Medium.

## Recommendation

Inline `<script>` (precios-inteligentes style) fits the documented complexity and the tool's actual shape (arithmetic + optional CSV, no npm dependency) — reserve the separate-file pattern for if/when period comparison or CSV-with-dates logic grows non-trivial enough to warrant isolated typed functions.

## Risks

- Public copy on `/recursos/index.astro`'s "Próximamente" card already commits to CSV import, period comparison, and improvement-tips content — if the proposal descopes any of this for v1, that copy needs a matching edit in the same change.
- Period comparison is a materially bigger feature than the doc's "Baja complejidad" tag implies (needs two data sets/date ranges/possibly a "meta" concept) — must be explicitly scoped before estimation.
- No proposal decision yet on whether the new tool should relate to Caja Diaria's existing live "Ticket Promedio" stat (same formula, different page) — affects UX and possible data reuse.
- CSV/localStorage-helper duplication continues unless explicitly addressed — consistent with current practice, not a blocker.

## Open Product Questions (for the proposal round)

1. Mode A (list of sales) vs Mode B (two numbers) vs both — what ships in v1?
2. Period comparison: in or out of v1 scope? (The live "Próximamente" card promises it.)
3. Relationship to Caja Diaria's existing "Ticket Promedio" stat — cross-link, data reuse, or independent?
4. CSV import format (columns, separator, header row).
5. `localStorage` key convention (versioned, e.g. `ticket-promedio-v1`).
6. CTA choice: WhatsApp vs registro vs both (precios-inteligentes uses WhatsApp modals + final CTA).
7. Content of the "cómo mejorar tu ticket" educational block (upsell, combos).
8. Empty-state handling and SEO depth (meta title/description in Spanish).

## Ready for Proposal

Yes — resolve the open product questions above in `sdd-propose`.
