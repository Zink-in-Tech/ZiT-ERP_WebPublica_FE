# Mega Menú del Header — Spec para Desarrollo

## Estructura del nav (desktop)

```
[Logo]  [Producto ▾] [Soluciones ▾] [Recursos ▾] [Precios]  [Acceder al ERP] [Agendá una demo]
```

| Item | Tipo | Destino | Comportamiento |
|---|---|---|---|
| Logo | Link | `/` | — |
| Producto | Dropdown (mega menú) | — | Hover abre mega menú 3 columnas |
| Soluciones | Dropdown simple | `/casos-de-uso` | Hover: dropdown con verticales |
| Recursos | Dropdown simple | — | Hover: Blog, Documentación, Herramientas |
| Precios | Link directo | `/precios` | Click directo |
| Acceder al ERP | Link utilitario | `https://ziterp.zinkintech.com` | Botón outline pequeño |
| Agendá una demo | Botón primario | `/agendar-demo` | Único CTA destacado |

## Mega menú "Producto" — Layout

Full-width viewport, contenido interno alineado al container del header.

```
┌─────────────────────────────────────────────────────────────┐
│  PRODUCTO                                                    │
│                                                              │
│  ┌──────────────┬──────────────┬──────────────┐              │
│  │ CONTROL      │ VISIÓN       │ NEGOCIO      │              │
│  │ OPERATIVO    │ FINANCIERA   │ CONECTADO    │              │
│  │              │              │              │              │
│  │ Ventas y POS │ Finanzas     │ Sucursales   │              │
│  │ Compras      │ Facturación  │ Control de   │              │
│  │ Inventario   │ Reportes     │ Acceso       │              │
│  └──────────────┴──────────────┴──────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

## Composición de cada ítem en el mega menú

Cada link: **Ícono (24x24, violeta #723f97) + Título (semibold, 16px) + Descripción (1 línea, 14px, gray-500)**

### Items por columna

**Columna 1 — Control Operativo**
| Ícono | Título | Descripción | URL |
|---|---|---|---|
| ticket | Ventas y POS | Gestioná ventas, presupuestos y cobros en punto de venta | /producto/ventas-y-pos |
| carrito | Compras | Automatizá pedidos, aprobaciones y control de proveedores | /producto/compras |
| estante | Inventario | Stock en tiempo real por sucursal con alertas de reposición | /producto/inventario |

**Columna 2 — Visión Financiera**
| Ícono | Título | Descripción | URL |
|---|---|---|---|
| billete | Finanzas | Cuentas claras, ingresos y egresos en tiempo real | /producto/finanzas |
| documento | Facturación AFIP/ARCA | Factura electrónica al instante, sin doble carga | /producto/facturacion |
| chart | Reportes y Dashboard | Decisiones basadas en datos con reportes visuales | /producto/reportes |

**Columna 3 — Negocio Conectado**
| Ícono | Título | Descripción | URL |
|---|---|---|---|
| edificios | Sucursales | Todas tus sucursales sincronizadas en un solo lugar | /producto/sucursales |
| escudo | Control de Acceso y Perfiles | Permisos claros: cada persona ve lo que tiene que ver | /producto/control-de-acceso |

## Comportamiento

- **Apertura:** Hover sostenido 300ms sobre "Producto". Click toggle para touch.
- **Cierre:** Click fuera, hover sobre otro nav item, scroll, Escape.
- **Grace zone:** 16px entre trigger y panel para evitar cierres accidentales.
- **Transición:** Fade + translateY(200ms ease-out). Sin overlay.
- **Sin sub-anidamiento:** No hay dropdowns dentro del mega menú.
- **Z-index:** 50 (encima del contenido, debajo de modales).

## Accesibilidad

- Trigger "Producto" como `<button>` con `aria-expanded`, `aria-controls`, `aria-haspopup="true"`
- Panel como `role="region"` con `aria-label="Producto - Módulos del sistema"` y `aria-hidden`
- Navegación completa por teclado (Tab, Enter, Escape, flechas)
- Skip link "Saltar al contenido principal" al inicio
- `prefers-reduced-motion` respetado

## Mobile (< 1024px)

Header cambia a: `[Logo] [Agendá una demo (botón compacto)] [Hamburger ☰]`

Drawer desde la derecha con overlay oscuro. Orden dentro del drawer:
1. Producto ▸ (acordeón expandible con los 8 items agrupados por pilar)
2. Soluciones ▸ (acordeón simple)
3. Recursos ▸ (acordeón simple)
4. Precios
5. — separador —
6. Acceder al ERP
7. Agendá una demo (botón primario full-width)

**Sticky CTA mobile:** Botón "Agendá una demo" fijo abajo (56px altura, border-radius 12px, sombra). Visible siempre excepto cuando el drawer está abierto. El drawer tiene su propio botón CTA al final.
