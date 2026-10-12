import { PortableText } from '@portabletext/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { withHeadingAnchors } from '../lib/headingAnchors';
import { getYouTubeVideoId, portableTextComponents } from './PortableTextComponents';

type SpanInput = string | { text: string; marks?: string[] };

const block = (children: SpanInput[], extra: Record<string, unknown> = {}) => ({
  _type: 'block',
  style: 'normal',
  markDefs: [],
  ...extra,
  children: children.map((child) =>
    typeof child === 'string' ? { _type: 'span', text: child, marks: [] } : { _type: 'span', marks: [], ...child },
  ),
});

function render(content: unknown[], pageUrl?: string): string {
  const value = withHeadingAnchors(content as object[], { pageUrl }) as Parameters<typeof PortableText>[0]['value'];
  return renderToStaticMarkup(<PortableText value={value} components={portableTextComponents} onMissingComponent={false} />);
}

describe('PortableTextComponents — bloques de texto', () => {
  it('renderiza párrafos y omite los vacíos', () => {
    expect(render([block(['Hola']), block(['\n\n'])])).toBe('<p>Hola</p>');
  });

  it('renderiza H1–H6 con id ASCII y clase por nivel', () => {
    const html = render(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((style, index) => block([`Título ${index + 1}`], { style })));

    for (let level = 1; level <= 6; level += 1) {
      expect(html).toContain(`<h${level} id="titulo-${level}" class="blog-content__heading blog-content__h${level}">Título ${level}</h${level}>`);
    }
  });

  it('renderiza citas', () => {
    expect(render([block(['Documentación accesible'], { style: 'blockquote' })])).toBe('<blockquote>Documentación accesible</blockquote>');
  });

  it('renderiza listas con viñetas, numeradas y anidadas', () => {
    const html = render([
      block(['Uno'], { listItem: 'number', level: 1 }),
      block(['Detalle'], { listItem: 'bullet', level: 2 }),
      block(['Dos'], { listItem: 'number', level: 1 }),
      block(['Suelto'], { listItem: 'bullet', level: 1 }),
    ]);

    expect(html).toBe('<ol><li>Uno<ul><li>Detalle</li></ul></li><li>Dos</li></ol><ul><li>Suelto</li></ul>');
  });

  it('renderiza negrita, cursiva, código en línea, subrayado y tachado', () => {
    const html = render([
      block([
        { text: 'n', marks: ['strong'] },
        { text: 'c', marks: ['em'] },
        { text: 'stock_total', marks: ['code'] },
        { text: 's', marks: ['underline'] },
        { text: 't', marks: ['strike-through'] },
      ]),
    ]);

    expect(html).toBe('<p><strong>n</strong><em>c</em><code>stock_total</code><u>s</u><s>t</s></p>');
  });
});

describe('PortableTextComponents — enlaces', () => {
  const pageUrl = 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales/';
  const withLink = (href: unknown) => block([{ text: 'enlace', marks: ['l'] }], { markDefs: [{ _type: 'link', _key: 'l', href }] });

  it('conserva enlaces externos y relativos, y normaliza zinkerp.com a HTTPS', () => {
    const html = render([withLink('https://quimicatortuguitas.com.ar/'), withLink('/precios'), withLink('http://docs.zinkerp.com')]);

    expect(html).toBe(
      '<p><a href="https://quimicatortuguitas.com.ar/">enlace</a></p><p><a href="/precios">enlace</a></p><p><a href="https://docs.zinkerp.com">enlace</a></p>',
    );
  });

  it('lleva las anclas internas al id real del título', () => {
    const html = render([withLink('#registr%C3%A1-cada-movimiento-donde-ocurre'), block(['Registrá cada movimiento donde ocurre'], { style: 'h2' })], pageUrl);

    expect(html).toContain('<a href="#registra-cada-movimiento-donde-ocurre">enlace</a>');
    expect(html).toContain('<h2 id="registra-cada-movimiento-donde-ocurre"');
  });

  it('descarta destinos vacíos o inseguros y deja el texto', () => {
    expect(render([withLink(null), withLink('javascript:alert(1)')])).toBe('<p>enlace</p><p>enlace</p>');
  });
});

