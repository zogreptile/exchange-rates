export function noop() {}

export function getUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function isStringifiedNumber(value: string): boolean {
  // valid values: '', '3', '12.345'
  return /^-?\d*\.?\d*$/.test(value);
}
