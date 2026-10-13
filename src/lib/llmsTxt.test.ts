import { describe, expect, it } from 'vitest';
import { buildLlmsTxt, parseBuiltPage } from './llmsTxt';

const page = (title: string, extraHead = '') => `<html><head><title>${title}</title>${extraHead}</head><body></body></html>`;

describe('parseBuiltPage', () => {
  it('uses the first title segment and decodes entities in the description', () => {
    const html = page('Inventario | ZinkERP - Stock multi-sucursal', '<meta name="description" content="Stock &amp; precios &quot;al día&quot;">');
    expect(parseBuiltPage({ path: '/producto/inventario/', html })).toEqual({
      path: '/producto/inventario/',
      title: 'Inventario',
      description: 'Stock & precios "al día"',
    });
  });

  it('labels the home page as Inicio', () => {
    expect(parseBuiltPage({ path: '/', html: page('ZinkERP | Gestión integral') })?.title).toBe('Inicio');
  });

  it('skips noindex pages, redirects and pages without a title', () => {
    expect(parseBuiltPage({ path: '/a/', html: page('A', '<meta name="robots" content="noindex, nofollow">') })).toBeNull();
    expect(parseBuiltPage({ path: '/b/', html: page('B', '<meta http-equiv="refresh" content="0;url=/c">') })).toBeNull();
    expect(parseBuiltPage({ path: '/c/', html: '<html><head></head></html>' })).toBeNull();
  });
});

describe('buildLlmsTxt', () => {
  const origin = 'https://zinkerp.com';

  it('starts with an H1 and a summary, and groups Markdown links by section', () => {
    const text = buildLlmsTxt(
      [
        { path: '/modulos/crm/', title: 'Módulo CRM', description: 'Clientes' },
        { path: '/', title: 'Inicio', description: 'Home' },
        { path: '/producto/inventario/', title: 'Inventario', description: 'Stock' },
      ],
      origin,
    );

    expect(text.startsWith('# ZinkERP\n\n> ')).toBe(true);
    expect(text).toContain('## Producto\n\n- [Inicio](https://zinkerp.com/): Home\n- [Inventario](https://zinkerp.com/producto/inventario/): Stock');
    expect(text).toContain('## Módulos\n\n- [Módulo CRM](https://zinkerp.com/modulos/crm/): Clientes');
    expect(text).not.toContain('## Integraciones');
  });

  it('links blog articles to their Markdown version and leaves out category pages', () => {
    const text = buildLlmsTxt(
      [
        { path: '/blog/como-controlar-stock/', title: 'Cómo controlar stock' },
        { path: '/blog/categoria/optimizacion/', title: 'Optimización' },
      ],
      origin,
    );

    expect(text).toContain('- [Cómo controlar stock](https://zinkerp.com/blog/como-controlar-stock.md)');
    expect(text).not.toContain('Optimización');
  });

  it('drops a description repeated across pages because it is the site-wide fallback', () => {
    const text = buildLlmsTxt(
      [
        { path: '/modulos/crm/', title: 'CRM', description: 'Genérica' },
        { path: '/modulos/rrhh/', title: 'RRHH', description: 'Genérica' },
      ],
      origin,
    );

    expect(text).toContain('- [CRM](https://zinkerp.com/modulos/crm/)\n');
    expect(text).not.toContain('Genérica');
  });
});
