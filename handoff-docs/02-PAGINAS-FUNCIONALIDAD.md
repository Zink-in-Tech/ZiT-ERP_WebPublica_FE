# 8 Páginas de Funcionalidad — Specs para Desarrollo

Este documento contiene los specs ejecutables de las 8 páginas de funcionalidad que cuelgan del mega menú "Producto".

## Estructura común de cada página

1. Hero (título + subtítulo + CTA + visual)
2. Secciones (3-4 por página, tipo: texto+imagen, cards, diagrama, iconos, tabla)
3. Banner final con CTA
4. Banner cross-link "¿Tenés más de una sucursal?"
5. SEO title + meta description
6. Notas de desarrollo (mobile, sticky CTA, visuales críticos)

---

## 1. Ventas y POS

**URL:** /producto/ventas-y-pos
**SEO title:** Ventas y POS | ZinkERP — Vendé más y más rápido en todas tus sucursales
**Meta description:** Gestioná presupuestos, POS y factura electrónica en un solo flujo. Stock y precios sincronizados en todas tus sucursales. Probá ZinkERP gratis.

### Hero
- **Título:** Vendé más y más rápido. En mostrador, online o donde sea. Con stock y precios sincronizados en todas tus sucursales.
- **Subtítulo:** Presupuesto, POS y factura electrónica en un mismo flujo. Sin sistemas paralelos, sin errores de tipeo.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Screenshot real del POS con productos, total y métodos de pago.

### Secciones

**S1 — Del presupuesto a la factura sin pisar dos veces el mismo dato**
- Tipo: texto + diagrama horizontal
- Visual: flujo Presupuesto → Pedido → Venta → Factura ARCA
- Cross-links: /producto/facturacion, /producto/inventario
- Mobile: diagrama se vuelve vertical (timeline)

**S2 — ZinkPOS: cobrá como en una autopista. Sin Internet, sin mouse.**
- Tipo: texto + screenshot con anotaciones
- Visual: POS con callouts destacando búsqueda rápida, atajos teclado, modo offline
- Cross-links: /producto/sucursales

**S3 — Consultá precios sin abrir una venta**
- Tipo: texto + mockup tablet
- Visual: tablet en mano mostrando consulta rápida de precios
- Ideal para showroom

**S4 — Tu tienda online sincronizada con tu negocio físico**
- Tipo: iconos + texto
- Visual: logos WooCommerce + Mercado Pago + flecha bidireccional
- Cross-links: páginas de integración (externas)

### Banner final
"Ventas + POS + factura + ecommerce. Un solo sistema." → "Probá gratis" → /registro

---

## 2. Compras

**URL:** /producto/compras
**SEO title:** Compras | ZinkERP — Gestión de compras y proveedores multi-sucursal
**Meta description:** Ordená tus compras con sugerencias automáticas, control de proveedores y sincronización con tu stock. Multi-sucursal. Probá ZinkERP.

### Hero
- **Título:** Comprá lo que necesitás, cuando lo necesitás. Centralizado o por sucursal. Vos decidís.
- **Subtítulo:** Órdenes de compra con sugerencias automáticas, control de proveedores y sincronización con tu stock.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Captura de tabla de OC con estados (Pendiente, Aprobada, Recibida, Cancelada)

### Secciones

**S1 — Órdenes de compra que te avisan antes de que te falte**
- Tipo: texto + imagen (creación de OC con productos sugeridos)
- Cross-links: /producto/inventario

**S2 — Tus proveedores, ordenados. Precios, plazos y cumplimiento**
- Tipo: cards (3-4 cards de perfiles de proveedor con métricas)
- Visual: cards con nombre, rubro, última compra, precio promedio, % cumplimiento

**S3 — Cada sucursal pide, central aprueba. O viceversa.**
- Tipo: texto + diagrama de flujo sucursal↔central
- Cross-links: /producto/sucursales
- Mobile: diagrama vertical

### Banner final
"Del pedido al stock en un solo paso. Sin hojas de cálculo, sin WhatsApp perdidos." → "Probá gratis" → /registro

---

## 3. Inventario / Stock

**URL:** /producto/inventario
**SEO title:** Inventario | ZinkERP — Stock multi-sucursal en tiempo real
**Meta description:** Controlá tu stock en todas tus sucursales al instante. Alertas, movimientos auditados y catálogo centralizado. Empezá hoy gratis.

### Hero
- **Título:** Sabé exactamente qué tenés y dónde. En tiempo real, sin contar a mano.
- **Subtítulo:** Stock multi-sucursal actualizado al instante. Alertas, movimientos auditados y catálogo centralizado.
- **CTA:** "Empezá hoy" → /registro
- **Visual:** Dashboard con cards de stock por sucursal

### Secciones

**S1 — Cada movimiento actualiza tu stock al instante**
- Tipo: texto + widget de stock en tiempo real (timeline de últimas actividades)
- Cross-links: /producto/ventas-y-pos, /producto/sucursales

