import JsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';

const STORAGE_KEY = 'codigos-barras-v1';
const MAX_PDF = 50;
const MAX_PREVIEW = 15;
const DESC_MAX = 28;
const MARCA_TEXTO = 'Creado con Zink ERP - zinkerp.com';
const SNACKBAR_DURATION_MS = 8000;

const snackbarTimeouts: Record<string, ReturnType<typeof setTimeout>> = {};

function getWhatsAppCtaNumber(): string {
  const el = document.getElementById('herramienta');
  return (el?.getAttribute('data-whatsapp-cta') ?? '').trim();
}

function calcularDigitoVerificador(codigo12: string): number {
  if (codigo12.length !== 12 || !/^\d+$/.test(codigo12)) return 0;
  let suma = 0;
  for (let i = 0; i < 12; i++) {
    const d = parseInt(codigo12[i], 10);
    suma += i % 2 === 0 ? d : d * 3;
  }
  const residuo = suma % 10;
  return residuo === 0 ? 0 : 10 - residuo;
}

function validarEan13(codigo: string): boolean {
  const limpio = String(codigo).replace(/\s/g, '');
  if (limpio.length !== 13 || !/^\d+$/.test(limpio)) return false;
  const docena = limpio.slice(0, 12);
  const esperado = calcularDigitoVerificador(docena);
  const actual = parseInt(limpio[12], 10);
  return actual === esperado;
}

function loadList(): { codigo: string; descripcion?: string }[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveList(list: { codigo: string; descripcion?: string }[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function escapeHtml(s: string): string {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

function truncarDesc(s: string | undefined, max: number): string {
  if (!s || !s.trim()) return '';
  const t = s.trim();
  return t.length <= max ? t : t.slice(0, max) + '…';
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

function parseCSV(text: string): { codigo: string; descripcion?: string }[] {
  text = text.replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];
  const sep = lines[0].includes(';') ? ';' : ',';
  const rawRows = lines.map((l) =>
    l.includes('"') ? parseCSVLine(l, sep) : l.split(sep).map((s) => s.trim())
  );
  const headers = rawRows[0].map((h) =>
    String(h).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  );
  const codigoIdx = headers.findIndex((h) => /codigo|code|codigo_barras/.test(h));
  const descIdx = headers.findIndex((h) =>
    /descripcion|description|nombre|producto/.test(h)
  );
  if (codigoIdx < 0) return [];
  const result: { codigo: string; descripcion?: string }[] = [];
  for (let r = 1; r < rawRows.length; r++) {
    const row = rawRows[r];
    const codigo = String(row[codigoIdx] ?? '').trim().replace(/\s/g, '');
    if (!codigo) continue;
    const desc = descIdx >= 0 ? String(row[descIdx] ?? '').trim() : undefined;
    result.push({ codigo, descripcion: desc || undefined });
  }
  return result;
}

function generarImagenBarcode(codigo: string, conNumero: boolean): string {
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, codigo, {
    format: 'EAN13',
    width: 1.8,
    height: 50,
    displayValue: conNumero,
    fontSize: conNumero ? 14 : 0,
    margin: 2,
  });
  return canvas.toDataURL('image/png');
}

function generarPdf(
  list: { codigo: string; descripcion?: string }[],
  conMarca: boolean
): void {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW = 297;
  const pageH = 210;
  const labelW = 50;
  const labelH = 30;
  const cols = Math.floor(pageW / labelW);
  const rows = Math.floor(pageH / labelH);
  const perPage = cols * rows;
  const margin = 2;
  const imgH = 14;
  let labelIndex = 0;
  let pageNum = 0;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (labelIndex === 0 && pageNum > 0) pdf.addPage();
    const col = labelIndex % cols;
    const row = Math.floor(labelIndex / cols);
    const x = col * labelW;
    const y = row * labelH;

    const imgData = generarImagenBarcode(item.codigo, false);
    const imgW = 44;
    pdf.addImage(imgData, 'PNG', x + margin, y + margin, imgW, imgH);

    let textY = y + margin + imgH + 1;
    if (conMarca) {
      pdf.setFontSize(5);
      pdf.setTextColor(120, 120, 120);
      pdf.text(MARCA_TEXTO, x + labelW / 2, textY + 1.5, { align: 'center' });
      textY += 4;
    }
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(item.codigo, x + labelW / 2, textY + 3.5, { align: 'center' });
    textY += 5;
    const desc = truncarDesc(item.descripcion, DESC_MAX);
    if (desc && textY < y + labelH - 3) {
      pdf.setFontSize(6);
      pdf.text(desc, x + labelW / 2, textY + 2, {
        align: 'center',
        maxWidth: labelW - 4,
      });
    }

    labelIndex++;
    if (labelIndex >= perPage) {
      labelIndex = 0;
      pageNum++;
    }
  }

  pdf.save(`ZinkERP-etiquetas-codigos-barras-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function renderList(): void {
  const list = loadList();
  const tbody = document.getElementById('tbodyLista');
  const listaVacia = document.getElementById('listaVacia');
  const listaOculta = document.getElementById('listaOculta');
  const totalSpan = document.getElementById('totalItems');
  const previewCount = document.getElementById('previewCount');
  if (!tbody || !listaVacia || !listaOculta || !totalSpan || !previewCount) return;

  totalSpan.textContent = String(list.length);
  previewCount.textContent =
    list.length === 0 ? '' : `${list.length} ítem${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    tbody.innerHTML = '';
    listaVacia.classList.remove('hidden');
    listaOculta.classList.add('hidden');
    return;
  }
  listaVacia.classList.add('hidden');
  const showCount = Math.min(list.length, MAX_PREVIEW);
  if (list.length > MAX_PREVIEW) listaOculta.classList.remove('hidden');
  else listaOculta.classList.add('hidden');

  const rows = list
    .slice(0, showCount)
    .map(
      (item, i) => `
    <tr class="border-b border-dark-600" data-index="${i}">
      <td class="py-2 pr-2 font-mono text-primary">${escapeHtml(item.codigo)}</td>
      <td class="py-2 px-2 text-gray-300">${escapeHtml(item.descripcion || '—')}</td>
      <td class="py-2 pl-2"><button type="button" class="quitar p-1 text-gray-400 hover:text-red-400 rounded" aria-label="Quitar de la lista">✕</button></td>
    </tr>
  `
    )
    .join('');
  tbody.innerHTML = rows;

  tbody.querySelectorAll('.quitar').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tr = btn.closest('tr');
      const i = tr ? parseInt(tr.dataset.index ?? '0', 10) : 0;
      const list = loadList();
      list.splice(i, 1);
      saveList(list);
      renderList();
    });
  });
}

