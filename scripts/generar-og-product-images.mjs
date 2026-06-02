import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'images');

const pages = [
  {
    slug: 'ventas-y-pos',
    eyebrow: 'Ventas y POS',
    title: 'Ventas ágiles, con stock y precios sincronizados.',
    subtitle: 'Presupuesto, POS y factura electrónica en un mismo flujo.',
    accent: '#58d6ff',
    accentSoft: '#0e3d56',
    heroPath: 'images/hero-ventas-y-pos.png',
  },
  {
    slug: 'compras',
    eyebrow: 'Compras',
    title: 'Comprá lo que necesitás, cuando lo necesitás.',
    subtitle: 'Órdenes, proveedores y reposición con stock crítico.',
    accent: '#ffcf5a',
    accentSoft: '#4f3a0b',
    heroPath: 'images/hero-compras.png',
  },
  {
    slug: 'inventario',
    eyebrow: 'Inventario',
    title: 'Stock visible, ordenado y listo para moverse.',
    subtitle: 'Control por sucursal, alertas y trazabilidad real.',
    accent: '#54e4a0',
    accentSoft: '#0f4a35',
    heroPath: 'images/hero-inventario.png',
  },
  {
    slug: 'facturacion',
    eyebrow: 'Facturación AFIP/ARCA',
    title: 'Facturá desde donde manejás tu negocio.',
    subtitle: 'Comprobantes integrados a tu operación diaria.',
    accent: '#df74ff',
    accentSoft: '#52205f',
    heroPath: 'images/hero-facturacion.png',
  },
  {
    slug: 'finanzas',
    eyebrow: 'Finanzas',
    title: 'Tus finanzas claras, con cada sucursal bajo control.',
    subtitle: 'Caja diaria, vencimientos e ingresos en un solo lugar.',
    accent: '#bbff69',
    accentSoft: '#314d11',
    heroPath: 'images/hero-finanzas.png',
  },
  {
    slug: 'reportes',
    eyebrow: 'Reportes y Dashboard',
    title: 'Los números que importan. Claros y actualizados.',
    subtitle: 'Ventas, cobros y ganancia para decidir mejor.',
    accent: '#74d5ff',
    accentSoft: '#173f51',
    heroPath: 'images/hero-reportes.png',
  },
  {
    slug: 'sucursales',
    eyebrow: 'Sucursales',
    title: 'Controlá 2 sucursales o 20 desde un solo lugar.',
    subtitle: 'Stock, usuarios y precios sincronizados en tiempo real.',
    accent: '#ff8ca5',
    accentSoft: '#552131',
  },
  {
    slug: 'control-de-acceso',
    eyebrow: 'Control de Acceso',
    title: 'Cada persona ve solo lo que necesita.',
    subtitle: 'Perfiles, permisos y caja diaria por operador.',
    accent: '#b088ff',
    accentSoft: '#322050',
    heroPath: 'images/hero-control-de-acceso.png',
  },
];

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const wrapText = (text, maxChars) => {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
    } else {
      lines.push(word);
    }
  }

  if (current) lines.push(current);
  return lines;
};

const toDataUri = async (relativePath) => {
  const filePath = path.join(publicDir, relativePath);
  const buffer = await fs.readFile(filePath);
  const ext = path.extname(filePath).slice(1);
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
};

const renderTextLines = (lines, x, y, lineHeight, className) =>
  lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" class="${className}">${escapeXml(line)}</text>`,
    )
    .join('\n');

const renderSucursalesPanel = (page) => `
  <g transform="translate(704 96)">
    <rect x="0" y="0" width="440" height="438" rx="34" fill="rgba(11,18,32,0.88)" stroke="rgba(255,255,255,0.08)" />
    <circle cx="220" cy="220" r="150" fill="url(#networkGlow)" opacity="0.55" />
    <circle cx="220" cy="220" r="154" fill="none" stroke="rgba(255,255,255,0.07)" />
    <circle cx="120" cy="145" r="46" fill="#111a2d" stroke="rgba(255,255,255,0.09)" />
    <circle cx="320" cy="118" r="34" fill="#111a2d" stroke="rgba(255,255,255,0.09)" />
    <circle cx="108" cy="315" r="34" fill="#111a2d" stroke="rgba(255,255,255,0.09)" />
    <circle cx="325" cy="306" r="50" fill="#111a2d" stroke="rgba(255,255,255,0.09)" />
    <circle cx="220" cy="220" r="58" fill="#151f35" stroke="rgba(255,255,255,0.12)" />
    <path d="M166 171 L192 195" stroke="${page.accent}" stroke-width="3" stroke-dasharray="6 7" />
    <path d="M255 182 L293 142" stroke="${page.accent}" stroke-width="3" stroke-dasharray="6 7" />
    <path d="M169 268 L137 291" stroke="${page.accent}" stroke-width="3" stroke-dasharray="6 7" />
    <path d="M265 259 L290 280" stroke="${page.accent}" stroke-width="3" stroke-dasharray="6 7" />
    <circle cx="195" cy="197" r="8" fill="${page.accent}" />
    <circle cx="292" cy="144" r="8" fill="${page.accent}" />
    <circle cx="138" cy="290" r="8" fill="${page.accent}" />
    <circle cx="291" cy="280" r="8" fill="${page.accent}" />
    <text x="76" y="59" class="panelLabel">RED OPERATIVA</text>
    <rect x="148" y="196" width="144" height="48" rx="16" fill="rgba(255,255,255,0.05)" />
    <text x="220" y="225" text-anchor="middle" class="panelCenter">Casa central</text>
    <text x="120" y="152" text-anchor="middle" class="panelNode">Sucursal Norte</text>
    <text x="320" y="124" text-anchor="middle" class="panelNode">Sucursal Sur</text>
    <text x="108" y="321" text-anchor="middle" class="panelNode">Stock</text>
    <text x="325" y="313" text-anchor="middle" class="panelNode">Precios</text>
  </g>
`;

