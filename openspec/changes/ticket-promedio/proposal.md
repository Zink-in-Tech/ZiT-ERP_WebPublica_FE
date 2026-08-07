# Proposal: Ticket promedio micro-tool

> Phase: sdd-propose · Change: `ticket-promedio` · Branch: `ch0rch/ticket-promedio`
> Artifact language: English. Strings marked **literal copy** are es-AR site copy and ship verbatim.

## Intent

**Problem.** A small Argentine retailer knows their daily total but not what one sale is worth on average. Without that number they cannot set a goal ("subir el ticket"), cannot tell whether last month was better, and cannot judge whether upselling or combos actually worked. Today the only place the number exists on our site is a read-only stat buried inside Caja Diaria, computed from movements the merchant had to load for another purpose.

**Value.** One page that answers "¿cuánto sale en promedio cada venta?" in under 30 seconds, with no signup, and lets the merchant name a period ("julio") to compare against the next one.

**Lead-gen role.** Same engineering-as-marketing play as the other four tools: ungated, SEO-targeted at "ticket promedio" queries, adjacent to ZinkERP (a POS/ERP computes this automatically and continuously), with a WhatsApp CTA and a closing CTA toward the product.

**Now.** `/recursos` already publishes a "Próximamente" card that promises both input modes, period comparison, and improvement tips. The promise is live; the page is not.

## User-visible behavior

1. **Hero** — short title, one-line value promise, 3–4 bullets. Literal copy: *"Ticket promedio: sabé cuánto sale en promedio cada venta"*.
2. **Mode selection** — two tabs. Literal copy: *"Cargar lista de ventas"* (Mode A) and *"Cálculo rápido"* (Mode B).
3. **Mode B (quick)** — two inputs: *"Total facturado"*, *"Cantidad de ventas"*. Result updates live.
4. **Mode A (list)** — add sale amounts one by one, or import CSV (single amount column, header optional, `,` or `;`). Scrollable list, per-row delete, CSV export (Blob + `﻿` BOM, Excel-friendly).
5. **Results block** — three figures: total, cantidad de ventas, and the highlighted *"Ticket promedio"*.
6. **Save a period** — text input for a name, button *"Guardar período"*. Persists to `localStorage`.
7. **Comparison** — after a second save, the page shows the variation vs the previously saved period: *"Ticket promedio de agosto: $1.650 — +10,0% vs julio"*. Up/down styling; nothing shown when there is no prior period.
8. **Educational block** — *"Cómo mejorar tu ticket"*: upsell, combos, complementary products, minimum-purchase thresholds.
9. **CTAs** — WhatsApp CTA modal plus a final CTA toward ZinkERP, mirroring `precios-inteligentes`.
10. **Limpiar** — `confirm()`-gated, clears amounts and saved periods.

**Worked example.** Merchant enters `450000` and `300` in quick mode → sees **$1.500**. Saves it as *"julio"*. Next month enters `495000` / `300` → sees **$1.650** and *"+10,0% vs julio"*.

## Scope

| In scope | Out of scope |
|---|---|
| New page at `/recursos/ticket-promedio` | Date ranges or calendar pickers |
| Mode A: manual entry + CSV import + CSV export | Full history table (only current vs previous saved period) |
| Mode B: total ÷ count | Reading or importing Caja Diaria's `movements` data |
| Save one named period; compare against the previous one | Any backend, account, or lead-capture form |
| Educational "cómo mejorar tu ticket" block | Goal/meta tracking beyond the comparison figure |
| WhatsApp + final ZinkERP CTAs | Refactoring the shared CSV/localStorage duplication |
| Mutual cross-links with `/recursos/caja-diaria` | Changing Caja Diaria's own ticket-promedio calculation |
| Move the `/recursos` card from `upcomingTools` to `availableTools` | New test runner or npm dependency |

**Public-promise constraint.** The existing "Próximamente" card commits to both modes, period comparison, and improvement tips. This scope satisfies all three, so the card moves to `availableTools` with a `link` and the "Comparar períodos y metas" bullet reworded to what actually ships (comparison against a saved period, not goal tracking).

## Capabilities

### New Capabilities
- `ticket-promedio-tool`: average-ticket calculation with two input modes, browser-persisted named periods, single-period comparison, CSV import/export, and lead-gen CTAs.

### Modified Capabilities
- None. (`openspec/specs/` is empty; no existing capability specs to amend.)

## Approach

