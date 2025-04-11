function parseLocalStorage<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) || "");
}

export {
  parseLocalStorage
}
