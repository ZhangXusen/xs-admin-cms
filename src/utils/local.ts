enum CacheType {
  Local,
  Session,
}
class Cache {
  storage: Storage;
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage;
  }
  setCatch(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }
  getCatch(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}
export const localCache = new Cache(CacheType.Local);
export const sessionCache = new Cache(CacheType.Session);
