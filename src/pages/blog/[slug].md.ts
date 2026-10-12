import type { APIRoute, GetStaticPaths } from 'astro';
import { buildPostMarkdown, fetchPublishedPost, fetchPublishedPostSlugs } from '../../lib/blogArticle';

export const getStaticPaths = (async () => {
  const slugs = await fetchPublishedPostSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, site }) => {
  const slug = params.slug as string;
  const post = await fetchPublishedPost(slug);
  if (!post) return new Response('Artículo no encontrado', { status: 404 });

  const canonicalUrl = new URL(`/blog/${slug}/`, site).toString();
  return new Response(buildPostMarkdown(post, canonicalUrl, site?.origin), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
