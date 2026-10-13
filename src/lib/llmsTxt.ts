export interface BuiltPage {
  /** Site path with trailing slash, e.g. `/producto/inventario/`. */
  path: string;
  html: string;
}

export interface LlmsEntry {
  path: string;
  title: string;
  description?: string;
}

interface Section {
  heading: string;
  matches: (path: string) => boolean;
}

const SECTIONS: Section[] = [
  { heading: 'Producto', matches: (p) => p === '/' || /^\/(producto|precios|clientes|funcionalidades)\//.test(p) },
  { heading: 'Módulos', matches: (p) => p.startsWith('/modulos/') },
  { heading: 'Integraciones', matches: (p) => p.startsWith('/integraciones/') },
  { heading: 'Casos de uso', matches: (p) => p.startsWith('/casos-de-uso/') },
  { heading: 'Herramientas gratuitas', matches: (p) => p.startsWith('/recursos/') },
  { heading: 'Blog', matches: (p) => /^\/blog\/(?!categoria\/)[^/]+\/$/.test(p) },
];

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === '#') {
      const value = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isNaN(value) ? match : String.fromCodePoint(value);
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

function metaContent(html: string, name: string): string | undefined {
  const tag = html.match(new RegExp(`<meta[^>]+name="${name}"[^>]*>`, 'i'))?.[0];
  const content = tag?.match(/content="([^"]*)"/i)?.[1];
  return content === undefined ? undefined : decodeEntities(content).trim();
}

/** Returns null for pages agents should not be pointed to: noindex, redirects and error pages. */
export function parseBuiltPage({ path, html }: BuiltPage): LlmsEntry | null {
  if (/<meta[^>]+http-equiv="refresh"/i.test(html)) return null;
  if (/noindex/i.test(metaContent(html, 'robots') ?? '')) return null;

  const rawTitle = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  if (!rawTitle) return null;
  const [first, ...rest] = decodeEntities(rawTitle).split(' | ').map((part) => part.trim());
  const title = path === '/' ? 'Inicio' : first || rest.join(' | ');

  return { path, title, description: metaContent(html, 'description') || undefined };
}

function linkFor(entry: LlmsEntry, origin: string, isBlog: boolean): string {
  // Blog articles also exist as Markdown, which is cheaper for agents to read.
  const href = isBlog ? `${origin}${entry.path.replace(/\/$/, '')}.md` : `${origin}${entry.path}`;
  const description = entry.description ? `: ${entry.description}` : '';
  return `- [${entry.title}](${href})${description}`;
}

export function buildLlmsTxt(entries: LlmsEntry[], origin: string): string {
  const descriptionCounts = new Map<string, number>();
  for (const { description } of entries) {
    if (description) descriptionCounts.set(description, (descriptionCounts.get(description) ?? 0) + 1);
  }
  // A description shared by several pages is the site-wide fallback and says nothing about the page.
  const withoutGeneric = entries.map((entry) =>
    entry.description && (descriptionCounts.get(entry.description) ?? 0) > 1 ? { ...entry, description: undefined } : entry,
  );

  const lines = [
    '# ZinkERP',
    '',
    '> ERP operativo para pymes argentinas: ventas y POS, stock multi-sucursal, compras, caja, cuenta corriente y facturación electrónica con ARCA en un solo sistema.',
    '',
    `ZinkERP es un sistema de gestión en la nube pensado para comercios de una a veinte sucursales, con usuarios ilimitados. Los artículos del blog se enlazan en su versión Markdown. Para ver el sistema funcionando se puede [agendar una demo](https://cal.com/zinkintech).`,
  ];

  for (const section of SECTIONS) {
    const sectionEntries = withoutGeneric
      .filter((entry) => section.matches(entry.path))
      .sort((a, b) => a.path.split('/').length - b.path.split('/').length || a.path.localeCompare(b.path));
    if (sectionEntries.length === 0) continue;

    const isBlog = section.heading === 'Blog';
    lines.push('', `## ${section.heading}`, '', ...sectionEntries.map((entry) => linkFor(entry, origin, isBlog)));
  }

  return `${lines.join('\n')}\n`;
}
