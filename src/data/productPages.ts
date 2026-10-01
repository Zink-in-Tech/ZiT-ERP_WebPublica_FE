export type LinkItem = {
  label: string;
  href: string;
};

export type VisualListItem = {
  title: string;
  subtitle?: string;
  meta?: string;
};

export type VisualImageItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProductVisual =
  | { kind: 'flow'; items: VisualListItem[] }
  | { kind: 'callouts'; items: VisualListItem[] }
  | { kind: 'device'; items: VisualListItem[] }
  | { kind: 'logos'; items: VisualListItem[] }
  | { kind: 'cards'; items: VisualListItem[] }
  | { kind: 'timeline'; items: VisualListItem[] }
  | { kind: 'accordion'; items: VisualListItem[] }
  | { kind: 'chips'; items: VisualListItem[] }
  | { kind: 'map'; items: VisualListItem[] }
  | { kind: 'kpis'; items: VisualListItem[] }
  | { kind: 'comparison'; items: VisualListItem[]; note?: string }
  | { kind: 'pricing'; items: VisualListItem[] }
  | { kind: 'scope'; items: VisualListItem[] }
  | { kind: 'providerSheet'; items: VisualListItem[] }
  | { kind: 'emailFlow'; items: VisualListItem[] }
  | { kind: 'integrationSteps'; items: VisualListItem[] }
  | { kind: 'reportSplit'; items: VisualListItem[]; note?: string }
  | { kind: 'permissionsBuilder'; items: VisualListItem[] }
  | { kind: 'syncNodes'; items: VisualListItem[] }
  | { kind: 'posConsole'; items: VisualListItem[] }
  | { kind: 'invoiceMockup'; items: VisualListItem[] }
  | { kind: 'reportBoard'; items: VisualListItem[] }
  | { kind: 'cashDesk'; items: VisualListItem[] }
  | { kind: 'paymentRail'; items: VisualListItem[] }
  | { kind: 'image'; src: string; alt: string; caption?: string; zoom?: number }
  | { kind: 'imageGrid'; images: VisualImageItem[]; layout?: 'featured' | 'balanced' };

export type ProductSection = {
  title: string;
  description: string;
  links?: LinkItem[];
  reverse?: boolean;
  visual: ProductVisual;
  visualWidth?: 'default' | 'wide';
};

export type ProductPage = {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow?: string;
  theme?: 'sales' | 'procurement' | 'inventory' | 'fiscal' | 'finance' | 'analytics' | 'network' | 'access';
  heroImageSrc?: string;
  ogImageSrc?: string;
  ogImageAlt?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  heroVisualLabel: string;
  heroVisual: ProductVisual;
  finalBannerText: string;
  finalBannerCtaLabel: string;
  finalBannerCtaHref: string;
  noindex?: boolean;
  prelaunchWarning?: string;
  faqTitle?: string;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  sections: ProductSection[];
};

