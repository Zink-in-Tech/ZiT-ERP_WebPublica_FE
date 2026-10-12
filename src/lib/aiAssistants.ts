export type AssistantId = 'chatgpt' | 'claude';

const ASSISTANT_NEW_CHAT_URLS: Record<AssistantId, string> = {
  chatgpt: 'https://chatgpt.com/',
  claude: 'https://claude.ai/new',
};

export function articleMarkdownPath(slug: string): string {
  return `/blog/${slug}.md`;
}

export function buildAssistantPrompt(markdownUrl: string): string {
  return [
    `Leé este artículo del blog de ZinkERP: ${markdownUrl}`,
    'Resumime las ideas principales y ayudame a aplicarlas en mi negocio. Antes de recomendarme algo, preguntame lo que necesites saber sobre mi operación.',
  ].join('\n\n');
}

/** New-chat URLs with the prompt prefilled. These query parameters are not a documented API, so keep a copy/download fallback next to them. */
export function buildAssistantLinks(markdownUrl: string): Record<AssistantId, string> {
  const prompt = buildAssistantPrompt(markdownUrl);
  const links = {} as Record<AssistantId, string>;
  for (const [id, base] of Object.entries(ASSISTANT_NEW_CHAT_URLS) as [AssistantId, string][]) {
    const url = new URL(base);
    url.searchParams.set('q', prompt);
    links[id] = url.toString();
  }
  return links;
}