**S2 — Cada movimiento, registrado. Sabés quién, cuándo y por qué.**
- Tipo: texto + timeline de movimientos (usuario, sucursal, tipo, cantidad)

**S3 — Un catálogo para todas tus sucursales, con precios distintos si hace falta**
- Tipo: texto + ficha de producto expandible con acordeón "Precios por sucursal"
- Cross-links: /producto/control-de-acceso

### Banner final
"Stock desordenado, negocio que pierde plata. Stock claro, negocio que crece." → "Probá gratis" → /registro

---

## 4. Facturación AFIP / ARCA

**URL:** /producto/facturacion
**SEO title:** Facturación AFIP/ARCA | ZinkERP — Facturación electrónica nativa para Argentina
**Meta description:** Facturá en ARCA sin complicaciones. Todos los comprobantes, IIBB provincia por provincia, IVA automático. Hecho para Argentina. Empezá hoy.

### Hero
- **Título:** Facturá en ARCA sin pensar dos veces.
- **Subtítulo:** Monotributo, Responsable Inscripto, Regímenes provinciales. Todo nativo, nada adaptado a los ponchazos.
- **CTA:** "Empezá hoy" → /registro
- **Visual:** Mockup de pantalla de facturación con comprobante visible

### Secciones

**S1 — Todos los comprobantes que necesitás, sin límite ni vueltas**
- Tipo: chips/tags visuales de tipos de comprobante
- Visual: grid de chips: Factura A, B, C, M, ND, NC, Remito, Recibo
- 4 cols desktop, 2 cols mobile. No interactivos (solo exhibición).

**S2 — Hecho para la complejidad de facturar en Argentina**
- Tipo: texto + mapa de Argentina con provincias destacadas
- Visual: mapa SVG + listado de características (IIBB, IVA, PV)
- Cross-links: /producto/sucursales

**S3 — Una venta en POS → factura automática. Un clic para liquidar IVA.**
- Tipo: texto + diagrama de automatización
- Visual: flujo Venta POS → Comprobante ARCA → Liquidación IVA
- Cross-links: /producto/ventas-y-pos, /producto/finanzas

### Banner final
"Hecho en Argentina, para Argentina. La facturación que entiende tu negocio." → "Empezá hoy" → /registro

---

## 5. Finanzas

**URL:** /producto/finanzas
**SEO title:** Finanzas | ZinkERP — Caja, cuenta corriente y dashboard financiero multi-sucursal
**Meta description:** Controlá la caja de cada sucursal por separado y consolidá al instante. Cuenta corriente, ingresos, egresos y vencimientos. Agendá una demo.

### Hero
- **Título:** Tus finanzas claras. Tu negocio, bajo control. Con la caja de cada sucursal separada y consolidada al instante.
- **Subtítulo:** Cuenta corriente, caja diaria, ingresos, egresos y vencimientos. Todo actualizado, todo en un lugar.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Dashboard financiero con cards (cta cte, caja, vencimientos, ingreso/egreso)

### Secciones

**S1 — Sabé quién te debe, cuánto y hace cuánto**
- Tipo: texto + tabla de cuenta corriente con color coding
- Visual: columnas Cliente, Saldo, Antigüedad (30/60/90+), Último movimiento. Verde/amarillo/rojo.
- Cross-links: /producto/ventas-y-pos

**S2 — Cada operador rinde su propia caja. Sin mezclar, sin perder plata.**
- Tipo: texto + pantalla de apertura/cierre de caja
- Visual: operador, fecha, monto inicial, ventas, diferencia, indicador verde/rojo
- Cross-links: /producto/control-de-acceso

**S3 — Cobrás y pagás como quieras. Todo registrado.**
- Tipo: iconos + texto
- Visual: grid de medios de pago (efectivo, transferencia, MP, cheque, tarjeta)
- Cross-links: /producto/facturacion

### Banner final
"Números claros, decisiones seguras." → "Probá gratis" → /registro

---

## 6. Reportes y Dashboard

**⚠️ CRÍTICO:** NO lanzar sin screenshots reales del dashboard.

**URL:** /producto/reportes
**SEO title:** Reportes y Dashboard | ZinkERP — Decisiones con datos, dashboard sin configurar
**Meta description:** Ventas, márgenes, stock, comisiones. Un dashboard que funciona desde el día uno. Exportá a PDF, Excel. Agendá una demo.

### Hero
- **Título:** Las respuestas de tu negocio están en los números. Te las mostramos claras.
- **Subtítulo:** Ventas, márgenes, stock, comisiones. Un dashboard que funciona desde el día uno. Sin configurar nada.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Screenshot REAL del dashboard ejecutivo. Imprescindible.

### Secciones

**S1 — Un vistazo y sabés cómo va el negocio**
- Tipo: texto + screenshot real del dashboard
- Visual: KPI cards (ventas hoy vs ayer), gráfico barras (facturación por sucursal), top 10 productos
- Cross-links: /producto/sucursales
- **PRIORIDAD MÁXIMA.** Sin este screenshot no se lanza la página.

