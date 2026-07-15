// Shared client-side validators for forms.

export const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,79}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Exactly 10 digits, first digit 6–9 (Indian mobile). */
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export function isValidName(v: string) {
  return NAME_REGEX.test(v.trim());
}

export function isValidEmail(v: string) {
  return EMAIL_REGEX.test(v.trim());
}

/** Valid Indian mobile: exactly 10 digits starting with 6-9. Accepts optional +91/91 prefix which is stripped. */
export function isValidPhone(v: string) {
  return INDIAN_MOBILE_REGEX.test(normalizeIndianMobile(v));
}

/** Return the 10-digit local mobile number after trimming spaces and stripping +91/91 prefix. */
export function normalizeIndianMobile(v: string) {
  let digits = (v || "").trim().replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
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

/** Keep only digits, max 10 (for onChange handlers on Indian mobile inputs). */
export function sanitizePhoneInput(v: string) {
  return (v || "").replace(/\D/g, "").slice(0, 10);
}

export const MOBILE_INVALID_MSG = "Please enter a valid 10-digit mobile number.";
export const MOBILE_DUPLICATE_MSG = "This mobile number is already registered.";
