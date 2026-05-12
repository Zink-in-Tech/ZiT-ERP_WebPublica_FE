export type UseCaseLink = {
  name: string;
  href: string;
};

export type UseCaseFaq = {
  question: string;
  answer: string;
};

export type UseCaseEntry = {
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
  faqs: UseCaseFaq[];
  ctaTitle: string;
  ctaText: string;
};

export const useCases: Record<string, UseCaseEntry> = {
  ferreterias: {
    pageTitle: 'ERP para ferreterias | ZinkERP',
    pageDescription:
      'Gestiona ventas, stock, POS, facturacion y sucursales de tu ferreteria con ZinkERP, un ERP SaaS para comercios argentinos.',
    caseName: 'La operacion de una ferreteria',
    eyebrow: 'Ferreterias',
    heroTitle: 'ZinkERP para ferreterias',
    heroText:
      'Ordena ventas de mostrador, stock, precios, proveedores y facturacion en una plataforma pensada para comercios argentinos.',
    heroNote:
      'Un caso fuerte para comercios con catalogo amplio, venta rapida y necesidad de ordenar la operacion diaria sin sumar complejidad innecesaria.',
    pains: [
      'Muchos SKUs repartidos entre familias, medidas, marcas y proveedores.',
      'Dudas de stock en el mostrador cuando el cliente necesita una respuesta rapida.',
      'Ventas presenciales que no pueden esperar procesos administrativos lentos.',
      'Cambios de precios y margenes que requieren orden para evitar errores.',
      'Reposicion y seguimiento de proveedores con informacion dispersa.',
      'Necesidad de facturar dentro del mismo flujo operativo.',
      'Crecimiento a mas de una sucursal con riesgo de perder visibilidad.',
    ],
    helps: [
      {
        title: 'Mostrador conectado con la operacion',
        text: 'ZinkPOS ayuda a registrar la venta de mostrador dentro de una operacion que tambien necesita stock, facturacion y seguimiento comercial.',
      },
      {
        title: 'Stock y ventas en una misma base',
        text: 'El equipo puede trabajar con informacion mas ordenada sobre productos, movimientos y disponibilidad operativa.',
      },
      {
        title: 'Precios y productos con mas contexto',
        text: 'Ayuda a ordenar productos y precios para que el equipo dependa menos de planillas, listas sueltas o memoria de mostrador.',
      },
      {
        title: 'Visibilidad para dueños y encargados',
        text: 'La operacion queda en un sistema comun para revisar ventas, stock, facturacion y sucursales cuando aplica.',
      },
    ],
    features: [
      'Gestion de stock',
      'ZinkPOS',
      'Gestion de ventas',
      'Facturacion',
      'Reportes',
      'Operacion multi-sucursal',
    ],
    workflows: [
      {
        title: 'Venta de mostrador',
        text: 'Cobrar en mostrador sin perder de vista stock, comprobante y registro de la venta.',
      },
      {
        title: 'Busqueda de productos',
        text: 'Trabajar con un catalogo mas ordenado para ubicar rapido el producto que pide el cliente.',
      },
      {
        title: 'Consulta de stock',
        text: 'Revisar disponibilidad antes de confirmar una venta y reducir respuestas basadas en memoria o recorridas manuales.',
      },
      {
        title: 'Actualizacion de precios',
        text: 'Tener precios mas ordenados cuando cambian costos, margenes o condiciones de compra.',
      },
      {
        title: 'Facturacion',
        text: 'Resolver la facturacion dentro de la misma operacion, con una base alineada al contexto fiscal argentino.',
      },
      {
        title: 'Visibilidad por sucursal',
        text: 'Cuando hay mas de un local, sumar una mirada central sobre ventas, stock y actividad de cada punto.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
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
    faqs: [
      {
        question: 'Sirve si tengo muchos productos?',
        answer:
          'Si. Ferreterias suelen tener catalogos amplios y ZinkERP ayuda a ordenar productos, stock, ventas y facturacion desde una base comun.',
      },
      {
        question: 'Puedo usarlo para ventas de mostrador?',
        answer:
          'Si. ZinkPOS esta pensado para venta presencial y se integra con la operacion del ERP.',
      },
      {
        question: 'Ayuda a controlar stock?',
        answer:
          'Si. ZinkERP incluye gestion de stock para trabajar con movimientos, disponibilidad y control operativo diario.',
      },
      {
        question: 'Sirve para mas de una sucursal?',
        answer:
          'Si. ZinkERP soporta operaciones multi-sucursal y ayuda a tener visibilidad centralizada cuando el negocio crece.',
      },
      {
        question: 'Puedo vender online tambien?',
        answer:
          'Si la ferreteria trabaja con WooCommerce, la integracion puede ayudar a conectar ecommerce con la gestion. El alcance puntual conviene revisarlo en demo.',
      },
      {
        question: 'Es un sistema hecho solo para ferreterias?',
        answer:
          'No. ZinkERP resuelve patrones operativos comunes en comercios con catalogo, ventas, stock y facturacion; ferreterias es uno de los casos donde ese encaje suele ser fuerte.',
      },
    ],
    ctaTitle: 'Ordena la operacion diaria de tu ferreteria',
    ctaText:
      'En una demo podemos revisar como ordenar venta de mostrador, consulta de stock, precios y facturacion segun la operacion de tu ferreteria.',
  },
  dieteticas: {
    pageTitle: 'ERP para dieteticas | ZinkERP',
    pageDescription:
      'Ordena ventas, stock, POS y facturacion de tu dietetica con ZinkERP, una base operativa para comercios argentinos con catalogo amplio.',
    caseName: 'La operacion de una dietetica',
    eyebrow: 'Dieteticas',
    heroTitle: 'ZinkERP para dieteticas',
    heroText:
      'Ordena ventas, stock y facturacion de tu dietetica con un ERP simple de operar y preparado para crecer con tu negocio.',
    heroNote:
      'Funciona especialmente bien cuando hay muchos productos, venta diaria y necesidad de sostener orden entre mostrador, catalogo y reposicion.',
    pains: [
      'Muchos productos chicos, variantes y categorias para mantener organizados.',
      'Diferencias entre lo que hay en gondola y lo que figura disponible.',
      'Ventas presenciales que necesitan velocidad y menos pasos manuales.',
      'Cambios de precios o promociones con riesgo de errores si todo vive en planillas.',
      'Reposicion de proveedores con informacion dispersa.',
      'Necesidad de facturar desde la misma operacion diaria.',
    ],
    helps: [
      {
        title: 'POS y stock conectados',
        text: 'ZinkPOS ayuda a cobrar en mostrador sin separar la venta del stock y la facturacion diaria.',
      },
      {
        title: 'Catalogo mas ordenado',
        text: 'Ayuda a ordenar productos, categorias y precios cuando hay muchas referencias y venta diaria.',
      },
      {
        title: 'Control comercial en un solo sistema',
        text: 'Dueños y encargados pueden revisar ventas, stock y movimiento del negocio sin depender de planillas separadas.',
      },
      {
        title: 'Base lista para ecommerce cuando aplica',
        text: 'Si la cuenta usa WooCommerce y el flujo esta validado, puede conectarse con la gestion.',
      },
    ],
    features: [
      'ZinkPOS',
      'Gestion de stock',
      'Gestion de ventas',
      'Facturacion',
      'Catalogo de productos',
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
        title: 'Orden del catalogo',
        text: 'Mantener productos y categorias mas ordenados cuando hay mucha variedad y cambios frecuentes.',
      },
      {
        title: 'Reposicion',
        text: 'Usar rotacion y disponibilidad para decidir mejor que reponer y que producto se esta quedando corto.',
      },
      {
        title: 'Facturacion',
        text: 'Resolver la facturacion dentro de la misma operacion, con una base alineada al contexto fiscal argentino.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
      },
      {
        name: 'WooCommerce',
        href: '/integraciones/woocommerce',
      },
    ],
    faqs: [
      {
        question: 'Sirve si vendo muchos productos chicos?',
        answer:
          'Si. ZinkERP puede encajar bien en operaciones con catalogo amplio y muchas ventas diarias, siempre que el valor principal este en ordenar stock, ventas y facturacion.',
      },
      {
        question: 'Ayuda con la venta presencial?',
        answer:
          'Si. ZinkPOS esta pensado para mostrador y puede ayudar a que el cobro diario no quede separado del resto de la operacion.',
      },
      {
        question: 'Puedo conectar una tienda online?',
        answer:
          'Si la cuenta trabaja con WooCommerce y el flujo fue validado, la integracion puede ayudar. Conviene revisar el alcance puntual en demo.',
      },
      {
        question: 'Incluye manejo de vencimientos o lotes?',
        answer:
          'No lo damos por hecho. Ese tipo de necesidad hay que validarla segun el negocio antes de prometer encaje.',
      },
      {
        question: 'Es una solucion hecha solo para dieteticas?',
        answer:
          'No. Es una base operativa para comercios argentinos, y dieteticas es un segmento donde varios de esos patrones aparecen con fuerza.',
      },
    ],
    ctaTitle: 'Veamos si ZinkERP encaja en tu dietetica',
    ctaText:
      'En una demo podemos revisar mostrador, disponibilidad, catalogo y facturacion para entender como ordenar mejor la operacion diaria de tu dietetica.',
  },
  'articulos-de-limpieza': {
    pageTitle: 'ERP para articulos de limpieza | ZinkERP',
    pageDescription:
      'Gestiona ventas, stock, facturacion y reposicion en negocios de articulos de limpieza con ZinkERP.',
    caseName: 'La operacion de un negocio de articulos de limpieza',
    eyebrow: 'Articulos de limpieza',
    heroTitle: 'ZinkERP para articulos de limpieza',
    heroText:
      'Controla ventas, stock y facturacion de tu negocio de articulos de limpieza con una herramienta local para operar mejor todos los dias.',
    heroNote:
      'Encaja bien en operaciones con variedad de presentaciones, reposicion frecuente y mezcla de venta minorista o comercial.',
    pains: [
      'Variedad de productos y presentaciones con distinta rotacion y margen.',
      'Reposicion frecuente que exige visibilidad de stock para no vender a ciegas.',
      'Ventas a consumidor final y tambien a empresas o clientes habituales.',
      'Cambios de precios y proveedores que pueden desordenar la operacion.',
      'Necesidad de facturar dentro del mismo flujo comercial.',
      'Sucursales o depositos que agregan complejidad cuando el negocio crece.',
    ],
    helps: [
      {
        title: 'Ventas, stock y facturacion en una misma base',
        text: 'Ayuda a que venta diaria, stock y facturacion no queden repartidos entre sistemas o planillas distintas.',
      },
      {
        title: 'Mas contexto para reposicion',
        text: 'Permite mirar mejor que productos se mueven, cuales faltan y donde conviene reponer primero.',
      },
      {
        title: 'Mejor control diario',
        text: 'Sirve para vender, consultar disponibilidad y sostener el ritmo comercial con menos desorden operativo.',
      },
      {
        title: 'Acompaña crecimiento operativo',
        text: 'Si hay mas de una sucursal o deposito, ZinkERP puede sumar visibilidad centralizada cuando aplica.',
      },
    ],
    features: [
      'Gestion de stock',
      'Gestion de ventas',
      'ZinkPOS',
      'Facturacion',
      'Operacion multi-sucursal',
      'Reportes',
    ],
    workflows: [
      {
        title: 'Venta diaria',
        text: 'Cobrar venta minorista o comercial sin perder de vista stock, comprobante y registro de la operacion.',
      },
      {
        title: 'Consulta de disponibilidad',
        text: 'Saber si hay producto antes de comprometer una venta o un pedido comercial.',
      },
      {
        title: 'Reposicion por proveedor',
        text: 'Revisar faltantes y compras con mas orden cuando cambian precios, proveedores o presentaciones.',
      },
      {
        title: 'Facturacion a distintos tipos de cliente',
        text: 'Resolver la facturacion sin sacar la operacion del mismo circuito comercial.',
      },
      {
        title: 'Control por sucursal o deposito',
        text: 'Seguir donde esta el stock cuando la operacion se reparte entre sucursales o depositos.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    faqs: [
      {
        question: 'Sirve para venta minorista y tambien comercial?',
        answer:
          'Puede encajar en ambos casos cuando la necesidad principal es ordenar ventas, stock y facturacion. El alcance puntual conviene revisarlo en demo.',
      },
      {
        question: 'Ayuda con la reposicion?',
        answer:
          'Si. ZinkERP aporta visibilidad operativa para comprar con mas contexto y menos dependencia de memoria o planillas sueltas.',
      },
      {
        question: 'Funciona con mas de una sucursal?',
        answer:
          'Si la operacion requiere visibilidad multi-sucursal, ZinkERP puede acompañar ese crecimiento.',
      },
      {
        question: 'Incluye reglas especiales para productos quimicos o peligrosos?',
        answer:
          'No lo prometemos de forma publica. Si ese punto es clave para tu negocio, hay que validarlo segun el flujo real.',
      },
      {
        question: 'Es solo para articulos de limpieza?',
        answer:
          'No. Es una base operativa para comercios argentinos, y este rubro es uno de los patrones donde ZinkERP puede aportar orden con fuerza.',
      },
    ],
    ctaTitle: 'Ordena stock y ventas en tu negocio de articulos de limpieza',
    ctaText:
      'Podemos revisar venta diaria, reposicion, disponibilidad y facturacion para ver donde ZinkERP puede ordenar mejor tu operacion.',
  },
  papeleras: {
    pageTitle: 'ERP para papeleras y librerias comerciales | ZinkERP',
    pageDescription:
      'Gestiona catalogo, stock, ventas y facturacion de papeleras y librerias comerciales con ZinkERP.',
    caseName: 'La operacion de una papelera o libreria comercial',
    eyebrow: 'Papeleras y librerias comerciales',
    heroTitle: 'ZinkERP para papeleras y librerias comerciales',
    heroText:
      'Gestiona tu papelera con ventas, stock y facturacion conectados en un solo sistema.',
    heroNote:
      'Es un caso fuerte cuando hay catalogo grande, temporadas marcadas y necesidad de sostener orden entre mostrador, stock y clientes de distinto perfil.',
    pains: [
      'Catalogo amplio con muchas variantes y productos estacionales.',
      'Picos de demanda en campañas o fechas donde el mostrador no puede frenarse.',
      'Consultas frecuentes de stock y disponibilidad.',
      'Reposicion de proveedores con informacion repartida.',
      'Ventas a consumidor final y a organizaciones desde una misma base.',
      'Necesidad de facturar sin sacar la operacion del sistema.',
    ],
    helps: [
      {
        title: 'Mostrador y stock desde la misma base',
        text: 'ZinkPOS y la gestion de stock ayudan a sostener ritmo de mostrador sin perder de vista disponibilidad y facturacion.',
      },
      {
        title: 'Mas claridad sobre disponibilidad',
        text: 'Permite ubicar productos y responder stock con mas seguridad cuando el cliente necesita resolver rapido.',
      },
      {
        title: 'Base comun para campañas fuertes',
        text: 'Cuando llegan campañas o fechas fuertes, ayuda a ordenar catalogo, stock y venta para trabajar con menos friccion.',
      },
      {
        title: 'Visibilidad para dueños y encargados',
        text: 'Dueños y encargados pueden seguir ventas, stock y movimiento comercial con una mirada mas ordenada.',
      },
    ],
    features: [
      'ZinkPOS',
      'Gestion de stock',
      'Gestion de ventas',
      'Facturacion',
      'Catalogo amplio',
      'Operacion multi-sucursal',
    ],
    workflows: [
      {
        title: 'Venta de mostrador',
        text: 'Sostener ritmo de atencion y cobro sin separar la venta del resto de la operacion.',
      },
      {
        title: 'Busqueda de productos',
        text: 'Trabajar con un catalogo mas ordenado para encontrar rapidamente lo que pide el cliente.',
      },
      {
        title: 'Preparacion de temporadas',
        text: 'Preparar campañas fuertes con mejor seguimiento de stock, precios y productos de mayor salida.',
      },
      {
        title: 'Facturacion a consumidores y organizaciones',
        text: 'Mantener el paso fiscal dentro del mismo sistema, segun el circuito comercial del negocio.',
      },
      {
        title: 'Reposicion',
        text: 'Reponer con mejor criterio segun disponibilidad, rotacion y fechas de mayor demanda.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    faqs: [
      {
        question: 'Sirve si tengo muchos productos y temporadas fuertes?',
        answer:
          'Si. Ese es uno de los patrones donde ZinkERP suele aportar mas orden, sobre todo cuando venta, stock y facturacion necesitan trabajar juntos.',
      },
      {
        question: 'Puedo usarlo para ventas rapidas en mostrador?',
        answer:
          'Si. ZinkPOS acompaña la venta presencial y la mantiene conectada con la operacion del ERP.',
      },
      {
        question: 'Ayuda a vender a empresas o instituciones?',
        answer:
          'Puede ayudar cuando la necesidad principal es ordenar catalogo, ventas y facturacion en una misma base. El detalle del circuito comercial conviene verlo en demo.',
      },
      {
        question: 'Incluye automatizacion especial para campañas escolares?',
        answer:
          'No lo prometemos como funcionalidad especifica. Lo que si ofrece ZinkERP es una base mas ordenada para atravesar esas temporadas.',
      },
      {
        question: 'Es un sistema vertical para papeleras?',
        answer:
          'No. Es una plataforma pensada para patrones operativos de comercios argentinos, y papeleras es uno de los segmentos donde ese encaje puede ser muy claro.',
      },
    ],
    ctaTitle: 'Veamos tu caso de papelera o libreria comercial',
    ctaText:
      'En una demo podemos revisar catalogo, mostrador, temporadas, stock y facturacion para ver como ordenar mejor la operacion diaria de tu negocio.',
  },
  'insumos-de-reposteria': {
    pageTitle: 'ERP para insumos de reposteria | ZinkERP',
    pageDescription:
      'Ordena ventas, stock, POS y facturacion de tu negocio de insumos de reposteria con ZinkERP.',
    caseName: 'La operacion de un negocio de insumos de reposteria',
    eyebrow: 'Insumos de reposteria',
    heroTitle: 'ZinkERP para insumos de reposteria',
    heroText:
      'Ordena ventas, stock y facturacion de tu negocio de insumos de reposteria desde una plataforma local.',
    heroNote:
      'Es un caso interesante cuando hay mucha variedad, articulos chicos, picos de demanda y necesidad de combinar mostrador con mejor control comercial.',
    pains: [
      'Muchos productos, variantes y articulos chicos que complican el control diario.',
      'Picos estacionales de demanda que exigen mas orden en stock y venta.',
      'Cambios de precios con impacto rapido en margen y mostrador.',
      'Necesidad de identificar que rota y que queda inmovilizado.',
      'Ventas minoristas y, en algunos casos, comerciales o por encargo.',
      'Facturacion y reposicion que no conviene resolver por fuera del sistema.',
    ],
    helps: [
      {
        title: 'POS, stock y ventas conectados',
        text: 'Ayuda a vender en mostrador sin separar la venta de la disponibilidad y la facturacion diaria.',
      },
      {
        title: 'Catalogo con mas orden',
        text: 'Permite ordenar productos, categorias y variantes cuando el local trabaja con muchas referencias chicas.',
      },
      {
        title: 'Mejor visibilidad para decidir compras',
        text: 'Sirve para mirar mejor que rota, que falta y que conviene reponer antes de las fechas fuertes.',
      },
      {
        title: 'Base lista para ecommerce cuando aplica',
        text: 'Si el negocio vende online con WooCommerce y el flujo fue validado, la integracion puede sumar.',
      },
    ],
    features: [
      'ZinkPOS',
      'Gestion de stock',
      'Gestion de ventas',
      'Facturacion',
      'Catalogo de productos',
      'WooCommerce cuando aplica',
    ],
    workflows: [
      {
        title: 'Venta diaria',
        text: 'Cobrar en mostrador sin perder de vista stock, comprobante y registro de la venta.',
      },
      {
        title: 'Control de productos de alta rotacion',
        text: 'Seguir disponibilidad de los productos que mas salen para reponer antes de quedarse cortos.',
      },
      {
        title: 'Orden del catalogo',
        text: 'Trabajar con un catalogo mas claro cuando hay muchas referencias y variantes.',
      },
      {
        title: 'Temporadas y picos de demanda',
        text: 'Atravesar fechas fuertes con mejor seguimiento de stock, precios y movimiento comercial.',
      },
      {
        title: 'Facturacion',
        text: 'Resolver la facturacion dentro de la misma operacion, con una base alineada al contexto fiscal argentino.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
      },
      {
        name: 'WooCommerce',
        href: '/integraciones/woocommerce',
      },
    ],
    faqs: [
      {
        question: 'Sirve para negocios con muchos productos chicos?',
        answer:
          'Si. Ese tipo de complejidad comercial puede encajar bien cuando el objetivo principal es ordenar catalogo, stock, ventas y facturacion.',
      },
      {
        question: 'Puedo usarlo si vendo online?',
        answer:
          'Si trabajas con WooCommerce y el flujo esta validado, la integracion puede ayudar a conectar ecommerce con gestion.',
      },
      {
        question: 'Ayuda en temporadas fuertes?',
        answer:
          'Si. No reemplaza la planificacion del negocio, pero una base operativa mas ordenada ayuda mucho cuando sube la demanda.',
      },
      {
        question: 'Incluye recetas, produccion o vencimientos?',
        answer:
          'No lo prometemos de forma general. Esos puntos hay que validarlos segun el caso antes de afirmar alcance.',
      },
      {
        question: 'Es solo para reposteria?',
        answer:
          'No. Es un caso de uso dentro de un producto pensado para comercios que necesitan ordenar operacion diaria, stock y facturacion.',
      },
    ],
    ctaTitle: 'Revisemos el encaje de ZinkERP para tu negocio',
    ctaText:
      'Podemos revisar mostrador, productos de alta rotacion, temporadas y facturacion para ver como ordenar mejor la operacion de tu local.',
  },
  florerias: {
    pageTitle: 'ERP para florerias | ZinkERP',
    pageDescription:
      'Ordena ventas, stock y facturacion de tu floreria con ZinkERP, una base operativa para negocios con pedidos y atencion por multiples canales.',
    caseName: 'La operacion de una floreria',
    eyebrow: 'Florerias',
    heroTitle: 'ZinkERP para florerias',
    heroText:
      'Gestiona ventas, stock y facturacion de tu floreria con una plataforma simple para ordenar la operacion diaria.',
    heroNote:
      'Lo tratamos como un caso a evaluar con cuidado: puede aportar orden comercial, aunque hay necesidades del rubro que deben validarse antes de prometer encaje total.',
    pains: [
      'Disponibilidad que cambia rapido y puede ser dificil de sostener en el sistema.',
      'Ventas por mostrador, telefono o canales online que necesitan mas orden comun.',
      'Picos de demanda en fechas especiales con mas presion operativa.',
      'Seguimiento de pedidos y coordinacion comercial dispersos en mensajes o planillas.',
      'Necesidad de facturar dentro del mismo circuito diario.',
      'Operacion que mezcla productos, arreglos y atencion personalizada.',
    ],
    helps: [
      {
        title: 'Base comun para la operacion comercial',
        text: 'ZinkERP puede ayudar a ordenar ventas, stock y facturacion cuando la operacion comercial hoy se sigue entre mensajes, planillas y mostrador.',
      },
      {
        title: 'Mas orden entre canales',
        text: 'Cuando un pedido entra por mostrador, telefono o canales online, ayuda a que la informacion comercial no quede repartida.',
      },
      {
        title: 'Soporte para ecommerce cuando aplica',
        text: 'Si la tienda trabaja con WooCommerce y el flujo fue validado, puede sumarse a la gestion.',
      },
      {
        title: 'Visibilidad para dueños y encargados',
        text: 'Permite seguir ventas y actividad diaria con mas orden sobre la parte comercial del negocio.',
      },
    ],
    features: [
      'Gestion de ventas',
      'ZinkPOS',
      'Gestion de stock',
      'Facturacion',
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
        title: 'Facturacion',
        text: 'Resolver la facturacion dentro de la misma operacion comercial, sin prometer flujos especiales del rubro.',
      },
      {
        title: 'Orden comercial en fechas pico',
        text: 'Atravesar fechas fuertes con mas orden sobre pedidos, ventas y actividad comercial.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
      },
      {
        name: 'WooCommerce',
        href: '/integraciones/woocommerce',
      },
    ],
    faqs: [
      {
        question: 'Sirve para una floreria?',
        answer:
          'Puede servir cuando la necesidad principal es ordenar ventas, stock y facturacion. El encaje total depende de que tan particular sea el flujo del negocio.',
      },
      {
        question: 'Ayuda con pedidos por distintos canales?',
        answer:
          'Puede ayudar a centralizar la operacion comercial, aunque el detalle del circuito conviene revisarlo en demo.',
      },
      {
        question: 'Incluye logistica de delivery?',
        answer:
          'No lo prometemos de forma publica. Si delivery es una parte central del negocio, hay que validarlo especificamente.',
      },
      {
        question: 'Maneja reglas especiales para productos perecederos?',
        answer:
          'No asumimos ese alcance. Lo que si puede aportar es orden operativo general sobre ventas, stock y facturacion.',
      },
      {
        question: 'Entonces por que publicarlo?',
        answer:
          'Porque hay patrones comerciales del rubro donde ZinkERP puede sumar valor, pero preferimos presentarlo con honestidad y revisarlo caso por caso.',
      },
    ],
    ctaTitle: 'Revisemos juntos el flujo real de tu floreria',
    ctaText:
      'En una demo podemos revisar como toman pedidos, como manejan disponibilidad y hasta donde ZinkERP puede ordenar la parte comercial con prudencia.',
  },
  'zingueria-metalurgica': {
    pageTitle: 'ERP para zingueria y metalurgica | ZinkERP',
    pageDescription:
      'Ordena ventas, materiales, stock y facturacion en negocios de zingueria o metalurgica con ZinkERP.',
    caseName: 'La operacion de una zingueria o metalurgica',
    eyebrow: 'Zingueria y metalurgica',
    heroTitle: 'ZinkERP para zingueria y metalurgica',
    heroText:
      'Ordena ventas, materiales, facturacion y seguimiento comercial en negocios donde la operacion no termina en una venta de mostrador.',
    heroNote:
      'Lo presentamos como un caso a evaluar: puede servir muy bien para la parte comercial y administrativa, pero no prometemos procesos industriales que no esten validados.',
    pains: [
      'Ventas que combinan materiales, mano de obra y seguimiento comercial.',
      'Pedidos mas complejos que un ticket minorista tradicional.',
      'Necesidad de entender costos, materiales y requerimientos del cliente.',
      'Presupuestos manuales que pueden generar inconsistencias.',
      'Operacion personalizada que pierde visibilidad cuando todo queda repartido.',
      'Facturacion y seguimiento que no conviene manejar en sistemas separados.',
    ],
    helps: [
      {
        title: 'Base comun para ventas y clientes',
        text: 'ZinkERP puede ayudar a ordenar ventas, clientes y facturacion cuando la operacion comercial ya no entra en planillas o seguimiento manual.',
      },
      {
        title: 'Control sobre materiales y stock',
        text: 'Cuando hay materiales o productos involucrados, la gestion de stock puede dar mas orden sobre disponibilidad y movimiento.',
      },
      {
        title: 'Mas visibilidad administrativa',
        text: 'Dueños y encargados pueden seguir ventas, clientes y facturacion con mas orden administrativo.',
      },
      {
        title: 'Encaje honesto para flujos mixtos',
        text: 'Es una base operativa util cuando el negocio necesita ordenar la parte comercial sin asumir manufactura avanzada.',
      },
    ],
    features: [
      'Gestion de ventas',
      'Gestion de stock',
      'Facturacion',
      'Clientes',
      'Reportes',
      'Operacion a validar',
    ],
    workflows: [
      {
        title: 'Ingreso de ventas y pedidos',
        text: 'Registrar ventas y pedidos cuando el trabajo comercial sigue abierto mas alla de una venta rapida de mostrador.',
      },
      {
        title: 'Control de materiales',
        text: 'Tener mejor seguimiento de materiales o insumos cuando forman parte de la venta o del pedido.',
      },
      {
        title: 'Facturacion',
        text: 'Resolver la facturacion dentro del mismo circuito comercial, sin prometer procesos industriales no validados.',
      },
      {
        title: 'Seguimiento comercial',
        text: 'Ordenar consultas, pedidos o presupuestos cuando cada venta necesita mas seguimiento que un ticket simple.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    faqs: [
      {
        question: 'Sirve para negocios con productos y mano de obra?',
        answer:
          'Puede servir para ordenar ventas, materiales, clientes y facturacion. El alcance sobre procesos mas complejos debe validarse en demo.',
      },
      {
        question: 'Reemplaza un sistema de produccion o manufactura?',
        answer:
          'No es lo que prometemos. ZinkERP puede encajar como base comercial y administrativa, pero no afirmamos soporte de manufactura avanzada sin validacion.',
      },
      {
        question: 'Ayuda con presupuestos?',
        answer:
          'Puede ayudar a ordenar la informacion comercial alrededor de presupuestos o pedidos, aunque el flujo exacto hay que revisarlo segun el negocio.',
      },
      {
        question: 'Entonces para quien encaja mejor?',
        answer:
          'Para negocios donde el problema principal hoy es el desorden entre ventas, materiales, clientes y facturacion, mas que la gestion industrial en si misma.',
      },
    ],
    ctaTitle: 'Validemos el alcance para tu operacion',
    ctaText:
      'Podemos revisar ventas, materiales, pedidos y facturacion para ver hasta donde ZinkERP puede ordenar la parte comercial y administrativa de tu operacion.',
  },
  cultivos: {
    pageTitle: 'ERP para negocios vinculados a cultivos | ZinkERP',
    pageDescription:
      'Organiza ventas, stock, compras, facturacion y control operativo en negocios vinculados a cultivos con ZinkERP.',
    caseName: 'La operacion de negocios vinculados a cultivos',
    eyebrow: 'Cultivos',
    heroTitle: 'ZinkERP para operaciones vinculadas a cultivos',
    heroText:
      'Ordena ventas, stock, compras y facturacion en negocios donde la operacion alrededor de cultivos necesita una base comercial mas clara.',
    heroNote:
      'Sabemos que hay clientes en este segmento, pero preferimos presentarlo con foco en la parte comercial y administrativa, sin asumir funciones agronomicas o productivas especificas.',
    pains: [
      'Informacion comercial y administrativa repartida entre planillas, mensajes y memoria del equipo.',
      'Necesidad de controlar stock, compras o insumos con mas visibilidad.',
      'Ventas y facturacion que no conviene resolver por fuera del mismo sistema.',
      'Operaciones con sucursales, depositos o puntos de atencion que necesitan una base comun.',
      'Seguimiento de clientes, precios y movimientos con poco contexto consolidado.',
      'Crecimiento del negocio sin una plataforma unica para ordenar el dia a dia.',
    ],
    helps: [
      {
        title: 'Base comun para la operacion comercial',
        text: 'ZinkERP puede ayudar a ordenar ventas, stock y facturacion cuando la operacion comercial hoy se sigue entre planillas, mensajes y control manual.',
      },
      {
        title: 'Mas orden sobre insumos y movimientos',
        text: 'Cuando hay productos o insumos involucrados, la gestion de stock puede dar mas orden sobre disponibilidad y movimientos.',
      },
      {
        title: 'Mejor contexto para decisiones del negocio',
        text: 'Dueños y encargados pueden seguir ventas, compras y actividad administrativa con una mirada mas ordenada.',
      },
      {
        title: 'Encaje evaluado con criterio',
        text: 'Lo planteamos como un caso real, pero sin vender capacidades especificas del agro que deban revisarse aparte.',
      },
    ],
    features: [
      'Gestion de ventas',
      'Gestion de stock',
      'Facturacion',
      'Operacion multi-sucursal',
      'Reportes',
      'Control administrativo',
    ],
    workflows: [
      {
        title: 'Venta y registro comercial',
        text: 'Registrar ventas y actividad comercial en un mismo circuito cuando el negocio ya supero el seguimiento manual.',
      },
      {
        title: 'Control de stock o insumos',
        text: 'Seguir disponibilidad y movimientos cuando el negocio trabaja con stock, insumos o mas de un punto operativo.',
      },
      {
        title: 'Compras y reposicion',
        text: 'Tener mejor orden para revisar faltantes y necesidades de compra o abastecimiento.',
      },
      {
        title: 'Facturacion',
        text: 'Resolver la facturacion dentro del mismo circuito comercial, sin asumir funciones productivas especificas.',
      },
      {
        title: 'Seguimiento multi-sucursal',
        text: 'Cuando hay mas de un punto operativo, sumar visibilidad sobre ventas, stock y actividad diaria.',
      },
    ],
    integrations: [
      {
        name: 'Facturante',
        href: '/integraciones/facturante',
      },
      {
        name: 'Mercado Pago',
        href: '/integraciones/mercadopago',
      },
    ],
    faqs: [
      {
        question: 'ZinkERP esta pensado para cultivos?',
        answer:
          'No como vertical exclusivo. Lo que si puede aportar es una base operativa para la parte comercial, de stock y facturacion en negocios vinculados a cultivos.',
      },
      {
        question: 'Entonces por que lo muestran como caso?',
        answer:
          'Porque existen clientes en este segmento y sabemos que hay operaciones donde ZinkERP suma valor real. Aun asi, preferimos validar cada flujo antes de prometer alcance total.',
      },
      {
        question: 'Incluye gestion agronomica o productiva especifica?',
        answer:
          'No lo afirmamos de forma publica. Si tu operacion depende de procesos tecnicos propios del agro, ese punto debe revisarse en demo.',
      },
      {
        question: 'Sirve si tengo stock, compras y mas de una sucursal?',
        answer:
          'Puede ser un buen encaje si el problema principal es ordenar ventas, stock, facturacion y visibilidad operativa.',
      },
    ],
    ctaTitle: 'Validemos el caso de tu operacion vinculada a cultivos',
    ctaText:
      'En una demo podemos revisar ventas, stock, compras y sucursales para confirmar con honestidad hasta donde ZinkERP puede ordenar la parte comercial y administrativa.',
  },
};
