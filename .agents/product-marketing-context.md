# Product Marketing Context — ZinkERP

*Última actualización: 2026-08-06 (borrador V1 auto-generado desde el codebase, pendiente de revisión)*

## Product Overview
**One-liner:** "El sistema operativo para tu pyme. Desde una sucursal o veinte."
**What it does:** ZinkERP es un ERP operativo SaaS para pymes y comercios argentinos. Unifica ventas (POS), stock multi-sucursal, compras, caja, finanzas y facturación electrónica AFIP/ARCA en un solo sistema, con usuarios ilimitados y sincronización en tiempo real entre sucursales.
**Product category:** ERP operativo para pymes / sistema de gestión comercial (BusinessApplication). Los clientes lo buscan como "sistema de gestión", "ERP para [rubro]", "programa para facturar y controlar stock".
**Product type:** SaaS web (app en `ziterp.zinkintech.com`). Empresa: ZinkInTech. Sub-producto nombrado: **ZinkPOS** (punto de venta).
**Business model:** Suscripción mensual/anual en USD, escalonada por **volumen de ventas mensual** (no por usuario). Anual = 2 meses gratis. Sin permanencia ni costo de salida.

| Plan | Mensual | Límite de ventas/mes |
|------|---------|----------------------|
| Emprendedor | USD 29 (promo USD 15 × 3 meses) | USD 5.000 |
| Pyme (más elegido) | USD 70 | USD 15.000 |
| Escala | USD 99 | USD 40.000 |
| Enterprise | USD 149 | +USD 40.000 o complejidad especial |

Sucursal adicional: 50% de bonificación por 6 meses. Capacitación/puesta en marcha in situ: extras pagos.

## Target Audience
**Target companies:** Pymes y comercios argentinos, con foco en operaciones **multi-sucursal** (2 a 20 sucursales) y catálogo amplio. Perfiles fiscales: monotributo y responsable inscripto.
**Decision-makers:** Dueño/dueña (decisor principal), gerente/encargado (champion operativo). Usuarios: cajeros, operadores, vendedores. El contador es influencer externo (no se lo reemplaza).
**Primary use case:** Ordenar la operación diaria — ventas, stock, caja y facturación — que hoy vive repartida entre planillas, WhatsApp y varias apps sueltas.
**Jobs to be done:**
- Controlar varias sucursales desde un solo lugar (stock, precios, caja, reportes en tiempo real).
- Facturar ARCA sin salir del sistema donde se maneja el negocio.
- Saber los números reales (ventas, ganancia bruta, cobros pendientes) para decidir con datos y no con intuición.
**Verticales priorizados (páginas SEO activas):** ferreterías, dietéticas, artículos de limpieza, papeleras/librerías comerciales, insumos de repostería.
**Verticales en validación (noindex):** florerías, zinguería/metalúrgica, cultivos.
**Patrones operativos (segmentación real):** comercios con catálogo amplio · reposición frecuente · venta presencial + online · complejidad a validar.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Dueño/a (decisor + comprador) | Ver el negocio completo, costos previsibles, no perder plata por desorden | Información dispersa, decide "a ojo", no puede estar en todas las sucursales | "Controlá tu negocio desde el celular. Números claros, decisiones seguras. Dormís más tranquilo." |
| Gerente / Encargado (champion) | Que la operación diaria fluya sin fricción | Coordinar por WhatsApp, planillas eternas, diferencias de stock | Todo registrado automáticamente, alertas de reposición, menos errores |
| Cajero / Operador (usuario) | Cobrar rápido, sin pantallas lentas | Sistemas lentos, triple carga de datos | ZinkPOS: "cobrá al instante", caja diaria por operador |
| Contador (influencer externo) | Comprobantes ordenados y ARCA en regla | Recibir la información dispersa a fin de mes | Facturación electrónica integrada (vía Facturante), todo auditado |

## Problems & Pain Points
**Core problem:** La operación está repartida entre planillas de Excel, mensajes de WhatsApp, apps sueltas y la memoria del equipo. El dueño no sabe cuánto stock tiene, cuánto ganó ni cuánto le deben — y con más de una sucursal, el desorden escala.
**Why alternatives fall short:**
- Excel/planillas: manuales, desactualizadas, "me parece que queda".
- WhatsApp como sistema: pedidos y datos que se pierden.
- Varias apps sueltas: "Antes trabajábamos con 3 apps distintas" — nada integrado.
- ERPs tradicionales: cobran por usuario, addons sorpresa, soporte lejano, implementación pesada.
**What it costs them:** tiempo (carga manual, doble registro), plata ("Stock desordenado, negocio que pierde plata"), errores de stock y precios entre sucursales.
**Emotional tension:** Estar adivinando. No poder despegarse del local. "Control total sin volverte loco" / "dormís más tranquilo" son los payoffs emocionales del copy.

