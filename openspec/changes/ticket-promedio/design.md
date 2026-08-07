# Design: Ticket promedio micro-tool

> Phase: sdd-design · Change: `ticket-promedio` · Artifact language: English; strings in `«»` are literal es-AR site copy.

## Technical Approach

One static Astro page `src/pages/recursos/ticket-promedio/index.astro` with a single inline `<script define:vars={{ WHATSAPP_CTA_NUMBER }}>`, mirroring `precios-inteligentes`. No new `.astro` component, **no React island** (config rule: islands need justification — this is DOM + arithmetic, an island buys nothing). No Netlify impact: SSG emits `/recursos/ticket-promedio/`; no redirect or config change.

**Section order** (mirrors the reference): hero (badge, `h1`, promise `p`, 3–4 bullet `ul`) → educational block (`border-y border-dark-700`, «Qué es el ticket promedio y cómo se calcula») → `<section id="herramienta">` (tabs → panel → shared results → periods → «Limpiar») → «Cómo mejorar tu ticket» → two WhatsApp CTA modals → final CTA to `/precios` → `<Footer />`.

## Architecture Decisions

| # | Decision | Alternatives rejected | Rationale |
|---|---|---|---|
| D1 | Inline script in the page | `src/scripts/ticket-promedio-app.ts` | No npm dep and no test runner: a module buys untestable indirection and splits single-file review. Separate modules stay reserved for jsPDF/JsBarcode-class tools. |
| D2 | `localStorage` key `ticket-promedio-v1`, shape `{ amounts, periods }`, `periods` capped at 2 (FIFO drop of the oldest) | Unversioned key like Caja Diaria's `movements`; unbounded history | Versioned key is the documented convention; the cap is the owner-approved 2-period overwrite and keeps comparison to exactly one prior period. |
| D3 | Both modes feed **one** results block | Per-mode results | The average is one concept; duplicating it doubles render paths and desyncs the «Guardar período» flow. Mode only decides how `total`/`count` are derived. |
| D4 | `'$' + Intl.NumberFormat('es-AR', {maximumFractionDigits:0}).format(n)` for money; `Intl.NumberFormat('es-AR',{min/maxFractionDigits:1})` + explicit sign for `%` | `style:'currency', currency:'ARS'` (as in the reference/caja-diaria); hand-rolled string math | Intl matches codebase practice, but currency style emits a NBSP and `,00` — the approved copy is `$1.500` / `+10,0%`. Decimal style + literal `$` keeps Intl's es-AR separators and hits the copy exactly. CSV keeps `toFixed(2)`. |
| D5 | Tabs are DOM-only (`hidden` class toggle), no hash/URL state | `?modo=` query or `#hash` routing | Static site, no router; URL state adds history handling for zero user value. |
| D6 | CSV import = single amount column, optional header, `,`/`;`; non-numeric rows skipped with a visible count notice | Multi-column schema; hard failure on bad rows | Owner-approved shape. Partial import beats rejecting a whole file for one dirty row. |
| D7 | Comparison against the previous saved period only; hidden when absent | Full history table | Explicit non-goal in the proposal. |
| D8 | Reuse existing Tailwind utilities/colors only (`primary` `#AC69FF`, `dark-700/800`, `blue-primary`, `emerald-400`/`red-400` for deltas) | New tokens or `tailwind.config.mjs` edits | No design-system change is in scope; the reference page already defines every needed pattern. |

## Data Flow

    input event ──→ mutate state ──→ saveData() ──→ render()
                                         │             │
                                    localStorage    results + comparison + list
                                  `ticket-promedio-v1`

`render()` is the single repaint entry point — it recomputes `total`/`count`/`average` from the active mode and repaints list, figures, and comparison. Every handler ends in `saveData()` → `render()`.

## Interfaces / Contracts

```js
// persisted
{ amounts: number[], periods: [{ name, average, total, count, savedAt }] } // periods.length <= 2

// in-memory only
let mode = 'lista' | 'rapido';

// derived
mode === 'lista'
  ? { total: sum(amounts), count: amounts.length }
  : { total: parseAmountAR(#quickTotal), count: parseInt(#quickCount) }
average = count > 0 ? total / count : 0
```

