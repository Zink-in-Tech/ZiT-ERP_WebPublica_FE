#!/usr/bin/env python3
"""
Generador de imágenes hero para páginas de producto ZinkERP.

Uso:
  python3 scripts/generar-heroes.py --list
  python3 scripts/generar-heroes.py --page finanzas
  python3 scripts/generar-heroes.py

Requiere:
  pip install openai
  export OPENAI_API_KEY=sk-...
"""

import argparse
import base64
import sys
from contextlib import ExitStack
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SCREENSHOTS_DIR = PROJECT_ROOT / "scripts" / "screenshots"
PUBLIC_IMAGES_DIR = PROJECT_ROOT / "public" / "images"

BASE_PROMPT = """Create a premium SaaS marketing hero image for a {module_name}.

Place the attached product screenshot inside a realistic macOS Safari-style browser window:
rounded corners, top bar with the three traffic-light buttons (red, yellow, green),
back/forward arrows, and a centered address bar reading 'app.zinkintech.com/{browser_path}'.
Show the browser at a slight 3D angle with a soft realistic shadow, on a clean light
background with a faint purple gradient.

Inside the browser, {ambient_context}.

Then pull out THREE SPECIFIC components as crisp, fully in-focus floating cards:
{focus_components}

Render the floating cards magnified, with rounded corners and soft drop shadows. The cards
must break outside the browser frame, overlap its edges and float in front at varied sizes,
depths and positions. Each floating card must connect back to its original location inside
the blurred dashboard with a thin dashed line ending in a small glowing purple node.

Composition: asymmetric, dynamic, airy, with negative space. Soft purple ambient glow.
Modern fintech / SaaS aesthetic.

CRITICAL:
- Keep ALL text inside the floating cards perfectly sharp, legible and identical to the source screenshot.
- Do not invent, translate or alter any text, numbers, labels or values.
- Preserve the real UI structure; avoid generic fake widgets.
- Render the brand logo only once; do not duplicate it.

Additional creative direction: {extra_direction}"""

PAGES = [
    {
        "slug": "ventas-y-pos",
        "screenshot": "ventas-y-pos.png",
        "output": "hero-ventas-y-pos.png",
        "browser_path": "ventas",
        "module_name": "sales and POS system",
        "ambient_context": "the sales interface is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            "the product grid showing items, quantities and visible pricing",
            "the order summary area showing subtotal, discounts, total and sale state",
            "the payment method selector or quick checkout block for efectivo, transferencia, Mercado Pago or tarjeta",
        ],
        "extra_direction": "Favor a more commercial POS narrative than an admin form. If the screenshot is weak in one area, privilege the clearest and most sellable blocks.",
    },
    {
        "slug": "facturacion",
        "screenshot": "facturacion.png",
        "output": "hero-facturacion.png",
        "browser_path": "facturacion",
        "module_name": "ARCA and AFIP invoicing module",
        "ambient_context": "the invoicing interface is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            "the comprobante type selector with visible options such as Factura A, B, C or M",
            "the main invoice form with customer data, line items and totals",
            "the ARCA or Facturante connection status indicator if it exists in the screenshot",
        ],
        "extra_direction": "Give this image a slightly more compliance-oriented, official feel while keeping it premium and modern.",
    },
    {
        "slug": "inventario",
        "screenshot": "inventario.png",
        "output": "hero-inventario.png",
        "browser_path": "inventario",
        "module_name": "inventory management module",
        "ambient_context": "the inventory interface is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            "the stock table showing product names, current stock and alert states",
            "the movement history or audit trail showing who moved what and when",
            "the product detail block with variants, deposits or prices by sucursal if available",
        ],
        "extra_direction": "The image should feel operational, precise and warehouse-oriented rather than financial.",
    },
    {
        "slug": "sucursales",
        "screenshot": "sucursales.png",
        "output": "hero-sucursales.png",
        "browser_path": "sucursales",
        "module_name": "multi-branch management module",
        "ambient_context": "the multi-branch dashboard is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            "the branch overview cards with metrics per sucursal",
            "the synchronization or online status indicator showing live branch connectivity",
            "the inter-branch request or transfer flow from sucursales to central",
        ],
        "extra_direction": "Make the composition feel distributed and connected, with a subtle network or synchronization energy.",
    },
    {
        "slug": "finanzas",
        "screenshot": "finanzas.png",
        "output": "hero-finanzas.png",
        "browser_path": "dashboard",
        "module_name": "financial management module",
        "ambient_context": "the financial dashboard is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            'the "Ventas a vencer" card showing accounts receivable',
            'the "Compras a vencer" card showing accounts payable',
            'the "Ganancia bruta" line chart or the strongest executive performance chart available',
        ],
        "extra_direction": "Use the attached extra references to ground the floating cards. This one should feel the most executive and premium of the set, emphasizing cashflow visibility: what you need to collect, what you need to pay, and how margin is evolving.",
        "reference_images": [
            "references/dashboard-flujo-cobros.png",
            "references/dashboard-flujo-pagos.png",
        ],
    },
    {
        "slug": "reportes",
        "screenshot": "reportes.png",
        "output": "hero-reportes.png",
        "browser_path": "reportes",
        "module_name": "business reports module",
        "ambient_context": "the reports interface is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            'the "Cantidad de ventas por período" chart',
            'the "Importe de ventas por período" chart',
            "one additional performance card or chart that complements the two main reports without repeating the same metric",
        ],
        "extra_direction": "Make this image more analytical and chart-led than the finance one. Prioritize rhythm, curves and data storytelling.",
    },
    {
        "slug": "control-de-acceso",
        "screenshot": "control-de-acceso.png",
        "output": "hero-control-de-acceso.png",
        "browser_path": "usuarios",
        "module_name": "access control and permissions module",
        "ambient_context": "the permissions interface is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            "the permissions matrix showing granular toggles grouped by module and action",
            "the user state and assigned profile area showing whether a user is active, blocked and what profile they have",
            "the profile definition view showing profile name, description and a searchable permissions setup",
        ],
        "extra_direction": "Use the attached extra references to ground the floating cards. The image should communicate clarity, structure and security rather than metrics, with a strong sense of role-based access control.",
        "reference_images": [
            "references/seguridad-permisos.png",
            "references/seguridad-usuario.png",
            "references/seguridad-perfiles.png",
        ],
    },
    {
        "slug": "compras",
        "screenshot": "compras.png",
        "output": "hero-compras.png",
        "browser_path": "compras",
        "module_name": "procurement and purchasing module",
        "ambient_context": "the purchasing interface is softly blurred and slightly dimmed so it reads as ambient context, not the focus",
        "focus_components": [
            "the purchase order item table with products, quantities, subtotals and total amount",
            "the purchase orders list with visible order states such as confirmado, aprobado or borrador",
            "the critical stock by supplier view showing products that need replenishment",
        ],
        "extra_direction": "Use the attached extra references to ground the floating cards. Make this one feel operational and coordination-heavy, with clear signals of approvals, supplier control and replenishment urgency.",
        "reference_images": [
            "references/compras-stock-critico.png",
            "references/compras-listado.png",
            "references/compras-estados.png",
        ],
    },
]


