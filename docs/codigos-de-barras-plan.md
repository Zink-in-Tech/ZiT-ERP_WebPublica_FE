# Plan: Generador de códigos de barras (lead magnet – web pública)

Documento para implementar el micro-producto en `/recursos/codigos-de-barras/`. Adaptado al sitio Astro (ZiT-ERP_WebPublica_FE) a partir del plan del producto Zink ERP.

---

## Contexto del proyecto (web pública)

- **Sitio:** Astro, sin backend. Herramientas en `src/pages/recursos/<slug>/index.astro`.
- **Patrón:** Entrada en `availableTools` en [src/pages/recursos/index.astro](src/pages/recursos/index.astro); página en `src/pages/recursos/codigos-de-barras/index.astro`.
- **Referencias:** [src/pages/recursos/precios-inteligentes/index.astro](src/pages/recursos/precios-inteligentes/index.astro) (import CSV, validación, preview, export); [src/pages/recursos/caja-diaria/index.astro](src/pages/recursos/caja-diaria/index.astro) (hero, estilo).
- **Dependencias a agregar:** `jsbarcode` (generar imagen del código), `jspdf` (PDF). No hay CodigoBarrasDialog ni código React del otro repo; la lógica EAN13 (dígito verificador, validación) se implementa en esta app.

---

## Objetivo

Herramienta pública (sin login) para crear códigos de barras **uno a uno** o por **CSV**, previsualizar y descargar un **PDF** con varias etiquetas por página. Cada etiqueta incluye el código de barras, el número EAN13, descripción opcional y una **marca de agua centrada** (“Creado con Zink ERP - zinkerp.com”) de forma que no se pueda recortar la marca sin recortar parte del código. **Alcance:** esta herramienta no asigna códigos oficiales GS1 ni garantiza unicidad global; el usuario es responsable del uso y de la validez de los códigos. Incluir **disclaimer** visible (sección 4).

---

## 1. Ubicación y acceso

- **Ruta:** `/recursos/codigos-de-barras/`
- **Archivo:** `src/pages/recursos/codigos-de-barras/index.astro`
- **Listado:** La herramienta ya está en `upcomingTools` como “Generador de códigos de barras”; al implementarla, mover a `availableTools` con `link: "/recursos/codigos-de-barras"`.
- Sin autenticación; todo en el cliente.

---

## 2. SEO completo

### Meta y título

- **Title (meta + og):**  
  `Generador de Códigos de Barras EAN13 Gratis | Crear e Imprimir | ZinkERP`  
  (Alternativa: `Crear Códigos de Barras EAN13 Online Gratis | Generador PDF | ZinkERP`.)

- **Meta description (~155 caracteres):**  
  `Generá códigos de barras EAN13 gratis y online. Creá uno a uno o importá un CSV, descargá el PDF listo para imprimir. Herramienta gratuita para comercios. Sin registro.`

- **Keywords naturales** (incluir en H1, H2, párrafos y copy sin forzar):  
  código de barras, EAN13, EAN-13, generador de códigos de barras, crear código de barras, imprimir códigos de barras, código de barras gratis, código de barras para productos, etiquetas con código de barras, ZinkERP.

### Estructura de headings

- **H1 (una sola vez):**  
  `Generador de códigos de barras EAN13 gratis y online`

- **H2 sugeridos:**  
  - En hero o justo debajo: `Creá e imprimí códigos de barras en segundos` o `Cómo generar tus códigos de barras`.  
  - Sección pasos: `Cómo funciona`.  
  - Sección herramienta: `Crear códigos de barras` o `Generar tus etiquetas con código de barras`.

- **H3** dentro de la herramienta si hace falta: por ejemplo `Agregar uno a uno` y `Importar desde CSV`.

### Contenido para SEO (cuerpo de página)

- Párrafo corto bajo el H1: mencionar “código de barras EAN13”, “gratis”, “sin registro”, “para comercios” o “para tu negocio”, “descargar PDF”.
- Bullets en hero: reforzar “EAN13”, “uno a uno o CSV”, “PDF listo para imprimir”, “100% online”.
- En “Cómo funciona” o en un bloque breve: una oración tipo “El formato EAN13 es el estándar usado en productos de retail y permite identificar tu producto de forma única.” (solo si encaja con el tono).

### Open Graph / redes

- Mismo title y description que meta.
- Imagen og: usar una imagen genérica de recursos/herramientas o captura de la herramienta si está disponible.

---