describe('PortableTextComponents — medios, código, tablas y separadores', () => {
  it('renderiza imágenes con URL pública, alt, epígrafe, srcset y dimensiones', () => {
    const html = render([
      {
        _type: 'image',
        alt: 'Consulta de inventario',
        caption: 'Stock por sucursal',
        asset: { _ref: 'image-2e45171ad174ebd689277284d0e49cd4674060cd-2070x760-png', _type: 'reference' },
      },
    ]);

    expect(html).toMatch(/^<figure class="blog-content__figure"><img src="https:\/\/cdn\.sanity\.io\/images\/[^"]+2e45171ad174ebd689277284d0e49cd4674060cd-2070x760\.png\?[^"]*w=1440/);
    expect(html).toContain('640w');
    expect(html).toContain('alt="Consulta de inventario" width="2070" height="760" loading="lazy"');
    expect(html).toContain('<figcaption>Stock por sucursal</figcaption></figure>');
  });

  it('usa alt vacío para imágenes decorativas y omite imágenes sin asset', () => {
    expect(render([{ _type: 'image', asset: { _ref: 'image-abc-10x10-jpg' } }])).toContain('alt=""');
    expect(render([{ _type: 'image', alt: 'sin asset' }])).toBe('');
  });

  it('incrusta YouTube responsivo con youtube-nocookie y enlaza si la URL no es válida', () => {
    const html = render([{ _type: 'youtube', url: 'https://www.youtube.com/watch?v=mCRjK_AQtDo', title: 'Demo' }]);

    expect(html).toContain('<div class="blog-content__video-frame"><iframe src="https://www.youtube-nocookie.com/embed/mCRjK_AQtDo" title="Demo" loading="lazy"');
    expect(html).toContain('<figcaption>Demo</figcaption>');
    expect(render([{ _type: 'youtube', url: 'https://www.youtube.com/@zinkintech' }])).toBe(
      '<p><a href="https://www.youtube.com/@zinkintech">Ver video en YouTube</a></p>',
    );
  });

  it('reconoce los formatos habituales de URL de YouTube', () => {
    for (const url of ['https://youtu.be/mCRjK_AQtDo', 'https://youtube.com/shorts/mCRjK_AQtDo', 'https://m.youtube.com/watch?v=mCRjK_AQtDo&t=3']) {
      expect(getYouTubeVideoId(url)).toBe('mCRjK_AQtDo');
    }
    expect(getYouTubeVideoId('https://example.com/watch?v=mCRjK_AQtDo')).toBeNull();
  });

  it('renderiza bloques de código con etiqueta y desplazamiento accesible', () => {
    expect(render([{ _type: 'codeSnippet', language: 'sql', code: 'SELECT 1;\n' }])).toBe(
      '<figure class="blog-content__code"><figcaption>sql</figcaption><pre tabindex="0" aria-label="Código: sql"><code>SELECT 1;</code></pre></figure>',
    );
  });

  it('renderiza tablas con encabezado, epígrafe y región desplazable', () => {
    const html = render([
      {
        _type: 'contentTable',
        caption: 'Stock por sucursal',
        rows: [{ cells: ['Sucursal', 'Stock'] }, { cells: ['Centro', '229'] }, { cells: ['Pilar'] }],
      },
    ]);

    const captionId = html.match(/<figcaption id="([^"]+)">/)?.[1];
    expect(captionId).toBeTruthy();
    expect(html).toBe(
      `<figure class="blog-content__table"><figcaption id="${captionId}">Stock por sucursal</figcaption>` +
        `<div class="blog-content__table-scroll" role="region" aria-label="Stock por sucursal" tabindex="0"><table aria-labelledby="${captionId}">` +
        '<thead><tr><th scope="col">Sucursal</th><th scope="col">Stock</th></tr></thead>' +
        '<tbody><tr><td>Centro</td><td>229</td></tr><tr><td>Pilar</td><td></td></tr></tbody></table></div></figure>',
    );
  });

  it('renderiza tablas sin fila de encabezado', () => {
    expect(render([{ _type: 'contentTable', hasHeader: false, rows: [{ cells: ['a', 'b'] }] }])).toContain(
      '<table><tbody><tr><td>a</td><td>b</td></tr></tbody></table>',
    );
  });

  it('renderiza separadores e ignora tipos desconocidos sin romper', () => {
    expect(render([{ _type: 'divider' }, { _type: 'desconocido', secreto: 'x' }, block(['Fin'])])).toBe(
      '<hr class="blog-content__divider"/><p>Fin</p>',
    );
  });
});