def build_focus_components(components):
    lines = []
    total = len(components)
    for index, component in enumerate(components, start=1):
        suffix = "." if index == total else ","
        lines.append(f"({index}) {component}{suffix}")
    return "\n".join(lines)


def build_prompt(page_config):
    return BASE_PROMPT.format(
        module_name=page_config["module_name"],
        browser_path=page_config["browser_path"],
        ambient_context=page_config["ambient_context"],
        focus_components=build_focus_components(page_config["focus_components"]),
        extra_direction=page_config["extra_direction"],
    )


def generar_hero(page_config):
    try:
        from openai import OpenAI
    except ModuleNotFoundError:
        print("  ❌  Falta la dependencia 'openai'. Instalá el SDK antes de generar imágenes.")
        return False

    client = OpenAI()
    slug = page_config["slug"]
    screenshot_path = SCREENSHOTS_DIR / page_config["screenshot"]
    output_path = PUBLIC_IMAGES_DIR / page_config["output"]
    reference_paths = [SCREENSHOTS_DIR / ref for ref in page_config.get("reference_images", [])]

    if not screenshot_path.exists():
        print(f"  ⚠️  Screenshot no encontrado: {screenshot_path}")
        return False

    for reference_path in reference_paths:
        if not reference_path.exists():
            print(f"  ⚠️  Referencia no encontrada: {reference_path}")
            return False

    print(f"  📸  Procesando {slug}...")

    try:
        with ExitStack() as stack:
            opened_images = [stack.enter_context(screenshot_path.open("rb"))]
            opened_images.extend(stack.enter_context(reference_path.open("rb")) for reference_path in reference_paths)
            response = client.images.edit(
                image=opened_images,
                prompt=build_prompt(page_config),
                model="gpt-image-2",
                n=1,
                size="1792x1024",
                quality="high",
            )
    except Exception as error:
        print(f"  ❌  Error API en {slug}: {error}")
        return False

    if not response.data or not response.data[0].b64_json:
        print(f"  ❌  Respuesta vacía en {slug}")
        return False

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("wb") as output_file:
        output_file.write(base64.b64decode(response.data[0].b64_json))

    print(f"  ✅  {slug} → {output_path}")
    return True


def main():
    parser = argparse.ArgumentParser(description="Generar imágenes hero para ZinkERP")
    parser.add_argument("--page", type=str, help="Slug de la página. Si se omite, genera todas.")
    parser.add_argument("--list", action="store_true", help="Listar páginas disponibles")
    parser.add_argument("--print-prompt", type=str, help="Imprimir el prompt de una página y salir")
    args = parser.parse_args()

    if args.list:
        print("Páginas disponibles:")
        for page in PAGES:
            print(f"  {page['slug']:30s} → {PUBLIC_IMAGES_DIR / page['output']}")
        return

    if args.print_prompt:
        selected = next((page for page in PAGES if page["slug"] == args.print_prompt), None)
        if not selected:
            print(f"Error: no existe la página '{args.print_prompt}'")
            sys.exit(1)
        print(build_prompt(selected))
        return

    if args.page:
        pages = [page for page in PAGES if page["slug"] == args.page]
        if not pages:
            print(f"Error: no existe la página '{args.page}'")
            print("Usá --list para ver las disponibles.")
            sys.exit(1)
    else:
        pages = PAGES

    print(f"Generando {len(pages)} imagen(es)...\n")
    ok = sum(1 for page in pages if generar_hero(page))
    print(f"\nListo. {ok}/{len(pages)} generadas correctamente.")

    if ok < len(pages):
        print("Algunas fallaron. Revisá screenshots, dependencia openai y API key.")
        sys.exit(1)


if __name__ == "__main__":
    SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    main()
