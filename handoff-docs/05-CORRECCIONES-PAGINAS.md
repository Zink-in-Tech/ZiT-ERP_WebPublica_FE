# Handoff de Correcciones — Páginas de Funcionalidad

**Instrucción para el agente:** usar este documento para corregir los archivos `02-PAGINAS-FUNCIONALIDAD.md` y, si aplica, `01-MEGA-MENU-HEADER.md` (descripciones del mega menú). Cada corrección indica exactamente qué reemplazar.

---

## 1. Ventas y POS — Sección ZinkPOS

### Error
El handoff dice: *"Si se cae Internet, seguís vendiendo. Cuando vuelve, todo se sincroniza solo."*

### Realidad
No hay modo offline real. El caché de 400 items es para velocidad tipo local, no para operación sin conexión.

### Corrección
Reemplazar la sección S2 completa por:

**S2 — ZinkPOS: cobrá al instante. Sin esperas, sin pantallas lentas.**
- Tipo: texto + screenshot con anotaciones
- Copy: "Buscá productos al instante con un caché de 400 items. La experiencia es tipo local: no hay delays de red aunque tengas muchos productos cargados."
- Visual: screenshot del POS destacando búsqueda rápida y atajos de teclado
- Eliminar: cualquier mención a "offline", "sin Internet", "modo sin conexión"

Además, corregir la descripción en el mega menú (01-MEGA-MENU-HEADER.md): donde dice "Gestioná ventas, presupuestos y cobros en punto de venta", está bien. No tocar.

---

## 2. Compras — Sección Proveedores (S2)

### Error
El handoff dice: *"Guardá el historial de cada proveedor: qué te vendió, a qué precio, en cuánto tiempo entregó. Al pedir, ves esa info para decidir rápido. ¿Conviene este o el otro?"*

Esto sugiere que el sistema compara proveedores por precio histórico, cumplimiento y puntualidad. No existe.

### Realidad
Lo que existe: registro de proveedores con datos fiscales, contacto, y tracking de órdenes de compra emitidas a cada uno. No hay dashboard comparativo, no hay métricas de cumplimiento, no hay alerta de "mejor precio histórico".

### Corrección
Reemplazar S2 completa por:

**S2 — Tus proveedores, siempre a mano. Datos fiscales, contacto y OC al instante.**
- Tipo: cards (3 cards de perfil de proveedor)
- Copy: "Cada proveedor tiene su ficha con datos fiscales, contacto e histórico de órdenes de compra. Emitís una OC y queda registrada contra ese proveedor. Todo ordenado, todo en un lugar."
- Visual: cards de perfil de proveedor con: nombre, CUIT, teléfono, email, últimas OC emitidas (fecha y monto). Sin métricas de cumplimiento ni comparativas.
- Cross-links: /producto/inventario

---

## 3. Compras — Flujo sucursal/central (S3)

### Error
El handoff dice: *"Las sucursales generan solicitudes. Desde central ves todas, aprobás o ajustás. O si preferís, central compra y distribuye. El flujo lo definís vos."*

El "O viceversa" / "central compra y distribuye" no es correcto como funcionalidad actual.

### Realidad
La central recibe pedidos sincronizados de las sucursales y puede generar órdenes de compra a proveedores consolidadas. No hay "central asigna y distribuye a sucursales" como flujo bidireccional autónomo.

### Corrección
Reemplazar S3 por:

**S3 — Cada sucursal solicita, la central consolida y compra.**
- Tipo: texto + diagrama de flujo
- Copy: "Las sucursales registran sus necesidades. La central ve todo consolidado, decide el proveedor y emite la orden de compra. Cada sucursal sabe qué pidió y cuándo llega."
- Visual: diagrama: Sucursales → Central recibe pedidos → Central genera OC → Proveedor → Stock actualizado por sucursal
- Cross-links: /producto/sucursales, /producto/inventario
- Mobile: diagrama vertical

**Agregar sección S4:**

