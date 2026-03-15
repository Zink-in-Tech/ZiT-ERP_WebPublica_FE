/**
 * Etiquetas de góndola: CSV → preview → PDF A4.
 * localStorage: etiquetas-gondola-data-v1, etiquetas-gondola-config-v1, etiquetas-gondola-logo-v1, etiquetas-gondola-lead-v1
 */
import { jsPDF } from 'jspdf';

const DATA_KEY = 'etiquetas-gondola-data-v1';
const CONFIG_KEY = 'etiquetas-gondola-config-v1';
const LOGO_KEY = 'etiquetas-gondola-logo-v1';
const LEAD_KEY = 'etiquetas-gondola-lead-v1';
const FIRMA_TEXTO = 'Generado con Zink ERP · zinkerp.com';
const SNACKBAR_DURATION_MS = 8000;

type LabelSpec = {
  marginMm: number;
  descFontSize: number;
  priceFontSize: number;
  footerFontSize: number;
  firmaFontSize: number;
  firmaColor: [number, number, number];
  logoMm: number;
  descMaxChars: number;
  /** Espacio en mm tras descripción antes del precio */
  descLineHeight: number;
  /** Espacio en mm tras precio antes de firma */
  priceLineHeight: number;
  /** Espacio en mm tras firma antes del footer */
  firmaLineHeight: number;
};

/** Formato pequeño (3x5): proporciones actuales mejoradas; precio más grande. */
const SPEC_PEQUEÑO: LabelSpec = {
  marginMm: 2,
  descFontSize: 10,
  priceFontSize: 26,
  footerFontSize: 8,
  firmaFontSize: 8,
  firmaColor: [80, 80, 80],
  logoMm: 12,
  descMaxChars: 35,
  descLineHeight: 10,
  priceLineHeight: 16,
  firmaLineHeight: 6,
};

/** Formato grande (2x4): todo más grande y legible. */
const SPEC_GRANDE: LabelSpec = {
  marginMm: 3,
  descFontSize: 14,
  priceFontSize: 38,
  footerFontSize: 10,
  firmaFontSize: 10,
  firmaColor: [80, 80, 80],
  logoMm: 16,
  descMaxChars: 50,
  descLineHeight: 14,
  priceLineHeight: 26,
  firmaLineHeight: 8,
};

function getLabelSpec(grilla: '2x4' | '3x5'): LabelSpec {
  return grilla === '2x4' ? SPEC_GRANDE : SPEC_PEQUEÑO;
}

const snackbarTimeouts: Record<string, ReturnType<typeof setTimeout>> = {};

export interface EtiquetaItem {
  codigo?: string;
  descripcion: string;
  precio: string;
  fecha?: string;
}

export interface GondolaConfig {
  grilla: '2x4' | '3x5';
  mostrarFecha: boolean;
  mostrarCodigo: boolean;
  mostrarLogo: boolean;
}

function defaultConfig(): GondolaConfig {
  return {
    grilla: '2x4',
    mostrarFecha: true,
    mostrarCodigo: true,
    mostrarLogo: false,
  };
}

function loadData(): EtiquetaItem[] {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveData(list: EtiquetaItem[]): void {
  localStorage.setItem(DATA_KEY, JSON.stringify(list));
}

function loadConfig(): GondolaConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return defaultConfig();
    const c = JSON.parse(raw);
    return {
      grilla: c.grilla === '3x5' ? '3x5' : '2x4',
      mostrarFecha: !!c.mostrarFecha,
      mostrarCodigo: !!c.mostrarCodigo,
      mostrarLogo: !!c.mostrarLogo,
    };
  } catch {
    return defaultConfig();
  }
}

function saveConfig(c: GondolaConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(c));
}

function loadLogo(): string | null {
  return localStorage.getItem(LOGO_KEY);
}

function saveLogo(dataUrl: string | null): void {
  if (dataUrl) localStorage.setItem(LOGO_KEY, dataUrl);
  else localStorage.removeItem(LOGO_KEY);
}

function parseCSVLine(line: string, sep: string): string[] {
  const fields: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      let val = '';
      i++;
      while (i < line.length) {
        if (line[i] === '"') {
          i++;
          if (line[i] === '"') {
            val += '"';
            i++;
          } else break;
        } else {
          val += line[i];
          i++;
        }
      }
      fields.push(val);
    } else {
      let val = '';
      while (i < line.length && line[i] !== sep) {
        val += line[i];
        i++;
      }
      fields.push(val.trim());
      if (i < line.length) i++;
    }
  }
  return fields;
}