## Competitive Landscape
**Política explícita: no se nombran competidores en público** (decisión documentada en handoff-docs/02).
**Direct:** "ERP tradicional" (genérico) — cobra por usuario, planes confusos, funcionalidad base desmembrada en addons, soporte no local, sin previsión de costos.
**Secondary:** Combos de apps sueltas (facturador + POS + planilla + WhatsApp) — nada sincronizado, gestión "inmantenible" con más de una sucursal.
**Indirect:** El status quo — Excel, cuaderno, WhatsApp y memoria. Barato pero ciego: sin datos reales ni control multi-sucursal.
**Pendiente interno:** battlecards contra competidores prioritarios (roadmap del partner program, no existe aún).

## Differentiation
**Key differentiators:**
- **ARCA nativa**: facturación electrónica (A, B, C, M, NC/ND vía integración Facturante) dentro del circuito operativo, habilitación en hasta 24 hs.
- **Multi-sucursal en serio**: stock, precios, usuarios y reportes sincronizados al instante; "2 sucursales o 20, desde el celular".
- **Usuarios ilimitados**: sin castigo por sumar gente; permisos granulares ("los perfiles que tu negocio necesita, no los que el sistema te deja").
- **Precio por volumen, no por usuario**: previsible, sin addons sorpresa; sucursales extra bonificadas.
- **Soporte humano, local, en español**: "sin bots ni tickets eternos", conexión remota, respuesta inmediata.
- **Onboarding rápido**: alta ~1 minuto por sucursal; "negocios operativos en pocas horas".
- **Ecommerce y cobros conectados**: WooCommerce + Mercado Pago.
**How we do it differently:** una sola base operativa para comercios que comparten problemas de stock/ventas/facturación/sucursales — no un desarrollo a medida por industria.
**Why customers choose us:** integración real + acompañamiento cercano ("Apostar por un equipo cercano, que entiende lo que necesitamos, fue la decisión correcta" — Juan Ostuni).

## Objections
| Objection | Response |
|-----------|----------|
| "¿Sirve para mi rubro específico?" | Base operativa común + páginas por vertical con experiencia real; en rubros no validados se responde con prudencia, sin prometer alcance |
| "¿Me ata un contrato?" | No hay permanencia obligatoria ni costo de salida |
| "¿Cuánto me va a salir de verdad?" | Precio plano por volumen, sin cobrar por usuario ni addons sorpresa; simulador de precio en /precios |
| "¿La facturación está realmente integrada?" | ARCA integrada a la operación (vía Facturante); habilitación en hasta 24 hs autorizando la CUIT de ZinkInTech |
| "¿Y si necesito algo que no tiene?" | Modelo de sponsorship de funcionalidades (ej.: Vetanco patrocinó logística/tracking) — página /sponsor-funcionalidades aún no publicada |

**Anti-persona:** negocios que solo emiten pocas facturas por mes; empresas que buscan implementación enterprise pesada; cuentas que solo buscan el software más barato posible.

## Switching Dynamics
**Push:** planillas eternas, WhatsApp perdidos, 3 apps sin integrar, errores de stock, no saber los números, imposibilidad de manejar sucursales a distancia.
**Pull:** todo en un solo lugar, tiempo real desde el celular, ARCA integrada, usuarios ilimitados, soporte cercano.
**Habit:** el Excel y el WhatsApp "funcionan" y son gratis; miedo a frenar la operación para migrar.
**Anxiety:** ¿cuánto cuesta de verdad? ¿me ata? ¿sirve para mi rubro? ¿pierdo mis datos/tiempo en la implementación? → se responde con onboarding en horas, sin permanencia, precio plano, demo de 30 min.

## Customer Language
**How they describe the problem:**
- "Antes lo hacíamos todo manual y perdíamos mucho tiempo."
- "Antes trabajábamos con 3 apps distintas y no teníamos una forma real de manejar las dos sucursales desde un mismo lugar."
- "Pasamos de tener todo disperso…"
- "La gestión de precios y la operación diaria dejaron de ser inmantenibles."
**How they describe us:**
- "ZinkERP nos permitió tener todo en un solo lugar: stock, finanzas, ventas, proveedores y clientes."
- "Ahora controlamos ventas, stock y caja en tiempo real, sin importar dónde estemos."
- "El acompañamiento de ZinkERP fue espectacular."
**Words to use:** ordenar la operación, todo en un solo lugar, en tiempo real, sin planillas / sin WhatsApp, control, sucursales, ARCA, claro/simple, acompañamiento, "en serio".
**Words to avoid:** "gana dinero fácil", "se vende solo", promesas exageradas, lenguaje corporativo/enterprise, y cualquier claim vetado por el audit de verdad (ver Guardrails).
**Glossary:**
| Term | Meaning |
|------|---------|
| ZinkERP / Zink ERP | El producto (naming inconsistente en el sitio — a unificar) |
| ZinkPOS | Punto de venta del sistema (caché de 400 ítems; NO es modo offline) |
| ZinkInTech | Empresa detrás del producto (CUIT autorizante en ARCA) |
| ARCA (ex AFIP) | Ente fiscal argentino; la facturación se emite vía integración con Facturante |
| Sede/sucursal operativa | Unidad de operación; las adicionales se bonifican 50% |

