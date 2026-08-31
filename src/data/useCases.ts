export type UseCaseLink = {
  name: string;
  href: string;
};

export type UseCaseFaq = {
  question: string;
  answer: string;
};

export type UseCaseProblem = {
  title: string;
  text: string;
};

export type UseCaseFlowStep = {
  title: string;
  action: string;
  module: string;
  moduleHref?: string;
  result: string;
  impact?: string;
};

export type UseCaseModule = {
  name: string;
  purpose: string;
  href: string;
};

export type UseCaseDifferential = {
  title: string;
  text: string;
};

export type UseCaseExperience = {
  kind: 'named' | 'anonymized';
  title: string;
  business?: string;
  problem: string;
  flow: string;
  result: string;
  complexity?: string;
};

export type UseCaseDemoMedia = {
  kind: 'placeholder';
  label: string;
  href?: string;
};

export type UseCaseEntry = {
  slug: string;
  family: 'storefront' | 'replenishment' | 'validation';
  pageTitle: string;
  pageDescription: string;
  caseName: string;
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  audience: string;
  result: string;
  problems: UseCaseProblem[];
  flowSteps: UseCaseFlowStep[];
  modules: UseCaseModule[];
  differentials: UseCaseDifferential[];
  experience?: UseCaseExperience;
  demoMedia?: UseCaseDemoMedia;
  integrations?: UseCaseLink[];
  relatedDocs?: UseCaseLink[];
  testimonialIds?: string[];
  faqs: UseCaseFaq[];
  ctaTitle: string;
  ctaText: string;
  whatsappMessage: string;
  formProblems: string[];
  noindex?: boolean;
};

const sharedDifferentials: UseCaseDifferential[] = [
  {
    title: 'Cotización → presupuesto → pedido → venta',
    text: 'El circuito comercial queda encadenado. No tenés que reescribir el mismo pedido en otro sistema para cobrar o facturar.',
  },
  {
    title: 'Orden de compra → compra → stock',
    text: 'La reposición parte de una orden registrada. Cuando recibís mercadería, el ingreso queda vinculado al stock.',
  },
  {
    title: 'Stock y cuenta corriente conectados',
    text: 'Una venta o una compra no queda suelta: impacta disponibilidad, saldo del cliente y movimiento de caja cuando corresponde.',
  },
  {
    title: 'Precios a partir de costos',
    text: 'Cuando cambia el costo, podés actualizar precios desde esa base. Si operás con costos en ARS y USD, el circuito lo contempla.',
  },
  {
    title: 'Permisos por pantalla y acción',
    text: 'Cajero, encargado y dueño no ven lo mismo. Cada perfil habilita o restringe lo que se puede ver y modificar.',
  },
  {
    title: 'Multi-sucursal con control local',
    text: 'Cada sede opera su stock, su caja y sus ventas. La central ve la red sin pedir planillas por WhatsApp.',
  },
];

const sharedModules = {
  ventas: {
    name: 'Ventas / POS',
    purpose: 'Cobrar, facturar y registrar la venta sin sacarla del circuito operativo.',
    href: '/producto/ventas-y-pos',
  },
  productos: {
    name: 'Productos',
    purpose: 'Mantener catálogo, códigos, variantes y precios vigentes.',
    href: '/producto/inventario',
  },
  compras: {
    name: 'Compras',
    purpose: 'Ordenar abastecimiento con órdenes de compra y recepción.',
    href: '/producto/compras',
  },
  stock: {
    name: 'Stock',
    purpose: 'Saber qué hay, dónde está y qué hay que reponer.',
    href: '/producto/inventario',
  },
  cuentaCorriente: {
    name: 'Cuenta corriente',
    purpose: 'Controlar saldos, vencimientos y movimientos de cada cliente.',
    href: '/producto/finanzas',
  },
  caja: {
    name: 'Caja',
    purpose: 'Revisar ingresos, egresos y el cierre de cada operador.',
    href: '/producto/finanzas',
  },
  informes: {
    name: 'Informes',
    purpose: 'Mirar ventas, cobros pendientes y movimiento del negocio para decidir.',
    href: '/producto/reportes',
  },
} as const;

