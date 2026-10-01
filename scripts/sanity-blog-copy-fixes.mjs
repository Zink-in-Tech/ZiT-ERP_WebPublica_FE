#!/usr/bin/env node
/**
 * Correcciones de copy del blog en Sanity.
 *
 * Uso:
 *   node scripts/sanity-blog-copy-fixes.mjs            # muestra los cambios, no escribe nada
 *   SANITY_WRITE_TOKEN=xxx node scripts/sanity-blog-copy-fixes.mjs --apply
 *
 * El token se crea en https://www.sanity.io/manage → proyecto rw0dsjio → API → Tokens (permiso Editor).
 */
import { createClient } from '@sanity/client';

const APPLY = process.argv.includes('--apply');
const token = process.env.SANITY_WRITE_TOKEN;

if (APPLY && !token) {
  console.error('Falta SANITY_WRITE_TOKEN para aplicar los cambios.');
  process.exit(1);
}

const client = createClient({
  projectId: 'rw0dsjio',
  dataset: 'production',
  apiVersion: '2024-02-15',
  useCdn: false,
  token,
  perspective: 'published',
});

const BRAND_PATTERN = /Zin[kK] ?[Ee][Rr][Pp]/g;
const fixBrand = (text) => text.replace(BRAND_PATTERN, 'ZinkERP');

const POST_TEXT_FIXES = {
  'usuarios-ilimitados-mas-eficiencia-sin-costos-extra': [
    ['cada usuario que agregas a tu sistema', 'cada usuario que agregás a tu sistema'],
    ['puedes asignar roles específicos', 'podés asignar perfiles específicos'],
    ['puedes adaptarte rápidamente', 'podés adaptarte rápidamente'],
    ['pudo asignar roles específicos', 'pudo asignar perfiles específicos'],
    ['a cada usuarios facilitando', 'a cada usuario, facilitando'],
  ],
};

const REMOVED_BLOCKS = {
  // Video de prueba sin relación con ZinkERP ("Video de prueba para el blog").
  'transforma-presupuestos-y-pedidos-en-ventas-efectivas': ['369ca6efe3e5'],
};

const CATEGORY_SLUG_FIXES = [
  { id: '811dc3fc-8306-4b41-aa41-3f04a5353e1b', slug: 'gestion-financiera-estrategica' },
];

const fixSpans = (body, textFixes, pending) =>
  body.map((block) => {
    if (block._type !== 'block' || !Array.isArray(block.children)) return block;
    return {
      ...block,
      children: block.children.map((child) => {
        if (typeof child.text !== 'string') return child;
        let text = fixBrand(child.text);
        for (const [from, to] of textFixes) {
          if (text.includes(from)) {
            text = text.split(from).join(to);
            pending.delete(from);
          }
        }
        return text === child.text ? child : { ...child, text };
      }),
    };
  });

const main = async () => {
  const posts = await client.fetch(`*[_type == "post"]{_id, title, "slug": slug.current, body}`);
  const tx = client.transaction();
  let changes = 0;

  for (const post of posts) {
    const textFixes = POST_TEXT_FIXES[post.slug] ?? [];
    const pending = new Set(textFixes.map(([from]) => from));
    const removedKeys = REMOVED_BLOCKS[post.slug] ?? [];

    const title = fixBrand(post.title ?? '');
    let body = fixSpans(post.body ?? [], textFixes, pending);
    body = body.filter((block) => !removedKeys.includes(block._key));

    const patch = {};
    if (title !== post.title) patch.title = title;
    if (JSON.stringify(body) !== JSON.stringify(post.body ?? [])) patch.body = body;

    if (pending.size > 0) {
      console.warn(`⚠️  ${post.slug}: no se encontró el texto ${[...pending].map((t) => `"${t}"`).join(', ')}`);
    }

    if (Object.keys(patch).length === 0) continue;
    changes += 1;

    const before = JSON.stringify(post.body ?? []).match(BRAND_PATTERN)?.filter((m) => m !== 'ZinkERP').length ?? 0;
    console.log(`• ${post.slug}`);
    if (patch.title) console.log(`    título: "${post.title}" → "${patch.title}"`);
    if (patch.body) {
      console.log(`    cuerpo: ${before} menciones de marca corregidas`);
      textFixes.forEach(([from, to]) => console.log(`    "${from}" → "${to}"`));
      removedKeys.forEach((key) => console.log(`    bloque eliminado: ${key}`));
    }
    tx.patch(post._id, (p) => p.set(patch));
  }

  for (const { id, slug } of CATEGORY_SLUG_FIXES) {
    const category = await client.fetch(`*[_id == $id][0]{title, "slug": slug.current}`, { id });
    if (!category || category.slug) continue;
    changes += 1;
    console.log(`• categoría "${category.title}": slug → ${slug}`);
    tx.patch(id, (p) => p.set({ slug: { _type: 'slug', current: slug } }));
  }

  if (changes === 0) {
    console.log('No hay cambios pendientes.');
    return;
  }

  if (!APPLY) {
    console.log(`\n${changes} documento(s) con cambios. Corré con --apply y SANITY_WRITE_TOKEN para publicarlos.`);
    return;
  }

  await tx.commit();
  console.log(`\n✅ ${changes} documento(s) actualizados en Sanity.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
