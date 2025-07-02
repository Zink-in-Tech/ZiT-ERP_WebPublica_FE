import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Fallback values for local development
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'development';
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-02-15';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published'
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return builder.image({});
  return builder.image(source);
}

// Helper function to safely fetch data
export async function fetchSanityData(query: string, params = {}) {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
    return [];
  }
}

