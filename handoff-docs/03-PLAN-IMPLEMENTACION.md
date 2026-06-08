# Plan de Implementación — Fases

## Fase 1: Infraestructura (arrancar YA)

**Dependencias:** Ninguna. Base del sitio.

| Componente | Archivos involucrados |
|---|---|
| Header con mega menú "Producto ▾" | Header.astro, MegaMenu.astro |
| Dropdown "Soluciones ▾" | Dropdown simple |
| Dropdown "Recursos ▾" | Dropdown simple |
| Footer con link a Documentación | Footer.astro |
| Banner cross-link universal "¿Tenés más de una sucursal?" | Componente global |
| Sticky CTA mobile | StickyCTA.astro |
| Layout global responsivo | Layout.astro, header.css |

## Fase 2: Páginas core (con screenshots reales)

**Dependencia crítica:** Screenshots reales del producto (POS, dashboard stock, facturación).

| Página | Visuales necesarios |
|---|---|
| Ventas y POS | Screenshot real del POS + flujo de venta |
| Inventario | Dashboard de stock + timeline de movimientos |
| Facturación AFIP/ARCA | Pantalla de facturación + mapa Argentina |
| Finanzas | Dashboard financiero + cierre de caja |

## Fase 3: Páginas de soporte

**Dependencia:** Diagramas y mockups específicos.

| Página | Visuales necesarios |
|---|---|
| Compras | Tabla OC + cards proveedores |
| Sucursales | Mapa + diagramas de sincronización y flujo |
| Control de Acceso | Builder de perfiles + tabla comparativa |

## Fase 4: Reportes y Dashboard

**⚠️ CRÍTICO:** NO lanzar sin screenshot real del dashboard ejecutivo.

| Página | Visuales necesarios |
|---|---|
| Reportes y Dashboard | Screenshot REAL del dashboard (KPI cards + gráfico barras + top productos) |

## Notas sobre visuales

- Los screenshots deben ser del producto real o mockups de alta fidelidad.
- NO usar imágenes de stock.
- Logos de terceros (WooCommerce, Mercado Pago) deben ser versiones oficiales.
- Diagramas: preferir CSS + SVG inline sobre PNG.
- Iconos: set coherente en todo el sitio (Phosphor o similar).
- Lazy loading en imágenes debajo del fold.
- WebP con fallback a PNG/JPG.