export const useCases: Record<string, UseCaseEntry> = {
  ferreterias: {
    slug: 'ferreterias',
    family: 'storefront',
    pageTitle: 'ERP para ferreterías: stock, cotizaciones y cuenta corriente | ZinkERP',
    pageDescription:
      'Sistema para ferreterías argentinas: cotización, presupuesto, stock, compras, venta de mostrador y cuenta corriente en un solo circuito. Pedí una demo.',
    caseName: 'una ferretería',
    eyebrow: 'Ferreterías',
    heroTitle: 'Ferretería con stock real, cotizaciones que se convierten y cuenta corriente al día',
    heroText:
      'Para ferreterías que venden de mostrador, cotizan a obra y ya no pueden sostener precios, stock y saldos en Excel o en un POS suelto.',
    audience: 'Ferreterías y corralones chicos, en especial de 2 a 4 sucursales.',
    result: 'El mostrador responde con stock real, el presupuesto pasa a pedido y la cuenta corriente queda registrada.',
    problems: [
      {
        title: 'Stock que no coincide con la góndola',
        text: 'El cliente pregunta si hay un tornillo, un caño o una herramienta y la respuesta depende de ir a buscarlo o de la memoria del que está en el mostrador.',
      },
      {
        title: 'Precios que cambian todo el tiempo',
        text: 'Cada lista de proveedor mueve costos. Si el precio de venta no se actualiza desde el costo, se vende mal o se pierde margen.',
      },
      {
        title: 'Cotizaciones que no se convierten',
        text: 'El presupuesto se arma en un Word, un PDF o un cuaderno. Después hay que cargarlo de nuevo para vender, comprar o facturar.',
      },
      {
        title: 'Cuentas corrientes sin seguimiento',
        text: 'Obras, pintores y clientes habituales compran a cuenta. El saldo vive en una planilla aparte y se pierde el control.',
      },
      {
        title: 'Poca visibilidad entre sucursales',
        text: 'Un local tiene stock y el otro no. Transferir o comprar se decide por WhatsApp, no por disponibilidad real.',
      },
    ],
    flowSteps: [
      {
        title: 'Cotización',
        action: 'El vendedor arma la consulta con productos, medidas y precios vigentes.',
        module: 'Ventas',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La necesidad del cliente queda registrada, no en un papel suelto.',
      },
      {
        title: 'Presupuesto',
        action: 'Se formaliza la oferta con lista de precios y condiciones.',
        module: 'Ventas',
        moduleHref: '/producto/ventas-y-pos',
        result: 'El cliente recibe un presupuesto que el sistema ya conoce.',
      },
      {
        title: 'Pedido',
        action: 'Si acepta, el presupuesto pasa a pedido sin recargar ítems.',
        module: 'Ventas',
        moduleHref: '/producto/ventas-y-pos',
        result: 'Queda un compromiso comercial listo para abastecer o entregar.',
        impact: 'Stock y cuenta corriente quedan preparados para el siguiente paso.',
      },
      {
        title: 'Compra / recepción',
        action: 'Si falta mercadería, se emite la orden de compra y se recibe el ingreso.',
        module: 'Compras',
        moduleHref: '/producto/compras',
        result: 'El abastecimiento queda vinculado al pedido y al stock.',
        impact: 'El stock de la sucursal se actualiza al recibir.',
      },
      {
        title: 'Venta',
        action: 'Se cobra en mostrador o se cierra la venta del pedido.',
        module: 'Ventas / POS',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La venta descuenta stock de la sucursal y deja el comprobante listo.',
        impact: 'Impacta stock y, si corresponde, caja.',
      },
      {
        title: 'Cuenta corriente',
        action: 'Si el cliente compra a cuenta, el movimiento queda en su saldo.',
        module: 'Finanzas',
        moduleHref: '/producto/finanzas',
        result: 'Se ve quién debe, cuánto y desde cuándo.',
        impact: 'Cuenta corriente y caja quedan conectadas al mismo circuito.',
      },
    ],
    modules: [
      sharedModules.ventas,
      sharedModules.productos,
      sharedModules.compras,
      sharedModules.stock,
      sharedModules.cuentaCorriente,
      sharedModules.caja,
      sharedModules.informes,
    ],
    differentials: sharedDifferentials,
    experience: {
      kind: 'anonymized',
      title: 'Caso de uso: ferretería con más de una sede',
      problem:
        'El mostrador consultaba stock a ojo, los presupuestos se reescribían para vender y las cuentas de obra se seguían en planillas.',
      flow: 'Cotización → presupuesto → pedido → compra o venta → cuenta corriente.',
      result:
        'La operación comercial, el stock y los saldos pasan a un mismo circuito. No publicamos métricas de este caso.',
      complexity: 'Comercio con catálogo amplio y venta a mostrador más cuenta corriente.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá va a vivir el video o la captura del flujo cotización → venta de ferretería.',
      href: '/producto/ventas-y-pos',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'Mercado Pago', href: '/integraciones/mercadopago' },
    ],
    relatedDocs: [
      { name: 'Ventas y POS', href: '/producto/ventas-y-pos' },
      { name: 'Compras', href: '/producto/compras' },
      { name: 'Inventario', href: '/producto/inventario' },
      { name: 'Finanzas', href: '/producto/finanzas' },
    ],
    faqs: [
      {
        question: '¿Puedo manejar varias sucursales?',
        answer:
          'Sí. Cada sucursal opera su stock, su caja y sus ventas. Podés definir qué ve cada usuario y consolidar la red desde un solo lugar.',
      },
      {
        question: '¿Puedo convertir un presupuesto en pedido y venta?',
        answer:
          'Sí. El circuito arranca por cotización, presupuesto, pedido o venta directa. No hace falta recargar los productos para avanzar al siguiente paso.',
      },
      {
        question: '¿Puedo controlar la cuenta corriente de pintores y obras?',
        answer:
          'Sí. La cuenta corriente muestra saldo, antigüedad y último movimiento de cada cliente. La venta a cuenta queda vinculada a ese saldo.',
      },
      {
        question: '¿Puedo actualizar precios cuando cambia el costo del proveedor?',
        answer:
          'Sí. Los precios se pueden actualizar a partir del costo. Si el proveedor cotiza en ARS o USD, el costo se puede trabajar en esas monedas.',
      },
      {
        question: '¿Puedo emitir facturas ARCA?',
        answer:
          'Sí. La facturación electrónica con ARCA forma parte del flujo: Facturas A, B, C y M, más notas de crédito y débito, vinculadas a la venta.',
      },
      {
        question: '¿Puedo importar el catálogo desde Excel?',
        answer:
          'Sí. Se pueden importar productos para arrancar con el catálogo ordenado. En la puesta en marcha te ayudamos a cargar la base si los datos están a mano.',
      },
    ],
    ctaTitle: 'Veamos el flujo de tu ferretería',
    ctaText:
      'Contanos cuántas sedes tenés y cómo manejás hoy ventas, stock y compras. Te mostramos el flujo de ZinkERP para tu negocio.',
    whatsappMessage:
      'Hola, tengo una ferretería y quiero ver el flujo de ZinkERP: cotización, stock, compras y cuenta corriente.',
    formProblems: [
      'Stock desactualizado en el mostrador',
      'Precios que cambian todo el tiempo',
      'Presupuestos que no se convierten en ventas',
      'Cuentas corrientes sin control',
      'Poca visibilidad entre sucursales',
    ],
  },
  dieteticas: {
    slug: 'dieteticas',
    family: 'storefront',
    pageTitle: 'ERP para dietéticas: venta de mostrador, stock y facturación | ZinkERP',
    pageDescription:
      'Sistema para dietéticas: productos pesables, venta de mostrador, facturación ARCA, descuento de stock y caja en un mismo circuito. Pedí una demo.',
    caseName: 'una dietética',
    eyebrow: 'Dietéticas',
    heroTitle: 'Dietética con venta ágil, stock que se descuenta solo y caja cerrada el mismo día',
    heroText:
      'Para dietéticas que venden mucho y rápido, mezclan productos de góndola con pesables, y necesitan que la venta, la factura y el stock salgan del mismo paso.',
    audience: 'Dietéticas de 1 a 4 sucursales que ya superaron la balanza suelta y el Excel.',
    result: 'Cada venta factura, descuenta stock y deja la caja lista para el cierre del turno.',
    problems: [
      {
        title: 'Góndola y sistema no coinciden',
        text: 'Se vende lo que se ve, pero el stock del sistema quedó atrás. Reponer se decide por ojo, no por rotación.',
      },
      {
        title: 'Productos pesables y códigos que cambian',
        text: 'Granel, fiambres secos o códigos variables complican una venta rápida si hay que anotar peso y precio a mano.',
      },
      {
        title: 'Precios y listas que se desordenan',
        text: 'Promos, listas distintas y cambios de costo se resuelven en planillas. El mostrador cobra un precio y el dueño pensaba otro.',
      },
      {
        title: 'Caja y sucursales desconectadas',
        text: 'Cada local cierra como puede. Ver ventas, stock y caja de las tres sedes implica pedir capturas o esperar al final del día.',
      },
      {
        title: 'Facturación aparte de la venta',
        text: 'Cobrar es un paso y facturar es otro. Se pierde tiempo y aparecen diferencias entre lo vendido y lo fiscal.',
      },
    ],
    flowSteps: [
      {
        title: 'Producto pesable o código variable',
        action: 'Se identifica el producto por código, nombre o peso.',
        module: 'Productos / POS',
        moduleHref: '/producto/ventas-y-pos',
        result: 'El ítem entra a la venta con precio vigente, sin anotarlo afuera.',
      },
      {
        title: 'Venta',
        action: 'El mostrador cobra en POS con búsqueda rápida y medios de pago.',
        module: 'Ventas / POS',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La venta queda registrada en la sucursal que atendió.',
      },
      {
        title: 'Facturación',
        action: 'Se emite el comprobante ARCA desde la misma operación.',
        module: 'Facturación',
        moduleHref: '/producto/facturacion',
        result: 'La factura queda vinculada a la venta y al cliente.',
      },
      {
        title: 'Descuento de stock',
        action: 'El sistema descuenta el stock de esa sucursal al instante.',
        module: 'Stock',
        moduleHref: '/producto/inventario',
        result: 'Góndola y sistema vuelven a hablar el mismo idioma.',
        impact: 'El stock de la sede se actualiza con cada ticket.',
      },
      {
        title: 'Caja',
        action: 'El operador rinde su caja: ingresos, egresos y cierre.',
        module: 'Caja',
        moduleHref: '/producto/finanzas',
        result: 'El dueño o encargado ve el movimiento del turno sin armar una planilla.',
        impact: 'Caja y venta quedan conectadas.',
      },
    ],
    modules: [
      sharedModules.ventas,
      sharedModules.productos,
      sharedModules.compras,
      sharedModules.stock,
      sharedModules.caja,
      sharedModules.informes,
    ],
    differentials: sharedDifferentials,
    experience: {
      kind: 'named',
      title: 'Dietéticas Naturales',
      business: 'Dietéticas Naturales',
      problem: 'La operación de cada sucursal vivía en sistemas y controles separados.',
      flow: 'Venta de mostrador, stock y caja de 3 sucursales en un solo sistema.',
      result:
        'Hoy controlan ventas, stock y caja en tiempo real, sin importar desde qué sede se mira.',
      complexity: '3 sucursales.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá va a vivir el video o la captura del flujo pesable → venta → caja de dietética.',
      href: '/producto/ventas-y-pos',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'WooCommerce', href: '/integraciones/woocommerce' },
    ],
    relatedDocs: [
      { name: 'Ventas y POS', href: '/producto/ventas-y-pos' },
      { name: 'Inventario', href: '/producto/inventario' },
      { name: 'Facturación', href: '/producto/facturacion' },
      { name: 'Sucursales', href: '/producto/sucursales' },
    ],
    testimonialIds: ['julieta-dieteticas-naturales', 'gustavo-dieteticas-naturales'],
    faqs: [
      {
        question: '¿Puedo trabajar con productos pesables o código variable?',
        answer:
          'Sí. El flujo de mostrador contempla productos pesables o con código variable, para vender, facturar y descontar stock en el mismo circuito.',
      },
      {
        question: '¿Puedo manejar varias sucursales?',
        answer:
          'Sí. Cada sucursal descuenta su propio stock y rinde su caja. La central ve ventas, stock y caja de toda la red.',
      },
      {
        question: '¿Puedo emitir facturas ARCA desde el mostrador?',
        answer:
          'Sí. La factura se genera vinculada a la venta. Cubre Facturas A, B, C y M, más notas de crédito y débito.',
      },
      {
        question: '¿Puedo importar productos desde Excel?',
        answer:
          'Sí. Se pueden importar productos para ordenar el catálogo al inicio. Si los datos están a mano, la puesta en marcha es más rápida.',
      },
      {
        question: '¿Puedo usar listas de precios distintas?',
        answer:
          'Sí. Se definen listas por sucursal y por canal. Cada local opera con sus precios y vos ves todo consolidado.',
      },
      {
        question: '¿Incluye vencimientos o lotes?',
        answer:
          'Eso no lo damos por hecho en esta página. Si tu dietética depende de vencimientos, lo revisamos en la demo según tu flujo real.',
      },
    ],
    ctaTitle: 'Veamos el flujo de tu dietética',
    ctaText:
      'Contanos cuántas sedes tenés y cómo manejás hoy ventas, stock y compras. Te mostramos el flujo de ZinkERP para tu negocio.',
    whatsappMessage:
      'Hola, tengo una dietética y quiero ver el flujo de ZinkERP: mostrador, productos pesables, stock y caja.',
    formProblems: [
      'Stock que no coincide con la góndola',
      'Productos pesables o códigos variables',
      'Precios desordenados entre locales',
      'Caja y sucursales desconectadas',
      'Facturación aparte de la venta',
    ],
  },
  'articulos-de-limpieza': {
    slug: 'articulos-de-limpieza',
    family: 'replenishment',
    pageTitle: 'ERP para artículos de limpieza: compras, stock y reposición | ZinkERP',
    pageDescription:
      'Sistema para negocios de artículos de limpieza: compras, reposición, listas de precios, venta minorista o mayorista y cuenta corriente. Pedí una demo.',
    caseName: 'un negocio de artículos de limpieza',
    eyebrow: 'Artículos de limpieza',
    heroTitle: 'Limpieza con reposición a tiempo, precios al día y saldos de clientes controlados',
    heroText:
      'Para comercios de artículos de limpieza que reponen seguido, venden al público y a empresas, y necesitan ver stock, compras y cuenta corriente en el mismo sistema.',
    audience: 'Mayoristas y minoristas de limpieza, en especial con 2 a 4 sedes o depósitos.',
    result: 'Comprás con contexto, vendés sin adivinar stock y seguís la cuenta de cada cliente habitual.',
    problems: [
      {
        title: 'Reposición que se decide de memoria',
        text: 'Bidones, presentaciones y marcas rotan distinto. Si no hay stock crítico a la vista, se compra de más o se queda corto.',
      },
      {
        title: 'Presentaciones y precios que se mezclan',
        text: 'El mismo producto existe en 1 L, 5 L y 20 L, con listas distintas para mostrador y para empresa.',
      },
      {
        title: 'Compras difíciles de controlar',
        text: 'El proveedor manda por WhatsApp, la recepción se anota aparte y nadie sabe qué quedó pendiente.',
      },
      {
        title: 'Venta minorista y mayorista en circuitos distintos',
        text: 'El ticket de mostrador vive en un lado y la factura a empresa en otro. El stock no se entera de los dos.',
      },
      {
        title: 'Cuentas corrientes de clientes habituales',
        text: 'Condominios, empresas y revendedores compran a cuenta. El saldo se pierde entre facturas y mensajes.',
      },
    ],
    flowSteps: [
      {
        title: 'Catálogo y presentaciones',
        action: 'Se ordenan productos, presentaciones y códigos.',
        module: 'Productos',
        moduleHref: '/producto/inventario',
        result: 'Cada envase tiene su precio y su stock, no una fila ambigua en Excel.',
      },
      {
        title: 'Listas de precios',
        action: 'Se definen listas minorista, mayorista o por sucursal.',
        module: 'Productos',
        moduleHref: '/producto/inventario',
        result: 'El mostrador y el vendedor de calle usan el precio que corresponde.',
      },
      {
        title: 'Compra',
        action: 'Se arma la orden de compra según stock crítico y proveedor.',
        module: 'Compras',
        moduleHref: '/producto/compras',
        result: 'La reposición queda documentada, no en un chat.',
      },
      {
        title: 'Recepción',
        action: 'Se ingresa la mercadería y se actualiza el stock de la sede o depósito.',
        module: 'Compras / Stock',
        moduleHref: '/producto/compras',
        result: 'Lo recibido está disponible para vender.',
        impact: 'El stock sube al confirmar la recepción.',
      },
      {
        title: 'Venta',
        action: 'Se cobra en mostrador o se cierra la venta mayorista.',
        module: 'Ventas / POS',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La venta descuenta el stock correcto de esa presentación.',
        impact: 'Impacta stock y caja o cuenta corriente.',
      },
      {
        title: 'Cuenta corriente / caja',
        action: 'El cobro al contado va a caja; la venta a cuenta va al saldo del cliente.',
        module: 'Finanzas',
        moduleHref: '/producto/finanzas',
        result: 'Se ve qué entró hoy y quién sigue debiendo.',
      },
    ],
    modules: [
      sharedModules.compras,
      sharedModules.stock,
      sharedModules.productos,
      sharedModules.ventas,
      sharedModules.cuentaCorriente,
      sharedModules.caja,
      sharedModules.informes,
    ],
    differentials: sharedDifferentials,
    experience: {
      kind: 'named',
      title: 'Limpieza Blue y Química Tortuguitas / El Cruce',
      business: 'Limpieza Blue Gualeguaychú · Química Tortuguitas y El Cruce',
      problem:
        'Stock, compras, proveedores y sucursales estaban repartidos. Crecer implicaba más pasos sueltos.',
      flow: 'Stock, compras, caja y operación de varias sedes en un mismo sistema.',
      result:
        'Cada movimiento queda registrado. Las sucursales se controlan desde un solo lugar, con mejor base para sumar otra sede.',
      complexity: 'Operación multi-sucursal con venta y reposición frecuente.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá va a vivir el video o la captura del flujo compra → recepción → venta de limpieza.',
      href: '/producto/compras',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'Mercado Pago', href: '/integraciones/mercadopago' },
    ],
    relatedDocs: [
      { name: 'Compras', href: '/producto/compras' },
      { name: 'Inventario', href: '/producto/inventario' },
      { name: 'Finanzas', href: '/producto/finanzas' },
      { name: 'Sucursales', href: '/producto/sucursales' },
    ],
    testimonialIds: ['antonella-limpieza-blue', 'miguel-alberto-quimica'],
    faqs: [
      {
        question: '¿Sirve para venta minorista y también a empresas?',
        answer:
          'Sí. Podés operar listas distintas y registrar tanto la venta de mostrador como la venta a clientes habituales, con impacto en stock y en cuenta corriente.',
      },
      {
        question: '¿Puedo controlar compras y recepción?',
        answer:
          'Sí. Las sucursales pueden pedir, la central consolida y emite la orden de compra. Al recibir, el stock se actualiza.',
      },
      {
        question: '¿Puedo tener varias sucursales o depósitos?',
        answer:
          'Sí. Cada nodo tiene su stock. Podés transferir entre sedes y decidir qué visibilidad tiene cada usuario.',
      },
      {
        question: '¿Puedo usar listas de precios diferentes?',
        answer:
          'Sí. Listas por sucursal y por canal, por ejemplo minorista, mayorista o promoción.',
      },
      {
        question: '¿Puedo emitir facturas ARCA?',
        answer:
          'Sí. La factura queda vinculada a la venta o al cliente, dentro del mismo flujo operativo.',
      },
      {
        question: '¿Incluye reglas especiales para productos químicos?',
        answer:
          'No prometemos un módulo de peligrosos. Si ese control es central para tu negocio, lo validamos en la demo.',
      },
    ],
    ctaTitle: 'Veamos el flujo de tu negocio de limpieza',
    ctaText:
      'Contanos cuántas sedes tenés y cómo manejás hoy ventas, stock y compras. Te mostramos el flujo de ZinkERP para tu negocio.',
    whatsappMessage:
      'Hola, tengo un negocio de artículos de limpieza y quiero ver el flujo de ZinkERP: compras, stock, precios y cuenta corriente.',
    formProblems: [
      'Reposición que se decide de memoria',
      'Presentaciones y precios mezclados',
      'Compras difíciles de controlar',
      'Minorista y mayorista desconectados',
      'Cuentas corrientes sin seguimiento',
    ],
  },
  papeleras: {
    slug: 'papeleras',
    family: 'storefront',
    pageTitle: 'ERP para papeleras y librerías: catálogo, precios y caja | ZinkERP',
    pageDescription:
      'Sistema para papeleras y librerías comerciales: catálogo amplio, listas de precios, reposición, venta de mostrador y control de caja. Pedí una demo.',
    caseName: 'una papelera o librería comercial',
    eyebrow: 'Papeleras y librerías comerciales',
    heroTitle: 'Papelera con catálogo ordenado, precios claros y caja que cierra sin planilla',
    heroText:
      'Para papeleras y librerías con miles de SKUs, temporadas fuertes y un mostrador que no puede frenarse a buscar un precio en Excel.',
    audience: 'Papeleras y librerías comerciales, de una sede o de 2 a 4 locales.',
    result: 'El catálogo, la reposición, la venta y la caja quedan en el mismo circuito.',
    problems: [
      {
        title: 'Catálogo demasiado grande para memoria',
        text: 'Útiles, resmas, manualidades y estacionales. Encontrar el producto y el precio vigente frena al mostrador.',
      },
      {
        title: 'Listas de precios que no se sostienen',
        text: 'Una lista para mostrador, otra para colegios o empresas. Si viven en archivos distintos, se cobra mal.',
      },
      {
        title: 'Reposición a ciegas antes de la temporada',
        text: 'En la vuelta a clases se compra de más o falta lo que más sale. No hay una foto clara de qué rotó.',
      },
      {
        title: 'Ventas anotadas en distintos lugares',
        text: 'Mostrador, encargos y facturas a instituciones no terminan en el mismo registro.',
      },
      {
        title: 'Caja que se arma al final del día',
        text: 'El cierre depende de sumar tickets, transferencias y fiados. El dueño se entera tarde.',
      },
    ],
    flowSteps: [
      {
        title: 'Carga de catálogo',
        action: 'Se importan o cargan productos, códigos y categorías.',
        module: 'Productos',
        moduleHref: '/producto/inventario',
        result: 'El equipo busca por código o nombre en vez de recorrer góndola.',
      },
      {
        title: 'Lista de precios',
        action: 'Se publican listas por canal o sucursal y se actualizan desde costos.',
        module: 'Productos',
        moduleHref: '/producto/inventario',
        result: 'Mostrador y venta a instituciones usan el precio correcto.',
      },
      {
        title: 'Compra',
        action: 'Se genera la orden de compra según faltantes y proveedores.',
        module: 'Compras',
        moduleHref: '/producto/compras',
        result: 'La temporada se abastece con un pedido registrado.',
      },
      {
        title: 'Reposición',
        action: 'Se recibe mercadería y se actualiza el stock del local.',
        module: 'Stock',
        moduleHref: '/producto/inventario',
        result: 'Lo que llegó ya se puede vender y se ve en el sistema.',
        impact: 'El stock de la sucursal sube al recibir.',
      },
      {
        title: 'Venta',
        action: 'Se cobra en POS o se cierra una venta a un colegio o empresa.',
        module: 'Ventas / POS',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La venta descuenta stock y deja el comprobante asociado.',
        impact: 'Impacta stock y caja o cuenta corriente.',
      },
      {
        title: 'Control de caja',
        action: 'Cada operador rinde su caja; el dueño ve ingresos y egresos.',
        module: 'Caja',
        moduleHref: '/producto/finanzas',
        result: 'El cierre del día no depende de una planilla armada a mano.',
      },
    ],
    modules: [
      sharedModules.productos,
      sharedModules.ventas,
      sharedModules.compras,
      sharedModules.stock,
      sharedModules.caja,
      sharedModules.cuentaCorriente,
      sharedModules.informes,
    ],
    differentials: sharedDifferentials,
    experience: {
      kind: 'named',
      title: 'Papelera Pilar Manualidades',
      business: 'Papelera Pilar Manualidades',
      problem: 'Las ventas y los pagos se registraban a mano. Faltaba una visión clara de stock y caja.',
      flow: 'Mostrador, pagos, stock y caja en un solo sistema.',
      result:
        'Las ventas y los pagos se registran en el momento. El mostrador es más ágil y la dueña ve la situación del local.',
      complexity: 'Papelería retail con catálogo amplio y venta presencial.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá va a vivir el video o la captura del flujo catálogo → venta → caja de papelera.',
      href: '/producto/ventas-y-pos',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'Mercado Pago', href: '/integraciones/mercadopago' },
    ],
    relatedDocs: [
      { name: 'Ventas y POS', href: '/producto/ventas-y-pos' },
      { name: 'Inventario', href: '/producto/inventario' },
      { name: 'Compras', href: '/producto/compras' },
      { name: 'Finanzas', href: '/producto/finanzas' },
    ],
    testimonialIds: ['martina-papelera-pilar', 'mariela-papelera-pilar'],
    faqs: [
      {
        question: '¿Puedo importar productos desde Excel?',
        answer:
          'Sí. La importación de productos sirve para levantar un catálogo amplio. En la puesta en marcha te podemos asistir si los datos están ordenados.',
      },
      {
        question: '¿Puedo usar listas de precios diferentes?',
        answer:
          'Sí. Listas por sucursal y por canal, por ejemplo mostrador, mayorista o promoción.',
      },
      {
        question: '¿Puedo vender a colegios o empresas a cuenta?',
        answer:
          'Sí. La venta queda en el circuito y, si corresponde, impacta la cuenta corriente del cliente.',
      },
      {
        question: '¿Puedo emitir facturas ARCA?',
        answer:
          'Sí. El comprobante se genera desde la misma operación, vinculado a la venta y al cliente.',
      },
      {
        question: '¿Sirve si tengo temporadas muy fuertes?',
        answer:
          'Sí. No reemplaza tu planificación, pero catálogo, stock, compras y caja quedan ordenados para atravesar esos picos.',
      },
      {
        question: '¿Puedo manejar más de un local?',
        answer:
          'Sí. Cada local tiene su stock y su caja. La central ve la red sin pedir el cierre por WhatsApp.',
      },
    ],
    ctaTitle: 'Veamos el flujo de tu papelera',
    ctaText:
      'Contanos cuántas sedes tenés y cómo manejás hoy ventas, stock y compras. Te mostramos el flujo de ZinkERP para tu negocio.',
    whatsappMessage:
      'Hola, tengo una papelera y quiero ver el flujo de ZinkERP: catálogo, listas de precios, reposición y caja.',
    formProblems: [
      'Catálogo demasiado grande para memoria',
      'Listas de precios desordenadas',
      'Reposición a ciegas en temporada',
      'Ventas anotadas en distintos lugares',
      'Caja que se arma al final del día',
    ],
  },
  'insumos-de-reposteria': {
    slug: 'insumos-de-reposteria',
    family: 'replenishment',
    pageTitle: 'ERP para insumos de repostería: catálogo, stock y ventas | ZinkERP',
    pageDescription:
      'Sistema para negocios de insumos de repostería: catálogo de variantes, precios, reposición, venta de mostrador y caja. Pedí una demo.',
    caseName: 'un negocio de insumos de repostería',
    eyebrow: 'Insumos de repostería',
    heroTitle: 'Insumos de repostería con variantes ordenadas, reposición a tiempo y venta sin anotar afuera',
    heroText:
      'Para locales que venden moldes, colorantes, chocolates y descartables, con picos de demanda y un catálogo que no entra en la cabeza de nadie.',
    audience: 'Negocios de insumos de repostería, de 1 a 4 sucursales, con venta presencial y a veces online.',
    result: 'Sabés qué rota, qué reponer y qué se vendió, sin separar el mostrador de la caja.',
    problems: [
      {
        title: 'Muchas variantes chicas',
        text: 'Colores, medidas y marcas se parecen. Si el catálogo no está ordenado, se vende el ítem equivocado o se pierde tiempo buscándolo.',
      },
      {
        title: 'Picos de demanda que desordenan el stock',
        text: 'Pascuas, Día de la Madre o fin de año vacían góndola. Reponer tarde significa perder la venta de la semana.',
      },
      {
        title: 'Precios que se mueven con el dólar o el proveedor',
        text: 'Si el costo cambia y el precio de góndola no, el margen se come solo.',
      },
      {
        title: 'Ventas de mostrador y encargos por separado',
        text: 'Un pedido por Instagram o WhatsApp no termina en el mismo registro que el ticket del local.',
      },
      {
        title: 'Caja y facturación desconectadas',
        text: 'Se cobra rápido, se factura después y el stock se ajusta cuando hay tiempo. Ese “después” nunca llega limpio.',
      },
    ],
    flowSteps: [
      {
        title: 'Catálogo y variantes',
        action: 'Se cargan productos, variantes y códigos para buscarlos rápido.',
        module: 'Productos',
        moduleHref: '/producto/inventario',
        result: 'El mostrador encuentra el color o la medida sin recorrer la góndola.',
      },
      {
        title: 'Precios',
        action: 'Se actualizan listas a partir de costos, en ARS o USD cuando aplica.',
        module: 'Productos',
        moduleHref: '/producto/inventario',
        result: 'El precio de venta sigue al costo, no a una planilla vieja.',
      },
      {
        title: 'Compra',
        action: 'Se arma la orden según lo que falta o lo que va a rotar en la fecha fuerte.',
        module: 'Compras',
        moduleHref: '/producto/compras',
        result: 'La reposición queda pedida y registrada.',
      },
      {
        title: 'Reposición',
        action: 'Se recibe la mercadería y se actualiza el stock del local.',
        module: 'Stock',
        moduleHref: '/producto/inventario',
        result: 'Lo que llegó ya está disponible para vender.',
        impact: 'El stock se actualiza al recibir.',
      },
      {
        title: 'Venta de mostrador',
        action: 'Se cobra en POS y, si hace falta, se factura en el mismo paso.',
        module: 'Ventas / POS',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La venta descuenta stock y deja el ticket o la factura.',
        impact: 'Impacta stock y caja.',
      },
      {
        title: 'Caja',
        action: 'El operador cierra su caja; el dueño ve el día.',
        module: 'Caja',
        moduleHref: '/producto/finanzas',
        result: 'Ingresos y egresos quedan en el mismo lugar que la venta.',
      },
    ],
    modules: [
      sharedModules.productos,
      sharedModules.ventas,
      sharedModules.compras,
      sharedModules.stock,
      sharedModules.caja,
      sharedModules.informes,
    ],
    differentials: sharedDifferentials,
    experience: {
      kind: 'anonymized',
      title: 'Caso de uso: local de insumos con catálogo amplio y fechas pico',
      problem:
        'El catálogo chico-grande se sostenía en memoria, la reposición de fechas fuertes se decidía tarde y la caja se armaba aparte.',
      flow: 'Catálogo → precios → compra → reposición → venta → caja.',
      result:
        'La operación diaria y la reposición quedan en un mismo circuito. No publicamos métricas de este caso.',
      complexity: 'Comercio con muchas variantes y picos estacionales.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá va a vivir el video o la captura del flujo catálogo → reposición → venta de insumos.',
      href: '/producto/inventario',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'WooCommerce', href: '/integraciones/woocommerce' },
    ],
    relatedDocs: [
      { name: 'Inventario', href: '/producto/inventario' },
      { name: 'Ventas y POS', href: '/producto/ventas-y-pos' },
      { name: 'Compras', href: '/producto/compras' },
      { name: 'Facturación', href: '/producto/facturacion' },
    ],
    faqs: [
      {
        question: '¿Sirve si tengo muchísimos productos chicos?',
        answer:
          'Sí. El valor está en ordenar catálogo, precios, stock y venta. El POS busca por código o nombre para no frenar el mostrador.',
      },
      {
        question: '¿Puedo importar el catálogo desde Excel?',
        answer:
          'Sí. Se pueden importar productos para levantar la base. Conviene revisar categorías y códigos en la puesta en marcha.',
      },
      {
        question: '¿Puedo actualizar precios cuando cambia el costo?',
        answer:
          'Sí. Los precios se pueden actualizar a partir del costo. Si el insumo se compra en USD, el costo se puede trabajar en esa moneda.',
      },
      {
        question: '¿Puedo vender online y en el local?',
        answer:
          'Si usás WooCommerce, la tienda se puede conectar con la operación. El alcance puntual se revisa en la demo.',
      },
      {
        question: '¿Puedo emitir facturas ARCA?',
        answer:
          'Sí. La factura se emite desde la misma venta, sin un sistema fiscal paralelo.',
      },
      {
        question: '¿Incluye recetas o producción?',
        answer:
          'No lo prometemos como vertical de obrador. Si fabricás y vendés, validamos en demo qué parte del circuito aplica.',
      },
    ],
    ctaTitle: 'Veamos el flujo de tu negocio de insumos',
    ctaText:
      'Contanos cuántas sedes tenés y cómo manejás hoy ventas, stock y compras. Te mostramos el flujo de ZinkERP para tu negocio.',
    whatsappMessage:
      'Hola, tengo un negocio de insumos de repostería y quiero ver el flujo de ZinkERP: catálogo, precios, reposición y caja.',
    formProblems: [
      'Muchas variantes chicas',
      'Picos de demanda que desordenan el stock',
      'Precios que no siguen al costo',
      'Encargos y mostrador desconectados',
      'Caja y facturación aparte',
    ],
  },
  florerias: {
    slug: 'florerias',
    family: 'validation',
    noindex: true,
    pageTitle: 'ERP para florerías | ZinkERP',
    pageDescription:
      'Ordená ventas, stock y facturación de tu florería con ZinkERP. Revisamos el flujo real antes de prometer procesos específicos del rubro.',
    caseName: 'una florería',
    eyebrow: 'Florerías',
    heroTitle: 'Florería con pedidos, stock y facturación en un mismo circuito comercial',
    heroText:
      'Para florerías que toman pedidos por mostrador, teléfono o canales online y necesitan ordenar la parte comercial sin asumir logística floral a medida.',
    audience: 'Florerías que ya superaron el cuaderno y quieren validar si el circuito comercial encaja.',
    result: 'Ventas, disponibilidad y facturación dejan de vivir en chats y planillas distintas.',
    problems: [
      {
        title: 'Disponibilidad que cambia rápido',
        text: 'Lo que hay a la mañana no está a la tarde. Comprometer un pedido sin stock claro genera reclamos.',
      },
      {
        title: 'Pedidos por varios canales',
        text: 'Mostrador, teléfono e Instagram no terminan en el mismo registro.',
      },
      {
        title: 'Picos en fechas especiales',
        text: 'San Valentín o el Día de la Madre multiplican encargos y se pierde el hilo de qué está entregado.',
      },
      {
        title: 'Facturación aparte de la operación',
        text: 'Se vende ahora y se factura después, con diferencias entre lo prometido y lo registrado.',
      },
    ],
    flowSteps: [
      {
        title: 'Pedido o venta',
        action: 'Se registra el pedido o la venta desde el canal que haya entrado.',
        module: 'Ventas',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La operación comercial queda en un solo lugar.',
      },
      {
        title: 'Consulta de disponibilidad',
        action: 'Se revisa stock antes de comprometer el pedido.',
        module: 'Stock',
        moduleHref: '/producto/inventario',
        result: 'Se confirma con datos, no solo con memoria.',
      },
      {
        title: 'Facturación',
        action: 'Se emite el comprobante vinculado a la venta.',
        module: 'Facturación',
        moduleHref: '/producto/facturacion',
        result: 'Lo vendido y lo facturado coinciden.',
      },
      {
        title: 'Caja',
        action: 'El cobro queda en la caja del día.',
        module: 'Caja',
        moduleHref: '/producto/finanzas',
        result: 'El cierre no depende de sumar mensajes y tickets.',
        impact: 'Impacta caja.',
      },
    ],
    modules: [sharedModules.ventas, sharedModules.stock, sharedModules.caja, sharedModules.informes],
    differentials: sharedDifferentials,
    experience: {
      kind: 'anonymized',
      title: 'Caso de uso: operación floral con varios canales',
      problem: 'Pedidos, disponibilidad y facturación se seguían en canales distintos.',
      flow: 'Pedido o venta → disponibilidad → facturación → caja.',
      result: 'La parte comercial se ordena. El detalle de delivery o perecederos se valida en demo.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá se podrá sumar una captura del flujo comercial cuando exista material del rubro.',
      href: '/producto/ventas-y-pos',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'WooCommerce', href: '/integraciones/woocommerce' },
    ],
    faqs: [
      {
        question: '¿Sirve para una florería?',
        answer:
          'Puede servir cuando el problema es ordenar ventas, stock y facturación. El alcance puntual depende del flujo real.',
      },
      {
        question: '¿Incluye logística de delivery?',
        answer: 'No lo prometemos de forma pública. Si el delivery es central, lo validamos en la demo.',
      },
      {
        question: '¿Maneja reglas de perecederos?',
        answer: 'No asumimos ese alcance. Lo que sí puede aportar es el circuito comercial y de stock general.',
      },
      {
        question: '¿Puedo emitir facturas ARCA?',
        answer: 'Sí. La facturación electrónica forma parte del flujo operativo de ZinkERP.',
      },
    ],
    ctaTitle: 'Revisemos el flujo real de tu florería',
    ctaText:
      'Contanos cuántas sedes tenés y cómo tomás pedidos hoy. Te mostramos hasta dónde llega el circuito de ZinkERP.',
    whatsappMessage: 'Hola, tengo una florería y quiero validar si el flujo comercial de ZinkERP encaja.',
    formProblems: [
      'Pedidos por varios canales',
      'Disponibilidad que cambia rápido',
      'Picos en fechas especiales',
      'Facturación desconectada',
    ],
  },
  'zingueria-metalurgica': {
    slug: 'zingueria-metalurgica',
    family: 'validation',
    noindex: true,
    pageTitle: 'ERP para zinguería y metalúrgica | ZinkERP',
    pageDescription:
      'Ordená ventas, materiales, presupuestos y facturación en zinguería o metalúrgica. Validamos el alcance industrial en demo.',
    caseName: 'una zinguería o metalúrgica',
    eyebrow: 'Zinguería y metalúrgica',
    heroTitle: 'Zinguería o metalúrgica con presupuestos, materiales y facturación en un circuito comercial',
    heroText:
      'Para talleres que venden materiales y trabajo, y necesitan ordenar la parte comercial sin asumir un sistema de planta.',
    audience: 'Zinguerías y metalúrgicas que ya no entran en una planilla de presupuestos.',
    result: 'Presupuesto, pedido, materiales y factura dejan de estar repartidos.',
    problems: [
      {
        title: 'Presupuestos manuales',
        text: 'Cada oferta se arma de cero. Después hay que cargarla de nuevo para comprar o facturar.',
      },
      {
        title: 'Materiales y mano de obra mezclados',
        text: 'La venta no es un ticket de mostrador. Si no hay un pedido, se pierde qué se comprometió.',
      },
      {
        title: 'Poca visibilidad de costos y stock de materiales',
        text: 'Chapa, perfiles e insumos se controlan aparte de la venta.',
      },
      {
        title: 'Facturación desconectada del trabajo',
        text: 'Se factura cuando hay tiempo, no cuando el pedido avanza.',
      },
    ],
    flowSteps: [
      {
        title: 'Cotización / presupuesto',
        action: 'Se arma la oferta con materiales y condiciones.',
        module: 'Ventas',
        moduleHref: '/producto/ventas-y-pos',
        result: 'El presupuesto queda en el sistema, no solo en un PDF suelto.',
      },
      {
        title: 'Pedido',
        action: 'Si se acepta, el presupuesto pasa a pedido.',
        module: 'Ventas',
        moduleHref: '/producto/ventas-y-pos',
        result: 'Hay un compromiso comercial para abastecer o entregar.',
      },
      {
        title: 'Compra de materiales',
        action: 'Se emite la orden de compra de lo que falta.',
        module: 'Compras',
        moduleHref: '/producto/compras',
        result: 'El material queda pedido contra la operación.',
        impact: 'El stock se actualiza al recibir.',
      },
      {
        title: 'Venta y facturación',
        action: 'Se cierra la venta y se emite el comprobante.',
        module: 'Ventas / Facturación',
        moduleHref: '/producto/facturacion',
        result: 'Lo vendido, lo facturado y el saldo del cliente coinciden.',
        impact: 'Puede impactar cuenta corriente y caja.',
      },
    ],
    modules: [
      sharedModules.ventas,
      sharedModules.compras,
      sharedModules.stock,
      sharedModules.cuentaCorriente,
      sharedModules.informes,
    ],
    differentials: sharedDifferentials,
    experience: {
      kind: 'anonymized',
      title: 'Caso de uso: taller con presupuestos y materiales',
      problem: 'Presupuestos, compras de material y facturación vivían en circuitos distintos.',
      flow: 'Presupuesto → pedido → compra de materiales → venta / factura.',
      result: 'La parte comercial y administrativa se ordena. La manufactura avanzada se valida aparte.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá se podrá sumar una captura del flujo presupuesto → pedido cuando exista material del rubro.',
      href: '/producto/ventas-y-pos',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'Mercado Pago', href: '/integraciones/mercadopago' },
    ],
    faqs: [
      {
        question: '¿Reemplaza un sistema de producción?',
        answer:
          'No. Ordena ventas, materiales, clientes y facturación. No afirmamos manufactura avanzada sin validación.',
      },
      {
        question: '¿Puedo convertir un presupuesto en pedido y venta?',
        answer:
          'Sí. Ese circuito comercial está en el producto. El encaje con tu forma de trabajar se revisa en demo.',
      },
      {
        question: '¿Puedo controlar cuenta corriente?',
        answer: 'Sí. Saldo, antigüedad y movimientos del cliente quedan en finanzas.',
      },
      {
        question: '¿Puedo emitir facturas ARCA?',
        answer: 'Sí. La factura se vincula a la operación comercial.',
      },
    ],
    ctaTitle: 'Validemos el alcance de tu taller',
    ctaText:
      'Contanos cuántas sedes tenés y cómo armás hoy presupuestos, materiales y facturas. Te mostramos el circuito comercial.',
    whatsappMessage:
      'Hola, tengo una zinguería o metalúrgica y quiero validar el flujo comercial de ZinkERP.',
    formProblems: [
      'Presupuestos manuales',
      'Materiales y trabajo desconectados',
      'Poco control de compras',
      'Facturación aparte',
    ],
  },
  cultivos: {
    slug: 'cultivos',
    family: 'validation',
    noindex: true,
    pageTitle: 'ERP para negocios vinculados a cultivos | ZinkERP',
    pageDescription:
      'Ordená ventas, stock, compras y facturación en negocios vinculados a cultivos. Validamos procesos agronómicos en demo.',
    caseName: 'un negocio vinculado a cultivos',
    eyebrow: 'Cultivos',
    heroTitle: 'Operación vinculada a cultivos con ventas, stock y compras en un circuito comercial',
    heroText:
      'Para negocios que venden, compran y controlan insumos o productos, y necesitan orden administrativo más que un software agronómico.',
    audience: 'Operaciones vinculadas a cultivos que ya no entran en planillas.',
    result: 'Ventas, stock, compras y facturación quedan en una sola base comercial.',
    problems: [
      {
        title: 'Información repartida',
        text: 'Ventas, stock e insumos se siguen en planillas, mensajes y memoria del equipo.',
      },
      {
        title: 'Compras y stock sin una foto común',
        text: 'No está claro qué hay, qué se pidió y qué falta en cada punto operativo.',
      },
      {
        title: 'Facturación desconectada',
        text: 'Se vende o se entrega y se factura en otro momento, con diferencias.',
      },
      {
        title: 'Más de un punto operativo',
        text: 'Sucursales o depósitos no comparten visibilidad.',
      },
    ],
    flowSteps: [
      {
        title: 'Venta o registro comercial',
        action: 'Se registra la venta o el pedido en el sistema.',
        module: 'Ventas',
        moduleHref: '/producto/ventas-y-pos',
        result: 'La operación comercial deja de vivir en una planilla.',
      },
      {
        title: 'Control de stock o insumos',
        action: 'Se consulta disponibilidad del punto operativo.',
        module: 'Stock',
        moduleHref: '/producto/inventario',
        result: 'Hay una foto de qué hay y dónde.',
      },
      {
        title: 'Compra',
        action: 'Se emite la orden de compra de lo que falta.',
        module: 'Compras',
        moduleHref: '/producto/compras',
        result: 'El abastecimiento queda registrado.',
        impact: 'El stock se actualiza al recibir.',
      },
      {
        title: 'Facturación',
        action: 'Se emite el comprobante vinculado a la operación.',
        module: 'Facturación',
        moduleHref: '/producto/facturacion',
        result: 'Lo comercial y lo fiscal coinciden.',
      },
    ],
    modules: [
      sharedModules.ventas,
      sharedModules.stock,
      sharedModules.compras,
      sharedModules.caja,
      sharedModules.informes,
    ],
    differentials: sharedDifferentials,
    experience: {
      kind: 'anonymized',
      title: 'Caso de uso: operación comercial vinculada a cultivos',
      problem: 'Ventas, stock y administración estaban repartidos.',
      flow: 'Venta → stock → compra → facturación.',
      result: 'La parte comercial y administrativa se ordena. Lo agronómico se valida aparte.',
    },
    demoMedia: {
      kind: 'placeholder',
      label: 'Acá se podrá sumar una captura del circuito comercial cuando exista material del rubro.',
      href: '/producto/inventario',
    },
    integrations: [
      { name: 'ARCA', href: '/integraciones/arca' },
      { name: 'Mercado Pago', href: '/integraciones/mercadopago' },
    ],
    faqs: [
      {
        question: '¿ZinkERP es un software de cultivos?',
        answer:
          'No como vertical agronómico. Sí puede ordenar ventas, stock, compras y facturación de la parte comercial.',
      },
      {
        question: '¿Puedo manejar sucursales o depósitos?',
        answer: 'Sí, cuando el problema es visibilidad de stock, ventas y caja entre puntos operativos.',
      },
      {
        question: '¿Puedo emitir facturas ARCA?',
        answer: 'Sí. La facturación electrónica está integrada al flujo operativo.',
      },
      {
        question: '¿Incluye gestión agronómica?',
        answer: 'No lo afirmamos. Si tu operación depende de procesos técnicos del agro, lo revisamos en demo.',
      },
    ],
    ctaTitle: 'Validemos tu operación vinculada a cultivos',
    ctaText:
      'Contanos cuántas sedes tenés y cómo manejás hoy ventas, stock y compras. Te mostramos el circuito comercial.',
    whatsappMessage:
      'Hola, tengo una operación vinculada a cultivos y quiero validar el flujo comercial de ZinkERP.',
    formProblems: [
      'Información repartida',
      'Poco control de stock e insumos',
      'Compras desordenadas',
      'Más de un punto operativo',
    ],
  },
};

export const commercialUseCaseSlugs = [
  'ferreterias',
  'dieteticas',
  'articulos-de-limpieza',
  'papeleras',
  'insumos-de-reposteria',
] as const;
