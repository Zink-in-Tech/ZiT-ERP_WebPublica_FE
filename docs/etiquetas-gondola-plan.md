# Plan: Generador de Etiquetas de Góndola (lead magnet)

Documento para implementar más adelante. Micro-producto en `/recursos/etiquetas-gondola/`.

---

## Objetivo

Micro-producto en `/recursos/etiquetas-gondola/`: importar CSV, configurar grilla y opciones, previsualizar etiquetas y descargar PDF A4 listo para imprimir. Firma "Generado con Zink ERP · zinkerp.com" en zona segura de cada etiqueta. Hero estilo caja-diaria con lead capture. Sin backend; todo en el navegador.

## Referencias del proyecto

- **Patrón:** `src/pages/recursos/index.astro`: array `availableTools` + página en `src/pages/recursos/<slug>/index.astro`.
- **Hero dos columnas:** `src/pages/recursos/caja-diaria/index.astro` (líneas 11–63): izquierda H1 + texto + botones; derecha card "Unite gratis…" con iframe Beehiiv.
- **Import/export/localStorage:** `src/pages/recursos/precios-inteligentes/index.astro`: parser CSV, loadData/saveData, export CSV con Blob.
- **Dependencia PDF:** Agregar `jspdf` vía npm.

## Layout de etiqueta (según modelo)

- **Arriba (centrado):** descripción/código producto (máx 2 líneas, clamp).
- **Centro:** precio grande.
- **Abajo:** izquierda fecha | centro código | derecha logo (44x44px, object-fit contain).
- **Zona segura (dentro del borde):** firma centrada inferior "Generado con Zink ERP · zinkerp.com" (6–8pt, gris), con margen para no recortar.

---

## Especificación de etiqueta (tamaño y ubicación de elementos)

Referencia visual: ver imagen de ejemplo (etiqueta tipo “ABELIA GRANDIFLORA 4LT…”, precio “4.900,00”, fecha 15/03/2026, código 103, logo comercio, firma Zink ERP).

### Tamaño de etiqueta por grilla (A4 = 210 × 297 mm)

| Grilla | Etiquetas por hoja | Ancho etiqueta | Alto etiqueta |
|--------|--------------------|----------------|---------------|
| 2×4    | 8                  | 105 mm         | 74,25 mm      |
| 3×5    | 15                 | 70 mm          | 59,4 mm       |

### Márgenes

- **Margen interno (borde de etiqueta):** 2 mm por lado.
- **Zona segura (firma):** margen inferior mínimo 2 mm para que no se recorte al cortar.

### Orden y ubicación de elementos (de arriba a abajo)

1. **Descripción del producto**
   - **Posición:** parte superior, centrado horizontal.
   - **Contenido:** nombre/descripción del producto (máx. 2 líneas, truncar con “… ”).
   - **Fuente:** 10 pt, normal o bold, negro.
   - **Ancho máximo de texto:** ancho de etiqueta menos 4 mm (márgenes).

2. **Precio**
   - **Posición:** zona central, centrado.
   - **Contenido:** precio formateado (ej. 4.900,00).
   - **Fuente:** 18 pt, negrita, negro. Es el elemento más grande y legible.

3. **Firma Zink ERP (obligatoria)**
   - **Posición:** **inmediatamente debajo del precio**, centrada. No al pie de la etiqueta.
   - **Texto:** «Generado con Zink ERP · zinkerp.com».
   - **Fuente:** 8 pt, gris (ej. RGB 80, 80, 80). No es opcional; va en todas las etiquetas.

4. **Fila inferior (footer) — misma línea base, al pie**
   - **Fecha:** esquina inferior izquierda. Fuente 8 pt, gris. Formato dd/mm/yyyy. Opcional (toggle).
   - **Código:** centro inferior. Fuente 8 pt, gris. Opcional (toggle).
   - **Logo del comercio:** esquina inferior derecha. **Tamaño fijo: 44×44 px** (en PDF ≈ 12 mm), object-fit contain. Opcional (toggle).

### Resumen por formato

- **Formato pequeño (3×5):** descripción 10 pt, precio **22 pt** bold, firma 8 pt, footer 8 pt, logo 12 mm. Máx. 35 caracteres en descripción. Proporciones ajustadas; precio destacado.
- **Formato grande (2×4):** descripción 14 pt, precio **28 pt** bold, firma 10 pt, footer 10 pt, logo 16 mm. Máx. 50 caracteres en descripción. Márgenes 3 mm. Espaciado mayor (descLineHeight, priceLineHeight, firmaLineHeight) para mejor lectura.

---

## 1. Entrada en listado de recursos

**Archivo:** `src/pages/recursos/index.astro`.

- Agregar objeto en `availableTools`:
  - `title`: "Etiquetas de góndola (PDF)"
  - `description`: "Importá un CSV y descargá etiquetas listas para imprimir en A4."
  - `features`: ["Compatible con Excel (CSV)", "Formato profesional", "Descarga PDF A4", "100% online"]
  - `link`: "/recursos/etiquetas-gondola"
  - `icon`: ej. "🏷️"

---

## 2. Estructura de la página y SEO

**Archivo nuevo:** `src/pages/recursos/etiquetas-gondola/index.astro`.

