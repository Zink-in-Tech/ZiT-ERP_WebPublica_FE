# Plan: 10+ microherramientas para comerciantes (sin backend)

Documento de referencia para ir construyendo las herramientas poco a poco. Todas son solo front-end (sin backend), con valor e impacto para comerciantes.

**Ya en producción:** Caja Diaria, Precios Inteligentes, Generador de códigos de barras, Etiquetas de góndola (PDF), Ticket promedio.

---

## Patrón existente a reutilizar

- **Ruta**: cada herramienta vive en `src/pages/recursos/index.astro` como entrada en `availableTools` y en `src/pages/recursos/<slug>/index.astro`.
- **Estructura de página**: Layout + Header + Footer; hero con título/descripción; sección de pasos o instrucciones; bloque "herramienta" con formularios/tablas; opcional CTA WhatsApp o link a ZinkERP.
- **Datos**: solo front-end: `localStorage` (clave por herramienta), export/import CSV o descarga de archivos generados en el cliente (PDF/PNG cuando se use librería client-side).
- **Referencia de implementación**: `src/pages/recursos/precios-inteligentes/index.astro` (tipos de precio, productos, cálculo, export CSV, limpiar).

No se requiere backend ni APIs: todo corre en el navegador; el deploy es el mismo estático que ya tienen.

---

## ¿Son complejos? ¿Tienen valor?

Las ideas (ticket promedio, upselling/cross-selling, rotación de stock, deuda promedio, morosidad) **no son complejas** en versión micro-herramienta y **sí tienen mucho valor**:

- **Ticket promedio**: una fórmula (total vendido / cantidad de ventas). El comerciante carga ventas o pega total + cantidad → ve su ticket y puede comparar por período. Muy útil para fijar metas.
- **Upselling / cross-selling**: calculadora de impacto: "si X% de tus ventas llevan un producto más a $Y, tu nuevo ticket sería Z y ganás W% más". Inputs: ticket actual, % clientes que suman ítem, precio del ítem extra. Salida: nuevo ticket, incremento %. Simple y con impacto en decisión.
- **Rotación de stock**: ventas del período (unidades o $) / stock promedio = rotación; 365/rotación = días de stock. Dos inputs, dos resultados. Sin listas si no quieren; opcionalmente lista de productos con rotación individual.
- **Deuda promedio / morosidad**: lista de cuentas a cobrar (cliente, monto, fecha vencimiento) → total a cobrar, deuda promedio por cliente, **morosidad %** (monto vencido / total). Una sola pantalla con tabla + totales. Alto valor para quien cobra a plazo.

Todas se resuelven con fórmulas o una lista en el cliente; ninguna requiere backend.

---

## Listado de microherramientas (mejorado y ampliado)

### 1. Calculadora de margen rápida

- **Slug**: `calculadora-margen`
- **Valor**: Una pantalla: costo + % margen o markup → precio de venta; o precio + costo → margen %.
- **Flujo**: Inputs costo, precio y/o %; resultado al instante; opcional "invertir" (dado precio, cuánto margen).
- **Complejidad**: Baja. **Impacto**: Alto.
- **Estado**: [ ] Pendiente

### 2. Ticket promedio

- **Slug**: `ticket-promedio`
- **Valor**: Saber cuánto sale en promedio cada venta. Metas ("subir el ticket") y comparar períodos.
- **Flujo**: Opción A: cargar lista de montos de ventas (manual o CSV) → total, cantidad, ticket promedio. Opción B: solo dos números (total facturado, cantidad de ventas) → ticket promedio. Breve texto "cómo mejorar tu ticket" (upsell, combos).
- **Complejidad**: Baja. **Impacto**: Alto.
- **Estado**: [x] Hecho

### 3. Impacto del upselling / cross-selling

- **Slug**: `upselling-crosselling`
- **Valor**: Ver en números el efecto de que más clientes lleven un producto extra (postre, accesorio, garantía).
- **Flujo**: Inputs: ticket promedio actual, % de ventas que agregarían el ítem (ej. 20%), precio del ítem extra. Salida: nuevo ticket promedio, incremento % en ventas. Opcional: segunda línea "si subís a X%…".
- **Complejidad**: Baja. **Impacto**: Alto.
- **Estado**: [ ] Pendiente

### 4. Rotación de stock

- **Slug**: `rotacion-stock`
- **Valor**: Entender cuántas veces "gira" el stock en el período y cuántos días tenés de stock en promedio.
- **Flujo**: Ventas del período (en unidades o en $) + stock promedio (unidades o $) → rotación = ventas/stock; días de stock = 365/rotación (o días del período/rotación). Opcional: por producto (lista con ventas y stock por ítem).
- **Complejidad**: Baja. **Impacto**: Alto.
- **Estado**: [ ] Pendiente

### 5. Deuda promedio y morosidad

