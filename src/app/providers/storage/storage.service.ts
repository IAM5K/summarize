import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Initialize Ionic Storage
  private async init() {
    const store = await this.storage.create();
    this._storage = store;
  }

  // Save data
  async setItem(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  // Get data
  async getItem<T>(key: string): Promise<T | null> {
    const item = await this._storage?.get(key);
    return item ?? null;
  }

  // Remove data by key
  async removeItem(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  // Clear all storage
  async clear(): Promise<void> {
    await this._storage?.clear();
  }

  // Check if key exists
  async hasKey(key: string): Promise<boolean> {
    const value = await this._storage?.get(key);
    return value !== null && value !== undefined;
  }
}
