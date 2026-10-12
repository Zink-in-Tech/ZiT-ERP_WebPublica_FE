import { describe, expect, it } from 'vitest';
import { headingId, internalFragment, withHeadingAnchors } from './headingAnchors';

const heading = (text: string, style = 'h2', extra: Record<string, unknown> = {}) => ({
  _type: 'block',
  style,
  markDefs: [],
  children: [{ _type: 'span', text, marks: [] }],
  ...extra,
});

const link = (href: unknown) => ({
  _type: 'block',
  style: 'normal',
  markDefs: [{ _type: 'link', _key: 'l1', href }],
  children: [{ _type: 'span', text: 'Ir', marks: ['l1'] }],
});

const pageUrl = 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales/';

describe('headingId', () => {
  it('genera ids ASCII sin tildes, ñ, signos ni emojis', () => {
    expect(headingId('Controlá desvíos con inventarios cíclicos')).toBe('controla-desvios-con-inventarios-ciclicos');
    expect(headingId('🚀 Año de crecimiento: ¿qué cambió?')).toBe('ano-de-crecimiento-que-cambio');
  });
});

describe('withHeadingAnchors', () => {
  it('asigna ids a H1–H6, desambigua repetidos y omite títulos vacíos o dentro de listas', () => {
    const blocks = withHeadingAnchors([
      heading('Título', 'h1'),
      heading('Resumen', 'h2'),
      heading('Resumen', 'h3'),
      heading('Detalle', 'h4'),
      heading('Nota', 'h5'),
      heading('Fuente', 'h6'),
      heading('   ', 'h2'),
      heading('Ítem', 'h3', { listItem: 'bullet', level: 1 }),
      heading('Párrafo', 'normal'),
    ]);

    expect(blocks.map((block) => block.anchorId)).toEqual([
      'titulo',
      'resumen',
      'resumen-2',
      'detalle',
      'nota',
      'fuente',
      undefined,
      undefined,
      undefined,
    ]);
  });

  it('apunta enlaces internos acentuados, codificados o absolutos al id del título', () => {
    const blocks = withHeadingAnchors(
      [
        link('#registrá-cada-movimiento-donde-ocurre'),
        link('#registr%C3%A1-cada-movimiento-donde-ocurre'),
        link(`${pageUrl}#registr%C3%A1-cada-movimiento-donde-ocurre`),
        link('https://zinkerp.com/blog/como-controlar-stock-varias-sucursales#registra-cada-movimiento-donde-ocurre'),
        heading('Registrá cada movimiento donde ocurre'),
      ],
      { pageUrl },
    );

    expect(blocks.slice(0, 4).map((block) => block.markDefs[0].href)).toEqual(Array(4).fill('#registra-cada-movimiento-donde-ocurre'));
  });

  it('no toca enlaces externos, a otras páginas ni anclas sin título y no muta el contenido original', () => {
    const original = [
      link('https://quimicatortuguitas.com.ar/'),
      link('https://zinkerp.com/blog/otro-articulo#resumen'),
      link('#comentarios'),
      heading('Resumen'),
    ];
    const snapshot = JSON.stringify(original);
    const blocks = withHeadingAnchors(original, { pageUrl });

    expect(blocks.slice(0, 3).map((block) => block.markDefs[0].href)).toEqual([
      'https://quimicatortuguitas.com.ar/',
      'https://zinkerp.com/blog/otro-articulo#resumen',
      '#comentarios',
    ]);
    expect(JSON.stringify(original)).toBe(snapshot);
  });

  it('reconoce fragmentos internos solo para la misma página', () => {
    expect(internalFragment('#a%C3%B1o')).toBe('año');
    expect(internalFragment('/blog/como-controlar-stock-varias-sucursales#x', pageUrl)).toBe('x');
    expect(internalFragment('/precios#x', pageUrl)).toBeNull();
    expect(internalFragment(null)).toBeNull();
  });
});
