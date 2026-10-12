import type { PostDetail } from '../types/blog';
import { buildArticleMarkdown } from './blogMarkdown';
import { fetchSanityData, urlFor } from './sanity';

const PUBLISHED_POST_SLUGS_QUERY = `*[_type=="post" && !(_id in path("drafts.**"))].slug.current`;

const PUBLISHED_POST_QUERY = `*[_type=="post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  description,
  publishedAt,
  "mainImageUrl": mainImage.asset->url,
  "author": author->{
    name,
    "imageUrl": image.asset->url,
    bio
  },
  "categories": categories[]->{title, "slug": slug.current},
  body
}`;

export async function fetchPublishedPostSlugs(): Promise<string[]> {
  const slugs = await fetchSanityData(PUBLISHED_POST_SLUGS_QUERY);
  return Array.isArray(slugs) ? slugs.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0) : [];
}

export async function fetchPublishedPost(slug: string): Promise<PostDetail | null> {
  const post = await fetchSanityData(PUBLISHED_POST_QUERY, { slug });
  // fetchSanityData returns [] on errors.
  return post && !Array.isArray(post) ? (post as PostDetail) : null;
}

export function buildPostMarkdown(post: PostDetail, canonicalUrl: string, siteOrigin?: string): string {
  return buildArticleMarkdown(
    { ...post, canonicalUrl },
    {
      baseUrl: siteOrigin,
      resolveImageUrl: (image) => (image.asset?._ref ? urlFor(image).url() : null),
    },
  );
}