- **Slug**: `deuda-morosidad`
- **Valor**: Total a cobrar, deuda promedio por cliente, **morosidad %** (qué parte ya está vencida). Una vista clara para cobranzas.
- **Flujo**: Lista de cuentas a cobrar: cliente, monto, fecha vencimiento (manual o CSV). La herramienta calcula: total a cobrar, cantidad de clientes, deuda promedio, monto vencido, morosidad %. Tabla scrolleable; export CSV; Limpiar.
- **Complejidad**: Baja. **Impacto**: Alto.
- **Estado**: [ ] Pendiente

### 6. Generador de códigos de barras

- **Slug**: `codigos-de-barras`
- **Valor**: Generar imagen de código de barras (EAN-13, Code 128) para etiquetas sin instalar nada.
- **Flujo**: Ingresar número/código → elegir tipo (EAN-13 / Code 128) → ver preview → descargar PNG (JsBarcode en cliente).
- **Complejidad**: Media (lib). **Impacto**: Alto.
- **Estado**: [x] Hecho

### 7. Validador de códigos de barras

- **Slug**: `validador-codigos`
- **Valor**: Verificar si un código EAN-13 (u otro) es válido (dígito verificador, longitud).
- **Flujo**: Pegar o tipear código → válido/inválido y motivo; opcional corrección sugerida.
- **Complejidad**: Baja. **Impacto**: Medio.
- **Estado**: [ ] Pendiente

### 8. Etiquetas para gondola (PDF)

- **Slug**: `etiquetas-gondola`
- **Valor**: Lista de productos (código, nombre, precio) → PDF para imprimir etiquetas en A4 (grid 2x4 o similar).
- **Flujo**: Cargar lista (formulario + CSV); elegir columnas y cantidad por hoja; generar PDF en cliente (jsPDF); descargar. Lista en `localStorage`; Limpiar.
- **Complejidad**: Media (PDF). **Impacto**: Alto.
- **Estado**: [x] Hecho

### 9. Comparador de precios de proveedores

- **Slug**: `comparador-proveedores`
- **Valor**: Subir 2–3 listas (proveedor, código, precio) y ver por producto el mejor precio y la diferencia.
- **Flujo**: Import CSV por proveedor; tabla unificada por código con mejor precio resaltado; export CSV.
- **Complejidad**: Media. **Impacto**: Alto.
- **Estado**: [ ] Pendiente

### 10. Recordatorio de vencimientos (productos)

- **Slug**: `vencimientos`
- **Valor**: Productos con fecha de vencimiento; ver "próximos a vencer" (7/15/30 días).
- **Flujo**: Alta manual o CSV (codigo, descripcion, fecha_vencimiento); filtros por días; lista ordenada; export CSV; Limpiar.
- **Complejidad**: Baja. **Impacto**: Alto.
- **Estado**: [ ] Pendiente

### 11. Lista para conteo de inventario

- **Slug**: `conteo-inventario`
- **Valor**: Listado para conteo físico (producto + columna para cantidad contada); imprimir o exportar.
- **Flujo**: Cargar ítems (manual o CSV); imprimir/PDF o export CSV para llevar al depósito; `localStorage`; Limpiar.
- **Complejidad**: Baja. **Impacto**: Medio.
- **Estado**: [ ] Pendiente

### 12. Presupuesto simple (cotización PDF)

- **Slug**: `presupuesto-simple`
- **Valor**: Cotización de una página: ítems, cantidades, precios, IVA, total; descargar PDF.
- **Flujo**: Formulario ítems; cliente/fecha opcionales; generar PDF en cliente; `localStorage`; Limpiar.
- **Complejidad**: Media (PDF). **Impacto**: Alto.
- **Estado**: [ ] Pendiente

### 13. Calculadora de descuentos por volumen

- **Slug**: `descuentos-volumen`
- **Valor**: Escalas (ej. 6–20 u → 5%, 21+ u → 10%); calcular precio final por cantidad.
- **Flujo**: Configurar hasta 3–4 escalas; precio base + cantidad → precio final. Escalas en `localStorage`.
- **Complejidad**: Baja. **Impacto**: Medio.
- **Estado**: [ ] Pendiente

### 14. Precios terminados en .99

- **Slug**: `precios-psychology`
- **Valor**: Dado un precio redondo, ver alternativas .99 / .90 para percepción.
- **Flujo**: Input precio → 2–3 alternativas; opcional lista de productos con precio sugerido.
- **Complejidad**: Baja. **Impacto**: Medio.
- **Estado**: [ ] Pendiente

### 15. Convertidor de unidades

- **Slug**: `convertidor-unidades`
- **Valor**: Conversión rápida: kg/lb, m/cm, unidades por caja, precio por unidad vs por kg.
- **Flujo**: Tipo de conversión + valor → resultado al instante.
- **Complejidad**: Baja. **Impacto**: Medio.
- **Estado**: [ ] Pendiente

### 16. Cuenta rápida (cobros y pagos)

- **Slug**: `cuenta-rapida`
- **Valor**: Lista simple: ítems de cobro y de pago; totales por tipo. Complementa "Deuda y morosidad" para quien quiere solo totales.
- **Flujo**: Agregar ítem (cobro/pago, concepto, monto, fecha); tabla; totales; export CSV; Limpiar.
- **Complejidad**: Baja. **Impacto**: Medio.
- **Estado**: [ ] Pendiente