export const productPages: ProductPage[] = [
  {
    slug: 'ventas-y-pos',
    title: 'Ventas y POS | ZinkERP - Vendé más y más rápido en todas tus sucursales',
    metaDescription:
      'Gestioná presupuestos, POS y factura electrónica en un solo flujo. Stock y precios sincronizados en todas tus sucursales. Probá ZinkERP gratis.',
    eyebrow: 'Ventas y POS',
    theme: 'sales',
    heroImageSrc: '/images/hero-ventas-y-pos.png?v=4',
    ogImageSrc: '/images/og-ventas-y-pos.jpg?v=2',
    heroTitle: 'Ventas ágiles, con stock y precios sincronizados en todas tus sucursales.',
    heroSubtitle:
      'Presupuesto, POS y factura electrónica en un mismo flujo. Con stock y precios sincronizados en todas tus sucursales.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Vista operativa',
    heroVisual: {
      kind: 'posConsole',
      items: [
        { title: 'POS rápido', subtitle: 'Búsqueda instantánea, medios de pago y total visible' },
        { title: 'Precio vigente', subtitle: 'Listas y promociones sincronizadas' },
        { title: 'Método de pago', subtitle: 'Efectivo, transferencia, MP, tarjeta' },
      ],
    },
    sections: [
      {
        title: 'Venta asistida o consultiva, sin perder el hilo del proceso.',
        description:
          'Arrancás por donde te llegue la oportunidad: cotización, presupuesto, pedido o venta directa. Después podés sumar productos con upselling sin perder la trazabilidad.',
        links: [
          { label: 'Ver Facturación', href: '/producto/facturacion' },
          { label: 'Ver Inventario', href: '/producto/inventario' },
        ],
        visual: {
          kind: 'image',
          src: '/images/ventas-flujo-comercial.png',
          alt: 'Ilustración del flujo comercial asistido desde cotización hasta venta, con un atajo para POS directo',
        },
      },
      {
        title: 'El POS de ZinkERP: cobrá al instante. Sin esperas, sin pantallas lentas.',
        description:
          'Buscá productos al instante con un caché de 400 ítems. Responde como un sistema local: no hay demoras de red aunque tengas muchos productos cargados.',
        links: [{ label: 'Ver Sucursales', href: '/producto/sucursales' }],
        reverse: true,
        visual: {
          kind: 'posConsole',
          items: [
            { title: 'Búsqueda veloz', subtitle: 'Encontrá productos por código, nombre o atajo' },
            { title: 'Atajos de teclado', subtitle: 'Agilizá la atención sin depender del mouse' },
            { title: 'Caché inteligente', subtitle: 'Hasta 400 ítems listos para una experiencia instantánea' },
          ],
        },
      },
      {
        title: 'Consultá precios sin abrir una venta',
        description:
          'Ideal para showroom o salón: el equipo puede responder rápido sin ensuciar el flujo de caja.',
        visual: {
          kind: 'device',
          items: [
            { title: 'Tablet de consulta', subtitle: 'Precio, stock y variantes en una sola vista' },
            { title: 'Listas por canal', subtitle: 'Mayorista, minorista o promoción según el contexto' },
          ],
        },
      },
      {
        title: 'También acompaña a vendedores de calle',
        description:
          'Cuando la venta ocurre fuera del mostrador, el equipo comercial puede trabajar cotizaciones, presupuestos, pedidos y ventas desde un flujo más consultivo. Hoy no incluye cálculo de comisiones, pero sí ordena la gestión comercial de punta a punta.',
        visual: {
          kind: 'timeline',
          items: [
            { title: 'Visita comercial', subtitle: 'El vendedor releva la necesidad y arma la oportunidad' },
            { title: 'Seguimiento', subtitle: 'Presupuesto, ajustes y upselling dentro del mismo circuito' },
            { title: 'Cierre', subtitle: 'El pedido o la venta quedan registrados en la operación central' },
          ],
        },
      },
      {
        title: 'Tu tienda online sincronizada con tu negocio físico',
        description:
          'Ecommerce, pagos y operación conviven sin depender de procesos manuales entre sistemas distintos.',
        links: [
          { label: 'WooCommerce', href: '/integraciones/woocommerce' },
          { label: 'Mercado Pago', href: '/integraciones/mercadopago' },
        ],
        reverse: true,
        visual: {
          kind: 'image',
          src: '/images/ventas-sincronizacion-omnichannel.png',
          alt: 'Ilustración de ZinkERP sincronizando WooCommerce, Mercado Pago y la operación física en un mismo sistema',
        },
      },
    ],
    finalBannerText: 'Ventas + POS + factura + ecommerce. Un solo sistema.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
    faqTitle: 'Preguntas frecuentes sobre Ventas y POS',
    faqs: [
      {
        question: '¿El POS de ZinkERP funciona sin conexión a internet?',
        answer:
          'El POS usa un caché de 400 productos para operar a velocidad local, pero necesita conexión para sincronizar ventas, stock y medios de pago. No está diseñado para operar sin internet de forma prolongada.',
      },
      {
        question: '¿Puedo usar el POS en una tablet?',
        answer:
          'Sí. El POS de ZinkERP está optimizado para pantallas táctiles y funciona en tablets Android y iPad desde el navegador. También se puede operar 100% con teclado en PC.',
      },
      {
        question: '¿Las ventas del POS descuentan stock automáticamente?',
        answer:
          'Sí. Cada venta realizada en el POS descuenta el stock de la sucursal donde se vendió al instante. Si tenés varias sucursales, cada una descuenta su propio stock.',
      },
    ],
  },
  {
    slug: 'compras',
    title: 'Compras | ZinkERP - Gestión de compras y proveedores multi-sucursal',
    metaDescription:
      'Ordená tus compras con sugerencias automáticas, control de proveedores y sincronización con tu stock. Multi-sucursal. Probá ZinkERP.',
    eyebrow: 'Compras',
    theme: 'procurement',
    heroImageSrc: '/images/hero-compras.png?v=1',
    ogImageSrc: '/images/og-compras.jpg?v=2',
    heroTitle: 'Comprá lo que necesitás, cuando lo necesitás. Centralizado o por sucursal. Vos decidís.',
    heroSubtitle:
      'Órdenes de compra con sugerencias automáticas, control de proveedores y sincronización con tu stock.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Panel de compras',
    heroVisual: {
      kind: 'cards',
      items: [
        { title: 'Pendiente', subtitle: '18 órdenes esperando aprobación' },
        { title: 'Aprobada', subtitle: '12 listas para recibir' },
        { title: 'Recibida', subtitle: '34 ingresos sincronizados con stock' },
      ],
    },
    sections: [
      {
        title: 'Órdenes de compra que te avisan antes de que te falte',
        description:
          'Las sugerencias parten del stock real, los mínimos y la demanda para ayudarte a comprar con más contexto.',
        links: [{ label: 'Ver Inventario', href: '/producto/inventario' }],
        visual: {
          kind: 'image',
          src: '/images/compras-stock-critico-proveedor.png',
          alt: 'Vista de productos con stock crítico filtrados por proveedor para preparar la reposición',
          caption: 'Stock crítico por proveedor para anticipar reposición.',
        },
      },
      {
        title: 'Tus proveedores, siempre a mano. Datos fiscales, contacto y OC al instante.',
        description:
          'Cada proveedor tiene su ficha con datos fiscales, contacto e histórico de órdenes de compra. Emitís una OC y queda registrada contra ese proveedor. Todo ordenado, todo en un lugar.',
        links: [{ label: 'Ver Inventario', href: '/producto/inventario' }],
        reverse: true,
        visual: {
          kind: 'image',
          src: '/images/compras-form.png',
          alt: 'Formulario de orden de compra con proveedor, ítems, cantidades y total consolidado',
          caption: 'La orden sale con proveedor, ítems, cantidades y total en un solo flujo.',
        },
      },
      {
        title: 'Cada sucursal solicita, la casa central consolida y compra.',
        description:
          'Las sucursales registran sus necesidades. La casa central ve todo consolidado, decide el proveedor y emite la orden de compra. Cada sucursal sabe qué pidió y cuándo llega.',
        links: [
          { label: 'Ver Sucursales', href: '/producto/sucursales' },
          { label: 'Ver Inventario', href: '/producto/inventario' },
        ],
        visual: {
          kind: 'imageGrid',
          layout: 'balanced',
          images: [
            {
              src: '/images/compras-listado.png',
              alt: 'Listado de órdenes de compra con proveedor, importe, fecha y estado',
              caption: 'La casa central ve todo el historial de compras en una sola lista.',
            },
            {
              src: '/images/compras-estados.png',
              alt: 'Detalle de estados de órdenes de compra como confirmado, aprobado y borrador',
              caption: 'Estados claros para saber qué ya fue aprobado o confirmado.',
            },
          ],
        },
      },
      {
        title: 'La orden de compra viaja directo al proveedor.',
        description:
          'Cuando generás la OC, podés enviarla automáticamente por email al proveedor. Con todos los datos: productos, cantidades y precios acordados.',
        visual: {
          kind: 'emailFlow',
          items: [
            { title: 'Email al proveedor', subtitle: 'La OC sale con el detalle completo' },
            { title: 'Productos y cantidades', subtitle: 'Todo lo solicitado viaja en un solo documento' },
            { title: 'Precios acordados', subtitle: 'La orden queda registrada con su información comercial' },
          ],
        },
      },
    ],
    finalBannerText: 'Del pedido al stock en un solo paso. Sin hojas de cálculo, sin WhatsApp perdidos.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
  },
  {
    slug: 'inventario',
    title: 'Inventario | ZinkERP - Stock multi-sucursal en tiempo real',
    metaDescription:
      'Controlá tu stock en todas tus sucursales al instante. Alertas, movimientos auditados y catálogo centralizado. Empezá hoy gratis.',
    eyebrow: 'Inventario',
    theme: 'inventory',
    heroImageSrc: '/images/hero-inventario.png?v=2',
    ogImageSrc: '/images/og-inventario.jpg?v=2',
    heroTitle: 'Sabé exactamente qué tenés y dónde. En tiempo real, sin contar a mano.',
    heroSubtitle:
      'Stock multi-sucursal actualizado al instante. Alertas, movimientos auditados y catálogo centralizado.',
    heroCtaLabel: 'Empezá hoy',
    heroCtaHref: '/registro',
    heroVisualLabel: 'Stock por sucursal',
    heroVisual: {
      kind: 'kpis',
      items: [
        { title: 'Casa central', subtitle: '1.240 unidades activas' },
        { title: 'Sucursal norte', subtitle: '17 alertas de reposición' },
        { title: 'Movimientos hoy', subtitle: '86 ingresos y egresos auditados' },
      ],
    },
    sections: [
      {
        title: 'Cada movimiento actualiza tu stock al instante',
        description:
          'Ventas, compras, transferencias y ajustes se reflejan en tiempo real para que el equipo decida con datos actuales.',
        links: [
          { label: 'Ver Ventas y POS', href: '/producto/ventas-y-pos' },
          { label: 'Ver Sucursales', href: '/producto/sucursales' },
        ],
        visual: {
          kind: 'timeline',
          items: [
            { title: '10:03 Venta mostrador', subtitle: 'Sucursal centro -2 unidades' },
            { title: '10:18 Transferencia', subtitle: 'Casa central a Sucursal norte +12 unidades' },
            { title: '10:31 Recepción de compra', subtitle: 'Ingreso validado por proveedor' },
          ],
        },
      },
      {
        title: 'Cada movimiento, registrado. Sabés quién, cuándo y por qué.',
        description:
          'La trazabilidad deja de depender de la memoria o de mensajes sueltos: cada ajuste tiene usuario, fecha y motivo.',
        reverse: true,
        visual: {
          kind: 'timeline',
          items: [
            { title: 'Ajuste por rotura', subtitle: 'Ana Pérez - depósito central - 2 unidades' },
            { title: 'Conteo de control', subtitle: 'Juan Gómez - salón - regularización de 5 unidades' },
            { title: 'Transferencia entre sucursales', subtitle: 'Logística - norte a sur - 8 unidades' },
          ],
        },
      },
      {
        title: 'Un catálogo para todas tus sucursales, con precios distintos si hace falta',
        description:
          'Centralizás productos y controlás variaciones por sucursal, canal o política comercial sin perder orden.',
        links: [{ label: 'Ver Control de Acceso', href: '/producto/control-de-acceso' }],
        visual: {
          kind: 'accordion',
          items: [
            { title: 'Precio casa central', subtitle: 'Lista general y promociones activas' },
            { title: 'Precio sucursal norte', subtitle: 'Ajuste local por contexto competitivo' },
            { title: 'Precio ecommerce', subtitle: 'Política diferenciada para la tienda online' },
          ],
        },
      },
    ],
    finalBannerText: 'Stock desordenado, negocio que pierde plata. Stock claro, negocio que crece.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
    faqTitle: 'Preguntas frecuentes sobre Inventario',
    faqs: [
      {
        question: '¿El stock se actualiza automáticamente cuando vendo?',
        answer:
          'Sí. Cada venta descuenta stock al instante. Cada compra lo incrementa. Cada ajuste queda registrado. No necesitás hacer nada manual.',
      },
      {
        question: '¿Puedo tener precios distintos en cada sucursal?',
        answer:
          'Sí. Definís listas de precios por sucursal y por canal, como mayorista, minorista o promoción. Cada sucursal opera con sus precios y vos ves todo consolidado.',
      },
      {
        question: '¿Hay alertas cuando un producto está por debajo del mínimo?',
        answer:
          'Sí. El sistema marca los productos con stock crítico y podés verlos en el informe correspondiente. También ayuda a decidir qué reponer en cada sucursal.',
      },
    ],
  },
  {
    slug: 'facturacion',
    title: 'Facturación Electrónica | ZinkERP - Facturá desde tu ERP, conectado con ARCA',
    metaDescription:
      'Facturación electrónica AFIP/ARCA integrada a tu operación diaria. Facturas A, B, C y M, NC y ND. Para monotributo y RI. Sin salir del sistema.',
    eyebrow: 'Facturación AFIP/ARCA',
    theme: 'fiscal',
    heroImageSrc: '/images/hero-facturacion.png?v=2',
    ogImageSrc: '/images/og-facturacion.jpg?v=2',
    heroTitle: 'Facturá desde donde manejás tu negocio. Sin sistemas paralelos.',
    heroSubtitle:
      'Factura electrónica AFIP/ARCA integrada a tu operación diaria. Para monotributo y responsable inscripto.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Generación de comprobantes',
    heroVisual: {
      kind: 'invoiceMockup',
      items: [
        { title: 'Factura A, B, C y M', subtitle: 'Comprobantes integrados al flujo diario' },
        { title: 'Notas de Crédito y Débito', subtitle: 'Registradas sin salir del sistema' },
        { title: 'Envío al cliente', subtitle: 'PDF por email o impresión en Ticket o A4' },
      ],
    },
    sections: [
      {
        title: 'Todos los comprobantes que necesitás, integrados a tu operación.',
        description:
          'Generá Facturas A, B, C y M, Notas de Crédito y Débito. Cada comprobante queda vinculado a la venta o al cliente. Sin duplicar trabajo.',
        visual: {
          kind: 'chips',
          items: [
            { title: 'Factura A' },
            { title: 'Factura B' },
            { title: 'Factura C' },
            { title: 'Factura M' },
            { title: 'Nota de Crédito' },
            { title: 'Nota de Débito' },
          ],
        },
      },
      {
        title: 'Facturá desde Ventas o desde el POS, y enviáselo al cliente en el momento.',
        description:
          'Generá el comprobante al confirmar una venta o al cobrar en el POS. Lo imprimís en formato Ticket o A4, o le enviás el PDF por email al cliente desde la misma venta. La facturación electrónica sale por nuestra integración nativa con ARCA.',
        reverse: true,
        links: [{ label: 'Ver integración con ARCA', href: '/integraciones/arca' }],
        visual: {
          kind: 'integrationSteps',
          items: [
            { title: '1. Vendé', subtitle: 'Desde Ventas o desde el POS' },
            { title: '2. Emití el comprobante', subtitle: 'Factura, Nota de Crédito o Nota de Débito' },
            { title: '3. Envialo', subtitle: 'PDF por email o impresión en Ticket o A4' },
          ],
        },
      },
      {
        title: 'Cada comprobante, conectado con tu operación.',
        description:
          'Una venta en el sistema puede generar su comprobante. Una compra se registra con su factura. Todo queda vinculado: sabés qué se facturó, a quién y desde qué operación.',
        links: [
          { label: 'Ver Ventas y POS', href: '/producto/ventas-y-pos' },
          { label: 'Ver Finanzas', href: '/producto/finanzas' },
        ],
        visual: {
          kind: 'flow',
          items: [
            { title: 'Venta en ZinkERP', subtitle: 'Operación registrada dentro del sistema' },
            { title: 'Comprobante ARCA', subtitle: 'Factura electrónica integrada a la operación' },
            { title: 'Cuenta corriente del cliente', subtitle: 'Todo queda vinculado a su movimiento' },
          ],
        },
      },
    ],
    finalBannerText: 'Facturá sin salir de tu operación diaria. Simple, rápido, integrado.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
    faqTitle: 'Preguntas frecuentes sobre Facturación',
    faqs: [
      {
        question: '¿Factura para monotributo y responsable inscripto?',
        answer:
          'Sí. ZinkERP soporta Facturas A, B, C y M, más Notas de Crédito y Débito. Cubre los regímenes más comunes de monotributo y responsable inscripto.',
      },
      {
        question: '¿Tengo que hacer algún trámite en ARCA antes de facturar?',
        answer:
          'Sí, hay un trámite previo en ARCA. Te lo explicamos paso a paso en la página de la integración con ARCA y te acompañamos durante la puesta en marcha.',
      },
      {
        question: '¿Puedo facturar directamente desde una venta del POS?',
        answer:
          'Sí. Desde el sistema podés generar el comprobante vinculado a una venta existente. La factura queda asociada al cliente y a la operación.',
      },
      {
        question: '¿Cómo le llega el comprobante al cliente?',
        answer:
          'Desde la venta le enviás el PDF por email, o lo imprimís en formato Ticket o A4 en el momento.',
      },
    ],
  },
  {
    slug: 'finanzas',
    title: 'Finanzas | ZinkERP - Caja, cuenta corriente y control financiero multi-sucursal',
    metaDescription:
      'Controlá la caja de cada sucursal por separado y consolidá al instante. Cuenta corriente, ingresos, egresos y vencimientos. Agendá una demo.',
    eyebrow: 'Finanzas',
    theme: 'finance',
    heroImageSrc: '/images/hero-finanzas.png?v=2',
    ogImageSrc: '/images/og-finanzas.jpg?v=2',
    heroTitle: 'Tus finanzas claras, con cada sucursal bajo control.',
    heroSubtitle:
      'Cuenta corriente, caja diaria, ingresos, egresos y vencimientos. Separá y consolidá cajas por sucursal al instante.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Panel financiero',
    heroVisual: {
      kind: 'cashDesk',
      items: [
        { title: 'Cuenta corriente', subtitle: '$ 12.4M en seguimiento' },
        { title: 'Caja diaria', subtitle: '4 operadores con cierre abierto' },
        { title: 'Vencimientos', subtitle: '9 compromisos esta semana' },
      ],
    },
    sections: [
      {
        title: 'Sabé quién te debe, cuánto y hace cuánto',
        description:
          'La cuenta corriente deja de ser una caja negra: ves saldo, antigüedad y último movimiento de cada cliente.',
        links: [{ label: 'Ver Ventas y POS', href: '/producto/ventas-y-pos' }],
        visual: {
          kind: 'image',
          src: '/images/cuenta-corriente-cliente.png',
          alt: 'Vista de cuenta corriente de cliente con saldo actual, vencimientos y movimientos registrados',
          caption: 'Cuenta corriente con saldo, vencimientos y pagos en un solo lugar.',
        },
      },
      {
        title: 'Cada operador rinde su propia caja. Sin mezclar, sin perder plata.',
        description:
          'Apertura, movimientos y cierre quedan individualizados para evitar diferencias sin contexto.',
        links: [{ label: 'Ver Control de Acceso', href: '/producto/control-de-acceso' }],
        reverse: true,
        visual: {
          kind: 'imageGrid',
          layout: 'balanced',
          images: [
            {
              src: '/images/caja-efectivo-caja.png',
              alt: 'Recorte de caja diaria mostrando el efectivo actual en caja',
              caption: 'Efectivo en caja',
            },
            {
              src: '/images/caja-cantidad-ventas.png',
              alt: 'Recorte de caja diaria mostrando la cantidad total de ventas',
              caption: 'Cantidad de ventas',
            },
            {
              src: '/images/caja-total-fiscal.png',
              alt: 'Recorte de caja diaria mostrando el total fiscal con pendiente y autorizado',
              caption: 'Total fiscal',
            },
          ],
        },
      },
      {
        title: 'Cobrás y pagás como quieras. Todo registrado.',
        description:
          'Efectivo, transferencia, Mercado Pago, cheque o tarjeta: la forma cambia, la trazabilidad no.',
        links: [{ label: 'Ver Facturación', href: '/producto/facturacion' }],
        visual: {
          kind: 'imageGrid',
          layout: 'balanced',
          images: [
            {
              src: '/images/caja-total-ingresos-ventas.png',
              alt: 'Recorte de caja diaria mostrando el total de ingresos por ventas desglosado por medio de cobro',
              caption: 'Ingresos por ventas',
            },
            {
              src: '/images/caja-total-egresos-compras.png',
              alt: 'Recorte de caja diaria mostrando el total de egresos por compras desglosado por medio de pago',
              caption: 'Egresos por compras',
            },
            {
              src: '/images/caja-total-otros-egresos.png',
              alt: 'Recorte de caja diaria mostrando otros egresos operativos',
              caption: 'Otros egresos',
            },
          ],
        },
      },
    ],
    finalBannerText: 'Números claros, decisiones seguras.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
  },
  {
    slug: 'reportes',
    title: 'Informes | ZinkERP - Los números de tu negocio, claros y a mano',
    metaDescription:
      'Ventas diarias, cobros pendientes, ganancia bruta y productos faltantes. Informes simples para dueños de pymes que toman decisiones.',
    eyebrow: 'Informes y Dashboard',
    theme: 'analytics',
    heroImageSrc: '/images/hero-reportes.png?v=2',
    ogImageSrc: '/images/og-reportes.jpg?v=2',
    heroTitle: 'Los números que importan de tu negocio. Claros, simples, actualizados.',
    heroSubtitle:
      'Ventas diarias, cobros pendientes, ganancia bruta. Lo que necesitás saber para decidir.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Informes disponibles',
    heroVisual: {
      kind: 'reportBoard',
      items: [
        { title: 'Ventas de hoy', subtitle: 'Monto total diario al instante' },
        { title: 'Cobros pendientes', subtitle: 'Lo que falta cobrar del circuito' },
        { title: 'Ganancia bruta', subtitle: 'Una lectura simple para decidir' },
      ],
    },
    noindex: true,
    sections: [
      {
        title: 'Lo que importa: ventas, cobros y ganancia.',
        description:
          'Sin gráficos complicados ni tableros que nadie entiende. Los números que necesitás para saber si el negocio va bien.',
        links: [
          { label: 'Ver Finanzas', href: '/producto/finanzas' },
          { label: 'Ver Sucursales', href: '/producto/sucursales' },
        ],
        visual: {
          kind: 'reportSplit',
          note: 'Valores de ejemplo',
          items: [
            { title: 'Ventas de hoy', subtitle: '$ 1.284.500', meta: '47 ventas en el día' },
            { title: 'Cobros pendientes', subtitle: '$ 3.920.000', meta: 'Pendiente de ingreso' },
            { title: 'Ganancia bruta', subtitle: '$ 412.300', meta: 'Lectura del negocio' },
            { title: 'Productos faltantes', subtitle: '12 ítems', meta: 'Pedidos que no se vendieron' },
          ],
        },
      },
      {
        title: 'Ventas diarias. Al grano.',
        description:
          'Cuánto vendiste hoy, cuánto ayer, cuánto en el mes. Sin filtros, sin vueltas.',
        links: [{ label: 'Ver Ventas y POS', href: '/producto/ventas-y-pos' }],
        reverse: true,
        visual: {
          kind: 'comparison',
          note: 'Valores de ejemplo',
          items: [
            { title: '2026-06-02', subtitle: 'Cantidad de ventas: 47', meta: 'Monto total: $ 1.284.500' },
            { title: '2026-06-01', subtitle: 'Cantidad de ventas: 52', meta: 'Monto total: $ 1.402.800' },
            { title: 'Mes actual', subtitle: 'Acumulado diario visible', meta: 'Monto total: $ 2.687.300' },
          ],
        },
      },
      {
        title: 'Lo que entra, lo que sale, lo que queda pendiente.',
        description:
          'Sabé cuánto te deben y cuánto debés. Sin conciliaciones manuales.',
        visual: {
          kind: 'imageGrid',
          layout: 'balanced',
          images: [
            {
              src: '/images/reportes-flujo-cobros.png',
              alt: 'Recorte del Dashboard con el flujo de cobros pendientes y montos por vencer',
              caption: 'Cobros pendientes visibles en un solo vistazo.',
            },
            {
              src: '/images/reportes-flujo-pagos.png',
              alt: 'Recorte del Dashboard con el flujo de pagos pendientes y montos por vencer',
              caption: 'Pagos pendientes con su compromiso financiero.',
            },
          ],
        },
      },
    ],
    finalBannerText: 'Los números claros de tu negocio. Sin vueltas.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
  },
  {
    slug: 'sucursales',
    title: 'Sucursales | ZinkERP - Controlá 2 o 20 sucursales desde un solo lugar',
    metaDescription:
      'Stock, precios, usuarios e informes sincronizados al instante entre todas tus sucursales. Cada sucursal adicional tiene 30% de descuento. Agendá una demo.',
    eyebrow: 'Sucursales',
    theme: 'network',
    heroImageSrc: '/images/hero-sucursales.svg?v=2',
    ogImageSrc: '/images/og-sucursales.jpg?v=2',
    heroTitle: 'Controlá 2 sucursales o 20. Desde el celular. Sin drama.',
    heroSubtitle:
      'Stock, precios, usuarios e informes sincronizados al instante entre todas tus sucursales.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Casa central y sucursales',
    heroVisual: {
      kind: 'syncNodes',
      items: [
        { title: 'Casa central', subtitle: 'Control general y aprobaciones' },
        { title: 'Sucursal norte', subtitle: 'Ventas, stock y usuarios propios' },
        { title: 'Sucursal sur', subtitle: 'Mismas reglas, contexto local' },
      ],
    },
    sections: [
      {
        title: 'Todo lo que pasa en tus sucursales, en una sola pantalla',
        description:
          'Consolidar operación, finanzas y stock te permite dirigir más de una sucursal sin perder contexto.',
        links: [{ label: 'Ver Informes', href: '/producto/reportes' }],
        visual: {
          kind: 'syncNodes',
          items: [
            { title: 'Ventas por sucursal', subtitle: 'Comparación diaria y mensual' },
            { title: 'Stock por sucursal', subtitle: 'Disponibilidad actualizada al instante' },
            { title: 'Usuarios activos', subtitle: 'Actividad distribuida con control' },
          ],
        },
      },
      {
        title: 'Sincronización en tiempo real. Sin esperar, sin archivos.',
        description:
          'No dependés de exportaciones ni consolidaciones manuales: los datos viajan con la operación.',
        reverse: true,
        visual: {
          kind: 'flow',
          items: [
            { title: 'Casa central', subtitle: 'Define reglas y ve todas las sucursales' },
            { title: 'Sucursal A', subtitle: 'Opera con datos consistentes' },
            { title: 'Sucursal B', subtitle: 'Comparte stock, precios y usuarios según permiso' },
          ],
        },
      },
      {
        title: 'Sucursales que piden, casa central que aprueba. O casa central que asigna.',
        description:
          'Podés coordinar abastecimiento y decisiones operativas con el modelo que más convenga a tu negocio.',
        links: [
          { label: 'Ver Compras', href: '/producto/compras' },
          { label: 'Ver Inventario', href: '/producto/inventario' },
        ],
        visual: {
          kind: 'flow',
          items: [
            { title: 'Sucursal solicita', subtitle: 'Detecta la necesidad desde el stock real' },
            { title: 'Casa central valida', subtitle: 'Aprueba, ajusta o reasigna mercadería' },
            { title: 'Ejecución', subtitle: 'Compra, transferencia o reposición' },
          ],
        },
      },
      {
        title: 'Stock entre sucursales configurable',
        description:
          'Definí si cada equipo ve todo, solo una parte o nada del stock de otras sucursales.',
        links: [{ label: 'Ver Control de Acceso', href: '/producto/control-de-acceso' }],
        reverse: true,
        visual: {
          kind: 'comparison',
          items: [
            { title: 'Visibilidad total', subtitle: 'Casa central y dueños ven todas las sucursales' },
            { title: 'Visibilidad parcial', subtitle: 'Encargados ven las sucursales asignadas' },
            { title: 'Sin visibilidad', subtitle: 'Operadores trabajan solo su sucursal' },
          ],
        },
      },
      {
        title: 'Precio claro: cada sucursal adicional, con 30% de descuento.',
        description:
          'La casa central paga el precio pleno de su plan y cada sucursal adicional tiene 30% de descuento sobre el plan que le corresponda. Es permanente y aplica a todos los planes.',
        visual: {
          kind: 'pricing',
          items: [
            { title: 'Casa central', subtitle: 'Precio pleno de su plan' },
            { title: 'Cada sucursal adicional', subtitle: '30% de descuento permanente sobre el plan que le corresponda' },
            { title: 'Usuarios ilimitados', subtitle: 'Sin costo por usuario en ninguna sucursal' },
          ],
        },
      },
    ],
    finalBannerText: 'Crecé sin límites. Cada sucursal, conectada.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
    faqTitle: 'Preguntas frecuentes sobre Sucursales',
    faqs: [
      {
        question: '¿Cada sucursal paga un plan por separado?',
        answer:
          'Sí. La casa central paga el precio pleno de su plan y cada sucursal adicional se cobra aparte, con 30% de descuento permanente sobre el plan que le corresponda. Aplica a todos los planes. Los usuarios de todas las sucursales están incluidos sin costo extra.',
      },
      {
        question: '¿Puedo tener permisos distintos en cada sucursal?',
        answer:
          'Sí. Cada usuario puede tener un perfil distinto en cada sucursal. Por ejemplo: un encargado ve todo en su sucursal pero no accede a las otras. El dueño ve todo de todas.',
      },
      {
        question: '¿El stock se sincroniza solo entre sucursales?',
        answer:
          'Sí. Cada venta, compra o ajuste se refleja al instante en la sucursal correspondiente. Además, podés configurar qué stock ve cada sucursal: visibilidad total, parcial o solo la propia.',
      },
    ],
  },
  {
    slug: 'control-de-acceso',
    title: 'Control de Acceso | ZinkERP - Perfiles y permisos granulares para tu negocio',
    metaDescription:
      'Definí perfiles a medida con permisos precisos. Cada persona ve solo lo que necesita. Caja diaria por operador. Agendá una demo.',
    eyebrow: 'Control de Acceso',
    theme: 'access',
    heroImageSrc: '/images/hero-control-de-acceso.png?v=1',
    ogImageSrc: '/images/og-control-de-acceso.jpg?v=2',
    heroTitle: 'Cada persona en tu negocio ve solo lo que necesita. Ni más, ni menos.',
    heroSubtitle:
      'Perfiles a medida, permisos precisos y caja diaria por operador. Control sin volverte loco.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Perfiles y permisos',
    heroVisual: {
      kind: 'permissionsBuilder',
      items: [
        { title: 'Cajero', subtitle: 'Vende, cobra y rinde caja' },
        { title: 'Encargado', subtitle: 'Opera su sucursal y valida ajustes' },
        { title: 'Dueño', subtitle: 'Ve todas las sucursales y define reglas' },
      ],
    },
    sections: [
      {
        title: 'Creá los perfiles que tu negocio necesita. No los que el sistema te deja.',
        description:
          'Los perfiles se arman según tu operación real, no según tres perfiles fijos que no reflejan cómo trabaja tu equipo.',
        links: [{ label: 'Ver Sucursales', href: '/producto/sucursales' }],
        visual: {
          kind: 'imageGrid',
          layout: 'balanced',
          images: [
            {
              src: '/images/seguridad-perfiles.png',
              alt: 'Vista de creación de perfiles con nombre, descripción y acciones habilitadas',
              caption: 'Perfiles creados según la operación real del negocio.',
            },
            {
              src: '/images/seguridad-usuario.png',
              alt: 'Vista de usuario con estado, datos generales y perfil asignado',
              caption: 'Cada usuario con estado, perfil y permisos asignados.',
            },
          ],
        },
      },
      {
        title: 'Permisos precisos: podés ver el precio de costo, pero no modificarlo.',
        description:
          'La granularidad evita bloqueos innecesarios y también reduce errores o la exposición de información sensible.',
        links: [{ label: 'Ver Inventario', href: '/producto/inventario' }],
        reverse: true,
        visual: {
          kind: 'image',
          src: '/images/seguridad-permisos.png',
          alt: 'Matriz de permisos granulares con acciones habilitadas y restringidas por módulo',
          caption: 'Permisos finos por acción, dato y módulo.',
        },
      },
      {
        title: 'Cada operador con su caja. Lo que rinde uno, no se mezcla con otro.',
        description:
          'La caja diaria por operador ayuda a rendir mejor, detectar diferencias y mantener responsabilidad clara.',
        links: [{ label: 'Ver Finanzas', href: '/producto/finanzas' }],
        visual: {
          kind: 'timeline',
          items: [
            { title: 'Apertura individual', subtitle: 'Monto inicial y turno asignado' },
            { title: 'Movimientos propios', subtitle: 'Cobros y retiros con usuario identificado' },
            { title: 'Cierre del operador', subtitle: 'Diferencia visible y trazabilidad completa' },
          ],
        },
      },
      {
        title: 'El encargado ve su sucursal. El dueño ve todo.',
        description:
          'Podés definir el alcance por sucursal, perfil y tipo de información para que cada persona trabaje con el contexto correcto.',
        links: [{ label: 'Ver Sucursales', href: '/producto/sucursales' }],
        reverse: true,
        visual: {
          kind: 'scope',
          items: [
            { title: 'Operador', subtitle: 'Solo su caja y su puesto' },
            { title: 'Encargado', subtitle: 'Solo su sucursal y su equipo' },
            { title: 'Dueño', subtitle: 'Vista total de la operación' },
          ],
        },
      },
    ],
    finalBannerText: 'Control total sin volverte loco. Cada quien, lo suyo.',
    finalBannerCtaLabel: 'Probá gratis',
    finalBannerCtaHref: '/registro',
  },
];

export const productPagesBySlug = Object.fromEntries(
  productPages.map((page) => [page.slug, page]),
) as Record<string, ProductPage>;
