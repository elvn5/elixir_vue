function parseLocalStorage<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }catch (e) {
    return null;
  }
}

export {
  parseLocalStorage
}
