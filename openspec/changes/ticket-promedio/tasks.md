# Tasks: Ticket promedio micro-tool

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~800: new page ~750 (additions); `recursos/index.astro` ~25; `caja-diaria/index.astro` ~3; docs ~15. Reference `precios-inteligentes/index.astro` = 684 lines, similar scope plus periods/comparison. |
| 400-line budget risk | High |
| 800-line budget risk | Medium — near ceiling |
| Chained PRs recommended | No, at current estimate |
| Suggested split | Single PR, 8 work-unit commits |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: High
800-line budget risk: Medium

**Flag**: single-pr needs size:exception before apply; the 800-line budget covers it. If actual diff exceeds ~800, escalate chaining to the orchestrator — not decided here. Design D1 keeps one file/one script, so any split is file-level, not component-level.

### Suggested Work Units
All units ship as PR 1 (single-pr). Focused test = `npx astro check` for units 1–7; unit 8 adds `npm run build`.

| Unit | Goal | Runtime harness | Rollback boundary |
|------|------|------------------|--------------------|
| 1 | Skeleton+hero+SEO | Load page, `<head>` OK | Delete route file |
| 2 | Quick calc+results | `450000/300→$1.500` | Revert script block |
| 3 | List+localStorage | Add/delete, reload | Revert list+storage |
| 4 | CSV import/export | Import/export fixture | Revert CSV handlers |
| 5 | Periods save/compare | julio→agosto `+10,0%` | Revert period logic |
| 6 | Education+CTAs | Open/close modals | Revert section markup |
| 7 | Card+cross-link+docs | Visit pages, follow links | Revert 3 diffs |
| 8 | Verification gate | Manual matrix | N/A — no code |

## Phase 1: Skeleton + Hero + SEO
- [x] 1.1 Create `src/pages/recursos/ticket-promedio/index.astro`: frontmatter (Layout/Header/Footer/`WHATSAPP_CTA_NUMBER`), Spanish `title`/`description` on `Layout` (SEO Metadata req).
- [x] 1.2 Add hero: badge, `h1`, promise `p`, 3–4 bullets, literal copy per proposal.

## Phase 2: Quick Calc + Shared Results
- [x] 2.1 Add tabs (`tabLista`/`tabRapido`, `role="tablist"`, arrow nav) + `panelRapido` (Total facturado / Cantidad de ventas) (Quick Mode req).
- [x] 2.2 Add results block (`resTotal`/`resCount`/`resAverage`, `aria-live="polite"`), `render()` + `parseAmountAR()`; zero/empty guards, no `Infinity`/`NaN`.

## Phase 3: List Mode + localStorage
- [x] 3.1 Add `panelLista`: `amountInput`, `addAmountBtn`, `amountsList` with per-row delete (`aria-label`) (List Mode req).
- [x] 3.2 Add `loadData()`/`saveData()` for `ticket-promedio-v1` (`{amounts, periods}`); corrupted-JSON falls back to empty state (localStorage Persistence req).

## Phase 4: CSV Import/Export
- [x] 4.1 Add `importCsvBtn`/`importCsvInput` + parser (BOM strip, `,`/`;`, header detection, skip-count in `importCsvMessage`) (CSV Import req).
- [x] 4.2 Add `exportBtn` (BOM, `\r\n`, `toFixed(2)`, filename `ZinkERP-ticket-promedio-YYYY-MM-DD.csv`) (CSV Export req).

## Phase 5: Periods Save + Comparison
- [x] 5.1 Add `periodName`/`savePeriodBtn`, FIFO cap at 2, disabled when `count===0` (Period Save req).
- [x] 5.2 Add `comparisonBlock`: 0/1/2-period cases, zero-baseline "sin base de comparación", up/down/flat styling (Comparison Rendering req).
- [x] 5.3 Add `clearDataBtn`, `confirm()`-gated, clears amounts+periods+storage (Limpiar req).

## Phase 6: Education + CTAs/Modals
- [x] 6.1 Add "Qué es el ticket promedio" and "Cómo mejorar tu ticket" sections.
- [x] 6.2 Add WhatsApp CTA modal + final `/precios` CTA modal, mirroring `precios-inteligentes`.

