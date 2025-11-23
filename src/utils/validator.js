export function isValidUrl(v) {
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}
export function isValidCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}