const renderHeroPanel = (page, heroDataUri) => `
  <rect x="690" y="84" width="470" height="462" rx="36" fill="rgba(10,16,28,0.78)" stroke="rgba(255,255,255,0.08)" />
  <rect x="718" y="112" width="414" height="406" rx="28" fill="rgba(255,255,255,0.04)" />
  <image href="${heroDataUri}" x="718" y="112" width="414" height="406" preserveAspectRatio="xMidYMid slice" clip-path="url(#panelClip)" />
`;

const buildSvg = async (page, logoDataUri) => {
  const heroDataUri = page.heroPath ? await toDataUri(page.heroPath) : null;
  const titleLines = wrapText(page.title, 22);
  const subtitleLines = wrapText(page.subtitle, 38);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0b1020" />
      <stop offset="1" stop-color="#090b16" />
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(210 130) rotate(54) scale(330 290)">
      <stop stop-color="${page.accentSoft}" />
      <stop offset="1" stop-color="${page.accentSoft}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(968 510) rotate(90) scale(260 260)">
      <stop stop-color="${page.accentSoft}" />
      <stop offset="1" stop-color="${page.accentSoft}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="networkGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 220) rotate(90) scale(150 150)">
      <stop stop-color="${page.accentSoft}" />
      <stop offset="1" stop-color="${page.accentSoft}" stop-opacity="0" />
    </radialGradient>
    <clipPath id="panelClip">
      <rect x="718" y="112" width="414" height="406" rx="28" />
    </clipPath>
    <style>
      .eyebrow { fill: ${page.accent}; font: 600 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: 0.08em; text-transform: uppercase; }
      .title { fill: white; font: 700 60px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: -0.04em; }
      .subtitle { fill: rgba(229, 231, 235, 0.86); font: 400 28px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .brand { fill: white; font: 600 20px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: 0.06em; text-transform: uppercase; }
      .panelLabel { fill: rgba(255,255,255,0.82); font: 600 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: 0.18em; text-transform: uppercase; }
      .panelCenter { fill: white; font: 600 18px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .panelNode { fill: rgba(255,255,255,0.84); font: 500 14px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    </style>
    <filter id="shadow" x="0" y="0" width="1200" height="630" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#05070F" flood-opacity="0.35" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#glowA)" />
  <rect width="1200" height="630" fill="url(#glowB)" />

  <g filter="url(#shadow)">
    <rect x="56" y="56" width="1088" height="518" rx="42" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.06)" />
  </g>

  <image href="${logoDataUri}" x="78" y="82" width="132" height="58" preserveAspectRatio="xMidYMid contain" />
  <text x="228" y="118" class="brand">ZinkERP</text>

  <rect x="78" y="166" width="${Math.max(180, page.eyebrow.length * 10.8)}" height="46" rx="23" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
  <text x="101" y="195" class="eyebrow">${escapeXml(page.eyebrow)}</text>

  ${renderTextLines(titleLines, 78, 292, 74, 'title')}
  ${renderTextLines(subtitleLines, 78, 504, 36, 'subtitle')}

  ${
    heroDataUri
      ? renderHeroPanel(page, heroDataUri)
      : renderSucursalesPanel(page)
  }
</svg>`;
};

const main = async () => {
  const logoDataUri = await toDataUri('zinkerp-logo.png');

  await fs.mkdir(imagesDir, { recursive: true });

  for (const page of pages) {
    const svg = await buildSvg(page, logoDataUri);
    const outputPath = path.join(imagesDir, `og-${page.slug}.svg`);
    await fs.writeFile(outputPath, svg, 'utf8');
    console.log(`Generated ${path.relative(rootDir, outputPath)}`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