- **Layout:** Layout + Header + Footer (igual que caja-diaria y precios-inteligentes).
- **Props Layout:**
  - `title`: "Generador de Etiquetas de Góndola Gratis | Imprimí en PDF"
  - `description`: "Creá etiquetas de góndola listas para imprimir en A4. Importá tu Excel (CSV) y descargá el PDF en segundos. Herramienta online y gratuita para comercios."
- **Hero (dos columnas, estilo caja-diaria):**
  - **Izquierda:** H1 "Generador de Etiquetas de Góndola gratis y online"; subtítulo; bullets; botón primario "Generar etiquetas ahora" (#herramienta); botón secundario "Ver ejemplo de formato".
  - **Derecha:** card "Unite gratis a la comunidad…" con input email + "Unirme ahora"; fallback localStorage y "Listo, gracias".
- **Sección "Cómo funciona":** 3 pasos.
- **Sección herramienta** (id="herramienta"): uploader CSV, opciones, preview, botones.

---

## 3. Import CSV

- **Formato CSV esperado:** columnas en este orden: **A Código** (opcional), **B Descripción** (obligatorio), **C Precio** (obligatorio). Primera columna = codigo, segunda = descripcion, tercera = precio.
- **UI:** Drag & drop + input file .csv. Texto: "Exportá desde Excel como CSV (delimitado por comas)." Tooltip: "Columnas esperadas: A Código, B Descripción, C Precio."
- **Parser:** FileReader, detectar separador (coma / punto y coma).
- **Mapping:** Cabeceras case-insensitive o sin cabecera asumiendo orden 1=codigo, 2=descripcion, 3=precio. Obligatorios: descripcion y precio.
- **Salida:** Array `{ codigo?, descripcion, precio, fecha? }`. Guardar en localStorage `etiquetas-gondola-data-v1`.

---

## 4. Opciones de formato (A4)

- **Grilla:** "2x4 por hoja" y "3x5 por hoja".
- **Toggles:** Mostrar fecha | Mostrar código | Mostrar logo | Mostrar firma (ON por defecto).
- **Persistencia:** `etiquetas-gondola-config-v1`.

---

## 5. Logo opcional

- Input PNG/SVG/JPG, máx 200 KB, recomendado 256x256 (mín 128x128).
- Guardar data URL en `etiquetas-gondola-logo-v1`.
- En etiqueta: 44x44px, object-fit contain.

---

## 6. Preview HTML

- Grilla de etiquetas con scroll (primeras N o 1 página).
- Mismo layout que PDF: descripción, precio, fecha/código/logo, firma en zona segura.
- Botones: Descargar PDF, Limpiar, opcional Descargar CSV de ejemplo.

---

## 7. Export PDF A4

- jsPDF, documento A4, grilla 2x4 o 3x5.
- Por etiqueta: descripción arriba, precio centro, abajo fecha|código|logo, firma "Generado con Zink ERP · zinkerp.com" en zona segura (6–8pt, gris, margen interno).
- Descarga + snackbar "PDF generado".

---

## 8. Persistencia y UX

- **localStorage:** etiquetas-gondola-data-v1, etiquetas-gondola-config-v1, etiquetas-gondola-logo-v1, etiquetas-gondola-lead-v1.
- **Limpiar:** Borra data + config + logo; confirmación.
- **Snackbars:** "CSV importado", "PDF generado", "Listo".

---

## 9. CTA post-herramienta (Zink ERP)

- Título: "¿Actualizás precios seguido?"
- Texto + bullets: Cambios masivos, Control de márgenes, Reimpresión por sucursal, Historial.
- Botón "Ver cómo funciona Zink ERP" → https://zinkerp.com

---

## 10. Dependencias

- npm: `jspdf`. Construcción directa en jsPDF (texto/rectángulos/imagen), sin html2canvas.

---

## 11. Orden de implementación sugerido

| Orden | Tarea |
|-------|--------|
| 1 | npm install jspdf |
| 2 | Entrada en availableTools (recursos/index.astro) |
| 3 | Crear etiquetas-gondola/index.astro: Layout, SEO, hero dos columnas, lead capture |
| 4 | CSV: drag & drop, parser, columnas A Código, B Descripción, C Precio, validación |
| 5 | Opciones: grilla 2x4/3x5, toggles, localStorage config |
| 6 | Logo: input, validación, localStorage, render 44x44 |
| 7 | Preview HTML: grilla etiquetas, mismo layout |
| 8 | Export PDF: jsPDF A4, firma en zona segura, descarga |
| 9 | Limpiar, snackbars |
| 10 | CTA Zink ERP, "Ver ejemplo de formato" |
| 11 | Estilo caja-diaria, lint, build. Commit: "feat(recursos): etiquetas gondola lead magnet" |

---

## 12. Criterios de aceptación

- CSV con A Código, B Descripción, C Precio → preview → PDF A4.
- Firma "Generado con Zink ERP · zinkerp.com" en zona segura en cada etiqueta.
- Logo opcional en localStorage, 44x44 en preview y PDF.
- Hero y layout estilo caja-diaria.
- SEO correcto. Sin backend. Lint y build pasan.

---

**Estado:** Implementado. Ruta: `/recursos/etiquetas-gondola`. Script: `src/scripts/etiquetas-gondola-app.ts`.
