import { describe, expect, it } from 'vitest';
import { articleMarkdownPath, buildAssistantLinks, buildAssistantPrompt } from './aiAssistants';

const markdownUrl = 'https://zinkerp.com/blog/como-controlar-stock-varias-sucursales.md';

describe('enlaces a asistentes de IA', () => {
  it('arma la ruta pública del Markdown del artículo', () => {
    expect(articleMarkdownPath('como-controlar-stock-varias-sucursales')).toBe('/blog/como-controlar-stock-varias-sucursales.md');
  });

  it('pide leer el artículo y aplicarlo, con la URL del Markdown', () => {
    const prompt = buildAssistantPrompt(markdownUrl);
    expect(prompt.startsWith(`Leé este artículo del blog de ZinkERP: ${markdownUrl}\n\n`)).toBe(true);
    expect(prompt).toContain('ayudame a aplicarlas en mi negocio');
  });

  it('abre ChatGPT y Claude en un chat nuevo con el mensaje precargado', () => {
    const links = buildAssistantLinks(markdownUrl);
    const chatgpt = new URL(links.chatgpt);
    const claude = new URL(links.claude);

    expect(chatgpt.origin + chatgpt.pathname).toBe('https://chatgpt.com/');
    expect(claude.origin + claude.pathname).toBe('https://claude.ai/new');
    expect(chatgpt.searchParams.get('q')).toBe(buildAssistantPrompt(markdownUrl));
    expect(claude.searchParams.get('q')).toBe(buildAssistantPrompt(markdownUrl));
  });

  it('mantiene los enlaces cortos aunque el artículo sea largo', () => {
    const links = buildAssistantLinks(markdownUrl);
    expect(links.chatgpt.length).toBeLessThan(1000);
    expect(links.claude.length).toBeLessThan(1000);
  });
});