Adopt the exploration's recommendation: a **single Astro page with an inline `<script define:vars={{ WHATSAPP_CTA_NUMBER }}>`**, following `src/pages/recursos/precios-inteligentes/index.astro`. Rationale: arithmetic plus CSV only, zero npm dependencies, and the project has no test runner — a separate `src/scripts/*.ts` module would buy testability we cannot currently exercise while splitting a single-file review. The separate-module pattern stays reserved for tools with a real library dependency (jsPDF, JsBarcode).

- Persistence: `localStorage` key `ticket-promedio-v1` (versioned, per the documented convention — deliberately unlike Caja Diaria's unversioned `movements`). Shape: `{ amounts: number[], periods: [{ name, average, total, count, savedAt }] }`, retaining at most the last two periods.
- CSV export: `Blob` + `﻿` BOM + `\r\n`, same as the reference.
- "Limpiar": `confirm()`-gated.
- SEO: Spanish meta title/description via `Layout` props; canonical is auto-derived.
- No `src/data/*.ts` change, no Sanity/blog impact, no new dependency, no test-runner prerequisite.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/pages/recursos/ticket-promedio/index.astro` | New | The tool page (hero, modes, results, periods, education, CTAs, inline script) |
| `src/pages/recursos/index.astro` | Modified | Move entry from `upcomingTools` to `availableTools`; add `link`; align bullets |
| `src/pages/recursos/caja-diaria/index.astro` | Modified | Add link from its "Ticket Promedio" stat to the new tool (cross-link only) |
| `docs/microherramientas-comerciantes.md` | Modified | Mark `ticket-promedio` as Hecho in the ficha, the priority table, and the status list |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Shipped copy under-delivers vs the live "Próximamente" promise | Med | Card copy is rewritten in the same PR; scope covers all three promised items |
| Merchants expect Caja Diaria data to appear here automatically | Med | Cross-link copy states the tools are independent; empty state explains manual entry |
| `upcomingTools` becomes an empty array, breaking the section render | None | Verified: `src/pages/recursos/index.astro:147` already guards with `{upcomingTools.length > 0 && (...)}`, so the "Próximamente" section self-hides |
| Period comparison feels thin (only one prior period) | Low | Explicit non-goal; history table deferred to a later change |
| CSV variety (separators, currency symbols, thousands dots) | Med | Accept `,`/`;`, strip `$`/spaces, parse es-AR decimals; show a per-row skipped-lines notice |
| Changed lines exceed the 800-line review budget | Med | Single-PR delivery accepted; tasks phase forecasts and slices if needed |

## Rollback Plan

Static site with no backend or data migration. Revert the PR (or redeploy the previous Netlify build). The new route disappears, the `/recursos` card returns to `upcomingTools`, and the Caja Diaria link is removed. Merchant `localStorage` under `ticket-promedio-v1` is orphaned but harmless; no other tool reads that key.

## Dependencies

- None. No new npm package, no test runner, no infra or redirect change.

## Success Criteria

- [ ] `/recursos/ticket-promedio` is live and usable end-to-end on mobile and desktop, with no signup.
- [ ] Quick mode: `450000 / 300` displays `$1.500`.
- [ ] List mode: manual entry and CSV import both produce total, count, and average; CSV export opens correctly in Excel.
- [ ] Saving "julio" then "agosto" shows the percentage variation against "julio"; data survives a page reload.
- [ ] The `/recursos` card appears under available tools with a working link and copy consistent with what shipped.
- [ ] Caja Diaria and the new tool link to each other.
- [ ] `docs/microherramientas-comerciantes.md` shows `ticket-promedio` as Hecho in all three places.
- [ ] `npx astro check` and `npm run build` pass.

## Proposal question round (pending owner review)

Interactive question round could not be run from this executor. Assumptions taken; correct any of these before spec/design:

1. **Comparison depth** — assumed the tool keeps only the last two named periods and shows one variation. Is overwriting the older period acceptable, or should saving a third period warn?
2. **CSV shape** — assumed a single amount column with optional header, `,`/`;` separator, es-AR decimals, and non-numeric rows skipped with a visible notice. Should a date column be tolerated and ignored?
3. **Cross-link direction** — assumed the Caja Diaria link sits on its existing "Ticket Promedio" stat card. Prefer a different placement?
4. **Card bullet rewording** — assumed "Comparar períodos y metas" becomes comparison-only wording since goal tracking is out of scope. Keep the word "metas" as aspiration copy?
5. **Educational block depth** — assumed 3–4 short tips (upsell, combos, complementarios, monto mínimo). Want longer SEO-oriented content instead?