function buildWhatsAppUrl(text: string): string {
  const num = getWhatsAppCtaNumber();
  const base =
    num !== ''
      ? `https://wa.me/${num}?text=`
      : 'https://wa.me/?text=';
  return base + encodeURIComponent(text);
}

function showPostDownloadModal(count: number): void {
  const message = `Hola! Descargué el PDF de etiquetas de códigos de barras (${count} etiqueta${count !== 1 ? 's' : ''}) con la herramienta de ZinkERP. Quería contarte cómo me fue.`;
  const btn = document.getElementById('whatsappCtaBtn') as HTMLAnchorElement | null;
  if (btn) btn.href = buildWhatsAppUrl(message);
  document.getElementById('postDownloadModal')?.classList.remove('hidden');
}

function init(): void {
  document.getElementById('btnGenerarCodigo')?.addEventListener('click', () => {
    const prefijo = '779';
    const emp = String(1000 + Math.floor(Math.random() * 9000));
    const prod = String(10000 + Math.floor(Math.random() * 90000));
    const codigo12 = prefijo + emp + prod;
    const dig = calcularDigitoVerificador(codigo12);
    const codigo = codigo12 + String(dig);
    const input = document.getElementById('codigoEan') as HTMLInputElement | null;
    if (input) input.value = codigo;
  });

  document.getElementById('btnAgregar')?.addEventListener('click', () => {
    const inputCodigo = document.getElementById('codigoEan') as HTMLInputElement | null;
    const inputDesc = document.getElementById('descripcion') as HTMLInputElement | null;
    const codigo = (inputCodigo?.value ?? '').replace(/\s/g, '');
    const descripcion = (inputDesc?.value ?? '').trim() || undefined;
    if (!codigo) {
      showMsg('msgUnoAUno', 'Ingresá un código EAN13.', true);
      inputCodigo?.focus();
      return;
    }
    if (!validarEan13(codigo)) {
      showMsg(
        'msgUnoAUno',
        'El código no es un EAN13 válido. Debe tener 13 dígitos y el dígito verificador correcto.',
        true
      );
      inputCodigo?.focus();
      return;
    }
    const list = loadList();
    list.push({ codigo, descripcion });
    saveList(list);
    renderList();
    if (inputCodigo) inputCodigo.value = '';
    if (inputDesc) inputDesc.value = '';
    showMsg('msgUnoAUno', 'Agregado a la lista.', false);
  });

  document
    .getElementById('btnElegirCsv')
    ?.addEventListener('click', () => document.getElementById('inputCsv')?.click());

  document.getElementById('inputCsv')?.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => showMsg('msgCsv', 'No se pudo leer el archivo.', true);
    reader.onload = () => {
      const text = String(reader.result);
      const rows = parseCSV(text);
      if (rows.length === 0) {
        showMsg(
          'msgCsv',
          'No se encontraron las columnas codigo o codigo_barras. Revisá que el CSV tenga cabecera.',
          true
        );
        return;
      }
      const list = loadList();
      let ok = 0;
      const invalid: number[] = [];
      rows.forEach((r, idx) => {
        if (validarEan13(r.codigo)) {
          list.push(r);
          ok++;
        } else invalid.push(idx + 2);
      });
      saveList(list);
      renderList();
      if (invalid.length === 0)
        showMsg('msgCsv', `Se importaron ${ok} código${ok !== 1 ? 's' : ''} correctamente.`, false);
      else
        showMsg(
          'msgCsv',
          `Se importaron ${ok} de ${rows.length}; ${invalid.length} fila${invalid.length !== 1 ? 's' : ''} tenían código inválido (ej. filas: ${invalid.slice(0, 5).join(', ')}${invalid.length > 5 ? '…' : ''}).`,
          true
        );
    };
    reader.readAsText(file, 'UTF-8');
  });

  const zonaDrop = document.getElementById('zonaDropCsv');
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
        const rows = parseCSV(String(reader.result));
        if (rows.length === 0) {
          showMsg('msgCsv', 'No se encontraron las columnas codigo o codigo_barras.', true);
          return;
        }
        const list = loadList();
        let ok = 0;
        rows.forEach((r) => {
          if (validarEan13(r.codigo)) {
            list.push(r);
            ok++;
          }
        });
        saveList(list);
        renderList();
        showMsg(
          'msgCsv',
          `Se importaron ${ok} de ${rows.length} código${rows.length !== 1 ? 's' : ''}.`,
          ok < rows.length
        );
      };
      reader.readAsText(file, 'UTF-8');
    });
  }

  document.getElementById('linkPlantillaCsv')?.addEventListener('click', (e) => {
    e.preventDefault();
    const BOM = '\uFEFF';
    const content = BOM + 'codigo;descripcion\n7790123456789;Ejemplo producto 1\n';
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ZinkERP-plantilla-codigos-barras.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  const DELAY_DESCARGA_MS = 5000; // misma demora que en precios inteligentes

  document.getElementById('btnDescargarPdf')?.addEventListener('click', () => {
    const list = loadList();
    if (list.length === 0) {
      showMsg('msgPdf', 'Agregá al menos un código antes de descargar el PDF.', true);
      return;
    }
    if (list.length > MAX_PDF) {
      showMsg(
        'msgPdf',
        'Máximo 50 etiquetas por archivo. Dividí en varios archivos o quitá ítems.',
        true
      );
      return;
    }
    showMsg('msgPdf', 'Preparando PDF... se descargará en unos segundos.', false);
    showPostDownloadModal(list.length);
    setTimeout(() => {
      try {
        generarPdf(list, true);
        showMsg('msgPdf', 'PDF descargado.', false);
      } catch {
        showMsg('msgPdf', 'Error al generar el PDF.', true);
      }
    }, DELAY_DESCARGA_MS);
  });

  document
    .getElementById('postDownloadOverlay')
    ?.addEventListener('click', () =>
      document.getElementById('postDownloadModal')?.classList.add('hidden')
    );
  document
    .getElementById('postDownloadClose')
    ?.addEventListener('click', () =>
      document.getElementById('postDownloadModal')?.classList.add('hidden')
    );

  document.getElementById('whatsappCtaBtn')?.addEventListener('click', (e) => {
    const btn = e.currentTarget as HTMLAnchorElement;
    if (btn?.href && btn.href !== '#')
      window.open(btn.href, '_blank', 'noopener,noreferrer');
  });

  document.getElementById('btnLimpiar')?.addEventListener('click', () => {
    if (!confirm('¿Borrar la lista y empezar de nuevo?')) return;
    saveList([]);
    renderList();
  });

  renderList();
}

init();