**DOM ids**: `tabLista` `tabRapido` `panelLista` `panelRapido` `amountInput` `addAmountBtn` `amountsList` `importCsvBtn` `importCsvInput` `importCsvMessage` `exportBtn` `quickTotal` `quickCount` `resTotal` `resCount` `resAverage` `periodName` `savePeriodBtn` `comparisonBlock` `clearDataBtn` + reference-style modal ids.

**`parseAmountAR(raw)`**: strip `$`, spaces/NBSP; if the string has both `.` and `,` → `.` is thousands, `,` is decimal; if only `,` → decimal; if only `.` → thousands when it splits into 3-digit groups, else decimal. Return `NaN` for anything else; reject `NaN` and negatives.

**CSV import**: strip BOM, split `/\r?\n/`, drop blanks, separator = `;` if present in line 1 else `,`; take the first column; skip a first row that does not parse (header). Every unparsable row increments `skipped` → «Se importaron N montos. Se omitieron M filas sin monto válido.» in `#importCsvMessage`.
**CSV export**: header `"monto"`, one `toFixed(2)` per row, `﻿` BOM, `\r\n`, `Blob` `text/csv;charset=utf-8`, filename `ZinkERP-ticket-promedio-YYYY-MM-DD.csv`.

**Comparison edge cases**: 0 periods → block hidden. 1 period → show the saved figure, no delta. 2 periods → `((cur - prev) / prev) * 100`, up `text-emerald-400` / down `text-red-400` / flat `text-gray-400`. `prev.average === 0` → «sin base de comparación» instead of a percentage. `count === 0` → average `$0`, `#savePeriodBtn` disabled.

## File Changes

| File | Action | Description |
|---|---|---|
| `src/pages/recursos/ticket-promedio/index.astro` | Create | Whole tool page + inline script |
| `src/pages/recursos/index.astro` | Modify | Append a 5th `availableTools` entry: `{ title: "Ticket promedio", description, features: [«Total facturado y cantidad de ventas → ticket promedio», «Lista de montos manual o importar CSV», «Compará con tu período anterior», «Consejos para mejorar el ticket (upsell, combos)»], link: "/recursos/ticket-promedio", icon: "🎫" }`. Empty `upcomingTools` to `[]` (keep the type annotation; the `length > 0` guard at line 147 self-hides the section). |
| `src/pages/recursos/caja-diaria/index.astro` | Modify | Inside the «Ticket Promedio» stat card (lines 88–91), after `<p id="averageTicket">`, add `<a href="/recursos/ticket-promedio" class="text-xs text-primary hover:underline">Calcular por período</a>`. Markup only; no script change. |
| `docs/microherramientas-comerciantes.md` | Modify | Mark `ticket-promedio` as Hecho in the ficha, priority table, and status list |

## Accessibility

Tabs: `role="tablist"` wrapper; each tab `role="tab"`, `aria-selected`, `aria-controls`, inactive tab `tabindex="-1"`; panels `role="tabpanel"` + `aria-labelledby`; Left/Right arrow keys move focus. Results container `aria-live="polite" aria-atomic="true"` so the recomputed average is announced once, not per figure; `#importCsvMessage` `role="status"`. Every input has a real `<label for>`. Delete buttons carry `aria-label`. Focus rings use the existing `focus:ring-2 focus:ring-primary` utility.

## Testing Strategy

| Layer | What | Approach |
|---|---|---|
| Static | Types/route | `npx astro check` |
| Build | SSG output | `npm run build` |
| Manual | Success criteria | `450000/300 → $1.500`; «julio» then «agosto» → `+10,0% vs julio`; reload persists; CSV round-trip in Excel; 375px viewport |

No runner exists (config `test_command: ""`); do **not** install one here.

## Threat Matrix

N/A — no routing logic, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary. A new static route is emitted by the existing SSG build.

## Migration / Rollout

No migration. New `localStorage` key, no reader of prior data.

## Out of Scope (do not build)

Shared `src/utils/csv.ts` or storage helper extraction; any npm dependency; test runner; reading Caja Diaria's `movements`; date pickers; goal/meta tracking; history table; `tailwind.config.mjs` changes.

## Open Questions

None — all five proposal assumptions were approved as-is.