function parseCSVGondola(text: string): EtiquetaItem[] {
  text = text.replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 1) return [];
  const sep = lines[0].includes(';') ? ';' : ',';
  const rawRows = lines.map((l) =>
    l.includes('"') ? parseCSVLine(l, sep) : l.split(sep).map((s) => s.trim())
  );
  const headers = rawRows[0].map((h) =>
    String(h).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  );
  const codigoIdx = headers.findIndex((h) => /codigo|code/.test(h));
  const descIdx = headers.findIndex((h) =>
    /descripcion|description|nombre|producto/.test(h)
  );
  const precioIdx = headers.findIndex((h) => /precio|price/.test(h));

  if (descIdx < 0 && precioIdx < 0) {
    const descIdxByPos = headers.indexOf('descripcion') >= 0 ? headers.indexOf('descripcion') : 1;
    const precioIdxByPos = headers.indexOf('precio') >= 0 ? headers.indexOf('precio') : 2;
    const codigoIdxByPos = headers.indexOf('codigo') >= 0 ? headers.indexOf('codigo') : 0;
    const result: EtiquetaItem[] = [];
    for (let r = 1; r < rawRows.length; r++) {
      const row = rawRows[r];
      const desc = String(row[descIdxByPos] ?? row[1] ?? '').trim();
      const precio = String(row[precioIdxByPos] ?? row[2] ?? '').trim();
      if (!desc || !precio) continue;
      const codigo = (codigoIdxByPos >= 0 ? String(row[codigoIdxByPos] ?? '').trim() : '') || undefined;
      result.push({ codigo, descripcion: desc, precio });
    }
    return result;
  }

  if (precioIdx < 0) return [];
  const result: EtiquetaItem[] = [];
  const descCol = descIdx >= 0 ? descIdx : 1;
  for (let r = 1; r < rawRows.length; r++) {
    const row = rawRows[r];
    const desc = String(row[descCol] ?? '').trim();
    const precio = String(row[precioIdx] ?? '').trim();
    if (!desc || !precio) continue;
    const codigo = codigoIdx >= 0 ? String(row[codigoIdx] ?? '').trim() || undefined : undefined;
    result.push({ codigo, descripcion: desc, precio });
  }
  return result;
}

function showMsg(elId: string, text: string, isError: boolean): void {
  const el = document.getElementById(elId);
  if (!el) return;
  if (snackbarTimeouts[elId]) {
    clearTimeout(snackbarTimeouts[elId]);
    delete snackbarTimeouts[elId];
  }
  el.textContent = text;
  el.classList.remove('hidden');
  el.classList.toggle('text-primary', !isError);
  el.classList.toggle('text-amber-400', isError);
  if (!isError) {
    snackbarTimeouts[elId] = setTimeout(() => {
      el.classList.add('hidden');
      delete snackbarTimeouts[elId];
    }, SNACKBAR_DURATION_MS);
  }
}