**S4 — La orden de compra viaja directo al proveedor.**
- Tipo: texto + icono
- Copy: "Cuando generás la OC, podés enviarla automáticamente por email al proveedor. Con todos los datos: productos, cantidades, precios acordados."
- Visual: icono de email + documento + flecha

---

## 4. Facturación AFIP/ARCA — REWRITE COMPLETO

**⚠️ Esta página está casi completamente incorrecta.** Debe reescribirse de cero.

### Errores identificados
- IIBB provincia por provincia: ❌ No existe
- Emisión automatizada desde POS: ❌ No existe como flujo automático
- Liquidación de IVA con un clic: ❌ No existe
- Mapa de Argentina con provincias: ❌ Engañoso
- Múltiples puntos de venta: ❌ No está implementado así
- "Todo nativo": Parcialmente cierto (vía Facturante como integración)

### Realidad
Facturación electrónica vía Facturante (integración, transicional a módulo propio). Tipos de comprobante: Factura A, B, C, M. Nota de Crédito, Nota de Débito. Para monotributo y responsable inscripto. Configuración en Preferencias → Integraciones. Habilitación ARCA demora hasta 24hs.

### Corrección — página completa nueva

**URL:** /producto/facturacion
**SEO title:** Facturación Electrónica | ZinkERP — Facturá desde tu ERP, conectado con ARCA
**Meta description:** Facturación electrónica AFIP/ARCA integrada a tu operación diaria. Facturas A, B, C, M, NC, ND. Para monotributo y RI. Sin salir del sistema.

### Hero
- **Título:** Facturá desde donde manejás tu negocio. Sin sistemas paralelos.
- **Subtítulo:** Factura electrónica AFIP/ARCA integrada a tu operación diaria. Para monotributo y responsable inscripto.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Mockup de pantalla de generación de comprobante desde el ERP

### Secciones

**S1 — Todos los comprobantes que necesitás, integrados a tu operación.**
- Tipo: chips/tags visuales
- Visual: grid de chips: Factura A, Factura B, Factura C, Factura M, Nota de Crédito, Nota de Débito. Cada chip con ícono.
- Copy: "Generá Facturas A, B, C y M, Notas de Crédito y Débito. Cada comprobante queda vinculado a la venta o al cliente. Sin duplicar trabajo."

**S2 — Una integración que funciona. Sin configuraciones complejas.**
- Tipo: texto + iconos
- Copy: "Conectamos ZinkERP con Facturante para que factures sin salir del sistema. Configurás una vez en Preferencias → Integraciones, ingresás tus datos fiscales, y ARCA te habilita en hasta 24 horas."
- Visual: 3 pasos simples en cards: (1) Configurar integración, (2) Ingresar datos fiscales, (3) ¡A facturar!
- Sin mapa, sin provincias, sin liquidación de IVA.

**S3 — Cada comprobante, conectado con tu operación.**
- Tipo: texto + diagrama simple
- Copy: "Una venta en el sistema puede generar su comprobante. Una compra se registra con su factura. Todo queda vinculado: sabés qué se facturó, a quién y desde qué operación."
- Visual: diagrama: Venta en ZinkERP → Comprobante ARCA → Registrado en cuenta corriente del cliente
- Cross-links: /producto/ventas-y-pos, /producto/finanzas

### Banner final
"Facturá sin salir de tu operación diaria. Simple, rápido, integrado." → "Probá gratis" → /registro

---

## 5. Reportes y Dashboard — REWRITE COMPLETO

**⚠️ Esta página NO debe lanzarse sin screenshots reales. El copy actual promete cosas que no existen.**

### Errores
- Dashboard ejecutivo con KPI cards ❌
- Gráfico de barras por sucursal ❌
- Top 10 productos ❌
- Margen bruto en tiempo real ❌
- Exportación a Excel/PDF/CSV ❌ (verificar)
- Reportes programados por email ❌ (verificar)

### Realidad (según indicó el equipo)
Lo que existe para mostrar:
- Flujo de cobros pendientes
- Flujo de pagos pendientes
- Ganancia bruta
- Productos incumplidos (pedidos que no se vendieron)
- Cantidad de ventas diarias
- Monto total de ventas diario

