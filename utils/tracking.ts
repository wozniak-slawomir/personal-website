export const TRACKING_CONSENT_EVENT = 'tracking-consent'

const ASCII_PUNCTUATION = /[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]/g

export function normalizeEmail(value: string): string | null {
  const normalized = value.trim().toLowerCase()
  if (!normalized.includes('@')) return null
  return normalized
}

export function normalizePhone(value: string): string | null {
  let digits = value.replace(/[\s().-]/g, '')
  if (digits.startsWith('+')) digits = digits.slice(1)
  digits = digits.replace(/^0+/, '')
  if (!/^\d{8,15}$/.test(digits)) return null
  return digits
}

export function normalizeName(value: string): string | null {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, '').replace(ASCII_PUNCTUATION, '')
  return normalized.length > 0 ? normalized : null
}