## 3. Copy y mensajes de la herramienta

### Hero (arriba del scroll)

- **H1:** Generador de códigos de barras EAN13 gratis y online
- **Subtítulo:** Creá códigos de barras EAN13 uno a uno o importando un CSV. Descargá un PDF listo para imprimir en etiquetas. Sin registros. Sin instalaciones. Todo desde tu navegador.
- **Bullets (3–4):**  
  - Compatible con EAN13 (estándar retail).  
  - Agregá códigos uno a uno o importá desde CSV.  
  - Descargá el PDF con varias etiquetas por hoja.  
  - 100% online y gratuito.
- **CTA primario:** Generar códigos de barras (anchor `#herramienta`).
- **CTA secundario (opcional):** Ver ejemplo de etiqueta o Descargar plantilla CSV.

### Sección “Cómo funciona”

- Título: Cómo funciona.
- Paso 1: Ingresá tus códigos (uno a uno o subiendo un CSV con columnas codigo y descripcion).
- Paso 2: Revisá la lista y quitá lo que no quieras incluir.
- Paso 3: Descargá el PDF con todas las etiquetas listas para imprimir.

### Formulario “uno a uno”

- Etiqueta código: Código EAN13 (13 dígitos). Placeholder: Ej. 7790123456789. Ayuda: Debe ser un EAN13 válido (dígito verificador correcto).
- Etiqueta descripción: Descripción del producto (opcional). Placeholder: Ej. Gaseosa 1.5L.
- Botón: Agregar a la lista.

### CSV

- Instrucción: Subí un archivo con columnas codigo (o codigo_barras) y descripcion (opcional). Los códigos deben ser EAN13 válidos.
- Botón: Elegir archivo / Arrastrá un CSV aquí.
- Enlace: Descargar plantilla CSV.

### Validación y errores

- Código inválido (uno a uno): El código no es un EAN13 válido. Debe tener 13 dígitos y el dígito verificador correcto.
- CSV: Fila X: código inválido (no es EAN13).
- CSV sin columnas: No se encontraron las columnas codigo o codigo_barras. Revisá que el CSV tenga cabecera.
- Lista vacía al descargar: Agregá al menos un código antes de descargar el PDF.

### Tabla de preview

- Encabezados: Código | Descripción | (acción Quitar).
- Lista vacía: Aún no hay códigos. Agregá uno desde el formulario o importá un CSV.
- Botón quitar: Quitar (o ícono), aria-label “Quitar de la lista”.

### Botones principales

- Descargar PDF.
- Limpiar (confirmación: ¿Borrar la lista y empezar de nuevo?).

### Mensajes de éxito / feedback

- CSV importado: Se importaron X códigos correctamente. (Si hay errores: Se importaron X de Y; N filas tenían código inválido.)
- PDF generado: PDF descargado. (O solo descargar sin mensaje.)

### CTA post-herramienta (Zink ERP)

- Título: ¿Necesitás gestionar códigos de barras en tu negocio?
- Texto: En Zink ERP podés asignar códigos a tus productos, imprimir etiquetas y sincronizar con facturación y stock.
- Botón: Conocer Zink ERP → https://zinkerp.com

---

## 4. Disclaimer (obligatorio)

- **Texto sugerido:** “No somos responsables del uso que se le dé a los códigos generados. Esta herramienta no asigna códigos oficiales GS1 ni garantiza unicidad global. El usuario es responsable de asegurar que los códigos cumplan con las normativas aplicables (EAN, GS1, etc.) y de su uso conforme a la ley.”
- **Ubicación:** Visible antes de generar/descargar: por ejemplo debajo del área de preview o encima del botón “Descargar PDF”, en un bloque tipo aviso (borde, texto pequeño, gris). Opcional: también en el pie de la sección herramienta.
- **Persistente:** Que no quede oculto solo en un modal; que se vea en la pantalla principal de la herramienta.

---

## 5. Entradas de datos

### Opción A – Uno a uno

- **Formulario:**
  - **Código de barra:** campo numérico (EAN13 válido: 13 dígitos + dígito verificador correcto). Opcional: botón “Generar código” que calcule un EAN13 (prefijo país + número de empresa/producto + dígito verificador) si se define una lógica interna (ej. secuencia).
  - **Descripción/nombre del producto** (opcional), para mostrar en la etiqueta.
- **Botón “Agregar a la lista”:** añade `{ codigo, descripcion? }` a una lista en memoria (y opcionalmente localStorage).
- La lista se muestra en tabla; se puede quitar ítems antes de generar el PDF.