## Phase 7: Recursos Card + Cross-link + Docs
- [x] 7.1 `recursos/index.astro`: move "Ticket promedio" to `availableTools`, add `link`, reword bullet (no "metas") (Recursos Card req).
- [x] 7.2 `caja-diaria/index.astro`: add link under `#averageTicket` to `/recursos/ticket-promedio`; add reverse link on the new page (Cross-links req).
- [x] 7.3 `docs/microherramientas-comerciantes.md`: mark `ticket-promedio` Hecho in ficha, priority table, status list.

## Phase 8: Verification
- [x] 8.1 `npx astro check` — zero errors (in the new file; 5 pre-existing baseline errors in `Header.astro`, untouched by this change, remain).
- [x] 8.2 `npm run build` — succeeds, route emitted.
- [ ] 8.3 Manual matrix: quick mode (calc, div-by-zero, empty); list add/delete; CSV happy/malformed/wrong-separator import; CSV export in Excel; period save + 3rd overwrite; comparison incl. zero-baseline; reload persistence + corrupted-JSON; Limpiar confirm/cancel; card at `/recursos`; both cross-links; SEO meta; es-AR formatting at 375px. **Deferred to sdd-verify/owner per apply-phase instructions — not executed in this batch.**

## Apply Progress

**Batch**: 1 of 1 (all implementation tasks complete; 8.3 manual matrix deferred to verify).
**Mode**: Standard (no test runner in this repo; strict_tdd policy acknowledged but no RED/GREEN cycle possible — see `openspec/config.yaml` testing.notes).

### Files touched
| File | Action | Notes |
|---|---|---|
| `src/pages/recursos/ticket-promedio/index.astro` | Created | ~615 lines. Hero, educational block, tool section (tabs, list/quick modes, shared results, period save/comparison, Limpiar), "Cómo mejorar tu ticket", 2 WhatsApp CTA modals, static final CTA, inline `<script define:vars>`. |
| `src/pages/recursos/index.astro` | Modified | Moved "Ticket promedio" from `upcomingTools` to `availableTools` with `link`; `upcomingTools` now `[]` (self-hides via existing `length > 0` guard). |
| `src/pages/recursos/caja-diaria/index.astro` | Modified | Added cross-link `<a href="/recursos/ticket-promedio">Calcular por período</a>` inside the Ticket Promedio stat card. |
| `docs/microherramientas-comerciantes.md` | Modified | Marked `ticket-promedio` Hecho in ficha, priority table, status list; updated stale intro summary line (moved from "Siguiente a implementar" to "Ya en producción"). |

### Commands run
- `npx astro check` → 5 errors, all pre-existing in `src/components/Header.astro` (untouched by this change, verified via `git show HEAD:src/components/Header.astro`); 0 errors in new/modified files.
- `npm run build` → succeeded, 66 pages built, `/recursos/ticket-promedio/index.html` emitted.
- Manual `node -e` check of `parseAmountAR`/`formatMoney`/`formatPercent` logic (mirrored from the script) confirms: `parseAmountAR('1500')` → `1500`; `parseAmountAR('$2.000')` → `2000`; `parseAmountAR('1.234,50')` → `1234.5`; `parseAmountAR('abc')`/`parseAmountAR('-5')` → `NaN`; `formatMoney(450000/300)` → `"$1.500"`; `formatPercent(10)` → `"+10,0%"` — matches spec worked examples exactly.
- `grep` against `dist/` output confirms: SEO title/description present, `ticket-promedio-v1` key referenced once, cross-link both directions resolve, "Próximamente" section absent from built `/recursos/index.html`.

### Skipped / deferred
- Task 8.3 (manual browser matrix) intentionally not executed — per apply-phase instructions this belongs to sdd-verify/owner.
- No test runner installed (explicitly forbidden by design's "Out of Scope").

### Deviations from design
- None material. One clarification made where design/task wording was ambiguous: design's "final `/precios` CTA modal" (task 6.2) is implemented as a static CTA section (no modal), matching the design's explicit **Section order** ("→ two WhatsApp CTA modals → final CTA to `/precios` → `<Footer />`") and the `precios-inteligentes` reference, which also uses a static final CTA section, not a modal.
- Quick Mode "no numeric result shown" (spec) vs. design's "`count === 0` → average `$0`" note were reconciled by showing `—` placeholders in Quick Mode when inputs are empty/invalid, while List Mode always shows real 0-state figures (`$0`, count `0`) since an empty list is itself valid data. `savePeriodBtn` disable logic (`count === 0`) is unaffected and behaves identically in both modes.
