import { describe, expect, it } from 'vitest';
import publishedArticle from './__fixtures__/como-controlar-stock-varias-sucursales.json';
import {
  AGENT_INSTRUCTIONS,
  buildArticleMarkdown,
  headingId,
  normalizeHref,
  portableTextToMarkdown,
  type PortableTextImageNode,
} from './blogMarkdown';

let keySeed = 0;
const key = () => `k${(keySeed += 1)}`;

type SpanInput = string | { text: string; marks?: string[] };

function block(
  children: SpanInput[],
  extra: { style?: string; listItem?: string; level?: number; markDefs?: Array<Record<string, unknown>> } = {},
) {
  return {
    _type: 'block',
    _key: key(),
    style: extra.style ?? 'normal',
    ...(extra.listItem ? { listItem: extra.listItem, level: extra.level ?? 1 } : {}),
    markDefs: extra.markDefs ?? [],
    children: children.map((child) =>
      typeof child === 'string'
        ? { _type: 'span', _key: key(), text: child, marks: [] }
        : { _type: 'span', _key: key(), text: child.text, marks: child.marks ?? [] },
    ),
  };
}

function linkBlock(text: string, href: unknown, extra: Parameters<typeof block>[1] = {}) {
  return block([{ text, marks: ['lnk'] }], { ...extra, markDefs: [{ _type: 'link', _key: 'lnk', href }] });
}

const resolveImageUrl = (image: PortableTextImageNode) => {
  const match = image.asset?._ref?.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/);
  return match ? `https://cdn.sanity.io/images/proj/production/${match[1]}-${match[2]}.${match[3]}` : null;
};

const options = {
  baseUrl: 'https://zinkerp.com',
  pageUrl: 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales',
  resolveImageUrl,
};

describe('portableTextToMarkdown — títulos', () => {
  it('convierte h1 a h4 en encabezados ATX con id explícito y conserva el formato inline', () => {
    const markdown = portableTextToMarkdown([
      block(['Título principal'], { style: 'h1' }),
      block(['Definí una única fuente de stock'], { style: 'h2' }),
      block([{ text: 'La Trampa del Cumplimiento', marks: ['strong'] }], { style: 'h3' }),
      block(['Detalle'], { style: 'h4' }),
    ]);

    expect(markdown).toBe(
      [
        '# <a id="titulo-principal"></a>Título principal',
        '## <a id="defini-una-unica-fuente-de-stock"></a>Definí una única fuente de stock',
        '### <a id="la-trampa-del-cumplimiento"></a>**La Trampa del Cumplimiento**',
        '#### <a id="detalle"></a>Detalle',
      ].join('\n\n'),
    );
  });

  it('genera ids ASCII estables: sin tildes, ñ ni emojis, y desambigua repetidos', () => {
    expect(headingId('Controlá desvíos con inventarios cíclicos')).toBe('controla-desvios-con-inventarios-ciclicos');
    expect(headingId('🚀 Año de crecimiento: ¿qué cambió?')).toBe('ano-de-crecimiento-que-cambio');

    const markdown = portableTextToMarkdown([
      block(['Resumen'], { style: 'h2' }),
      block(['Resumen'], { style: 'h2' }),
      block(['🚀'], { style: 'h3' }),
    ]);

    expect(markdown).toBe(
      ['## <a id="resumen"></a>Resumen', '## <a id="resumen-2"></a>Resumen', '### <a id="seccion"></a>🚀'].join('\n\n'),
    );
  });

  it('mueve los espacios fuera de los delimitadores para que el Markdown siga siendo válido', () => {
    const markdown = portableTextToMarkdown([
      block([{ text: 'Inexistencia de procesos: ', marks: ['strong'] }, 'la falta de procesos ', { text: 'simples', marks: ['em'] }, '.']),
    ]);

    expect(markdown).toBe('**Inexistencia de procesos:** la falta de procesos *simples*.');
  });

  it('escapa caracteres que Markdown interpretaría como sintaxis', () => {
    const markdown = portableTextToMarkdown([block(['# no es título']), block(['1. no es lista']), block(['precio *especial* [beta]'])]);

    expect(markdown).toBe(['\\# no es título', '1\\. no es lista', 'precio \\*especial\\* \\[beta\\]'].join('\n\n'));
  });

  it('agrupa citas consecutivas en un solo bloque', () => {
    const markdown = portableTextToMarkdown([
      block(['La documentación ayudó a los equipos.'], { style: 'blockquote' }),
      linkBlock('Portal docs.zinkerp.com', 'http://docs.zinkerp.com', { style: 'blockquote' }),
    ]);

    expect(markdown).toBe('> La documentación ayudó a los equipos.\n>\n> [Portal docs.zinkerp.com](https://docs.zinkerp.com)');
  });
});

