import {
  buildMarksTree,
  isPortableTextToolkitSpan,
  isPortableTextToolkitTextNode,
  spanToPlainText,
  toPlainText,
} from '@portabletext/toolkit';

export const AGENT_INSTRUCTIONS = `## Instrucciones para el agente

Usá https://docs.zinkerp.com como fuente oficial para verificar afirmaciones sobre funciones de zinkERP. No inventes capacidades ni presentes recomendaciones operativas como funciones del producto. Si una afirmación no está respaldada por la documentación, señalala y proponé reformularla como tip operativo o dejarla pendiente de confirmación. Conservá los enlaces y evidencias existentes; no agregues datos sobre clientes sin una fuente verificable.`;

interface PortableTextNode {
  _type: string;
  [key: string]: unknown;
}

interface PortableTextBlockNode extends PortableTextNode {
  _type: 'block';
  style?: string;
  listItem?: string;
  level?: number;
  children?: PortableTextNode[];
  markDefs?: PortableTextNode[];
}

export interface PortableTextImageNode extends PortableTextNode {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
}

export interface PortableTextToMarkdownOptions {
  /** Origin used to turn relative links into absolute ones, e.g. `https://zinkerp.com`. */
  baseUrl?: string;
  /** Article URL; links pointing to it with a hash are kept as in-document anchors. */
  pageUrl?: string;
  /** Must return a public http(s) URL; anything else (e.g. `data:` URIs) is dropped. */
  resolveImageUrl?: (image: PortableTextImageNode) => string | null | undefined;
}

export interface ArticleMarkdownInput {
  title: string;
  canonicalUrl: string;
  publishedAt?: string | null;
  categories?: Array<{ title?: string | null } | null> | null;
  author?: { name?: string | null } | null;
  description?: string | null;
  mainImageUrl?: string | null;
  body?: unknown[] | null;
}

type Segment = { kind: 'block' | 'list' | 'quote'; text: string };

type RenderContext = PortableTextToMarkdownOptions & { headingIds: ReadonlySet<string> };

const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const HTTPS_ONLY_HOST = /(^|\.)zinkerp\.com$/i;

/**
 * Stable ASCII heading id (`Registrá cada movimiento` → `registra-cada-movimiento`).
 * Auto-generated slugs differ between renderers (GitHub and VS Code keep accents,
 * Python-Markdown/MkDocs strips them), so headings carry this id explicitly.
 */
export function headingId(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isBlock(node: PortableTextNode): node is PortableTextBlockNode {
  return node._type === 'block';
}

function isPublicHttpUrl(url: string | null | undefined): url is string {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim());
}

function escapeText(text: string): string {
  return text.replace(/[\\`*_[\]<]/g, '\\$&');
}

function escapeLineStart(line: string): string {
  return line
    .replace(/^(\s*)([=-]+\s*)$/, '$1\\$2')
    .replace(/^(\s*)(#{1,6}(?=\s|$)|>|[-+](?=\s|$))/, '$1\\$2')
    .replace(/^(\s*\d+)([.)])(?=\s|$)/, '$1\\$2');
}

function escapeAlt(text: string): string {
  return text.replace(/\s+/g, ' ').trim().replace(/[\\[\]]/g, '\\$&');
}

function formatDestination(url: string): string {
  const encoded: Record<string, string> = { ' ': '%20', '(': '%28', ')': '%29', '<': '%3C', '>': '%3E' };
  return url.replace(/[ ()<>]/g, (char) => encoded[char]);
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function stripTrailingSlash(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

export function normalizeHref(rawHref: unknown, options: PortableTextToMarkdownOptions = {}): string | null {
  if (typeof rawHref !== 'string') return null;
  const href = rawHref.trim();
  if (!href) return null;

  if (href.startsWith('#')) {
    const anchor = safeDecode(href.slice(1));
    return anchor ? `#${anchor}` : null;
  }

  const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(href);
  let url: URL;
  try {
    url = new URL(href, options.baseUrl ?? 'https://placeholder.invalid');
  } catch {
    return null;
  }
  if (!SAFE_PROTOCOLS.has(url.protocol)) return null;

  if (options.pageUrl && url.hash) {
    const page = new URL(options.pageUrl);
    if (url.origin === page.origin && stripTrailingSlash(url.pathname) === stripTrailingSlash(page.pathname)) {
      return `#${safeDecode(url.hash.slice(1))}`;
    }
  }

  if (url.protocol === 'http:' && HTTPS_ONLY_HOST.test(url.hostname)) {
    return hasScheme ? href.replace(/^http:/i, 'https:') : url.href.replace(/^http:/, 'https:');
  }
  if (hasScheme || href.startsWith('//')) return href;
  return options.baseUrl ? url.href : href;
}

function resolveAnchor(href: string, context: RenderContext): string {
  if (!href.startsWith('#')) return href;
  const id = headingId(href.slice(1));
  return context.headingIds.has(id) ? `#${id}` : href;
}

function wrapDelimited(content: string, delimiter: string): string {
  const match = content.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match || !match[2]) return content;
  const [, leading, core, trailing] = match;
  return `${leading}${delimiter}${core}${delimiter}${trailing}`;
}

