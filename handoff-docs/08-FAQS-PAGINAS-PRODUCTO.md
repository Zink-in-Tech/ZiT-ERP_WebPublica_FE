# FAQs Específicas por Página de Producto

## Regla general
- 3 preguntas por página. Modo acordeón (mismo componente que FAQs de homepage).
- Ubicación: al final de la página, ANTES del banner cross-link de sucursales.
- Tono: directo, sin jargon, en voseo si el resto del sitio usa voseo.
- No reemplazan las FAQs globales de la homepage. Son específicas del módulo.

---

## 1. Ventas y POS — FAQs

```
## Preguntas frecuentes sobre Ventas y POS

**¿ZinkPOS funciona sin conexión a internet?**
ZinkPOS usa un caché de 400 productos para operar a velocidad local, pero
necesita conexión para sincronizar ventas, stock y medios de pago. No está
diseñado para operar sin internet de forma prolongada.

**¿Puedo usar ZinkPOS en una tablet?**
Sí. ZinkPOS está optimizado para pantallas táctiles y funciona en tablets
Android y iPad desde el navegador. También operable 100% con teclado en
PC.

**¿Las ventas de ZinkPOS descuentan stock automáticamente?**
Sí. Cada venta realizada en POS descuenta el stock de la sucursal donde se
vendió al instante. Si tenés varias sucursales, cada una descuenta su
propio stock.
```

---

## 2. Facturación AFIP/ARCA — FAQs

```
## Preguntas frecuentes sobre Facturación

**¿Factura para monotributo y responsable inscripto?**
Sí. ZinkERP soporta Facturas A, B, C y M, más Notas de Crédito y Débito.
Cubrimos los regímenes más comunes de monotributo y responsable inscripto.

**¿Tengo que hacer algún trámite en ARCA antes de facturar?**
Sí. Necesitás autorizar a la CUIT de ZinkInTech a emitir comprobantes en
tu nombre. El trámite se hace desde la página de ARCA y la habilitación
demora hasta 24 horas. Nosotros te guiamos en el proceso.

**¿Puedo facturar directamente desde una venta de POS?**
Sí. Desde el sistema podés generar el comprobante vinculado a una venta
existente. La factura queda asociada al cliente y a la operación.
```

---

## 3. Sucursales — FAQs

```
## Preguntas frecuentes sobre Sucursales

**¿Cada sucursal paga un plan por separado?**
No. El plan es por organización. Las sucursales adicionales tienen un
costo del 50% sobre el plan base. Todos los usuarios de todas las
sucursales están incluidos sin costo extra.

**¿Puedo tener permisos distintos en cada sucursal?**
Sí. Cada usuario puede tener un perfil distinto en cada sucursal. Por
ejemplo: un encargado ve todo en su sucursal pero no accede a las otras.
El dueño ve todo de todas.

**¿El stock se sincroniza solo entre sucursales?**
Sí. Cada venta, compra o ajuste se refleja al instante en la sucursal
correspondiente. Además, podés configurar qué stock ve cada sucursal
(visibilidad total, parcial o solo la propia).
```

---

## 4. Inventario — FAQs

```
## Preguntas frecuentes sobre Inventario

**¿El stock se actualiza automáticamente cuando vendo?**
Sí. Cada venta descuenta stock al instante. Cada compra lo incrementa.
Cada ajuste queda registrado. No necesitás hacer nada manual.

**¿Puedo tener precios distintos en cada sucursal?**
Sí. Definís listas de precios por sucursal y por canal (mayorista,
minorista, promoción). Cada sucursal opera con sus precios, vos ves todo
consolidado.

**¿Hay alertas cuando un producto está por debajo del mínimo?**
Sí. El sistema marca los productos con stock crítico y podés verlos en
el reporte correspondiente. También ayuda a decidir qué reponer en cada
sucursal.
```

---

## Resumen de implementación

| Página | FAQs | Prioridad |
|---|---|---|
| Ventas y POS | 3 preguntas | Alta |
| Facturación | 3 preguntas | Alta |
| Sucursales | 3 preguntas | Alta |
| Inventario | 3 preguntas | Alta |
| Compras | 0 (no aplica) | — |
| Finanzas | 0 (no aplica) | — |
| Control de Acceso | 0 (no aplica) | — |
| Reportes | 0 (no lanzada aún) | — |

## Ubicación exacta en cada página

```
┌─ Sección final ──────────────────────────────────┐
│                                                   │
│  Preguntas frecuentes sobre [Módulo]              │
│                                                   │
│  ▸ ¿Pregunta 1?                                   │
│  ▸ ¿Pregunta 2?                                   │
│  ▸ ¿Pregunta 3?                                   │
│                                                   │
├─ Banner cross-link sucursales ────────────────────┤
│  ¿Tenés más de una sucursal? →                    │
├─ Footer ──────────────────────────────────────────┤
└───────────────────────────────────────────────────┘
```