**S2 — Reportes que te ayudan a operar mejor**
- Tipo: 3 cards con mini-previsualizaciones
- Visual: Ventas por vendedor, Stock crítico, Cuentas vencidas
- Cross-links: /producto/finanzas

**S3 — Exportá, compartí, automatizá**
- Tipo: iconos + texto
- Visual: iconos PDF, Excel, CSV + email con calendario

### Banner final
"Tomá decisiones con datos, no con corazonadas." → "Probá gratis" → /registro

---

## 7. Sucursales (Multi-sucursal)

**URL:** /producto/sucursales
**SEO title:** Sucursales | ZinkERP — Controlá 2 o 20 sucursales desde un solo lugar
**Meta description:** Stock, precios, usuarios y reportes sincronizados al instante entre todas tus sucursales. Precio plano sin sorpresas. Agendá una demo.

### Hero
- **Título:** Controlá 2 sucursales o 20. Desde el celular. Sin drama.
- **Subtítulo:** Stock, precios, usuarios y reportes sincronizados al instante entre todas tus sucursales.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Mapa conceptual con sucursales + cards de métricas

### Secciones

**S1 — Todo lo que pasa en tus sucursales, en una sola pantalla**
- Tipo: texto + dashboard multi-sucursal
- Cross-links: /producto/reportes

**S2 — Sincronización en tiempo real. Sin esperar, sin archivos.**
- Tipo: texto + diagrama de sincronización entre sucursales (3 nodos en estrella)

**S3 — Sucursales que piden, central que aprueba. O central que asigna.**
- Tipo: texto + diagrama de flujo inter-sucursal
- Cross-links: /producto/compras, /producto/inventario

**S4 — Stock intersucursal configurable**
- Tipo: tabla comparativa (3 niveles: visibilidad total, parcial, sin visibilidad)
- Cross-links: /producto/control-de-acceso
- Mobile: cards apiladas

**S5 — Precio plano, sin sorpresas. Sucursales extra al 50%.**
- Tipo: tabla de precios simple con columna "Sucursales extra" destacada

### Banner final
"Crece sin límites. Cada sucursal, conectada." → "Probá gratis" → /registro

---

## 8. Control de Acceso y Perfiles

**URL:** /producto/control-de-acceso
**SEO title:** Control de Acceso | ZinkERP — Perfiles y permisos granulares para tu negocio
**Meta description:** Definí perfiles a medida con permisos precisos. Cada persona ve solo lo que necesita. Caja diaria por operador. Agendá una demo.

### Hero
- **Título:** Cada persona en tu negocio ve solo lo que necesita. Ni más, ni menos.
- **Subtítulo:** Perfiles a medida, permisos precisos y caja diaria por operador. Control sin volverte loco.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Builder de perfiles visual (checkboxes agrupados por módulo)

### Secciones

**S1 — Creá los perfiles que tu negocio necesita. No los que el sistema te deja.**
- Tipo: 4 cards de ejemplo de perfiles (Cajero, Encargado, Dueño, Contador)
- Cross-links: /producto/sucursales

**S2 — Permisos precisos: podés ver el precio de costo, pero no modificarlo.**
- Tipo: tabla comparativa "Competencia típica (3 roles fijos) vs ZinkERP (permisos granulares)"
- Sin nombrar competidores
- Cross-links: /producto/inventario

**S3 — Cada operador con su caja. Lo que rinde uno, no se mezcla con otro.**
- Tipo: texto + pantalla de cierre de caja individual
- Cross-links: /producto/finanzas

**S4 — El encargado ve su sucursal. El dueño ve todo.**
- Tipo: texto + diagrama de data scope (3 capas concéntricas)
- Cross-links: /producto/sucursales
- Mobile: barras apiladas horizontales

### Banner final
"Control total sin volverte loco. Cada quien, lo suyo." → "Probá gratis" → /registro

---

## Transversales (aplican a todas las páginas)

### Sticky CTA mobile
- Barra fija abajo en viewports < 768px. 56px altura, botón centrado full-width.
- Mismo CTA del Hero de cada página.
- Visible siempre excepto cuando el drawer mobile está abierto.
- Z-index: 200+.

### Banner cross-link universal
- Texto: "¿Tenés más de una sucursal?"
- CTA: "Conocé cómo ZinkERP centraliza tus operaciones →" link a /producto/sucursales
- Ubicación: ANTES del footer, DESPUÉS del banner final de cada página.
- Diseño: fondo neutro, 2 cols desktop, stack vertical mobile.

### Responsive
- ≥ 1024px: layout desktop completo
- 768-1023px: menú hamburguesa, tablas como cards
- < 768px: sticky CTA, diagramas verticales, chips en 2 cols

### SEO
- Cada página con title y meta description únicos (provistos arriba)
- URLs limpias en minúsculas con guiones
- Open Graph tags (og:title, og:description, og:image)
- Sitemap.xml con todas las URLs
- Schema.org BreadcrumbList: Inicio > Producto > [Nombre página]