describe('portableTextToMarkdown — listas', () => {
  it('genera listas con viñetas sin líneas en blanco entre ítems', () => {
    const markdown = portableTextToMarkdown([
      block(['Introducción']),
      block([{ text: 'Simplificación:', marks: ['strong'] }, ' menos pasos'], { listItem: 'bullet' }),
      block(['Visibilidad'], { listItem: 'bullet' }),
      block(['Cierre']),
    ]);

    expect(markdown).toBe('Introducción\n\n- **Simplificación:** menos pasos\n- Visibilidad\n\nCierre');
  });

  it('numera listas ordenadas y reinicia el contador en una lista nueva', () => {
    const markdown = portableTextToMarkdown([
      block(['una ficha única por artículo;'], { listItem: 'number' }),
      block(['una ubicación por sucursal;'], { listItem: 'number' }),
      block(['una unidad de medida común.'], { listItem: 'number' }),
      block(['Otro tema']),
      block(['primer paso'], { listItem: 'number' }),
    ]);

    expect(markdown).toBe(
      '1. una ficha única por artículo;\n2. una ubicación por sucursal;\n3. una unidad de medida común.\n\nOtro tema\n\n1. primer paso',
    );
  });

  it('indenta subniveles según el ancho del marcador padre', () => {
    const markdown = portableTextToMarkdown([
      block(['Paso'], { listItem: 'number' }),
      block(['detalle'], { listItem: 'bullet', level: 2 }),
      block(['sub detalle'], { listItem: 'bullet', level: 3 }),
      block(['Otro paso'], { listItem: 'number' }),
    ]);

    expect(markdown).toBe('1. Paso\n   - detalle\n     - sub detalle\n2. Otro paso');
  });

  it('ignora bloques vacíos entre ítems sin cortar la lista', () => {
    const markdown = portableTextToMarkdown([
      block(['Proceso simple'], { listItem: 'bullet' }),
      block(['\n\n']),
      block(['Catálogo flexible'], { listItem: 'bullet' }),
    ]);

    expect(markdown).toBe('- Proceso simple\n- Catálogo flexible');
  });
});