---

## Criterios de diseño por herramienta

- **Una página Astro** por herramienta: `src/pages/recursos/<slug>/index.astro`.
- **Mismo layout**: `Layout`, `Header`, `Footer`; meta title/description específicos.
- **Hero corto**: título, descripción, 3–4 bullets de valor; opcional sección "cómo funciona" colapsable.
- **Sin login**: todo en el navegador; datos en `localStorage` con clave única (ej. `precios-inteligentes-v3`, `codigos-barras-v1`).
- **Acción "Limpiar"** donde haya datos persistentes.
- **Contenedores con scroll** en listas/tablas largas (como en Precios Inteligentes).
- **CTA opcional** hacia ZinkERP o WhatsApp al final o post-descarga.

---

## Orden sugerido de implementación

Prioridad por impacto y simplicidad:


| Orden | Herramienta                 | Complejidad | Impacto | Estado desarrollo |
| ----- | --------------------------- | ----------- | ------- | ----------------- |
| 1     | Calculadora de margen       | Baja        | Alto    | Pendiente         |
| 2     | Ticket promedio             | Baja        | Alto    | Hecho             |
| 3     | Upselling / cross-selling   | Baja        | Alto    | Pendiente         |
| 4     | Rotación de stock           | Baja        | Alto    | Pendiente         |
| 5     | Deuda promedio y morosidad  | Baja        | Alto    | Pendiente         |
| 6     | Generador códigos de barras | Media (lib) | Alto    | Hecho             |
| 7     | Validador códigos           | Baja        | Medio   | Pendiente         |
| 8     | Etiquetas gondola           | Media (PDF) | Alto    | Hecho             |
| 9     | Comparador proveedores      | Media       | Alto    | Pendiente         |
| 10    | Vencimientos                | Baja        | Alto    | Pendiente         |
| 11    | Conteo inventario           | Baja        | Medio   | Pendiente         |
| 12    | Presupuesto simple          | Media (PDF) | Alto    | Pendiente         |
| 13    | Descuentos por volumen      | Baja        | Medio   | Pendiente         |
| 14    | Precios .99                 | Baja        | Medio   | Pendiente         |
| 15    | Convertidor unidades        | Baja        | Medio   | Pendiente         |
| 16    | Cuenta rápida               | Baja        | Medio   | Pendiente         |


Cada entrega: nueva carpeta `recursos/<slug>/index.astro` + una entrada en `availableTools` en `src/pages/recursos/index.astro`. Sin cambios de infra ni backend.

---

## Dependencias client-side posibles

- **Códigos de barras**: JsBarcode (CDN o npm) para generar imagen.
- **PDF**: jsPDF (y opcionalmente autoTable para tablas) para etiquetas y presupuesto.
- El resto puede implementarse con HTML, CSS y JavaScript vanilla; CSV con `Blob` + `URL.createObjectURL` como en Precios Inteligentes.

---

## Resumen

- **16 microherramientas** definidas; todas factibles sin backend, desplegables como estáticas.
- **Incorporadas** (simples y de alto valor): ticket promedio, impacto upselling/cross-selling, rotación de stock, deuda promedio y morosidad. Ninguna es compleja: fórmulas o una lista en el cliente.
- **Patrón único**: página Astro por slug, `availableTools` en el index de recursos, datos en `localStorage` y/o descargas en cliente.
- **Prioridad**: empezar por calculadora de margen, ticket promedio, upselling, rotación de stock y deuda/morosidad (alto impacto, baja complejidad); luego generador de códigos de barras y el resto.

**Cómo usar este doc**: al terminar cada herramienta, marcar su **Estado** en la ficha como `[x] Hecho`, actualizar la columna **Estado desarrollo** en la tabla y el listado de abajo.

---

## Listado de estado de desarrollo

Resumen para ir tachando según avances. Valores posibles: **Pendiente** | **En curso** | **Hecho**.


| #   | Slug                   | Estado desarrollo |
| --- | ---------------------- | ----------------- |
| 1   | calculadora-margen     | Pendiente         |
| 2   | ticket-promedio        | Hecho              |
| 3   | upselling-crosselling  | Pendiente         |
| 4   | rotacion-stock         | Pendiente         |
| 5   | deuda-morosidad        | Pendiente         |
| 6   | codigos-de-barras      | Hecho             |
| 7   | validador-codigos      | Pendiente         |
| 8   | etiquetas-gondola      | Hecho             |
| 9   | comparador-proveedores | Pendiente         |
| 10  | vencimientos           | Pendiente         |
| 11  | conteo-inventario      | Pendiente         |
| 12  | presupuesto-simple     | Pendiente         |
| 13  | descuentos-volumen     | Pendiente         |
| 14  | precios-psychology     | Pendiente         |
| 15  | convertidor-unidades   | Pendiente         |
| 16  | cuenta-rapida          | Pendiente         |


