export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value.trim())
}

export function normalizePhone(value: string): string {
  return value.replace(/[\s()-]/g, '')
}

/** Accepts Malawian mobile formats such as 0991234567 or +265991234567. */
export function isValidMalawianPhone(value: string): boolean {
  const normalized = normalizePhone(value)
  return /^0[89]\d{8}$/.test(normalized) || /^\+265[89]\d{8}$/.test(normalized)
}