describe('portableTextToMarkdown — enlaces', () => {
  it('conserva enlaces externos tal como fueron cargados', () => {
    const markdown = portableTextToMarkdown(
      [
        block(['Seguinos en ', { text: 'YouTube', marks: ['yt'] }, ' para más tips.'], {
          markDefs: [{ _type: 'link', _key: 'yt', href: 'https://www.youtube.com/@zinkintech' }],
        }),
        linkBlock('Química Tortuguitas', 'https://quimicatortuguitas.com.ar/'),
        linkBlock('Sitio heredado', 'http://example.com/ruta?x=1'),
      ],
      options,
    );

    expect(markdown).toBe(
      [
        'Seguinos en [YouTube](https://www.youtube.com/@zinkintech) para más tips.',
        '[Química Tortuguitas](https://quimicatortuguitas.com.ar/)',
        '[Sitio heredado](http://example.com/ruta?x=1)',
      ].join('\n\n'),
    );
  });

  it('normaliza a HTTPS los enlaces a zinkerp.com y sus subdominios', () => {
    const markdown = portableTextToMarkdown(
      [linkBlock('Portal docs.zinkerp.com', 'http://docs.zinkerp.com'), linkBlock('Precios', 'http://zinkerp.com/precios#planes')],
      options,
    );

    expect(markdown).toBe('[Portal docs.zinkerp.com](https://docs.zinkerp.com)\n\n[Precios](https://zinkerp.com/precios#planes)');
    expect(normalizeHref('http://notzinkerp.com', options)).toBe('http://notzinkerp.com');
  });

  it('convierte rutas relativas del sitio en URLs absolutas', () => {
    expect(portableTextToMarkdown([linkBlock('Ver precios', '/precios')], options)).toBe('[Ver precios](https://zinkerp.com/precios)');
  });

  it('combina enlaces con decoradores', () => {
    const markdown = portableTextToMarkdown([
      block([{ text: 'Linktree', marks: ['strong', 'lt'] }], { markDefs: [{ _type: 'link', _key: 'lt', href: 'https://linktr.ee/' }] }),
    ]);

    expect(markdown).toBe('[**Linktree**](https://linktr.ee/)');
  });

  it('deja solo el texto cuando el enlace no tiene href o usa un protocolo inseguro', () => {
    const markdown = portableTextToMarkdown([
      linkBlock('sin destino', null),
      linkBlock('peligroso', 'javascript:alert(1)'),
      linkBlock('datos', 'data:text/html;base64,PHNjcmlwdD4='),
    ]);

    expect(markdown).toBe('sin destino\n\npeligroso\n\ndatos');
  });

  it('codifica espacios y paréntesis en el destino', () => {
    expect(portableTextToMarkdown([linkBlock('Wiki', 'https://es.wikipedia.org/wiki/ERP_(software) v2')])).toBe(
      '[Wiki](https://es.wikipedia.org/wiki/ERP_%28software%29%20v2)',
    );
  });
});

