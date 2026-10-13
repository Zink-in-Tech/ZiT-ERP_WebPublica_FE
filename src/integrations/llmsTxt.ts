import type { AstroIntegration } from 'astro';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLlmsTxt, parseBuiltPage, type LlmsEntry } from '../lib/llmsTxt';

async function listHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listHtmlFiles(fullPath)));
    else if (entry.name === 'index.html') files.push(fullPath);
  }
  return files;
}

/** Writes /llms.txt from the built pages, so it stays in sync with the site and the blog. */
export default function llmsTxt(): AstroIntegration {
  let site: string | undefined;

  return {
    name: 'llms-txt',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site?.replace(/\/$/, '');
      },
      'astro:build:done': async ({ dir, logger }) => {
        if (!site) throw new Error('llms-txt needs `site` in astro.config');
        const outDir = fileURLToPath(dir);

        const entries: LlmsEntry[] = [];
        for (const file of await listHtmlFiles(outDir)) {
          const path = `/${relative(outDir, file).split(sep).slice(0, -1).join('/')}/`.replace(/\/+/g, '/');
          const entry = parseBuiltPage({ path, html: await readFile(file, 'utf8') });
          if (entry) entries.push(entry);
        }

        await writeFile(join(outDir, 'llms.txt'), buildLlmsTxt(entries, site));
        logger.info(`llms.txt con ${entries.length} páginas`);
      },
    },
  };
}
