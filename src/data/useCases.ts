export type UseCaseLink = {
  name: string;
  href: string;
};

export type UseCaseFaq = {
  question: string;
  answer: string;
};

export type UseCaseEntry = {
  family: 'storefront' | 'replenishment' | 'validation';
  pageTitle: string;
  pageDescription: string;
  caseName: string;
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  heroNote: string;
  pains: string[];
  helps: { title: string; text: string }[];
  features: string[];
  workflows: { title: string; text: string }[];
  integrations?: UseCaseLink[];
  testimonialIds?: string[];
  faqs: UseCaseFaq[];
  ctaTitle: string;
  ctaText: string;
  noindex?: boolean;
};

export const useCases: Record<string, UseCaseEntry> = {
  ferreterias: {
    family: 'storefront',
    pageTitle: 'ERP para ferreterías | ZinkERP',
    pageDescription:
      'Gestioná ventas, stock, POS, facturación y sucursales de tu ferretería con ZinkERP, un ERP SaaS para comercios argentinos.',
    caseName: 'La operación de una ferretería',
    eyebrow: 'Ferreterías',
    heroTitle: 'ZinkERP para ferreterías',
    heroText:
      'Ordená ventas de mostrador, stock, precios, proveedores y facturación en una plataforma pensada para comercios argentinos.',
    heroNote:
      'Un caso fuerte para comercios con catálogo amplio, venta rápida y necesidad de ordenar la operación diaria sin sumar complejidad innecesaria.',
    pains: [
      'Muchos SKUs repartidos entre familias, medidas, marcas y proveedores.',
      'Dudas de stock en el mostrador cuando el cliente necesita una respuesta rápida.',
      'Ventas presenciales que no pueden esperar procesos administrativos lentos.',
      'Cambios de precios y márgenes que requieren orden para evitar errores.',
      'Reposición y seguimiento de proveedores con información dispersa.',
      'Necesidad de facturar dentro del mismo flujo operativo.',
      'Crecimiento a más de una sucursal con riesgo de perder visibilidad.',
    ],
    helps: [
      {
        title: 'Mostrador conectado con la operación',
        text: 'ZinkPOS ayuda a registrar la venta de mostrador dentro de una operación que también necesita stock, facturación y seguimiento comercial.',
      },
      {
        title: 'Stock y ventas en el mismo circuito',
        text: 'El equipo puede trabajar con información más ordenada sobre productos, movimientos y disponibilidad operativa.',
      },
      {
        title: 'Precios y productos con más contexto',
        text: 'Ayuda a ordenar productos y precios para que el equipo dependa menos de planillas, listas sueltas o memoria de mostrador.',
      },
      {
        title: 'Visibilidad para dueños y encargados',
        text: 'La operación queda en un mismo sistema para revisar ventas, stock, facturación y sucursales cuando aplica.',
      },
    ],
    features: [
      'Stock por producto',
      'ZinkPOS',
      'Ventas y comprobantes',
      'Precios y facturación',
      'Reportes comerciales',
      'Sucursales',
    ],
    workflows: [
      {
        title: 'Venta de mostrador',
        text: 'Cobrar en mostrador sin perder de vista stock, comprobante y registro de la venta.',
      },
      {
        title: 'Búsqueda de productos',
        text: 'Trabajar con un catálogo más ordenado para ubicar rápido el producto que pide el cliente.',
      },
      {
        title: 'Consulta de stock',
        text: 'Revisar disponibilidad antes de confirmar una venta y reducir respuestas basadas en memoria o recorridas manuales.',
      },
      {
        title: 'Actualización de precios',
        text: 'Tener precios más ordenados cuando cambian costos, márgenes o condiciones de compra.',
      },
      {
        title: 'Facturación',
        text: 'Resolver la facturación dentro de la misma operación, con una base alineada al contexto fiscal argentino.',
      },
      {
        title: 'Visibilidad por sucursal',
        text: 'Cuando hay más de un local, sumar una mirada central sobre ventas, stock y actividad de cada punto.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
      {
        name: 'WooCommerce',
        href: '/integraciones/woocommerce',
      },
    ],
    testimonialIds: ['martina-papelera-pilar'],
    faqs: [
      {
        question: '¿Sirve si tengo muchos productos?',
        answer:
          'Sí. Las ferreterías suelen tener catálogos amplios y ZinkERP ayuda a ordenar productos, stock, ventas y facturación dentro del mismo circuito operativo.',
      },
      {
        question: '¿Puedo usarlo para ventas de mostrador?',
        answer:
          'Sí. ZinkPOS está pensado para venta presencial y se integra con la operación del ERP.',
      },
      {
        question: '¿Ayuda a controlar stock?',
        answer:
          'Sí. ZinkERP incluye gestión de stock para trabajar con movimientos, disponibilidad y control operativo diario.',
      },
      {
        question: '¿Sirve para más de una sucursal?',
        answer:
          'Sí. ZinkERP soporta operaciones multi-sucursal y ayuda a tener visibilidad centralizada cuando el negocio crece.',
      },
      {
        question: '¿Puedo vender online también?',
        answer:
          'Si la ferretería trabaja con WooCommerce, la integración puede ayudar a conectar ecommerce con la gestión. El alcance puntual conviene revisarlo en demo.',
      },
      {
        question: '¿Es un sistema hecho solo para ferreterías?',
        answer:
          'No. ZinkERP resuelve patrones operativos comunes en comercios con catálogo, ventas, stock y facturación; ferreterías es uno de los casos donde ese encaje suele ser fuerte.',
      },
    ],
    ctaTitle: 'Ordená la operación diaria de tu ferretería',
    ctaText:
      'En una demo podemos revisar cómo ordenar venta de mostrador, consulta de stock, precios y facturación según la operación de tu ferretería.',
  },
  dieteticas: {
    family: 'storefront',
    pageTitle: 'ERP para dietéticas | ZinkERP',
    pageDescription:
      'Ordená ventas, stock, POS y facturación de tu dietética con ZinkERP, una base operativa para comercios argentinos con catálogo amplio.',
    caseName: 'La operación de una dietética',
    eyebrow: 'Dietéticas',
    heroTitle: 'ZinkERP para dietéticas',
    heroText:
      'Ordená ventas, stock y facturación de tu dietética con un ERP simple de operar y preparado para crecer con tu negocio.',
    heroNote:
      'Funciona especialmente bien cuando hay muchos productos, venta diaria y necesidad de sostener orden entre mostrador, catálogo y reposición.',
    pains: [
      'Muchos productos chicos, variantes y categorías para mantener organizados.',
      'Diferencias entre lo que hay en góndola y lo que figura disponible.',
      'Ventas presenciales que necesitan velocidad y menos pasos manuales.',
      'Cambios de precios o promociones con riesgo de errores si todo vive en planillas.',
      'Reposición de proveedores con información dispersa.',
      'Necesidad de facturar desde la misma operación diaria.',
    ],
    helps: [
      {
        title: 'POS y stock conectados',
        text: 'ZinkPOS ayuda a cobrar en mostrador sin separar la venta del stock y la facturación diaria.',
      },
      {
        title: 'Catálogo más ordenado',
        text: 'Ayuda a ordenar productos, categorías y precios cuando hay muchas referencias y venta diaria.',
      },
      {
        title: 'Control comercial en un solo sistema',
        text: 'Dueños y encargados pueden revisar ventas, stock y movimiento del negocio sin depender de planillas separadas.',
      },
      {
        title: 'Base lista para ecommerce cuando aplica',
        text: 'Si la cuenta usa WooCommerce y el flujo está validado, puede conectarse con la gestión.',
      },
    ],
    features: [
      'ZinkPOS',
      'Gestión de stock',
      'Gestión de ventas',
      'Facturación',
      'Catálogo de productos',
      'WooCommerce cuando aplica',
    ],
    workflows: [
      {
        title: 'Venta en mostrador',
        text: 'Cobrar en mostrador sin perder de vista disponibilidad, comprobante y registro de la venta.',
      },
      {
        title: 'Control de disponibilidad',
        text: 'Consultar stock antes de vender y reducir diferencias entre sistema y realidad.',
      },
      {
        title: 'Orden del catálogo',
        text: 'Mantener productos y categorías más ordenados cuando hay mucha variedad y cambios frecuentes.',
      },
      {
        title: 'Reposición',
        text: 'Usar rotación y disponibilidad para decidir mejor qué reponer y qué producto se está quedando corto.',
      },
      {
        title: 'Facturación',
        text: 'Resolver la facturación dentro de la misma operación, con una base alineada al contexto fiscal argentino.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'WooCommerce',
        href: '/integraciones/woocommerce',
      },
    ],
    testimonialIds: ['julieta-dieteticas-naturales', 'gustavo-dieteticas-naturales'],
    faqs: [
      {
        question: '¿Sirve si vendo muchos productos chicos?',
        answer:
          'Sí. ZinkERP puede encajar bien en operaciones con catálogo amplio y muchas ventas diarias, siempre que el valor principal esté en ordenar stock, ventas y facturación.',
      },
      {
        question: '¿Ayuda con la venta presencial?',
        answer:
          'Sí. ZinkPOS está pensado para mostrador y puede ayudar a que el cobro diario no quede separado del resto de la operación.',
      },
      {
        question: '¿Puedo conectar una tienda online?',
        answer:
          'Si la cuenta trabaja con WooCommerce y el flujo fue validado, la integración puede ayudar. Conviene revisar el alcance puntual en demo.',
      },
      {
        question: '¿Incluye manejo de vencimientos o lotes?',
        answer:
          'No lo damos por hecho. Ese tipo de necesidad hay que validarla según el negocio antes de prometer encaje.',
      },
      {
        question: '¿Es una solución hecha solo para dietéticas?',
        answer:
          'No. Es una base operativa para comercios argentinos, y dietéticas es un segmento donde varios de esos patrones aparecen con fuerza.',
      },
    ],
    ctaTitle: 'Veamos si ZinkERP encaja en tu dietética',
    ctaText:
      'En una demo podemos revisar mostrador, disponibilidad, catálogo y facturación para entender cómo ordenar mejor la operación diaria de tu dietética.',
  },
  'articulos-de-limpieza': {
    family: 'replenishment',
    pageTitle: 'ERP para artículos de limpieza | ZinkERP',
    pageDescription:
      'Gestioná ventas, stock, facturación y reposición en negocios de artículos de limpieza con ZinkERP.',
    caseName: 'La operación de un negocio de artículos de limpieza',
    eyebrow: 'Artículos de limpieza',
    heroTitle: 'ZinkERP para artículos de limpieza',
    heroText:
      'Controlá ventas, stock y facturación de tu negocio de artículos de limpieza con una herramienta local para operar mejor todos los días.',
    heroNote:
      'Encaja bien en operaciones con variedad de presentaciones, reposición frecuente y mezcla de venta minorista o comercial.',
    pains: [
      'Variedad de productos y presentaciones con distinta rotación y margen.',
      'Reposición frecuente que exige visibilidad de stock para no vender a ciegas.',
      'Ventas a consumidor final y también a empresas o clientes habituales.',
      'Cambios de precios y proveedores que pueden desordenar la operación.',
      'Necesidad de facturar dentro del mismo flujo comercial.',
      'Sucursales o depósitos que agregan complejidad cuando el negocio crece.',
    ],
    helps: [
      {
        title: 'Ventas, stock y facturación en una misma base',
        text: 'Ayuda a que venta diaria, stock y facturación no queden repartidos entre sistemas o planillas distintas.',
      },
      {
        title: 'Más contexto para reposición',
        text: 'Permite mirar mejor qué productos se mueven, cuáles faltan y dónde conviene reponer primero.',
      },
      {
        title: 'Mejor control diario',
        text: 'Sirve para vender, consultar disponibilidad y sostener el ritmo comercial con menos desorden operativo.',
      },
      {
        title: 'Acompaña crecimiento operativo',
        text: 'Si hay más de una sucursal o depósito, ZinkERP puede sumar visibilidad centralizada cuando aplica.',
      },
    ],
    features: [
      'Gestión de stock',
      'Gestión de ventas',
      'ZinkPOS',
      'Facturación',
      'Operación multi-sucursal',
      'Reportes',
    ],
    workflows: [
      {
        title: 'Venta diaria',
        text: 'Cobrar venta minorista o comercial sin perder de vista stock, comprobante y registro de la operación.',
      },
      {
        title: 'Consulta de disponibilidad',
        text: 'Saber si hay producto antes de comprometer una venta o un pedido comercial.',
      },
      {
        title: 'Reposición por proveedor',
        text: 'Revisar faltantes y compras con más orden cuando cambian precios, proveedores o presentaciones.',
      },
      {
        title: 'Facturación a distintos tipos de cliente',
        text: 'Resolver la facturación sin sacar la operación del mismo circuito comercial.',
      },
      {
        title: 'Control por sucursal o depósito',
        text: 'Seguir dónde está el stock cuando la operación se reparte entre sucursales o depósitos.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    testimonialIds: ['antonella-limpieza-blue', 'miguel-alberto-quimica'],
    faqs: [
      {
        question: '¿Sirve para venta minorista y también comercial?',
        answer:
          'Puede encajar en ambos casos cuando la necesidad principal es ordenar ventas, stock y facturación. El alcance puntual conviene revisarlo en demo.',
      },
      {
        question: '¿Ayuda con la reposición?',
        answer:
          'Sí. ZinkERP aporta visibilidad operativa para comprar con más contexto y menos dependencia de memoria o planillas sueltas.',
      },
      {
        question: '¿Funciona con más de una sucursal?',
        answer:
          'Si la operación requiere visibilidad multi-sucursal, ZinkERP puede acompañar ese crecimiento.',
      },
      {
        question: '¿Incluye reglas especiales para productos químicos o peligrosos?',
        answer:
          'No lo prometemos de forma pública. Si ese punto es clave para tu negocio, hay que validarlo según el flujo real.',
      },
      {
        question: '¿Es solo para artículos de limpieza?',
        answer:
          'No. Es una base operativa para comercios argentinos, y este rubro es uno de los patrones donde ZinkERP puede aportar orden con fuerza.',
      },
    ],
    ctaTitle: 'Ordená stock y ventas en tu negocio de artículos de limpieza',
    ctaText:
      'Podemos revisar venta diaria, reposición, disponibilidad y facturación para ver dónde ZinkERP puede ordenar mejor tu operación.',
  },
  papeleras: {
    family: 'storefront',
    pageTitle: 'ERP para papeleras y librerías comerciales | ZinkERP',
    pageDescription:
      'Gestioná catálogo, stock, ventas y facturación de papeleras y librerías comerciales con ZinkERP.',
    caseName: 'La operación de una papelera o librería comercial',
    eyebrow: 'Papeleras y librerías comerciales',
    heroTitle: 'ZinkERP para papeleras y librerías comerciales',
    heroText:
      'Gestioná tu papelera con ventas, stock y facturación conectados en un solo sistema.',
    heroNote:
      'Es un caso fuerte cuando hay catálogo grande, temporadas marcadas y necesidad de sostener orden entre mostrador, stock y clientes de distinto perfil.',
    pains: [
      'Catálogo amplio con muchas variantes y productos estacionales.',
      'Picos de demanda en campañas o fechas donde el mostrador no puede frenarse.',
      'Consultas frecuentes de stock y disponibilidad.',
      'Reposición de proveedores con información repartida.',
      'Ventas a consumidor final y a organizaciones desde una misma base.',
      'Necesidad de facturar sin sacar la operación del sistema.',
    ],
    helps: [
      {
        title: 'Mostrador y stock desde la misma base',
        text: 'ZinkPOS y la gestión de stock ayudan a sostener ritmo de mostrador sin perder de vista disponibilidad y facturación.',
      },
      {
        title: 'Más claridad sobre disponibilidad',
        text: 'Permite ubicar productos y responder stock con más seguridad cuando el cliente necesita resolver rápido.',
      },
      {
        title: 'Base común para campañas fuertes',
        text: 'Cuando llegan campañas o fechas fuertes, ayuda a ordenar catálogo, stock y venta para trabajar con menos fricción.',
      },
      {
        title: 'Visibilidad para dueños y encargados',
        text: 'Dueños y encargados pueden seguir ventas, stock y movimiento comercial con una mirada más ordenada.',
      },
    ],
    features: [
      'ZinkPOS',
      'Gestión de stock',
      'Gestión de ventas',
      'Facturación',
      'Catálogo amplio',
      'Operación multi-sucursal',
    ],
    workflows: [
      {
        title: 'Venta de mostrador',
        text: 'Sostener ritmo de atención y cobro sin separar la venta del resto de la operación.',
      },
      {
        title: 'Búsqueda de productos',
        text: 'Trabajar con un catálogo más ordenado para encontrar rápidamente lo que pide el cliente.',
      },
      {
        title: 'Preparación de temporadas',
        text: 'Preparar campañas fuertes con mejor seguimiento de stock, precios y productos de mayor salida.',
      },
      {
        title: 'Facturación a consumidores y organizaciones',
        text: 'Mantener el paso fiscal dentro del mismo sistema, según el circuito comercial del negocio.',
      },
      {
        title: 'Reposición',
        text: 'Reponer con mejor criterio según disponibilidad, rotación y fechas de mayor demanda.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    testimonialIds: ['martina-papelera-pilar', 'mariela-papelera-pilar'],
    faqs: [
      {
        question: '¿Sirve si tengo muchos productos y temporadas fuertes?',
        answer:
          'Sí. Ese es uno de los patrones donde ZinkERP suele aportar más orden, sobre todo cuando venta, stock y facturación necesitan trabajar juntos.',
      },
      {
        question: '¿Puedo usarlo para ventas rápidas en mostrador?',
        answer:
          'Sí. ZinkPOS acompaña la venta presencial y la mantiene conectada con la operación del ERP.',
      },
      {
        question: '¿Ayuda a vender a empresas o instituciones?',
        answer:
          'Puede ayudar cuando la necesidad principal es ordenar catálogo, ventas y facturación en una misma base. El detalle del circuito comercial conviene verlo en demo.',
      },
      {
        question: '¿Incluye automatización especial para campañas escolares?',
        answer:
          'No lo prometemos como funcionalidad específica. Lo que sí ofrece ZinkERP es una base más ordenada para atravesar esas temporadas.',
      },
      {
        question: '¿Es un sistema vertical para papeleras?',
        answer:
          'No. Es una plataforma pensada para patrones operativos de comercios argentinos, y papeleras es uno de los segmentos donde ese encaje puede ser muy claro.',
      },
    ],
    ctaTitle: 'Veamos tu caso de papelera o librería comercial',
    ctaText:
      'En una demo podemos revisar catálogo, mostrador, temporadas, stock y facturación para ver cómo ordenar mejor la operación diaria de tu negocio.',
  },
  'insumos-de-reposteria': {
    family: 'replenishment',
    pageTitle: 'ERP para insumos de repostería | ZinkERP',
    pageDescription:
      'Ordená ventas, stock, POS y facturación de tu negocio de insumos de repostería con ZinkERP.',
    caseName: 'La operación de un negocio de insumos de repostería',
    eyebrow: 'Insumos de repostería',
    heroTitle: 'ZinkERP para insumos de repostería',
    heroText:
      'Ordená ventas, stock y facturación de tu negocio de insumos de repostería desde una plataforma local.',
    heroNote:
      'Es un caso interesante cuando hay mucha variedad, artículos chicos, picos de demanda y necesidad de combinar mostrador con mejor control comercial.',
    pains: [
      'Muchos productos, variantes y artículos chicos que complican el control diario.',
      'Picos estacionales de demanda que exigen más orden en stock y venta.',
      'Cambios de precios con impacto rápido en margen y mostrador.',
      'Necesidad de identificar que rota y que queda inmovilizado.',
      'Ventas minoristas y, en algunos casos, comerciales o por encargo.',
      'Facturación y reposición que no conviene resolver por fuera del sistema.',
    ],
    helps: [
      {
        title: 'POS, stock y ventas conectados',
        text: 'Ayuda a vender en mostrador sin separar la venta de la disponibilidad y la facturación diaria.',
      },
      {
        title: 'Catálogo con más orden',
        text: 'Permite ordenar productos, categorías y variantes cuando el local trabaja con muchas referencias chicas.',
      },
      {
        title: 'Mejor visibilidad para decidir compras',
        text: 'Sirve para mirar mejor que rota, que falta y que conviene reponer antes de las fechas fuertes.',
      },
      {
        title: 'Base lista para ecommerce cuando aplica',
        text: 'Si el negocio vende online con WooCommerce y el flujo fue validado, la integración puede sumar.',
      },
    ],
    features: [
      'ZinkPOS',
      'Gestión de stock',
      'Gestión de ventas',
      'Facturación',
      'Catálogo de productos',
      'WooCommerce cuando aplica',
    ],
    workflows: [
      {
        title: 'Venta diaria',
        text: 'Cobrar en mostrador sin perder de vista stock, comprobante y registro de la venta.',
      },
      {
        title: 'Control de productos de alta rotación',
        text: 'Seguir disponibilidad de los productos que más salen para reponer antes de quedarse cortos.',
      },
      {
        title: 'Orden del catálogo',
        text: 'Trabajar con un catálogo más claro cuando hay muchas referencias y variantes.',
      },
      {
        title: 'Temporadas y picos de demanda',
        text: 'Atravesar fechas fuertes con mejor seguimiento de stock, precios y movimiento comercial.',
      },
      {
        title: 'Facturación',
        text: 'Resolver la facturación dentro de la misma operación, con una base alineada al contexto fiscal argentino.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'WooCommerce',
        href: '/integraciones/woocommerce',
      },
    ],
    testimonialIds: [
      'martina-papelera-pilar',
      'mariela-papelera-pilar',
      'julieta-dieteticas-naturales',
    ],
    faqs: [
      {
        question: '¿Sirve para negocios con muchos productos chicos?',
        answer:
          'Sí. Ese tipo de complejidad comercial puede encajar bien cuando el objetivo principal es ordenar catálogo, stock, ventas y facturación.',
      },
      {
        question: '¿Puedo usarlo si vendo online?',
        answer:
          'Si trabajás con WooCommerce y el flujo está validado, la integración puede ayudar a conectar ecommerce con gestión.',
      },
      {
        question: '¿Ayuda en temporadas fuertes?',
        answer:
          'Sí. No reemplaza la planificación del negocio, pero una base operativa más ordenada ayuda mucho cuando sube la demanda.',
      },
      {
        question: '¿Incluye recetas, producción o vencimientos?',
        answer:
          'No lo prometemos de forma general. Esos puntos hay que validarlos según el caso antes de afirmar alcance.',
      },
      {
        question: '¿Es solo para repostería?',
        answer:
          'No. Es un caso de uso dentro de un producto pensado para comercios que necesitan ordenar operación diaria, stock y facturación.',
      },
    ],
    ctaTitle: 'Revisemos el encaje de ZinkERP para tu negocio',
    ctaText:
      'Podemos revisar mostrador, productos de alta rotación, temporadas y facturación para ver cómo ordenar mejor la operación de tu local.',
  },
  florerias: {
    family: 'validation',
    noindex: true,
    pageTitle: 'ERP para florerías | ZinkERP',
    pageDescription:
      'Ordená ventas, stock y facturación de tu florería con ZinkERP, una base operativa para negocios con pedidos y atención por múltiples canales.',
    caseName: 'La operación de una florería',
    eyebrow: 'Florerías',
    heroTitle: 'ZinkERP para florerías',
    heroText:
      'Gestioná ventas, stock y facturación de tu florería con una plataforma simple para ordenar la operación diaria.',
    heroNote:
      'Ya hay experiencia real en operaciones con esta dinámica, sobre todo cuando el negocio necesita ordenar pedidos, ventas y facturación sin prometer procesos específicos del rubro que deban validarse aparte.',
    pains: [
      'Disponibilidad que cambia rápido y puede ser difícil de sostener en el sistema.',
      'Ventas por mostrador, teléfono o canales online que necesitan más orden común.',
      'Picos de demanda en fechas especiales con más presión operativa.',
      'Seguimiento de pedidos y coordinación comercial dispersos en mensajes o planillas.',
      'Necesidad de facturar dentro del mismo circuito diario.',
      'Operación que mezcla productos, arreglos y atención personalizada.',
    ],
    helps: [
      {
        title: 'Base para la operación comercial',
        text: 'ZinkERP puede ayudar a ordenar ventas, stock y facturación cuando la operación comercial hoy se sigue entre mensajes, planillas y mostrador.',
      },
      {
        title: 'Más orden entre canales',
        text: 'Cuando un pedido entra por mostrador, teléfono o canales online, ayuda a que la información comercial no quede repartida.',
      },
      {
        title: 'Soporte para ecommerce cuando aplica',
        text: 'Si la tienda trabaja con WooCommerce y el flujo fue validado, puede sumarse a la gestión.',
      },
      {
        title: 'Visibilidad para dueños y encargados',
        text: 'Permite seguir ventas y actividad diaria con más orden sobre la parte comercial del negocio.',
      },
    ],
    features: [
      'Gestión de ventas',
      'ZinkPOS',
      'Gestión de stock',
      'Facturación',
      'WooCommerce cuando aplica',
      'Reportes',
    ],
    workflows: [
      {
        title: 'Venta por mostrador o pedido',
        text: 'Registrar ventas y pedidos desde un mismo circuito comercial, aunque el contacto llegue por distintos canales.',
      },
      {
        title: 'Consulta de disponibilidad',
        text: 'Revisar disponibilidad antes de confirmar un pedido o comprometer una entrega con el cliente.',
      },
      {
        title: 'Facturación',
        text: 'Resolver la facturación dentro de la misma operación comercial, sin prometer flujos especiales del rubro.',
      },
      {
        title: 'Orden comercial en fechas pico',
        text: 'Atravesar fechas fuertes con más orden sobre pedidos, ventas y actividad comercial.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'WooCommerce',
        href: '/integraciones/woocommerce',
      },
    ],
    faqs: [
      {
        question: '¿Sirve para una florería?',
        answer:
          'Sí, especialmente cuando la necesidad principal es ordenar ventas, stock y facturación. El alcance puntual depende de qué tan particular sea el flujo del negocio.',
      },
      {
        question: '¿Ayuda con pedidos por distintos canales?',
        answer:
          'Puede ayudar a centralizar la operación comercial, aunque el detalle del circuito conviene revisarlo en demo.',
      },
      {
        question: '¿Incluye logística de delivery?',
        answer:
          'No lo prometemos de forma pública. Si delivery es una parte central del negocio, hay que validarlo específicamente.',
      },
      {
        question: '¿Maneja reglas especiales para productos perecederos?',
        answer:
          'No asumimos ese alcance. Lo que sí puede aportar es orden operativo general sobre ventas, stock y facturación.',
      },
      {
        question: '¿Entonces por qué publicarlo?',
        answer:
          'Porque ya hay experiencia real en operaciones con dinámicas similares. Lo mostramos con prudencia para revisar cada flujo sin prometer procesos específicos que no correspondan.',
      },
    ],
    ctaTitle: 'Revisemos juntos el flujo real de tu florería',
    ctaText:
      'En una demo podemos revisar cómo toman pedidos, cómo manejan disponibilidad y hasta dónde ZinkERP puede ordenar la parte comercial con prudencia.',
  },
  'zingueria-metalurgica': {
    family: 'validation',
    noindex: true,
    pageTitle: 'ERP para zinguería y metalúrgica | ZinkERP',
    pageDescription:
      'Ordená ventas, materiales, stock y facturación en negocios de zinguería o metalúrgica con ZinkERP.',
    caseName: 'La operación de una zinguería o metalúrgica',
    eyebrow: 'Zinguería y metalúrgica',
    heroTitle: 'ZinkERP para zinguería y metalúrgica',
    heroText:
      'Ordená ventas, materiales, facturación y seguimiento comercial en negocios donde la operación no termina en una venta de mostrador.',
    heroNote:
      'Ya hay experiencia real en operaciones con esta dinámica, sobre todo en la parte comercial y administrativa. El alcance sobre procesos industriales se valida según el flujo de cada negocio.',
    pains: [
      'Ventas que combinan materiales, mano de obra y seguimiento comercial.',
      'Pedidos más complejos que un ticket minorista tradicional.',
      'Necesidad de entender costos, materiales y requerimientos del cliente.',
      'Presupuestos manuales que pueden generar inconsistencias.',
      'Operación personalizada que pierde visibilidad cuando todo queda repartido.',
      'Facturación y seguimiento que no conviene manejar en sistemas separados.',
    ],
    helps: [
      {
        title: 'Base común para ventas y clientes',
        text: 'ZinkERP puede ayudar a ordenar ventas, clientes y facturación cuando la operación comercial ya no entra en planillas o seguimiento manual.',
      },
      {
        title: 'Control sobre materiales y stock',
        text: 'Cuando hay materiales o productos involucrados, la gestión de stock puede dar más orden sobre disponibilidad y movimiento.',
      },
      {
        title: 'Más visibilidad administrativa',
        text: 'Dueños y encargados pueden seguir ventas, clientes y facturación con más orden administrativo.',
      },
      {
        title: 'Encaje honesto para flujos mixtos',
        text: 'Es una base operativa útil cuando el negocio necesita ordenar la parte comercial sin asumir manufactura avanzada.',
      },
    ],
    features: [
      'Gestión de ventas',
      'Gestión de stock',
      'Facturación',
      'Clientes',
      'Reportes',
      'Seguimiento comercial',
    ],
    workflows: [
      {
        title: 'Ingreso de ventas y pedidos',
        text: 'Registrar ventas y pedidos cuando el trabajo comercial sigue abierto más allá de una venta rápida de mostrador.',
      },
      {
        title: 'Control de materiales',
        text: 'Tener mejor seguimiento de materiales o insumos cuando forman parte de la venta o del pedido.',
      },
      {
        title: 'Facturación',
        text: 'Resolver la facturación dentro del mismo circuito comercial, sin prometer procesos industriales no validados.',
      },
      {
        title: 'Seguimiento comercial',
        text: 'Ordenar consultas, pedidos o presupuestos cuando cada venta necesita más seguimiento que un ticket simple.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    faqs: [
      {
        question: '¿Sirve para negocios con productos y mano de obra?',
        answer:
          'Puede servir para ordenar ventas, materiales, clientes y facturación. El alcance sobre procesos más complejos debe validarse en demo.',
      },
      {
        question: '¿Reemplaza un sistema de producción o manufactura?',
        answer:
          'No es lo que prometemos. ZinkERP puede encajar como base comercial y administrativa, pero no afirmamos soporte de manufactura avanzada sin validación.',
      },
      {
        question: '¿Ayuda con presupuestos?',
        answer:
          'Puede ayudar a ordenar la información comercial alrededor de presupuestos o pedidos, aunque el flujo exacto hay que revisarlo según el negocio.',
      },
      {
        question: '¿Entonces para quién encaja mejor?',
        answer:
          'Para negocios donde el problema principal hoy es el desorden entre ventas, materiales, clientes y facturación, más que la gestión industrial en sí misma.',
      },
    ],
    ctaTitle: 'Validemos el alcance para tu operación',
    ctaText:
      'Podemos revisar ventas, materiales, pedidos y facturación para ver hasta dónde ZinkERP puede ordenar la parte comercial y administrativa de tu operación.',
  },
  cultivos: {
    family: 'validation',
    noindex: true,
    pageTitle: 'ERP para negocios vinculados a cultivos | ZinkERP',
    pageDescription:
      'Organizá ventas, stock, compras, facturación y control operativo en negocios vinculados a cultivos con ZinkERP.',
    caseName: 'La operación de negocios vinculados a cultivos',
    eyebrow: 'Cultivos',
    heroTitle: 'ZinkERP para operaciones vinculadas a cultivos',
    heroText:
      'Ordená ventas, stock, compras y facturación en negocios donde la operación vinculada a cultivos necesita más control comercial y administrativo.',
    heroNote:
      'Ya hay experiencia en operaciones vinculadas a cultivos donde ZinkERP aporta orden comercial y administrativo, sin asumir funciones agronómicas o productivas específicas.',
    pains: [
      'Información comercial y administrativa repartida entre planillas, mensajes y memoria del equipo.',
      'Necesidad de controlar stock, compras o insumos con más visibilidad.',
      'Ventas y facturación que no conviene resolver por fuera del mismo sistema.',
      'Operaciones con sucursales, depósitos o puntos de atención que necesitan visibilidad coordinada.',
      'Seguimiento de clientes, precios y movimientos con poco contexto consolidado.',
      'Crecimiento del negocio sin una plataforma única para ordenar el día a día.',
    ],
    helps: [
      {
        title: 'Base para la operación comercial',
        text: 'ZinkERP puede ayudar a ordenar ventas, stock y facturación cuando la operación comercial hoy se sigue entre planillas, mensajes y control manual.',
      },
      {
        title: 'Más orden sobre insumos y movimientos',
        text: 'Cuando hay productos o insumos involucrados, la gestión de stock puede dar más orden sobre disponibilidad y movimientos.',
      },
      {
        title: 'Mejor contexto para decisiones del negocio',
        text: 'Dueños y encargados pueden seguir ventas, compras y actividad administrativa con una mirada más ordenada.',
      },
      {
        title: 'Encaje evaluado con criterio',
        text: 'Encaja especialmente cuando la prioridad está en ventas, stock y administración, revisando aparte cualquier necesidad técnica específica del agro.',
      },
    ],
    features: [
      'Ventas y clientes',
      'Stock e insumos',
      'Compras y abastecimiento',
      'Facturación',
      'Sucursales',
      'Control administrativo',
    ],
    workflows: [
      {
        title: 'Venta y registro comercial',
        text: 'Registrar ventas y actividad comercial en un mismo circuito cuando el negocio ya superó el seguimiento manual.',
      },
      {
        title: 'Control de stock o insumos',
        text: 'Seguir disponibilidad y movimientos cuando el negocio trabaja con stock, insumos o más de un punto operativo.',
      },
      {
        title: 'Compras y reposición',
        text: 'Tener mejor orden para revisar faltantes y necesidades de compra o abastecimiento.',
      },
      {
        title: 'Facturación',
        text: 'Resolver la facturación dentro del mismo circuito comercial, sin asumir funciones productivas específicas.',
      },
      {
        title: 'Seguimiento multi-sucursal',
        text: 'Cuando hay más de un punto operativo, sumar visibilidad sobre ventas, stock y actividad diaria.',
      },
    ],
    integrations: [
      {
        name: 'ARCA',
        href: '/integraciones/arca',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    faqs: [
      {
        question: '¿ZinkERP está pensado para cultivos?',
        answer:
          'No como vertical exclusivo. Sí puede aportar una base operativa para la parte comercial, de stock y facturación en negocios vinculados a cultivos.',
      },
      {
        question: '¿Entonces por qué lo muestran como caso?',
        answer:
          'Porque ya hay experiencia real en operaciones de este segmento donde ZinkERP aporta valor en la parte comercial y administrativa. Igual, validamos cada flujo antes de prometer alcance total.',
      },
      {
        question: '¿Incluye gestión agronómica o productiva específica?',
        answer:
          'No lo afirmamos de forma pública. Si tu operación depende de procesos técnicos propios del agro, ese punto debe revisarse en demo.',
      },
      {
        question: '¿Sirve si tengo stock, compras y más de una sucursal?',
        answer:
          'Puede ser un buen encaje si el problema principal es ordenar ventas, stock, facturación y visibilidad operativa.',
      },
    ],
    ctaTitle: 'Validemos el caso de tu operación vinculada a cultivos',
    ctaText:
      'En una demo podemos revisar ventas, stock, compras y sucursales para confirmar con honestidad hasta dónde ZinkERP puede ordenar la parte comercial y administrativa.',
  },
};
