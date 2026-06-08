# Handoff: Generación de Imágenes Hero para Páginas de Producto

## Flujo de trabajo completo

```
Fase 1: Capturar screenshots de la app
    ↓
Fase 2: Ejecutar script de generación
    ↓
Fase 3: Validar y ajustar
```

---

## Fase 1 — Capturar screenshots

### Requisitos de las capturas

| Atributo | Especificación |
|---|---|
| **Resolución** | Mínimo 1920×1080 (full HD). Ideal: 2560×1440 (retina). |
| **Formato** | PNG (sin pérdida). |
| **Navegador** | Chrome o Safari, ventana sin toolbars personales (usar ventana de incógnito o limpiar bookmarks). |
| **Zoom** | 100%. Sin zoom in/out. |
| **Interfaz** | La más completa posible. Que se vean datos reales (no pantallas vacías). |
| **Tema** | Claro (light mode). |

### Screenshots necesarios (8)

| # | Página | Slug | Qué capturar |
|---|---|---|---|
| 1 | Ventas y POS | ventas-y-pos | Pantalla de POS con productos cargados, total visible, métodos de pago. Si es posible, capturar también el flujo de venta con el detalle. |
| 2 | Facturación | facturacion | Pantalla de generación de comprobante con productos, cliente, total. O la pantalla de lista de comprobantes con algunos visibles. |
| 3 | Inventario | inventario | Tabla de stock con productos, cantidades y alertas visibles. Si hay timeline de movimientos, mejor. |
| 4 | Sucursales | sucursales | Dashboard multi-sucursal con métricas de al menos 2 sucursales visibles. |
| 5 | Finanzas | finanzas | Dashboard financiero: cuenta corriente, caja, vencimientos. Ideal si se ve "Ventas a vencer". |
| 6 | Reportes | reportes | Pantalla de reportes con ventas diarias, ganancia bruta, cobros/pagos pendientes. |
| 7 | Control de Acceso | control-de-acceso | Pantalla de perfiles/usuarios con la tabla de permisos o el builder de perfiles visible. |
| 8 | Compras | compras | Tabla de órdenes de compra con estados. O perfil de proveedor. |

### Nomenclatura

Cada screenshot debe guardarse en `scripts/screenshots/[slug].png`.

Ejemplo:
```
scripts/screenshots/ventas-y-pos.png
scripts/screenshots/facturacion.png
scripts/screenshots/inventario.png
...
```

### Herramientas recomendadas para capturar

| Herramienta | Por qué |
|---|---|
| **CleanShot X** (macOS) | Captura ventanas completas, retina, sin sombras. Ideal. |
| **ShareX** (Windows) | Similar, con region capture. |
| **Built-in Snipping Tool** | Sirve si no hay otra, pero preferible las anteriores. |

> ⚠️ **Importante:** La captura debe ser de la ventana COMPLETA del navegador, no recortada. El script después coloca esa imagen dentro del browser mockup 3D.

---

## Fase 2 — Ejecutar script

### Requisitos

```bash
# 1. Instalar dependencia
pip install openai

# 2. Configurar API key
export OPENAI_API_KEY=sk-...   # o en .zshrc / .bashrc

# 3. Verificar que los screenshots están en su lugar
ls scripts/screenshots/
# Debería mostrar los 8 archivos .png
```

### Ejecución

```bash
# Opción A: Generar todas las imágenes hero
cd /ruta/al/proyecto
python3 scripts/generar-heroes.py

# Opción B: Generar una sola (para probar)
python3 scripts/generar-heroes.py --page ventas-y-pos

# Opción C: Ver lista de páginas disponibles
python3 scripts/generar-heroes.py --list
```

### Output

Las imágenes se generan en `public/images/hero-[slug].png`:

```
public/images/hero-ventas-y-pos.png
public/images/hero-facturacion.png
public/images/hero-inventario.png
public/images/hero-sucursales.png
public/images/hero-finanzas.png
public/images/hero-reportes.png
public/images/hero-control-de-acceso.png
public/images/hero-compras.png
```

### Tiempo estimado

- Por imagen: ~20-40 segundos (dependiendo de cola de OpenAI).
- Total (8 imágenes): ~3-5 minutos.

---

## Fase 3 — Validación

### Checklist por imagen

| Criterio | Qué revisar |
|---|---|
| Browser mockup | ¿Está el browser con los botones de tráfico (rojo, amarillo, verde)? |
| URL en barra | ¿Dice `app.zinkintech.com/[modulo]`? |
| Texto legible | ¿Los números y labels de las cards flotantes son idénticos al screenshot original? |
| Sin texto inventado | ¿La IA no alteró, tradujo o inventó números? |
| 3 cards flotantes | ¿Se ven las 3 cards especificadas en el prompt? |
| Líneas punteadas | ¿Cada card tiene su línea punteada al nodo púrpura? |
| Logo | ¿El logo aparece una sola vez? |
| Fondo | ¿Gradiente púrpura suave, sin elementos distractivos? |

### Si una imagen no funciona

```bash
# Regenerar una página específica
python3 scripts/generar-heroes.py --page facturacion
```

Si la imagen generada tiene texto inventado o alterado:
1. Revisar que el screenshot de entrada tenga buena resolución.
2. Reintentar (a veces la IA alucina menos en el segundo intento).
3. Si persiste, ajustar el prompt de esa página para ser más explícito sobre qué texto preservar.

---

## Estructura final de archivos

```
scripts/
├── screenshots/
│   ├── ventas-y-pos.png
│   ├── facturacion.png
│   ├── inventario.png
│   ├── sucursales.png
│   ├── finanzas.png
│   ├── reportes.png
│   ├── control-de-acceso.png
│   └── compras.png
├── generar-heroes.py
└── requirements.txt         (opcional: openai)

public/images/
├── hero-ventas-y-pos.png
├── hero-facturacion.png
├── hero-inventario.png
├── hero-sucursales.png
├── hero-finanzas.png
├── hero-reportes.png
├── hero-control-de-acceso.png
└── hero-compras.png
```

---

## Notas para Codex

1. Ejecutar `pip install openai` primero.
2. Verificar que `OPENAI_API_KEY` esté seteada.
3. Si no existe `scripts/screenshots/`, crearla.
4. El script usa `model="gpt-image-2"`. Si la API rechaza ese modelo, probar con `dall-e-3`.
5. El tamaño de imagen es `1792x1024` (formato apaisado para hero).
