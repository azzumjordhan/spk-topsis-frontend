const localStorageMixins = {
  get: (key: any) =>
    typeof window !== "undefined" ? window?.localStorage?.getItem(key) : null,
  remove: (key: any) =>
    typeof window !== "undefined"
      ? window?.localStorage?.removeItem(key)
      : null,
  set: (key: any, value: any) =>
    typeof window !== "undefined"
      ? window?.localStorage?.setItem(key, JSON.stringify(value))
      : null,
};

export { localStorageMixins };