describe('portableTextToMarkdown — anclas internas', () => {
  const sections = [
    block(['Definí una única fuente de stock por sucursal'], { style: 'h2' }),
    block(['Registrá cada movimiento donde ocurre'], { style: 'h2' }),
  ];

  it('apunta las anclas acentuadas al id ASCII real del encabezado', () => {
    const markdown = portableTextToMarkdown(
      [
        linkBlock('Definí una única fuente de stock por sucursal', '#definí-una-única-fuente-de-stock-por-sucursal', { listItem: 'bullet' }),
        ...sections,
      ],
      options,
    );

    expect(markdown).toBe(
      [
        '- [Definí una única fuente de stock por sucursal](#defini-una-unica-fuente-de-stock-por-sucursal)',
        '## <a id="defini-una-unica-fuente-de-stock-por-sucursal"></a>Definí una única fuente de stock por sucursal',
        '## <a id="registra-cada-movimiento-donde-ocurre"></a>Registrá cada movimiento donde ocurre',
      ].join('\n\n'),
    );
  });

  it('resuelve anclas con percent-encoding al mismo id del encabezado', () => {
    const markdown = portableTextToMarkdown(
      [linkBlock('Registrá cada movimiento', '#registr%C3%A1-cada-movimiento-donde-ocurre'), ...sections],
      options,
    );

    expect(markdown.split('\n\n')[0]).toBe('[Registrá cada movimiento](#registra-cada-movimiento-donde-ocurre)');
  });

  it('resuelve enlaces a la misma página con hash y deja intactas las anclas sin encabezado', () => {
    const markdown = portableTextToMarkdown(
      [
        linkBlock('Transferencias', 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales/#registr%C3%A1-cada-movimiento-donde-ocurre'),
        linkBlock('Comentarios', '#comentarios'),
        ...sections,
      ],
      options,
    );

    expect(markdown.split('\n\n').slice(0, 2)).toEqual([
      '[Transferencias](#registra-cada-movimiento-donde-ocurre)',
      '[Comentarios](#comentarios)',
    ]);
  });

  it('convierte enlaces absolutos a la misma página en anclas del documento', () => {
    expect(
      normalizeHref('https://zinkerp.com/blog/como-controlar-stock-varias-sucursales/#orden%C3%A1-las-transferencias-entre-locales', options),
    ).toBe('#ordená-las-transferencias-entre-locales');
    expect(normalizeHref('https://zinkerp.com/blog/otro-articulo#intro', options)).toBe('https://zinkerp.com/blog/otro-articulo#intro');
  });
});

describe('portableTextToMarkdown — imágenes', () => {
  it('incluye URL pública, texto alternativo y epígrafe en su posición original', () => {
    const markdown = portableTextToMarkdown(
      [
        block(['Definí una única fuente de stock por sucursal'], { style: 'h2' }),
        {
          _type: 'image',
          _key: key(),
          alt: 'Consulta de inventario de zinkERP con las existencias por sucursal.',
          caption: 'La consulta de inventario muestra el stock por sucursal.',
          asset: { _ref: 'image-2e45171ad174ebd689277284d0e49cd4674060cd-2070x760-png', _type: 'reference' },
        },
        block(['El control empieza con un sistema central.']),
      ],
      options,
    );

    expect(markdown).toBe(
      [
        '## <a id="defini-una-unica-fuente-de-stock-por-sucursal"></a>Definí una única fuente de stock por sucursal',
        '![Consulta de inventario de zinkERP con las existencias por sucursal.](https://cdn.sanity.io/images/proj/production/2e45171ad174ebd689277284d0e49cd4674060cd-2070x760.png)',
        '*La consulta de inventario muestra el stock por sucursal.*',
        'El control empieza con un sistema central.',
      ].join('\n\n'),
    );
  });

  it('escapa corchetes del texto alternativo y omite el epígrafe si no existe', () => {
    const markdown = portableTextToMarkdown(
      [{ _type: 'image', alt: 'Pantalla [beta]', asset: { _ref: 'image-cbdf9513b76cc2231185f0eee174e598cf89309d-768x1024-jpg' } }],
      options,
    );

    expect(markdown).toBe('![Pantalla \\[beta\\]](https://cdn.sanity.io/images/proj/production/cbdf9513b76cc2231185f0eee174e598cf89309d-768x1024.jpg)');
  });

  it('nunca incrusta imágenes en base64 ni referencias internas del CMS', () => {
    const markdown = portableTextToMarkdown(
      [
        { _type: 'image', alt: 'inline', asset: { url: 'data:image/png;base64,iVBORw0KGgo=' } },
        { _type: 'image', alt: 'sin asset' },
        block(['Texto visible']),
      ],
      { resolveImageUrl: () => null },
    );

    expect(markdown).toBe('Texto visible');
    expect(markdown).not.toContain('base64');
  });
});

describe('buildArticleMarkdown', () => {
  const article = {
    title: 'Cómo controlar el stock en varias sucursales',
    canonicalUrl: 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales',
    publishedAt: '2025-08-06T19:11:33Z',
    categories: [{ title: 'Logística Eficiente' }],
    author: { name: 'Fernando Demaio' },
    mainImageUrl: 'https://cdn.sanity.io/images/proj/production/abc-2048x1152.png',
    body: [
      block(['Introducción.']),
      {
        _type: 'image',
        _key: 'internal-key-123',
        alt: 'Inventario',
        asset: { _ref: 'image-2e45171ad174ebd689277284d0e49cd4674060cd-2070x760-png', _type: 'reference' },
      },
    ],
  };

  it('arma encabezado con metadatos, cuerpo completo e instrucciones al final', () => {
    const markdown = buildArticleMarkdown({ ...article, description: 'Guía práctica para unificar el stock.' }, options);

    expect(markdown).toBe(
      [
        '# Cómo controlar el stock en varias sucursales',
        [
          '- **URL canónica:** https://zinkerp.com/blog/como-controlar-stock-varias-sucursales',
          '- **Fecha de publicación:** 2025-08-06',
          '- **Categoría:** Logística Eficiente',
          '- **Autor:** Fernando Demaio',
          '- **Descripción:** Guía práctica para unificar el stock.',
        ].join('\n'),
        '![Cómo controlar el stock en varias sucursales](https://cdn.sanity.io/images/proj/production/abc-2048x1152.png)',
        'Introducción.',
        '![Inventario](https://cdn.sanity.io/images/proj/production/2e45171ad174ebd689277284d0e49cd4674060cd-2070x760.png)',
        '---',
        AGENT_INSTRUCTIONS,
      ].join('\n\n') + '\n',
    );
  });

  it('omite metadatos inexistentes y pluraliza categorías', () => {
    const markdown = buildArticleMarkdown(
      { ...article, publishedAt: null, author: null, mainImageUrl: null, categories: [{ title: 'Administración' }, { title: 'Optimización' }] },
      options,
    );

    expect(markdown).toContain('- **Categorías:** Administración, Optimización');
    expect(markdown).not.toMatch(/Fecha de publicación|Autor|Descripción/);
  });

  it('termina con la guía para el agente exactamente como fue definida', () => {
    const markdown = buildArticleMarkdown(article, options);

    expect(markdown.endsWith(`${AGENT_INSTRUCTIONS}\n`)).toBe(true);
    expect(AGENT_INSTRUCTIONS).toContain('Usá https://docs.zinkerp.com como fuente oficial');
  });

  it('no filtra claves ni referencias internas de Sanity', () => {
    const markdown = buildArticleMarkdown(article, options);

    expect(markdown).not.toMatch(/_key|_ref|_type|internal-key-123|image-2e45171a/);
  });
});

describe('artículo publicado: como-controlar-stock-varias-sucursales', () => {
  const canonicalUrl = 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales/';
  const markdown = buildArticleMarkdown({ ...publishedArticle, canonicalUrl }, { baseUrl: 'https://zinkerp.com', resolveImageUrl });

  it('cada enlace del índice apunta a un id ASCII que existe exactamente una vez', () => {
    const targets = [...markdown.matchAll(/\]\(#([^)]+)\)/g)].map((match) => match[1]);
    const ids = [...markdown.matchAll(/<a id="([^"]+)"><\/a>/g)].map((match) => match[1]);

    expect(targets).toEqual([
      'defini-una-unica-fuente-de-stock-por-sucursal',
      'registra-cada-movimiento-donde-ocurre',
      'ordena-las-transferencias-entre-locales',
      'reparti-permisos-y-responsabilidades',
      'controla-desvios-con-inventarios-ciclicos',
      'lee-indicadores-que-permitan-decidir',
      'empeza-por-el-circuito-que-mas-diferencias-genera',
    ]);
    for (const target of targets) {
      expect(ids.filter((id) => id === target)).toHaveLength(1);
    }
    expect(ids.every((id) => /^[a-z0-9-]+$/.test(id))).toBe(true);
  });

  it('conserva enlaces externos y normaliza la documentación a HTTPS', () => {
    expect(markdown).toContain('[Química Tortuguitas](https://quimicatortuguitas.com.ar/)');
    expect(markdown).toContain('> Portal [docs.zinkerp.com](https://docs.zinkerp.com)');
    expect(markdown).not.toContain('http://docs.zinkerp.com');
  });

  it('incluye las imágenes con URL pública, texto alternativo y epígrafe', () => {
    expect(markdown).toContain(`![Cómo controlar el stock de varias sucursales](${publishedArticle.mainImageUrl})`);
    expect(markdown).toContain(
      '![Consulta de inventario de zinkERP con las existencias de un producto discriminadas por organización o sucursal.](https://cdn.sanity.io/images/proj/production/2e45171ad174ebd689277284d0e49cd4674060cd-2070x760.png)\n\n*La consulta de inventario muestra el stock registrado para un producto en distintas organizaciones o sucursales.*',
    );
  });

  it('mantiene intacto el texto del artículo y cierra con la guía para el agente', () => {
    const readable = markdown.replace(/<a id="[^"]+"><\/a>/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\\(.)/g, '$1');
    const paragraphs = publishedArticle.body
      .filter((node) => node._type === 'block')
      .map((node) => (node.children ?? []).map((child) => child.text ?? '').join('').trim())
      .filter(Boolean);

    for (const text of paragraphs) expect(readable).toContain(text);
    expect(markdown.endsWith(`\n\n---\n\n${AGENT_INSTRUCTIONS}\n`)).toBe(true);
    expect(markdown.split(AGENT_INSTRUCTIONS)).toHaveLength(2);
  });
});