function escapeHtml(s: string): string {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

function truncar(s: string, max: number): string {
  const t = s.trim();
  return t.length <= max ? t : t.slice(0, max) + '…';
}

function formatPrecio(p: string): string {
  const n = parseFloat(String(p).replace(',', '.'));
  if (Number.isNaN(n)) return p;
  return n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const HOY = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

function getGridSize(grilla: '2x4' | '3x5'): { cols: number; rows: number; labelW: number; labelH: number } {
  const pageW = 210;
  const pageH = 297;
  if (grilla === '3x5') {
    return { cols: 3, rows: 5, labelW: pageW / 3, labelH: pageH / 5 };
  }
  return { cols: 2, rows: 4, labelW: pageW / 2, labelH: pageH / 4 };
}

function renderPreview(): void {
  const list = loadData();
  const config = loadConfig();
  const logoUrl = loadLogo();
  const container = document.getElementById('previewGrilla');
  const vacio = document.getElementById('previewVacio');
  const countEl = document.getElementById('previewCountGondola');
  if (!container || !vacio || !countEl) return;

  countEl.textContent = list.length === 0 ? '' : `${list.length} etiqueta${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    vacio.classList.remove('hidden');
    const wrap = container.querySelector('.preview-inner');
    if (wrap) wrap.remove();
    return;
  }
  vacio.classList.add('hidden');

  const { cols, labelH } = getGridSize(config.grilla);
  const spec = getLabelSpec(config.grilla);
  const perPage = cols * (config.grilla === '2x4' ? 4 : 5);
  const toShow = Math.min(list.length, perPage);
  const isGrande = config.grilla === '2x4';
  const descClass = isGrande ? 'text-base' : 'text-sm';
  const priceClass = isGrande ? 'text-4xl' : 'text-2xl';
  const firmaClass = isGrande ? 'text-sm' : 'text-sm';
  const footerClass = isGrande ? 'text-sm' : 'text-xs';
  const logoPx = isGrande ? 52 : 44;
  const descPreviewChars = isGrande ? 40 : 25;

  let html = '<div class="grid gap-2 p-2 preview-inner" style="grid-template-columns: repeat(' + cols + ', minmax(0, 1fr));">';
  for (let i = 0; i < toShow; i++) {
    const item = list[i];
    const desc = truncar(item.descripcion, descPreviewChars);
    const precio = formatPrecio(item.precio);
    html += `
      <div class="etiqueta-preview border border-dark-600 rounded-lg p-2 bg-dark-800 flex flex-col justify-between" style="min-height: ${labelH * 2}px;">
        <p class="${descClass} text-gray-300 line-clamp-2 font-medium">${escapeHtml(desc)}</p>
        <p class="${priceClass} font-bold text-center my-0.5">${escapeHtml(precio)}</p>
        <p class="${firmaClass} text-gray-500 text-center my-0.5">${escapeHtml(FIRMA_TEXTO)}</p>
        <div class="flex justify-between items-center ${footerClass} text-gray-500 mt-auto">
          ${config.mostrarFecha ? '<span>' + escapeHtml(HOY) + '</span>' : '<span></span>'}
          ${config.mostrarCodigo && item.codigo ? '<span>' + escapeHtml(item.codigo) + '</span>' : '<span></span>'}
          ${config.mostrarLogo && logoUrl ? '<img src="' + logoUrl.replace(/"/g, '&quot;') + '" alt="" class="object-contain" style="width:' + logoPx + 'px;height:' + logoPx + 'px" />' : '<span></span>'}
        </div>
      </div>
    `;
  }
  html += '</div>';
  const existing = container.querySelector('.preview-inner');
  if (existing) existing.outerHTML = html;
  else container.insertAdjacentHTML('beforeend', html);
}

function generarPDF(): void {
  const list = loadData();
  const config = loadConfig();
  const logoUrl = loadLogo();

  if (list.length === 0) {
    showMsg('msgPdfGondola', 'No hay datos. Importá un CSV primero.', true);
    return;
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = 210;
  const pageH = 297;
  const { cols, rows, labelW, labelH } = getGridSize(config.grilla);
  const spec = getLabelSpec(config.grilla);
  const perPage = cols * rows;
  const margin = spec.marginMm;
  let labelIndex = 0;
  let pageNum = 0;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (labelIndex === 0 && pageNum > 0) pdf.addPage();

    const col = labelIndex % cols;
    const row = Math.floor(labelIndex / cols);
    const x = col * labelW + margin;
    const y = row * labelH + margin;
    const w = labelW - margin * 2;
    const h = labelH - margin * 2;

    pdf.setDrawColor(200, 200, 200);
    pdf.rect(x, y, w, h);

    let cursorY = y + margin + 4;
    const desc = truncar(item.descripcion, spec.descMaxChars);
    pdf.setFontSize(spec.descFontSize);
    pdf.setTextColor(0, 0, 0);
    pdf.text(desc, x + w / 2, cursorY, { align: 'center', maxWidth: w - 4 });
    cursorY += spec.descLineHeight;

    const precio = formatPrecio(item.precio);
    pdf.setFontSize(spec.priceFontSize);
    pdf.setFont('helvetica', 'bold');
    pdf.text(precio, x + w / 2, cursorY + spec.descFontSize * 0.5, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    cursorY += spec.priceLineHeight;

    pdf.setFontSize(spec.firmaFontSize);
    pdf.setTextColor(...spec.firmaColor);
    pdf.text(FIRMA_TEXTO, x + w / 2, cursorY + spec.firmaFontSize * 0.5, { align: 'center' });
    cursorY += spec.firmaLineHeight;

    const logoSize = spec.logoMm;
    const footerY = y + h - margin - 3;
    if (config.mostrarFecha) {
      pdf.setFontSize(spec.footerFontSize);
      pdf.setTextColor(...spec.firmaColor);
      pdf.text(HOY, x + margin, footerY);
    }
    if (config.mostrarCodigo && item.codigo) {
      pdf.setFontSize(spec.footerFontSize);
      pdf.setTextColor(...spec.firmaColor);
      pdf.text(item.codigo, x + w / 2, footerY, { align: 'center' });
    }
    if (config.mostrarLogo && logoUrl) {
      try {
        pdf.addImage(logoUrl, 'PNG', x + w - margin - logoSize, footerY - logoSize, logoSize, logoSize);
      } catch {
        // skip logo if invalid
      }
    }

    labelIndex++;
    if (labelIndex >= perPage) {
      labelIndex = 0;
      pageNum++;
    }
  }

  pdf.save(`ZinkERP-etiquetas-gondola-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function getWhatsAppCtaNumber(): string {
  const el = document.getElementById('herramienta');
  return (el?.getAttribute('data-whatsapp-cta') ?? '').trim();
}

function buildWhatsAppUrl(text: string): string {
  const num = getWhatsAppCtaNumber();
  const base = num ? `https://wa.me/${num}?text=` : 'https://wa.me/?text=';
  return base + encodeURIComponent(text);
}

function showPostDownloadModalGondola(count: number): void {
  const message = `Hola! Descargué el PDF de etiquetas de góndola (${count} etiqueta${count !== 1 ? 's' : ''}) con la herramienta de ZinkERP. Quería contarte cómo me fue.`;
  const btn = document.getElementById('whatsappCtaBtnGondola') as HTMLAnchorElement | null;
  if (btn) btn.href = buildWhatsAppUrl(message);
  document.getElementById('postDownloadModalGondola')?.classList.remove('hidden');
}

function renderLeadCard(): void {
  const done = localStorage.getItem(LEAD_KEY);
  const form = document.getElementById('leadCardForm');
  const thanks = document.getElementById('leadCardThanks');
  if (!form || !thanks) return;
  if (done) {
    form.classList.add('hidden');
    thanks.classList.remove('hidden');
  } else {
    form.classList.remove('hidden');
    thanks.classList.add('hidden');
  }
}

function limpiarTodo(): void {
  if (!confirm('¿Borrar todos los datos, opciones y logo?')) return;
  localStorage.removeItem(DATA_KEY);
  localStorage.removeItem(CONFIG_KEY);
  localStorage.removeItem(LOGO_KEY);
  // No borrar LEAD_KEY para mantener "Listo, gracias" en la card
  saveConfig(defaultConfig());
  const list = loadData();
  renderPreview();
  const countEl = document.getElementById('previewCountGondola');
  if (countEl) countEl.textContent = '';
  const vacio = document.getElementById('previewVacio');
  if (vacio) vacio.classList.remove('hidden');
  const previewInner = document.querySelector('#previewGrilla .preview-inner');
  if (previewInner) previewInner.remove();
  showMsg('msgPdfGondola', 'Listo.', false);
}

function init(): void {
  localStorage.removeItem(DATA_KEY);
  renderLeadCard();

  document.getElementById('btnYaMeUni')?.addEventListener('click', () => {
    localStorage.setItem(LEAD_KEY, '1');
    renderLeadCard();
  });

  const config = loadConfig();
  (document.getElementById('selectGrilla') as HTMLSelectElement).value = config.grilla;
  (document.getElementById('chkMostrarFecha') as HTMLInputElement).checked = config.mostrarFecha;
  (document.getElementById('chkMostrarCodigo') as HTMLInputElement).checked = config.mostrarCodigo;
  (document.getElementById('chkMostrarLogo') as HTMLInputElement).checked = config.mostrarLogo;

  document.getElementById('btnElegirCsvGondola')?.addEventListener('click', () =>
    document.getElementById('inputCsvGondola')?.click()
  );

  document.getElementById('inputCsvGondola')?.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const rows = parseCSVGondola(String(reader.result));
      if (rows.length === 0) {
        showMsg('msgCsvGondola', 'No se encontraron filas con descripción y precio. Revisá el formato del CSV.', true);
        return;
      }
      saveData(rows);
      renderPreview();
      showMsg('msgCsvGondola', `Se importaron ${rows.length} etiqueta${rows.length !== 1 ? 's' : ''}.`, false);
    };
    reader.readAsText(file, 'UTF-8');
  });

  const zonaDrop = document.getElementById('zonaDropGondola');
  if (zonaDrop) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((ev) => {
      zonaDrop.addEventListener(ev, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    zonaDrop.addEventListener('drop', (e) => {
      const file = (e as DragEvent).dataTransfer?.files?.[0];
      if (!file || !file.name.toLowerCase().endsWith('.csv')) return;
      const reader = new FileReader();
      reader.onload = () => {
        const rows = parseCSVGondola(String(reader.result));
        if (rows.length === 0) {
          showMsg('msgCsvGondola', 'Formato CSV no válido. Necesitás columnas descripción y precio.', true);
          return;
        }
        saveData(rows);
        renderPreview();
        showMsg('msgCsvGondola', `Se importaron ${rows.length} etiqueta${rows.length !== 1 ? 's' : ''}.`, false);
      };
      reader.readAsText(file, 'UTF-8');
    });
  }

  document.getElementById('linkPlantillaGondola')?.addEventListener('click', (e) => {
    e.preventDefault();
    const BOM = '\uFEFF';
    const content = BOM + 'codigo;descripcion;precio\n001;Aceite 900ml;1250.00\n002;Arroz 1kg;890.50\n003;Leche 1L;720.00\n';
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ZinkERP-plantilla-etiquetas-gondola.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  function updateConfigFromUI(): void {
    const c: GondolaConfig = {
      grilla: (document.getElementById('selectGrilla') as HTMLSelectElement).value as '2x4' | '3x5',
      mostrarFecha: (document.getElementById('chkMostrarFecha') as HTMLInputElement).checked,
      mostrarCodigo: (document.getElementById('chkMostrarCodigo') as HTMLInputElement).checked,
      mostrarLogo: (document.getElementById('chkMostrarLogo') as HTMLInputElement).checked,
    };
    saveConfig(c);
    renderPreview();
  }

  document.getElementById('selectGrilla')?.addEventListener('change', updateConfigFromUI);
  document.getElementById('chkMostrarFecha')?.addEventListener('change', updateConfigFromUI);
  document.getElementById('chkMostrarCodigo')?.addEventListener('change', updateConfigFromUI);
  document.getElementById('chkMostrarLogo')?.addEventListener('change', updateConfigFromUI);

  document.getElementById('inputLogo')?.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (file.size > 200 * 1024) {
      showMsg('msgPdfGondola', 'Logo muy grande. Máximo 200 KB.', true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      saveLogo(reader.result as string);
      renderPreview();
    };
    reader.readAsDataURL(file);
  });

  const DELAY_DESCARGA_MS = 5000; // delay antes de generar/descargar (igual que codigos-de-barras)
  let downloadTimeoutId: ReturnType<typeof setTimeout> | null = null;

  document.getElementById('btnDescargarPdfGondola')?.addEventListener('click', () => {
    const list = loadData();
    if (list.length === 0) {
      showMsg('msgPdfGondola', 'No hay datos. Importá un CSV primero.', true);
      return;
    }
    showMsg('msgPdfGondola', 'Preparando PDF... se descargará en unos segundos.', false);
    showPostDownloadModalGondola(list.length);
    downloadTimeoutId = setTimeout(() => {
      downloadTimeoutId = null;
      try {
        generarPDF();
        showMsg('msgPdfGondola', 'PDF descargado.', false);
      } catch {
        showMsg('msgPdfGondola', 'Error al generar el PDF.', true);
      }
    }, DELAY_DESCARGA_MS);
  });
  document.getElementById('btnLimpiarGondola')?.addEventListener('click', limpiarTodo);

  function closePostDownloadModal(): void {
    if (downloadTimeoutId !== null) {
      clearTimeout(downloadTimeoutId);
      downloadTimeoutId = null;
    }
    document.getElementById('postDownloadModalGondola')?.classList.add('hidden');
  }
  document.getElementById('postDownloadCloseGondola')?.addEventListener('click', closePostDownloadModal);
  document.getElementById('postDownloadOverlayGondola')?.addEventListener('click', closePostDownloadModal);

  renderPreview();
}

if (typeof document !== 'undefined') {
  init();
}