### Opción B – CSV

- **Subida de archivo CSV.** Instrucciones en UI: “Columnas esperadas: codigo (o codigo_barras), descripcion (opcional).” Opción “Descargar plantilla CSV”.
- **Delimitador:** Separador **punto y coma (;)**. En Argentina/Excel la coma se usa para decimales; la plantilla y el parser deben esperar CSV con `;`. Auto-detección (coma vs punto y coma) en la primera línea es aceptable; documentar que la plantilla oficial usa `;`.
- **Columnas (case-insensitive):** `codigo` o `codigo_barras` (obligatorio), `descripcion` (opcional).
- **Validación:** cada código debe ser EAN13 válido (13 dígitos + dígito verificador). Mostrar errores por fila (ej. “Fila 3: código inválido”).
- **Vista previa:** tabla (codigo, descripcion) con opción de quitar filas. **Límite preview:** renderizar solo los **primeros 15 ítems** en pantalla para evitar cuelgues con listas muy largas (mostrar total y mensaje tipo "Mostrando 15 de N" si N > 15).
- **Salida común con Opción A:** lista de ítems `{ codigo: string, descripcion?: string }` que alimenta el generador de PDF.

---

## 6. Lógica EAN13 (en este repo)

- **Validar EAN13:** 13 dígitos; último dígito = dígito verificador calculado (algoritmo estándar EAN13). Función tipo `validarEan13(codigo: string): boolean`.
- **Calcular dígito verificador:** a partir de 12 dígitos, devolver el dígito 13. Función tipo `calcularDigitoVerificador(docena: string): number`.
- **Generar código (opcional):** si se ofrece “Generar código”, usar prefijo país (ej. 779 para Argentina), número de empresa/producto (configurable o secuencial) y `calcularDigitoVerificador` para formar 13 dígitos. Definir si hay “empresa” fija o solo secuencia; documentar en UI.
- **Ubicación:** script dentro de la página o, si se prefiere, módulo/archivo compartido (ej. `src/utils/codigoBarras.ts` o lógica en el mismo `index.astro` en un `<script>`).

---

## 7. Generación del PDF

- **Tecnología:** jsPDF. Por cada ítem: generar imagen del código con JsBarcode en un canvas, `canvas.toDataURL('image/png')`, luego `pdf.addImage(...)` en la posición correspondiente.
- **Formato de salida (configuración mínima por etiqueta):**
  - **Código de barras:** imagen EAN13 (JsBarcode).
  - **Número EAN:** siempre visible debajo de las barras.
  - **Descripción:** 1 línea, máximo N caracteres (ej. 25–30), con ellipsis si se excede.
  - **Marca de agua:** toggle opcional (valor por defecto ON); colocada entre barras y número (sección 8) para no impedir lectura/escaneo.
- **Límite operativo:** Máximo **50 ítems por PDF**. Si hay más de 50 en la lista: mensaje "Máximo 50 etiquetas por archivo. Dividí en varios archivos o quitá ítems." y no generar hasta que la lista sea ≤ 50 (o generar solo los primeros 50 y avisar).
- **Resumen por etiqueta:** código de barras, número EAN, descripción (1 línea, máx N caracteres), marca de agua (sección 8).
- **Formato de etiqueta:** 50x30 mm (landscape) como en el plan Zink ERP, o configurable (por defecto 50x30).
- **Disposición:** Varias etiquetas por página (ej. 2x4 o 3x5 en A4). Cada celda es una etiqueta con código, número, descripción y marca de agua (si toggle ON).

---

## 8. Marca de agua (requisito no recortable y legibilidad)

- **Texto:** “Creado con Zink ERP - zinkerp.com”
- **Ubicación:** Centrada **entre las barras del código y el número EAN** (no superpuesta al código ni al número). **La marca no debe impedir la lectura ni el escaneo del código.**
- **Implementación:** En jsPDF: dibujar barras → en el espacio libre entre la imagen del código y el texto del número EAN, dibujar la marca (fuente pequeña, gris, centrada en X). Opcional: alpha/semi-transparencia si jsPDF lo permite.
- **Objetivo:** (1) No poder recortar la marca sin recortar código o número. (2) No afectar la legibilidad ni el escaneo del código de barras.

---

## 9. Estructura de archivos (Astro)

