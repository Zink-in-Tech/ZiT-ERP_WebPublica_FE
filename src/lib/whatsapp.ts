export const WHATSAPP_CTA_NUMBER = '5491135598389';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_CTA_NUMBER}?text=${encodeURIComponent(message)}`;
}
