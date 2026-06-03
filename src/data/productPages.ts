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
  | { kind: 'comparison'; items: VisualListItem[] }
  | { kind: 'pricing'; items: VisualListItem[] }
  | { kind: 'scope'; items: VisualListItem[] }
  | { kind: 'providerSheet'; items: VisualListItem[] }
  | { kind: 'emailFlow'; items: VisualListItem[] }
  | { kind: 'integrationSteps'; items: VisualListItem[] }
  | { kind: 'reportSplit'; items: VisualListItem[] }
  | { kind: 'permissionsBuilder'; items: VisualListItem[] }
  | { kind: 'syncNodes'; items: VisualListItem[] }
  | { kind: 'posConsole'; items: VisualListItem[] }
  | { kind: 'invoiceMockup'; items: VisualListItem[] }
  | { kind: 'reportBoard'; items: VisualListItem[] }
  | { kind: 'cashDesk'; items: VisualListItem[] }
  | { kind: 'paymentRail'; items: VisualListItem[] }
  | { kind: 'image'; src: string; alt: string; caption?: string }
  | { kind: 'imageGrid'; images: VisualImageItem[] };

export type ProductSection = {
  title: string;
  description: string;
  links?: LinkItem[];
  reverse?: boolean;
  visual: ProductVisual;
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
    title: 'Ventas y POS | ZinkERP - Vende mas y mas rapido en todas tus sucursales',
    metaDescription:
      'Gestiona presupuestos, POS y factura electronica en un solo flujo. Stock y precios sincronizados en todas tus sucursales. Proba ZinkERP gratis.',
    eyebrow: 'Ventas y POS',
    theme: 'sales',
    heroImageSrc: '/images/hero-ventas-y-pos.png?v=3',
    ogImageSrc: '/images/og-ventas-y-pos.svg?v=1',
    heroTitle: 'Ventas agiles, con stock y precios sincronizados en todas tus sucursales.',
    heroSubtitle:
      'Presupuesto, POS y factura electronica en un mismo flujo. Con stock y precios sincronizados en todas tus sucursales.',
    heroCtaLabel: 'Agenda una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Vista operativa',
    heroVisual: {
      kind: 'posConsole',
      items: [
        { title: 'POS rapido', subtitle: 'Busqueda instantanea, medios de pago y total visible' },
        { title: 'Precio vigente', subtitle: 'Listas y promociones sincronizadas' },
        { title: 'Metodo de pago', subtitle: 'Efectivo, transferencia, MP, tarjeta' },
      ],
    },
    sections: [
      {
        title: 'Venta asistida o consultiva, sin perder el hilo del proceso.',
        description:
          'Arrancas por donde te llegue la oportunidad: cotizacion, presupuesto, pedido o venta directa. Despues podes sumar productos con upselling sin perder la trazabilidad.',
        links: [
          { label: 'Ver Facturacion', href: '/producto/facturacion' },
          { label: 'Ver Inventario', href: '/producto/inventario' },
        ],
        visual: {
          kind: 'flow',
          items: [
            { title: 'Cotizacion', subtitle: 'Capturas la necesidad inicial y ordenas la oportunidad comercial' },
            { title: 'Presupuesto', subtitle: 'Presentas precios, alternativas y condiciones para avanzar' },
            { title: 'Pedido', subtitle: 'Confirmas lo acordado y reservas mercaderia si hace falta' },
            { title: 'Venta', subtitle: 'Cierras la operacion y registras el cobro dentro del sistema' },
          ],
        },
      },
      {
        title: 'ZinkPOS: cobrá al instante. Sin esperas, sin pantallas lentas.',
        description:
          'Buscá productos al instante con un caché de 400 items. La experiencia es tipo local: no hay delays de red aunque tengas muchos productos cargados.',
        links: [{ label: 'Ver Sucursales', href: '/producto/sucursales' }],
        reverse: true,
        visual: {
          kind: 'posConsole',
          items: [
            { title: 'Busqueda veloz', subtitle: 'Encuentra productos por codigo, nombre o atajo' },
            { title: 'Atajos de teclado', subtitle: 'Agiliza la atencion sin depender del mouse' },
            { title: 'Cache inteligente', subtitle: 'Hasta 400 items listos para una experiencia instantanea' },
          ],
        },
      },
      {
        title: 'Consulta precios sin abrir una venta',
        description:
          'Ideal para showroom o salon: el equipo puede responder rapido sin ensuciar el flujo de caja.',
        visual: {
          kind: 'device',
          items: [
            { title: 'Tablet de consulta', subtitle: 'Precio, stock y variantes en una sola vista' },
            { title: 'Listas por canal', subtitle: 'Mayoreo, retail o promo segun contexto' },
          ],
        },
      },
      {
        title: 'Tambien acompana a vendedores de calle',
        description:
          'Cuando la venta ocurre fuera del mostrador, el equipo comercial puede trabajar cotizaciones, presupuestos, pedidos y ventas desde un flujo mas consultivo. Hoy no incluye calculo de comisiones, pero si ordena la gestion comercial de punta a punta.',
        visual: {
          kind: 'timeline',
          items: [
            { title: 'Visita comercial', subtitle: 'El vendedor releva necesidad y arma la oportunidad' },
            { title: 'Seguimiento', subtitle: 'Presupuesto, ajustes y upselling dentro del mismo circuito' },
            { title: 'Cierre', subtitle: 'El pedido o la venta quedan registrados en la operacion central' },
          ],
        },
      },
      {
        title: 'Tu tienda online sincronizada con tu negocio fisico',
        description:
          'Ecommerce, pagos y operacion conviven sin depender de procesos manuales entre sistemas distintos.',
        links: [
          { label: 'WooCommerce', href: '/integraciones/woocommerce' },
          { label: 'Mercado Pago', href: '/integraciones/mercadopago' },
        ],
        reverse: true,
        visual: {
          kind: 'logos',
          items: [
            { title: 'WooCommerce', subtitle: 'Catalogo, stock y precios conectados' },
            { title: 'Mercado Pago', subtitle: 'Cobros y autorizaciones con trazabilidad' },
            { title: 'Operacion fisica', subtitle: 'Ventas y stock alineados con la tienda' },
          ],
        },
      },
    ],
    finalBannerText: 'Ventas + POS + factura + ecommerce. Un solo sistema.',
    finalBannerCtaLabel: 'Proba gratis',
    finalBannerCtaHref: '/registro',
    faqTitle: 'Preguntas frecuentes sobre Ventas y POS',
    faqs: [
      {
        question: '¿ZinkPOS funciona sin conexión a internet?',
        answer:
          'ZinkPOS usa un caché de 400 productos para operar a velocidad local, pero necesita conexión para sincronizar ventas, stock y medios de pago. No está diseñado para operar sin internet de forma prolongada.',
      },
      {
        question: '¿Puedo usar ZinkPOS en una tablet?',
        answer:
          'Sí. ZinkPOS está optimizado para pantallas táctiles y funciona en tablets Android y iPad desde el navegador. También se puede operar 100% con teclado en PC.',
      },
      {
        question: '¿Las ventas de ZinkPOS descuentan stock automáticamente?',
        answer:
          'Sí. Cada venta realizada en POS descuenta el stock de la sucursal donde se vendió al instante. Si tenés varias sucursales, cada una descuenta su propio stock.',
      },
    ],
  },
  {
    slug: 'compras',
    title: 'Compras | ZinkERP - Gestion de compras y proveedores multi-sucursal',
    metaDescription:
      'Ordena tus compras con sugerencias automaticas, control de proveedores y sincronizacion con tu stock. Multi-sucursal. Proba ZinkERP.',
    eyebrow: 'Compras',
    theme: 'procurement',
    heroImageSrc: '/images/hero-compras.png?v=1',
    ogImageSrc: '/images/og-compras.svg?v=1',
    heroTitle: 'Compra lo que necesitas, cuando lo necesitas. Centralizado o por sucursal. Vos decidis.',
    heroSubtitle:
      'Ordenes de compra con sugerencias automaticas, control de proveedores y sincronizacion con tu stock.',
    heroCtaLabel: 'Agenda una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Panel de compras',
    heroVisual: {
      kind: 'cards',
      items: [
        { title: 'Pendiente', subtitle: '18 ordenes esperando aprobacion' },
        { title: 'Aprobada', subtitle: '12 listas para recibir' },
        { title: 'Recibida', subtitle: '34 ingresos sincronizados con stock' },
      ],
    },
    sections: [
      {
        title: 'Ordenes de compra que te avisan antes de que te falte',
        description:
          'Las sugerencias parten del stock real, los minimos y la demanda para ayudarte a comprar con mas contexto.',
        links: [{ label: 'Ver Inventario', href: '/producto/inventario' }],
        visual: {
          kind: 'image',
          src: '/images/compras-stock-critico-proveedor.png',
          alt: 'Vista de productos con stock critico filtrados por proveedor para preparar reposicion',
          caption: 'Stock crítico por proveedor para anticipar reposición.',
        },
      },
      {
        title: 'Tus proveedores, siempre a mano. Datos fiscales, contacto y OC al instante.',
        description:
          'Cada proveedor tiene su ficha con datos fiscales, contacto e historico de ordenes de compra. Emitis una OC y queda registrada contra ese proveedor. Todo ordenado, todo en un lugar.',
        links: [{ label: 'Ver Inventario', href: '/producto/inventario' }],
        reverse: true,
        visual: {
          kind: 'image',
          src: '/images/compras-form.png',
          alt: 'Formulario de orden de compra con proveedor, items, cantidades y total consolidado',
          caption: 'La orden sale con proveedor, ítems, cantidades y total en un solo flujo.',
        },
      },
      {
        title: 'Cada sucursal solicita, la central consolida y compra.',
        description:
          'Las sucursales registran sus necesidades. La central ve todo consolidado, decide el proveedor y emite la orden de compra. Cada sucursal sabe que pidio y cuando llega.',
        links: [
          { label: 'Ver Sucursales', href: '/producto/sucursales' },
          { label: 'Ver Inventario', href: '/producto/inventario' },
        ],
        visual: {
          kind: 'imageGrid',
          images: [
            {
              src: '/images/compras-listado.png',
              alt: 'Listado de ordenes de compra con proveedor, importe, fecha y estado',
              caption: 'Central ve todo el historial de compras en una sola lista.',
            },
            {
              src: '/images/compras-estados.png',
              alt: 'Detalle de estados de ordenes de compra como confirmado, aprobado y borrador',
              caption: 'Estados claros para saber qué ya fue aprobado o confirmado.',
            },
          ],
        },
      },
      {
        title: 'La orden de compra viaja directo al proveedor.',
        description:
          'Cuando generas la OC, podes enviarla automaticamente por email al proveedor. Con todos los datos: productos, cantidades y precios acordados.',
        visual: {
          kind: 'emailFlow',
          items: [
            { title: 'Email al proveedor', subtitle: 'La OC sale con el detalle completo' },
            { title: 'Productos y cantidades', subtitle: 'Todo lo solicitado viaja en un solo documento' },
            { title: 'Precios acordados', subtitle: 'La orden queda registrada con su informacion comercial' },
          ],
        },
      },
    ],
    finalBannerText: 'Del pedido al stock en un solo paso. Sin hojas de calculo, sin WhatsApp perdidos.',
    finalBannerCtaLabel: 'Proba gratis',
    finalBannerCtaHref: '/registro',
  },
  {
    slug: 'inventario',
    title: 'Inventario | ZinkERP - Stock multi-sucursal en tiempo real',
    metaDescription:
      'Controla tu stock en todas tus sucursales al instante. Alertas, movimientos auditados y catalogo centralizado. Empeza hoy gratis.',
    eyebrow: 'Inventario',
    theme: 'inventory',
    heroImageSrc: '/images/hero-inventario.png?v=2',
    ogImageSrc: '/images/og-inventario.svg?v=1',
    heroTitle: 'Sabe exactamente que tienes y donde. En tiempo real, sin contar a mano.',
    heroSubtitle:
      'Stock multi-sucursal actualizado al instante. Alertas, movimientos auditados y catalogo centralizado.',
    heroCtaLabel: 'Empeza hoy',
    heroCtaHref: '/registro',
    heroVisualLabel: 'Dashboard de stock',
    heroVisual: {
      kind: 'kpis',
      items: [
        { title: 'Casa central', subtitle: '1.240 unidades activas' },
        { title: 'Sucursal norte', subtitle: '17 alertas de reposicion' },
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
            { title: '10:18 Transferencia', subtitle: 'Central a Norte +12 unidades' },
            { title: '10:31 Recepcion compra', subtitle: 'Ingreso validado por proveedor' },
          ],
        },
      },
      {
        title: 'Cada movimiento, registrado. Sabes quien, cuando y por que.',
        description:
          'La trazabilidad deja de depender de memoria o mensajes sueltos: cada ajuste tiene usuario, fecha y motivo.',
        reverse: true,
        visual: {
          kind: 'timeline',
          items: [
            { title: 'Ajuste por rotura', subtitle: 'Ana Perez - deposito central - 2 unidades' },
            { title: 'Conteo de control', subtitle: 'Juan Gomez - salon - regularizacion de 5 unidades' },
            { title: 'Transferencia intersucursal', subtitle: 'Logistica - norte a sur - 8 unidades' },
          ],
        },
      },
      {
        title: 'Un catalogo para todas tus sucursales, con precios distintos si hace falta',
        description:
          'Centralizas productos y controlas variaciones por sucursal, canal o politica comercial sin perder orden.',
        links: [{ label: 'Ver Control de Acceso', href: '/producto/control-de-acceso' }],
        visual: {
          kind: 'accordion',
          items: [
            { title: 'Precio casa central', subtitle: 'Lista general y promociones activas' },
            { title: 'Precio sucursal norte', subtitle: 'Ajuste local por contexto competitivo' },
            { title: 'Precio ecommerce', subtitle: 'Politica diferenciada para tienda online' },
          ],
        },
      },
    ],
    finalBannerText: 'Stock desordenado, negocio que pierde plata. Stock claro, negocio que crece.',
    finalBannerCtaLabel: 'Proba gratis',
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
          'Sí. El sistema marca los productos con stock crítico y podés verlos en el reporte correspondiente. También ayuda a decidir qué reponer en cada sucursal.',
      },
    ],
  },
  {
    slug: 'facturacion',
    title: 'Facturacion Electronica | ZinkERP - Factura desde tu ERP, conectado con ARCA',
    metaDescription:
      'Facturacion electronica AFIP/ARCA integrada a tu operacion diaria. Facturas A, B, C, M, NC, ND. Para monotributo y RI. Sin salir del sistema.',
    eyebrow: 'Facturacion AFIP/ARCA',
    theme: 'fiscal',
    heroImageSrc: '/images/hero-facturacion.png?v=1',
    ogImageSrc: '/images/og-facturacion.svg?v=1',
    heroTitle: 'Facturá desde donde manejás tu negocio. Sin sistemas paralelos.',
    heroSubtitle:
      'Factura electronica AFIP/ARCA integrada a tu operacion diaria. Para monotributo y responsable inscripto.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Generacion de comprobantes',
    heroVisual: {
      kind: 'invoiceMockup',
      items: [
        { title: 'Factura A, B, C y M', subtitle: 'Comprobantes integrados al flujo diario' },
        { title: 'Notas de Credito y Debito', subtitle: 'Registradas sin salir del sistema' },
        { title: 'Integracion con Facturante', subtitle: 'Configuracion guiada desde Preferencias' },
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
            { title: 'Nota de Credito' },
            { title: 'Nota de Debito' },
          ],
        },
      },
      {
        title: 'Una integración que funciona. Sin configuraciones complejas.',
        description:
          'Conectamos ZinkERP con Facturante para que factures sin salir del sistema. Configurás una vez en Preferencias → Integraciones, ingresás tus datos fiscales, y ARCA te habilita en hasta 24 horas.',
        reverse: true,
        visual: {
          kind: 'integrationSteps',
          items: [
            { title: '1. Configurar integración', subtitle: 'Preferencias → Integraciones' },
            { title: '2. Ingresar datos fiscales', subtitle: 'Monotributo o Responsable Inscripto' },
            { title: '3. ¡A facturar!', subtitle: 'ARCA habilita en hasta 24 horas' },
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
            { title: 'Venta en ZinkERP', subtitle: 'Operacion registrada dentro del sistema' },
            { title: 'Comprobante ARCA', subtitle: 'Factura electronica integrada a la operacion' },
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
          'Sí. Necesitás autorizar a la CUIT de ZinkInTech a emitir comprobantes en tu nombre. El trámite se hace desde la página de ARCA y la habilitación puede demorar hasta 24 horas. Nosotros te guiamos en el proceso.',
      },
      {
        question: '¿Puedo facturar directamente desde una venta de POS?',
        answer:
          'Sí. Desde el sistema podés generar el comprobante vinculado a una venta existente. La factura queda asociada al cliente y a la operación.',
      },
    ],
  },
  {
    slug: 'finanzas',
    title: 'Finanzas | ZinkERP - Caja, cuenta corriente y dashboard financiero multi-sucursal',
    metaDescription:
      'Controla la caja de cada sucursal por separado y consolida al instante. Cuenta corriente, ingresos, egresos y vencimientos. Agenda una demo.',
    eyebrow: 'Finanzas',
    theme: 'finance',
    heroImageSrc: '/images/hero-finanzas.png?v=2',
    ogImageSrc: '/images/og-finanzas.svg?v=1',
    heroTitle: 'Tus finanzas claras, con cada sucursal bajo control.',
    heroSubtitle:
      'Cuenta corriente, caja diaria, ingresos, egresos y vencimientos. Separá y consolidá cajas por sucursal al instante.',
    heroCtaLabel: 'Agenda una demo',
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
        title: 'Sabe quien te debe, cuanto y hace cuanto',
        description:
          'La cuenta corriente deja de ser una caja negra: ves saldo, antiguedad y ultimo movimiento de cada cliente.',
        links: [{ label: 'Ver Ventas y POS', href: '/producto/ventas-y-pos' }],
        visual: {
          kind: 'comparison',
          items: [
            { title: 'Cliente Alvarez', subtitle: '$ 420.000', meta: '30 dias' },
            { title: 'Distribuidora Sol', subtitle: '$ 1.280.000', meta: '60 dias' },
            { title: 'Comercial Norte', subtitle: '$ 2.040.000', meta: '90+ dias' },
          ],
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
        title: 'Cobras y pagas como quieras. Todo registrado.',
        description:
          'Efectivo, transferencia, Mercado Pago, cheque o tarjeta: la forma cambia, la trazabilidad no.',
        links: [{ label: 'Ver Facturacion', href: '/producto/facturacion' }],
        visual: {
          kind: 'imageGrid',
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
    finalBannerText: 'Numeros claros, decisiones seguras.',
    finalBannerCtaLabel: 'Proba gratis',
    finalBannerCtaHref: '/registro',
  },
  {
    slug: 'reportes',
    title: 'Reportes | ZinkERP - Los numeros de tu negocio, claros y a mano',
    metaDescription:
      'Ventas diarias, cobros pendientes, ganancia bruta, productos incumplidos. Reportes simples para dueños de pyme que toman decisiones.',
    eyebrow: 'Reportes y Dashboard',
    theme: 'analytics',
    heroImageSrc: '/images/hero-reportes.png?v=2',
    ogImageSrc: '/images/og-reportes.svg?v=1',
    heroTitle: 'Los números que importan de tu negocio. Claros, simples, actualizados.',
    heroSubtitle:
      'Ventas diarias, cobros pendientes, ganancia bruta. Lo que necesitás saber para decidir.',
    heroCtaLabel: 'Agendá una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Reportes existentes',
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
          'Sin graficos complicados ni dashboards que nadie entiende. Los numeros que necesitás para saber si el negocio va bien.',
        links: [
          { label: 'Ver Finanzas', href: '/producto/finanzas' },
          { label: 'Ver Sucursales', href: '/producto/sucursales' },
        ],
        visual: {
          kind: 'reportSplit',
          items: [
            { title: 'Ventas de hoy', subtitle: '$X', meta: 'Cantidad de ventas diaria' },
            { title: 'Cobros pendientes', subtitle: '$X', meta: 'Pendiente de ingreso' },
            { title: 'Ganancia bruta', subtitle: '$X', meta: 'Lectura del negocio' },
            { title: 'Productos incumplidos', subtitle: 'X items', meta: 'Pedidos que no se vendieron' },
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
          items: [
            { title: '2026-06-02', subtitle: 'Cantidad de ventas: X', meta: 'Monto total: $X' },
            { title: '2026-06-01', subtitle: 'Cantidad de ventas: X', meta: 'Monto total: $X' },
            { title: 'Mes actual', subtitle: 'Acumulado diario visible', meta: 'Monto total: $X' },
          ],
        },
      },
      {
        title: 'Lo que entra, lo que sale, lo que queda pendiente.',
        description:
          'Sabé cuánto te deben y cuánto debés. Sin conciliaciones manuales.',
        visual: {
          kind: 'imageGrid',
          images: [
            {
              src: '/images/reportes-flujo-cobros.png',
              alt: 'Recorte del dashboard con el flujo de cobros pendientes y montos por vencer',
              caption: 'Cobros pendientes visibles en un solo vistazo.',
            },
            {
              src: '/images/reportes-flujo-pagos.png',
              alt: 'Recorte del dashboard con el flujo de pagos pendientes y montos por vencer',
              caption: 'Pagos pendientes con su compromiso financiero.',
            },
          ],
        },
      },
    ],
    finalBannerText: 'Los números claros de tu negocio. Sin vueltas.',
    finalBannerCtaLabel: 'Proba gratis',
    finalBannerCtaHref: '/registro',
  },
  {
    slug: 'sucursales',
    title: 'Sucursales | ZinkERP - Controla 2 o 20 sucursales desde un solo lugar',
    metaDescription:
      'Stock, precios, usuarios y reportes sincronizados al instante entre todas tus sucursales. Precio plano sin sorpresas. Agenda una demo.',
    eyebrow: 'Sucursales',
    theme: 'network',
    heroImageSrc: '/images/hero-sucursales.svg?v=1',
    ogImageSrc: '/images/og-sucursales.svg?v=1',
    heroTitle: 'Controla 2 sucursales o 20. Desde el celular. Sin drama.',
    heroSubtitle:
      'Stock, precios, usuarios y reportes sincronizados al instante entre todas tus sucursales.',
    heroCtaLabel: 'Agenda una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Red multi-sucursal',
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
          'Consolidar operacion, finanzas y stock te permite dirigir mas de una sucursal sin perder contexto.',
        links: [{ label: 'Ver Reportes', href: '/producto/reportes' }],
        visual: {
          kind: 'syncNodes',
          items: [
            { title: 'Ventas por sucursal', subtitle: 'Comparacion diaria y mensual' },
            { title: 'Stock por nodo', subtitle: 'Disponibilidad actualizada al instante' },
            { title: 'Usuarios activos', subtitle: 'Actividad distribuida con control' },
          ],
        },
      },
      {
        title: 'Sincronizacion en tiempo real. Sin esperar, sin archivos.',
        description:
          'No dependes de exportaciones ni consolidaciones manuales: los datos viajan con la operacion.',
        reverse: true,
        visual: {
          kind: 'flow',
          items: [
            { title: 'Casa central', subtitle: 'Define reglas y ve toda la red' },
            { title: 'Sucursal A', subtitle: 'Opera con datos consistentes' },
            { title: 'Sucursal B', subtitle: 'Comparte stock, precios y usuarios segun permiso' },
          ],
        },
      },
      {
        title: 'Sucursales que piden, central que aprueba. O central que asigna.',
        description:
          'Puedes coordinar abastecimiento y decisiones operativas con el modelo que mas convenga a tu negocio.',
        links: [
          { label: 'Ver Compras', href: '/producto/compras' },
          { label: 'Ver Inventario', href: '/producto/inventario' },
        ],
        visual: {
          kind: 'flow',
          items: [
            { title: 'Sucursal solicita', subtitle: 'Detecta necesidad desde stock real' },
            { title: 'Central valida', subtitle: 'Aprueba, ajusta o reasigna mercaderia' },
            { title: 'Ejecucion', subtitle: 'Compra, transferencia o reposicion' },
          ],
        },
      },
      {
        title: 'Stock intersucursal configurable',
        description:
          'Define si cada equipo ve todo, solo una parte o nada del stock de otras sucursales.',
        links: [{ label: 'Ver Control de Acceso', href: '/producto/control-de-acceso' }],
        reverse: true,
        visual: {
          kind: 'comparison',
          items: [
            { title: 'Visibilidad total', subtitle: 'Central y dueños ven toda la red' },
            { title: 'Visibilidad parcial', subtitle: 'Encargados ven nodos asignados' },
            { title: 'Sin visibilidad', subtitle: 'Operadores trabajan solo su sucursal' },
          ],
        },
      },
      {
        title: 'Precio plano, sin sorpresas. Sucursales extra al 50%.',
        description:
          'El crecimiento multi-sucursal tiene que ser previsible tambien desde el costo operativo.',
        visual: {
          kind: 'pricing',
          items: [
            { title: 'Plan base', subtitle: 'Incluye operacion principal y puesta en marcha' },
            { title: 'Sucursal extra', subtitle: '50% del valor de una sede principal' },
            { title: 'Escalabilidad', subtitle: 'Mas nodos sin multiplicar complejidad' },
          ],
        },
      },
    ],
    finalBannerText: 'Crece sin limites. Cada sucursal, conectada.',
    finalBannerCtaLabel: 'Proba gratis',
    finalBannerCtaHref: '/registro',
    faqTitle: 'Preguntas frecuentes sobre Sucursales',
    faqs: [
      {
        question: '¿Cada sucursal paga un plan por separado?',
        answer:
          'No. El plan es por organización. Las sucursales adicionales tienen un costo del 50% sobre el plan base. Todos los usuarios de todas las sucursales están incluidos sin costo extra.',
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
      'Define perfiles a medida con permisos precisos. Cada persona ve solo lo que necesita. Caja diaria por operador. Agenda una demo.',
    eyebrow: 'Control de Acceso',
    theme: 'access',
    heroImageSrc: '/images/hero-control-de-acceso.png?v=1',
    ogImageSrc: '/images/og-control-de-acceso.svg?v=1',
    heroTitle: 'Cada persona en tu negocio ve solo lo que necesita. Ni mas, ni menos.',
    heroSubtitle:
      'Perfiles a medida, permisos precisos y caja diaria por operador. Control sin volverte loco.',
    heroCtaLabel: 'Agenda una demo',
    heroCtaHref: '/agendar-demo',
    heroVisualLabel: 'Perfiles y permisos',
    heroVisual: {
      kind: 'permissionsBuilder',
      items: [
        { title: 'Cajero', subtitle: 'Vende, cobra y rinde caja' },
        { title: 'Encargado', subtitle: 'Opera su sucursal y valida ajustes' },
        { title: 'Dueno', subtitle: 'Ve toda la red y define reglas' },
      ],
    },
    sections: [
      {
        title: 'Crea los perfiles que tu negocio necesita. No los que el sistema te deja.',
        description:
          'Los perfiles se arman segun tu operacion real, no segun tres roles fijos que no reflejan como trabaja tu equipo.',
        links: [{ label: 'Ver Sucursales', href: '/producto/sucursales' }],
        visual: {
          kind: 'imageGrid',
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
        title: 'Permisos precisos: puedes ver el precio de costo, pero no modificarlo.',
        description:
          'La granularidad evita bloqueos innecesarios y tambien reduce errores o exposicion de informacion sensible.',
        links: [{ label: 'Ver Inventario', href: '/producto/inventario' }],
        reverse: true,
        visual: {
          kind: 'image',
          src: '/images/seguridad-permisos.png',
          alt: 'Matriz de permisos granulares con acciones habilitadas y restringidas por modulo',
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
        title: 'El encargado ve su sucursal. El dueno ve todo.',
        description:
          'Puedes modelar alcance por sucursal, rol y tipo de informacion para que cada persona trabaje con el contexto correcto.',
        links: [{ label: 'Ver Sucursales', href: '/producto/sucursales' }],
        reverse: true,
        visual: {
          kind: 'scope',
          items: [
            { title: 'Operador', subtitle: 'Solo su caja y su puesto' },
            { title: 'Encargado', subtitle: 'Solo su sucursal y su equipo' },
            { title: 'Dueno', subtitle: 'Vista total de la operacion' },
          ],
        },
      },
    ],
    finalBannerText: 'Control total sin volverte loco. Cada quien, lo suyo.',
    finalBannerCtaLabel: 'Proba gratis',
    finalBannerCtaHref: '/registro',
  },
];

export const productPagesBySlug = Object.fromEntries(
  productPages.map((page) => [page.slug, page]),
) as Record<string, ProductPage>;
