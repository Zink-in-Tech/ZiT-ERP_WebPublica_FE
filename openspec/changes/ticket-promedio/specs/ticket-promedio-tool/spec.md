# Delta for ticket-promedio-tool

## ADDED Requirements

### Requirement: Quick Mode Calculation
The system MUST compute Total facturado ÷ Cantidad de ventas live in Mode B ("Cálculo rápido").

#### Scenario: Valid inputs
- GIVEN Total facturado = 450000, Cantidad de ventas = 300
- WHEN both fields are filled
- THEN the result shows "$1.500"

#### Scenario: Division by zero
- GIVEN Cantidad de ventas is 0 or empty
- WHEN Total facturado has a value
- THEN no numeric result is shown; no `Infinity`/`NaN`

#### Scenario: Empty inputs
- GIVEN both fields are empty
- WHEN the page renders or fields are cleared
- THEN no result is shown

### Requirement: List Mode Manual Entry
The system MUST let the merchant add sale amounts to a scrollable list in Mode A and delete any row, recalculating live.

#### Scenario: Add updates totals
- GIVEN an empty list
- WHEN the merchant adds "1500"
- THEN total, count, and average update

#### Scenario: Delete recalculates
- GIVEN a list with 2+ amounts
- WHEN one row is deleted
- THEN total, count, and average exclude it

### Requirement: CSV Import
The system MUST import a single-amount-column CSV, optional header, `,` or `;` separator, es-AR decimals (strip `$`, spaces, thousands dots). Non-numeric rows MUST be skipped with a visible skip-count notice.

#### Scenario: Happy path
- GIVEN rows "1500", "$2.000", "1.234,50"
- WHEN imported
- THEN all 3 are added as parsed numbers

#### Scenario: Malformed rows skipped
- GIVEN 5 rows, 2 non-numeric
- WHEN imported
- THEN 3 rows are added and a notice reports 2 skipped

#### Scenario: Wrong separator
- GIVEN a CSV using a separator other than `,`/`;`
- WHEN imported
- THEN unresolved rows are skipped and counted in the notice

### Requirement: CSV Export
The system MUST export the current list as CSV with a UTF-8 BOM and `\r\n` line endings, opening correctly in Excel.

#### Scenario: Export current list
- GIVEN a list of 3 amounts
- WHEN the merchant exports
- THEN the file contains the 3 amounts, BOM, and `\r\n`

### Requirement: Period Save and Overwrite
The system MUST save the current average as a named period via "Guardar período", retaining at most the 2 most recent. A 3rd save MUST silently overwrite the oldest, with no warning.

#### Scenario: First save
- GIVEN no saved periods
- WHEN "julio" is saved
- THEN it stores name, average, total, count, timestamp

#### Scenario: Third overwrites oldest
- GIVEN "julio" and "agosto" are saved
- WHEN "septiembre" is saved
- THEN "julio" is removed silently; "agosto" and "septiembre" remain

### Requirement: Period Comparison Rendering
When 2 periods exist, the system MUST show `Ticket promedio de {latest}: {value} — {sign}{pct}% vs {previous}`, styled up/down. With fewer than 2 periods, no comparison is shown.

#### Scenario: Comparison after second save
- GIVEN "julio" saved at $1.500
- WHEN "agosto" is saved at $1.650
- THEN it shows "Ticket promedio de agosto: $1.650 — +10,0% vs julio", styled as increase

#### Scenario: No prior period
- GIVEN 0 or 1 saved periods
- WHEN results render
- THEN no comparison text is shown

#### Scenario: Zero-baseline previous period
- GIVEN the previous period's average is $0
- WHEN a new period is saved
- THEN no percentage is computed; only absolute values are shown

### Requirement: localStorage Persistence
The system MUST persist amounts and periods under key `ticket-promedio-v1` as `{ amounts: number[], periods: [{ name, average, total, count, savedAt }] }` and rehydrate on load.

#### Scenario: Reload survives
- GIVEN amounts entered and 2 periods saved
- WHEN the page is reloaded
- THEN the list, totals, and comparison render identically

#### Scenario: Corrupted stored data
- GIVEN `ticket-promedio-v1` holds invalid JSON
- WHEN the page loads
- THEN the system falls back to an empty state without an unhandled error

### Requirement: Limpiar Clears All Data
The system MUST confirm via `confirm()` before clearing; on confirmation it MUST clear amounts and all saved periods from state and `ticket-promedio-v1`.

#### Scenario: Confirmed clear
- GIVEN amounts and 2 saved periods exist
- WHEN "Limpiar" is confirmed
- THEN amounts and periods are empty in state and localStorage

#### Scenario: Cancelled clear
- GIVEN amounts and periods exist
- WHEN "Limpiar" is cancelled
- THEN no data is removed

### Requirement: Recursos Card Availability
`/recursos` MUST list "Ticket promedio" under available tools, linking to `/recursos/ticket-promedio`, with its bullet reworded to comparison-only wording (no "metas").

#### Scenario: Card moved and linked
- GIVEN a visit to `/recursos`
- WHEN the page renders
- THEN "Ticket promedio" appears under available tools with a working link

### Requirement: Mutual Cross-links with Caja Diaria
Caja Diaria's existing "Ticket Promedio" stat card MUST link to `/recursos/ticket-promedio`; the tool page MUST link back to `/recursos/caja-diaria`.

#### Scenario: Both directions present
- GIVEN a visit to Caja Diaria
- WHEN the "Ticket Promedio" stat card renders
- THEN it links to `/recursos/ticket-promedio`, and that page links back

### Requirement: SEO Metadata
`/recursos/ticket-promedio` MUST set a Spanish title and description via `Layout` props.

#### Scenario: Meta tags present
- GIVEN the page renders
- WHEN the `<head>` is inspected
- THEN it contains a Spanish `title` and `description`

### Requirement: es-AR Number Formatting
All monetary and percentage figures MUST use es-AR formatting: currency with thousands-dot, no unneeded decimals (e.g. "$1.500"); percentages with comma decimal and explicit sign (e.g. "+10,0%").

#### Scenario: Worked example
- GIVEN total $450.000, 300 sales
- WHEN the average is computed
- THEN it displays as "$1.500", not "$1500" or "$1,500"
