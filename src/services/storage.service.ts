export const storage = {
  getItem,
  setItem,
};

function getItem<T>(key: string): T | null;
function getItem<T>(key: string, defaultValue: T): T;
function getItem<T>(key: string, defaultValue?: T): T | null {
  const value = localStorage.getItem(key);

  if (!value) return defaultValue ?? null;

  return JSON.parse(value);
}

function setItem<T>(key: string, data: T): void {
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
}