## Brand Voice
**Tone:** cercano, directo, profesional, local, confiable. Anti-jargon, benefit-first.
**Style:** español rioplatense con **voseo** (Gestioná, Probá, Agendá) — decisión documentada; frases cortas con remate en dos tiempos ("Ni más, ni menos.", "Sin drama.", "Sin vueltas."); payoffs emocionales ("dormís más tranquilo").
**Personality:** claro, honesto (la prudencia sobre el alcance es parte del posicionamiento), cercano, práctico, argentino.
**Deuda conocida:** varias strings de `productPages.ts` siguen en tú y sin tildes — QA pendiente.

## Proof Points
**Metrics (operativos, verificables):** demo de 30 min · soporte 24/7 · alta ~1 min por sucursal · negocios operativos en pocas horas · habilitación ARCA en hasta 24 hs.
**Customers:** Papelera Pilar Manualidades · Limpieza Blue (Gualeguaychú) · Dietéticas Naturales (3 sucursales) · Lo de Marota / Marotas (2 sucursales) · Química Tortuguitas + Química El Cruce. Sponsor de funcionalidades: Vetanco (laboratorio).
**Testimonials:**
> "Pasamos de tener todo disperso a manejar nuestras 3 sucursales desde un solo lugar." — Julieta, Encargada, Dietéticas Naturales
> "El acompañamiento de ZinkERP fue espectacular. Apostar por un equipo cercano, que entiende lo que necesitamos, fue la decisión correcta." — Juan Ostuni, Dueño, Marotas
> "ZinkERP nos permitió tener todo en un solo lugar: stock, finanzas, ventas, proveedores y clientes." — Antonella, Gerente, Limpieza Blue
**Value themes:**
| Theme | Proof |
|-------|-------|
| Multi-sucursal real | Dietéticas Naturales (3 suc.), Marotas (2 suc.), Químicas (2 locales) |
| Todo en un solo lugar | Testimonios de Limpieza Blue y Marotas (reemplazo de 3 apps) |
| Acompañamiento cercano | Testimonio Juan Ostuni; soporte humano sin bots |
| ARCA integrada | Facturante, habilitación 24 hs |

**⚠️ No usar:** los testimonios de las páginas legacy `/modulos/*` (Javier, Carina, Mariano, Matías, etc.) con métricas duras ("+18% ventas", "+25% ticket") — no verificados, parecen placeholders. Tampoco el "100% satisfacción" de CTASection.

## Claim Guardrails (audit de verdad — handoff-docs/05)
Prohibido afirmar públicamente:
- Modo offline / "sin Internet" (el caché de ZinkPOS es velocidad, no offline).
- IIBB por provincia, liquidación de IVA con un clic, automatización fiscal.
- Comparación/scoring de proveedores, dashboards que no existen.
- "Todo nativo" en facturación sin matiz (es vía integración Facturante).
- Reportes: noindex hasta tener screenshots reales.
En rubros no validados: mostrar con prudencia, nunca "lo damos por hecho".

## Goals
**Business goal:** captar pymes/comercios multi-sucursal argentinos; visión a futuro de suite integrada empezando por ZinkERP.
**Conversion action (primaria):** agendar demo → `cal.com/zinkintech`. Secundaria: WhatsApp (`wa.me/5491135598389`) con mensaje precargado por plan.
**Funnel de contenido:** microherramientas gratuitas (/recursos: caja diaria, precios inteligentes, códigos de barras, etiquetas de góndola) → newsletter Beehiiv (`zinkerp.beehiiv.com`) → demo. Blog (Sanity) en /blog.
**Roadmap de marketing (docs/):** recursos gratuitos → páginas por rubro y casos de cliente → newsletter y tracking → /partners (programa consultivo y selectivo, no afiliados masivos) → materiales internos (battlecards).
**Current metrics:** GA4 `G-VXDKPV64L5`. Sin métricas de conversión documentadas en el repo.

## Known Gaps / Inconsistencies (para resolver)
- "Probá gratis" en páginas de producto lleva a `/registro` → redirect a demo: **no existe free trial real**.
- Doble taxonomía viva: `/producto/*` (nueva) vs `/modulos/*` (legacy, con testimonios placeholder) — el footer aún linkea a módulos.
- Promo Emprendedor inconsistente: "50% OFF por 3 meses" (precios) vs "$15/mes primeros 6 meses" (herramienta caja diaria).
- Naming: ZinkERP vs Zink ERP vs Zink in Tech.
- Mezcla tú/vos y tildes faltantes en `productPages.ts`.
