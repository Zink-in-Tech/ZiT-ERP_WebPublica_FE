import { toPlainText } from '@portabletext/toolkit';

interface AnchorableNode {
  _type: string;
  style?: string;
  listItem?: string;
  children?: unknown[];
  markDefs?: Array<{ _type: string; href?: unknown; [key: string]: unknown }>;
  [key: string]: unknown;
}

export type AnchoredNode<T> = T & { anchorId?: string };

const HEADING_STYLE = /^h[1-6]$/;

/**
 * Stable ASCII heading id (`Registrá cada movimiento` → `registra-cada-movimiento`).
 * Auto-generated slugs differ between renderers (GitHub and VS Code keep accents,
 * Python-Markdown/MkDocs strips them), so the web page and the Markdown export
 * both carry this id explicitly.
 */
export function headingId(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isHeading(node: AnchorableNode): boolean {
  return node._type === 'block' && !node.listItem && HEADING_STYLE.test(node.style ?? '');
}

export function assignHeadingIds<T extends object>(nodes: readonly T[]): Map<T, string> {
  const ids = new Map<T, string>();
  const used = new Set<string>();
  for (const node of nodes) {
    const candidate = node as unknown as AnchorableNode;
    if (!isHeading(candidate)) continue;
    const text = toPlainText(candidate as Parameters<typeof toPlainText>[0]).trim();
    if (!text) continue;
    const base = headingId(text) || 'seccion';
    let id = base;
    for (let suffix = 2; used.has(id); suffix += 1) id = `${base}-${suffix}`;
    used.add(id);
    ids.set(node, id);
  }
  return ids;
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

/** Fragment of a link that points inside the article (`#x` or the article URL with a hash). */
export function internalFragment(href: unknown, pageUrl?: string): string | null {
  if (typeof href !== 'string') return null;
  const trimmed = href.trim();
  if (trimmed.startsWith('#')) return safeDecode(trimmed.slice(1)) || null;
  if (!pageUrl) return null;
  try {
    const url = new URL(trimmed, pageUrl);
    const page = new URL(pageUrl);
    const samePage = url.origin === page.origin && stripTrailingSlash(url.pathname) === stripTrailingSlash(page.pathname);
    return samePage && url.hash ? safeDecode(url.hash.slice(1)) || null : null;
  } catch {
    return null;
  }
}

/** Id of the heading a fragment refers to, accepting accented, percent-encoded or ASCII spellings. */
export function resolveHeadingFragment(fragment: string, headingIds: ReadonlySet<string>): string | null {
  const id = headingId(fragment);
  return headingIds.has(id) ? id : null;
}

/**
 * Adds `anchorId` to heading blocks and points internal links (`#Registrá…`, `#registr%C3%A1…`
 * or the article URL with a hash) to those ids. Links without a matching heading are left as-is.
 */
export function withHeadingAnchors<T extends object>(content: readonly T[], options: { pageUrl?: string } = {}): AnchoredNode<T>[] {
  const ids = assignHeadingIds(content);
  const idSet = new Set(ids.values());

  return content.map((node) => {
    const block = node as unknown as AnchorableNode;
    const anchorId = ids.get(node);
    let markDefs = block.markDefs;

    if (block._type === 'block' && Array.isArray(markDefs)) {
      markDefs = markDefs.map((def) => {
        if (def?._type !== 'link') return def;
        const fragment = internalFragment(def.href, options.pageUrl);
        const target = fragment ? resolveHeadingFragment(fragment, idSet) : null;
        return target ? { ...def, href: `#${target}` } : def;
      });
    }

    if (!anchorId && markDefs === block.markDefs) return node;
    return { ...node, ...(anchorId ? { anchorId } : {}), ...(markDefs !== block.markDefs ? { markDefs } : {}) } as AnchoredNode<T>;
  });
}
