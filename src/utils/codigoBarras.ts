/**
 * Utilidades EAN13 para el generador de códigos de barras (web pública).
 * Algoritmo estándar: 12 dígitos + dígito verificador.
 */

/** Prefijos país usados en la herramienta (ej. 779 Argentina). */
export const PREFIJOS_PAIS = [
  { codigo: '779', nombre: 'Argentina' },
  { codigo: '789', nombre: 'Brasil' },
  { codigo: '773', nombre: 'Uruguay' },
  { codigo: '780', nombre: 'Chile' },
] as const;

/**
 * Calcula el dígito verificador EAN13 a partir de los primeros 12 dígitos.
 */
export function calcularDigitoVerificador(codigo12: string): number {
  if (codigo12.length !== 12 || !/^\d+$/.test(codigo12)) return 0;
  let suma = 0;
  for (let i = 0; i < 12; i++) {
    const digito = parseInt(codigo12[i]!, 10);
    suma += i % 2 === 0 ? digito : digito * 3;
  }
  const residuo = suma % 10;
  return residuo === 0 ? 0 : 10 - residuo;
}

/**
 * Valida que una cadena sea un EAN13 válido (13 dígitos y dígito verificador correcto).
 */
export function validarEan13(codigo: string): boolean {
  const limpio = String(codigo).replace(/\s/g, '');
  if (limpio.length !== 13 || !/^\d+$/.test(limpio)) return false;
  const docena = limpio.slice(0, 12);
  const esperado = calcularDigitoVerificador(docena);
  const actual = parseInt(limpio[12]!, 10);
  return actual === esperado;
}

/**
 * Genera un EAN13 con prefijo país y códigos empresa (4) y producto (5) aleatorios.
 * No garantiza unicidad global; solo para uso interno / pruebas.
 */
export function generarEan13(prefijo: string, empresa?: string, producto?: string): string {
  const emp = empresa ?? String(1000 + Math.floor(Math.random() * 9000));
  const prod = producto ?? String(10000 + Math.floor(Math.random() * 90000));
  const codigo12 = prefijo + emp.padStart(4, '0').slice(-4) + prod.padStart(5, '0').slice(-5);
  const dig = calcularDigitoVerificador(codigo12);
  return codigo12 + String(dig);
}
