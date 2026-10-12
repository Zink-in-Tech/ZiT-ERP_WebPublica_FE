import { toPlainText } from '@portabletext/toolkit';

const META_DESCRIPTION_MAX = 160;

interface BodyBlock {
  _type?: string;
  style?: string;
  listItem?: string;
  children?: unknown[];
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function truncateAtWord(text: string, max = META_DESCRIPTION_MAX): string {
  const clean = collapseWhitespace(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.—–-]+$/, '')}…`;
}

const isParagraph = (block: BodyBlock) => block?._type === 'block' && !block.listItem && (!block.style || block.style === 'normal');

/**
 * Plain text of consecutive paragraphs, joined until there is enough for a summary.
 * Prefers the intro (before the first heading or list); articles that open with a heading use their first section.
 */
function summaryText(body: unknown, minLength = 120): string {
  if (!Array.isArray(body)) return '';
  const blocks = (body as BodyBlock[]).filter((block) => block?._type === 'block');
  const start = blocks.findIndex(isParagraph);
  if (start === -1) return '';
  const parts: string[] = [];
  for (const block of blocks.slice(start)) {
    if (!isParagraph(block)) {
      if (parts.length) break;
      continue;
    }
    const text = collapseWhitespace(toPlainText(block as Parameters<typeof toPlainText>[0]));
    if (!text) continue;
    parts.push(text);
    if (parts.join(' ').length >= minLength) break;
  }
  return parts.join(' ');
}

export function buildMetaDescription(description: string | null | undefined, body: unknown): string | undefined {
  const source = collapseWhitespace(description ?? '') || summaryText(body);
  return source ? truncateAtWord(source) : undefined;
}

export interface BlogPostingInput {
  title: string;
  url: string;
  description?: string;
  imageUrl?: string;
  publishedAt?: string | null;
  modifiedAt?: string | null;
  authorName?: string | null;
  section?: string | null;
  keywords?: string[];
  siteUrl: string;
  logoUrl: string;
}

export function buildBlogPostingJsonLd(input: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    ...(input.description && { description: input.description }),
    ...(input.imageUrl && { image: [input.imageUrl] }),
    ...(input.publishedAt && { datePublished: input.publishedAt }),
    ...((input.modifiedAt || input.publishedAt) && { dateModified: input.modifiedAt || input.publishedAt }),
    ...(input.authorName && { author: { '@type': 'Person', name: input.authorName } }),
    publisher: {
      '@type': 'Organization',
      name: 'ZinkERP',
      url: input.siteUrl,
      logo: { '@type': 'ImageObject', url: input.logoUrl },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    url: input.url,
    inLanguage: 'es-AR',
    ...(input.section && { articleSection: input.section }),
    ...(input.keywords?.length && { keywords: input.keywords.join(', ') }),
  };
}

/** Serializes JSON-LD for an inline <script>, escaping `<` so content cannot close the tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
