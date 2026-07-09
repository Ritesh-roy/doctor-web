// Shared client-side validators for forms.

export const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,79}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_DIGITS_REGEX = /^\d{10,15}$/;

export function isValidName(v: string) {
  return NAME_REGEX.test(v.trim());
}

export function isValidEmail(v: string) {
  return EMAIL_REGEX.test(v.trim());
}

/** Accepts an optional leading +, then 10–15 digits total. */
export function isValidPhone(v: string) {
  const cleaned = v.replace(/[\s()-]/g, "");
  if (cleaned.startsWith("+")) return /^\+\d{10,15}$/.test(cleaned);
  return PHONE_DIGITS_REGEX.test(cleaned);
}

/** Today's date as YYYY-MM-DD in the browser's local timezone. */
export function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 10);
}

/** True if the given YYYY-MM-DD is today or in the future. */
export function isFutureOrToday(v: string) {
  return Boolean(v) && v >= todayISO();
}

/** Strip anything that isn't a letter or space (for onChange handlers). */
export function sanitizeNameInput(v: string) {
  return v.replace(/[^A-Za-z\s.'-]/g, "").slice(0, 80);
}

/** Keep only digits and an optional leading + (for onChange handlers). */
export function sanitizePhoneInput(v: string) {
  const hasPlus = v.trim().startsWith("+");
  const digits = v.replace(/\D/g, "").slice(0, 15);
  return hasPlus ? `+${digits}` : digits;
}
