import { createClient } from '@sanity/client';

if (!import.meta.env.PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Falta la variable de entorno PUBLIC_SANITY_PROJECT_ID');
}

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: import.meta.env.SANITY_API_VERSION || '2024-02-15',
  useCdn: true,
  perspective: 'published'
});

export function urlFor(source: any) {
  if (!source) return '';
  return source;
}

// Función auxiliar para obtener datos de forma segura
export async function fetchSanityData(query: string, params = {}) {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error al obtener datos de Sanity:', error);
    return null;
  }
}