- **Página:** `src/pages/recursos/codigos-de-barras/index.astro`
  - Layout, Header, Footer.
  - **SEO y copy:** usar secciones 2 y 3 (title, meta, H1, copy, mensajes).
  - SEO: title “Generador de Códigos de Barras EAN13 Gratis | ZinkERP”, description adecuada.
  - Hero (estilo caja-diaria o precios-inteligentes): título, breve descripción, bullets, CTA a la herramienta.
  - Sección “Cómo funciona” (3 pasos): 1. Ingresá códigos (uno a uno o CSV) · 2. Revisá la lista · 3. Descargá el PDF.
  - Sección herramienta: formulario uno a uno + zona CSV (drag & drop + file input) + tabla preview + botón “Descargar PDF” + **disclaimer** visible.
- **Lógica:** Todo en `<script>` dentro de la página o, si se prefiere, en un script externo (ej. `public/scripts/codigos-barras.js` o módulo importable). Funciones: validarEan13, calcularDigitoVerificador, parseCSV, generar PDF con jsPDF + JsBarcode.
- **Opcional:** `src/utils/codigoBarras.ts` (o .js) con validarEan13 y calcularDigitoVerificador si se quiere reutilizar en el futuro.

---

## 10. Flujo de usuario (resumen)

1. Usuario entra a `/recursos/codigos-de-barras/`.
2. Elige **uno a uno** (formulario + “Agregar a la lista”) o **CSV** (subir archivo → validar EAN13 → ver tabla).
3. Ve la lista unificada (tabla) y puede quitar ítems.
4. Lee el **disclaimer** (visible en la página).
5. Clic en “Descargar PDF” → se genera el PDF con N etiquetas, cada una con código, número, descripción y marca de agua entre barras y número.

---

## 11. Dependencias

- **npm:** `jsbarcode`, `jspdf` (agregar al proyecto con `npm install jsbarcode jspdf`).
- Sin backend; generación en el navegador.

---

## 12. Orden de implementación sugerido

| Orden | Tarea |
|-------|--------|
| 1 | Agregar dependencias: `npm install jsbarcode jspdf` |
| 2 | Crear `src/pages/recursos/codigos-de-barras/index.astro`: Layout, SEO, hero, sección “Cómo funciona” |
| 3 | Implementar lógica EAN13: validarEan13, calcularDigitoVerificador (en script de la página o utils) |
| 4 | Entrada “uno a uno”: formulario (código EAN13, descripción), botón “Agregar a la lista”, lista en estado/localStorage |
| 5 | Entrada CSV: subida, parser, columnas codigo/codigo_barras y descripcion, validación EAN13 por fila, mensajes de error, vista previa en tabla |
| 6 | Tabla unificada (ítems de uno a uno + CSV) con opción de quitar filas |
| 7 | Generador PDF: jsPDF, varias etiquetas por página (2x4 o 3x5), por cada ítem JsBarcode → imagen → celda; número + descripción; marca de agua entre barras y número en cada etiqueta |
| 8 | Botón “Descargar PDF” y descarga del archivo |
| 9 | **Disclaimer** visible (bloque de aviso encima o debajo del botón Descargar PDF) |
| 10 | Mover herramienta de upcomingTools a availableTools en recursos/index.astro |
| 11 | Opcional: “Descargar plantilla CSV”; botón “Generar código” (si se define lógica de generación). Lint y build. Commit: “feat(recursos): generador códigos de barras lead magnet” |

---

## 13. Criterios de aceptación

- Usuario puede ingresar códigos uno a uno o por CSV (columnas codigo, descripcion); solo se aceptan EAN13 válidos.
- Vista previa en tabla con posibilidad de quitar ítems.
- **Disclaimer** visible en la página (“No somos responsables del uso…”).
- Descarga PDF con múltiples etiquetas por página; cada etiqueta tiene código de barras, número EAN13, descripción (recortada) y marca de agua “Creado con Zink ERP - zinkerp.com” entre barras y número (no recortable sin recortar código/número; no debe impedir lectura/escaneo).
- Sin backend; deploy estático; lint y build pasan.

---

## 14. No incluido en este plan

- Refinamiento adicional de copy (la base está en secciones 2 y 3).
- Diseño visual detallado (se alinea al estilo de otras herramientas en /recursos).
- Límite de ítems por PDF ya definido en sección 5 (CSV) y 7 (PDF): máx 50 por archivo; preview máx 15 en pantalla.
- Integración con el producto Zink ERP (CodigoBarrasDialog); este plan es solo para la web pública Astro.

---

**Estado:** Pendiente de implementación.
