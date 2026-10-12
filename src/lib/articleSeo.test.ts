import { describe, expect, it } from 'vitest';
import { buildBlogPostingJsonLd, buildMetaDescription, serializeJsonLd, truncateAtWord } from './articleSeo';

const block = (text: string, extra: Record<string, unknown> = {}) => ({
  _type: 'block',
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', text, marks: [] }],
  ...extra,
});

describe('descripción para buscadores y redes', () => {
  it('usa la descripción cargada en Sanity cuando existe', () => {
    expect(buildMetaDescription('  Guía para   controlar stock. ', [block('Otro texto')])).toBe('Guía para controlar stock.');
  });

  it('sin descripción, resume la introducción hasta el primer título o lista', () => {
    const body = [
      block('Controlar varias sucursales desde planillas separadas suele producir una certeza falsa.'),
      block('Si buscás cómo controlar el stock, necesitás distinguir qué hay en cada local.'),
      block('Este párrafo ya no hace falta porque alcanzó el mínimo.'),
      block('Título', { style: 'h2' }),
    ];
    expect(buildMetaDescription(null, body)).toBe(
      'Controlar varias sucursales desde planillas separadas suele producir una certeza falsa. Si buscás cómo controlar el stock, necesitás distinguir qué hay en…',
    );
  });

  it('si el artículo empieza con un título o una lista, usa los primeros párrafos sin tomar su texto', () => {
    const body = [
      block('Introducción', { style: 'h2' }),
      block('Índice', { listItem: 'bullet' }),
      block('Primer párrafo real.'),
      block('Segundo párrafo.'),
      block('Otra sección', { style: 'h2' }),
      block('No entra porque es de otra sección.'),
    ];
    expect(buildMetaDescription('', body)).toBe('Primer párrafo real. Segundo párrafo.');
  });

  it('devuelve undefined si no hay párrafos', () => {
    expect(buildMetaDescription('', [block('Solo un título', { style: 'h2' })])).toBeUndefined();
    expect(buildMetaDescription(undefined, null)).toBeUndefined();
  });

  it('corta en palabra completa sin dejar puntuación colgando', () => {
    expect(truncateAtWord('uno dos, tres cuatro', 12)).toBe('uno dos…');
    expect(truncateAtWord('corto', 12)).toBe('corto');
  });
});

describe('datos estructurados del artículo', () => {
  const base = {
    title: 'Cómo controlar el stock de varias sucursales',
    url: 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales/',
    siteUrl: 'https://zinkerp.com/',
    logoUrl: 'https://zinkerp.com/zinkerp-logo.png',
  };

  it('arma un BlogPosting completo', () => {
    expect(
      buildBlogPostingJsonLd({
        ...base,
        description: 'Resumen',
        imageUrl: 'https://cdn.sanity.io/images/x.jpg',
        publishedAt: '2026-09-21T12:00:00Z',
        modifiedAt: '2026-10-12T23:16:59Z',
        authorName: 'Fernando Demaio',
        section: 'Logística Eficiente',
        keywords: ['Logística Eficiente', 'Stock'],
      }),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: base.title,
      description: 'Resumen',
      image: ['https://cdn.sanity.io/images/x.jpg'],
      datePublished: '2026-09-21T12:00:00Z',
      dateModified: '2026-10-12T23:16:59Z',
      author: { '@type': 'Person', name: 'Fernando Demaio' },
      publisher: { '@type': 'Organization', name: 'ZinkERP', url: base.siteUrl, logo: { '@type': 'ImageObject', url: base.logoUrl } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': base.url },
      url: base.url,
      inLanguage: 'es-AR',
      articleSection: 'Logística Eficiente',
      keywords: 'Logística Eficiente, Stock',
    });
  });

  it('omite los campos que faltan y usa la fecha de publicación como modificación', () => {
    const data = buildBlogPostingJsonLd({ ...base, publishedAt: '2026-09-21' });
    expect(data).not.toHaveProperty('description');
    expect(data).not.toHaveProperty('image');
    expect(data).not.toHaveProperty('author');
    expect(data.dateModified).toBe('2026-09-21');
  });

  it('serializa sin permitir cerrar el <script>', () => {
    expect(serializeJsonLd({ headline: '</script><b>' })).toBe('{"headline":"\\u003c/script>\\u003cb>"}');
  });
});