### Corrección — página completa nueva (solo lanzar cuando haya screenshots)

**URL:** /producto/reportes
**SEO title:** Reportes | ZinkERP — Los números de tu negocio, claros y a mano
**Meta description:** Ventas diarias, cobros pendientes, ganancia bruta, productos incumplidos. Reportes simples para dueños de pyme que toman decisiones.

### Hero
- **Título:** Los números que importan de tu negocio. Claros, simples, actualizados.
- **Subtítulo:** Ventas diarias, cobros pendientes, ganancia bruta. Lo que necesitás saber para decidir.
- **CTA:** "Agendá una demo" → /agendar-demo
- **Visual:** Screenshot REAL de uno de los reportes existentes (el que mejor se vea visualmente). NO mockup genérico. Si no hay screenshot disponible, no lanzar la página.

### Secciones

**S1 — Lo que importa: ventas, cobros y ganancia.**
- Tipo: cards con métricas
- Visual: 3-4 cards con números grandes: "Ventas de hoy: $X", "Cobros pendientes: $X", "Ganancia bruta: $X", "Productos sin vender: X"
- Copy: "Sin gráficos complicados ni dashboards que nadie entiende. Los números que necesitás para saber si el negocio va bien."
- Cross-links: /producto/finanzas, /producto/sucursales
- **Nota:** Mostrar SOLO lo que existe real. Nada de "top productos" o "margen por sucursal" si no está.

**S2 — Ventas diarias. Al grano.**
- Tipo: texto + tabla simple o card
- Visual: tabla de ventas diarias con columnas: Fecha, Cantidad de ventas, Monto total
- Copy: "Cuánto vendiste hoy, cuánto ayer, cuánto en el mes. Sin filtros, sin vueltas."
- Cross-links: /producto/ventas-y-pos

**S3 — Lo que entra, lo que sale, lo que queda pendiente.**
- Tipo: texto + íconos
- Visual: dos columnas: "Cobros pendientes" (monto total + cantidad) / "Pagos pendientes" (monto total + cantidad). Con iconos de flecha entrante/saliente.
- Copy: "Sabé cuánto te deben y cuánto debés. Sin conciliaciones manuales."
- Cross-links: /producto/finanzas

### Banner final
"Los números claros de tu negocio. Sin vueltas." → "Probá gratis" → /registro

### Nota de desarrollo CRÍTICA
Esta página NO debe lanzarse hasta que:
1. Existan screenshots reales de al menos 2 de los reportes listados
2. Se confirme que los reportes mencionados existen y funcionan
3. El equipo de producto valide que el copy refleja exactamente lo que el sistema muestra

Mientras tanto: redirigir /producto/reportes a /agendar-demo o a /producto/sucursales.

---

## 6. Cambios en el mega menú (01-MEGA-MENU-HEADER.md)

### Descripciones de items del mega menú

| Item | Descripción actual (incorrecta) | Descripción corregida |
|---|---|---|
| Facturación AFIP/ARCA | "Factura electrónica al instante, sin doble carga" | "Factura electrónica AFIP/ARCA integrada a tu operación diaria" |
| Reportes y Dashboard | "Decisiones basadas en datos con reportes visuales" | "Ventas diarias, cobros y ganancia bruta al instante" |

---

## 7. Resumen de prioridad de correcciones

| Prioridad | Página | Tipo de corrección |
|---|---|---|
| 🔴 Crítica | Facturación AFIP/ARCA | Reescribir COMPLETO |
| 🔴 Crítica | Reportes y Dashboard | Reescribir COMPLETO (no lanzar sin screenshots) |
| 🟡 Alta | Compras - S2 (proveedores) | Reemplazar sección |
| 🟡 Alta | Compras - S3 (flujo central/sucursal) | Reemplazar sección + agregar S4 |
| 🟢 Media | Ventas y POS - S2 (modo offline) | Reemplazar párrafo |
| 🟢 Media | Mega menú descripciones | 2 correcciones de texto |

