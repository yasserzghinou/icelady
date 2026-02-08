export function toTelHref(phone: string): string {
  const cleaned = phone.replace(/[^+\d]/g, '');
  if (!cleaned) {
    return '#';
  }

  return `tel:${cleaned}`;
}

export function toWhatsAppHref(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (!cleaned) {
    return '#';
  }

  const normalizedMessage = (message || '').trim();
  const query = normalizedMessage ? `?text=${encodeURIComponent(normalizedMessage)}` : '';
  return `https://wa.me/${cleaned}${query}`;
}