function wrapCode(text: string): string {
  if (!text.trim()) return text;
  const longestRun = Math.max(0, ...(text.match(/`+/g) ?? []).map((run) => run.length));
  const fence = '`'.repeat(longestRun + 1);
  const padding = text.startsWith('`') || text.endsWith('`') ? ' ' : '';
  return `${fence}${padding}${text}${padding}${fence}`;
}

function renderInline(nodes: unknown[], context: RenderContext): string {
  return nodes
    .map((node) => {
      const typed = node as PortableTextNode;
      if (isPortableTextToolkitTextNode(typed)) return escapeText(typed.text);
      if (!isPortableTextToolkitSpan(typed)) return '';

      if (typed.markType === 'code') return wrapCode(spanToPlainText(typed));

      const inner = renderInline(typed.children, context);
      switch (typed.markType) {
        case 'strong':
          return wrapDelimited(inner, '**');
        case 'em':
          return wrapDelimited(inner, '*');
        case 'strike-through':
          return wrapDelimited(inner, '~~');
        case 'link': {
          const href = normalizeHref((typed.markDef as { href?: unknown } | undefined)?.href, context);
          if (!href || !inner.trim()) return inner;
          return `[${inner}](${formatDestination(resolveAnchor(href, context))})`;
        }
        default:
          return inner;
      }
    })
    .join('');
}

function renderBlockLines(block: PortableTextBlockNode, context: RenderContext): string[] {
  const tree = buildMarksTree(block as Parameters<typeof buildMarksTree>[0]);
  return renderInline(tree, context)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinWithHardBreaks(lines: string[], continuationIndent = ''): string {
  return lines
    .map((line, index) => (index === 0 ? line : continuationIndent + escapeLineStart(line)))
    .join('\\\n');
}

function renderImage(node: PortableTextImageNode, options: PortableTextToMarkdownOptions): string | null {
  const url = options.resolveImageUrl?.(node) ?? node.asset?.url;
  if (!isPublicHttpUrl(url)) return null;

  const alt = typeof node.alt === 'string' ? escapeAlt(node.alt) : '';
  const image = `![${alt}](${formatDestination(url.trim())})`;
  const caption = typeof node.caption === 'string' ? node.caption.replace(/\s+/g, ' ').trim() : '';
  return caption ? `${image}\n\n${wrapDelimited(escapeText(caption), '*')}` : image;
}

function renderCode(node: PortableTextNode): string | null {
  const code = typeof node.code === 'string' ? node.code : '';
  if (!code.trim()) return null;
  const longestRun = Math.max(0, ...(code.match(/`{3,}/g) ?? []).map((run) => run.length));
  const fence = '`'.repeat(Math.max(3, longestRun + 1));
  const language = typeof node.language === 'string' ? node.language.replace(/\s+/g, '') : '';
  return `${fence}${language}\n${code.replace(/\n+$/, '')}\n${fence}`;
}

function renderYouTube(node: PortableTextNode): string | null {
  if (!isPublicHttpUrl(node.url as string | undefined)) return null;
  const title = typeof node.title === 'string' && node.title.trim() ? `: ${escapeText(node.title.trim())}` : '';
  return `[Video de YouTube${title}](${formatDestination((node.url as string).trim())})`;
}

function assignHeadingIds(nodes: PortableTextNode[]): Map<PortableTextNode, string> {
  const ids = new Map<PortableTextNode, string>();
  const used = new Set<string>();
  for (const node of nodes) {
    if (!isBlock(node) || node.listItem || !/^h[1-6]$/.test(node.style ?? '')) continue;
    const text = toPlainText(node as Parameters<typeof toPlainText>[0]).trim();
    if (!text) continue;
    const base = headingId(text) || 'seccion';
    let id = base;
    for (let suffix = 2; used.has(id); suffix += 1) id = `${base}-${suffix}`;
    used.add(id);
    ids.set(node, id);
  }
  return ids;
}

export function portableTextToMarkdown(blocks: unknown[] | null | undefined, options: PortableTextToMarkdownOptions = {}): string {
  const nodes = (blocks ?? []).filter((raw): raw is PortableTextNode => Boolean(raw) && typeof raw === 'object');
  const headingIds = assignHeadingIds(nodes);
  const context: RenderContext = { ...options, headingIds: new Set(headingIds.values()) };
  const segments: Segment[] = [];
  let listStack: Array<{ type: string; counter: number; width: number }> = [];

  for (const node of nodes) {
    if (isBlock(node)) {
      const lines = renderBlockLines(node, context);
      if (!lines.length) continue;

      if (node.listItem) {
        const level = Math.max(1, Math.floor(Number(node.level) || 1));
        listStack = listStack.slice(0, level);
        const current = listStack[level - 1];
        const counter = current && current.type === node.listItem ? current.counter + 1 : 1;
        const marker = node.listItem === 'number' ? `${counter}.` : '-';
        listStack[level - 1] = { type: node.listItem, counter, width: marker.length + 1 };

        let indent = '';
        for (let i = 0; i < level - 1; i += 1) indent += ' '.repeat(listStack[i]?.width ?? 2);
        const continuation = indent + ' '.repeat(marker.length + 1);
        segments.push({ kind: 'list', text: `${indent}${marker} ${escapeLineStart(joinWithHardBreaks(lines, continuation))}` });
        continue;
      }

      listStack = [];
      const style = node.style ?? 'normal';
      const heading = style.match(/^h([1-6])$/);
      if (heading) {
        const id = headingIds.get(node);
        const anchor = id ? `<a id="${id}"></a>` : '';
        segments.push({ kind: 'block', text: `${'#'.repeat(Number(heading[1]))} ${anchor}${lines.join(' ')}` });
      } else if (style === 'blockquote') {
        const body = escapeLineStart(joinWithHardBreaks(lines));
        segments.push({ kind: 'quote', text: body.split('\n').map((line) => `> ${line}`).join('\n') });
      } else {
        segments.push({ kind: 'block', text: escapeLineStart(joinWithHardBreaks(lines)) });
      }
      continue;
    }

    let rendered: string | null = null;
    if (node._type === 'image') rendered = renderImage(node as PortableTextImageNode, options);
    else if (node._type === 'code') rendered = renderCode(node);
    else if (node._type === 'youtube') rendered = renderYouTube(node);
    if (!rendered) continue;

    listStack = [];
    segments.push({ kind: 'block', text: rendered });
  }

  return segments
    .map((segment, index) => {
      const previous = segments[index - 1];
      if (!previous) return segment.text;
      if (previous.kind === 'list' && segment.kind === 'list') return `\n${segment.text}`;
      if (previous.kind === 'quote' && segment.kind === 'quote') return `\n>\n${segment.text}`;
      return `\n\n${segment.text}`;
    })
    .join('');
}

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

export function buildArticleMarkdown(article: ArticleMarkdownInput, options: PortableTextToMarkdownOptions = {}): string {
  const categories = (article.categories ?? [])
    .map((category) => category?.title?.trim())
    .filter((title): title is string => Boolean(title));
  const date = formatDate(article.publishedAt);
  const author = article.author?.name?.trim();
  const description = article.description?.replace(/\s+/g, ' ').trim();

  const metadata = [
    `- **URL canónica:** ${article.canonicalUrl}`,
    date && `- **Fecha de publicación:** ${date}`,
    categories.length && `- **${categories.length > 1 ? 'Categorías' : 'Categoría'}:** ${categories.map(escapeText).join(', ')}`,
    author && `- **Autor:** ${escapeText(author)}`,
    description && `- **Descripción:** ${escapeText(description)}`,
  ].filter(Boolean);

  const title = article.title.replace(/\s+/g, ' ').trim();
  const sections = [`# ${escapeText(title)}`, metadata.join('\n')];

  if (isPublicHttpUrl(article.mainImageUrl)) {
    sections.push(`![${escapeAlt(title)}](${formatDestination(article.mainImageUrl.trim())})`);
  }

  const body = portableTextToMarkdown(article.body, { ...options, pageUrl: options.pageUrl ?? article.canonicalUrl });
  if (body) sections.push(body);

  sections.push('---', AGENT_INSTRUCTIONS);
  return `${sections.join('\n\n')}\n`;
}