---

## 8. Corrección visual transversal — reducir abuso de cards

### Problema
Las páginas de producto están resolviendo demasiadas secciones con el mismo recurso visual:
- grid de cards con borde
- bloques repetidos de 3 o 4 items
- poco cambio de jerarquía visual entre una página y otra

Esto hace que:
- las páginas se sientan demasiado parecidas
- baje la capacidad explicativa de cada sección
- se pierda la oportunidad de comunicar cómo funciona el producto con activos más narrativos

### Criterio de corrección
No todo debe resolverse con cards. Priorizar activos visuales que expliquen mejor el concepto:

| Tipo de contenido | Recurso visual preferido | Evitar |
|---|---|---|
| Flujos operativos | diagramas horizontales o verticales, timelines, pasos conectados | 3 cards sueltas sin relación |
| Permisos / roles | matrices, mapas de alcance, builder visual, capas de acceso | cards idénticas por rol |
| Sucursales | mapas de nodos, sincronización entre sedes, esquemas central ↔ sucursal | cards genéricas de beneficios |
| Facturación | chips + flujo simple de integración + mockup de comprobante | cards abstractas sin contexto |
| Compras | flujo sucursal → central → proveedor + ficha de proveedor | cards con métricas inventadas |
| Reportes | screenshot real + highlights + números puntuales | dashboards ficticios hechos con cards |

### Instrucción de diseño/implementación
- Cada página debe combinar **al menos 2 recursos visuales distintos** además del hero.
- Máximo recomendado: **1 sección principal resuelta como grid de cards** por página.
- El resto debe apoyarse en:
  - diagramas
  - timelines
  - mockups de interfaz
  - tablas comparativas
  - chips
  - flujos conectados
  - mapas de alcance o sincronización

### Aplicación concreta por página

**Ventas y POS**
- Mantener: flujo Presupuesto → Pedido → Venta → Factura
- Reemplazar cards genéricas por:
  - screenshot anotado del POS
  - mockup de consulta de precios
  - flujo ecommerce ↔ operación

**Compras**
- Mantener solo 1 bloque tipo card para fichas de proveedor
- Priorizar:
  - flujo sucursal → central → proveedor
  - bloque visual de envío por email de OC

**Inventario**
- Priorizar:
  - timeline de movimientos
  - ficha expandible de producto/precios
  - panel de stock por sucursal

**Facturación**
- Priorizar:
  - mockup del comprobante
  - chips de comprobantes
  - diagrama de integración con Facturante

**Finanzas**
- Priorizar:
  - tabla o comparativa de cuenta corriente
  - bloque de caja por operador
  - esquema de medios de cobro/pago

**Reportes**
- Prioridad absoluta en screenshot real
- Complementar con:
  - highlights sobre captura real
  - tabla simple de ventas diarias
  - dos columnas de cobros/pagos pendientes

**Sucursales**
- Priorizar:
  - mapa conceptual de nodos
  - flujo de sincronización
  - tabla de visibilidad intersucursal

**Control de Acceso**
- Reemplazar el exceso de cards por:
  - builder visual de perfiles
  - matriz comparativa de permisos
  - diagrama de alcance por rol (operador / encargado / dueño)

---

## Instrucción final para el agente

Una vez aplicadas todas las correcciones, verificar:

1. ✅ Ninguna página promete IIBB, liquidación de IVA, automatización fiscal, offline mode, comparación de proveedores, ni dashboards que no existen.
2. ✅ El tono sigue siendo cercano y profesional (voseo, beneficios, no features).
3. ✅ Los cross-links entre páginas siguen siendo válidos.
4. ✅ Las descripciones del mega menú coinciden con el contenido real de las páginas.
5. ✅ La página de Reportes tiene nota clara de "no lanzar sin screenshots reales".
6. ✅ La página de Facturación ya no menciona nada de IIBB, provincias, ni liquidación de IVA.
7. ✅ No hay abuso de grids de cards: cada página usa recursos visuales más comunicativos y variados.
