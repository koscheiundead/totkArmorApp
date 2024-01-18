import { defineStore } from 'pinia';
import armorTemplate from '../../data/armor.json';

export const useArmorStore = defineStore('armor', {
  state: () => ({
    items: [],
    isLoading: true
  }),
  actions: {
    saveItems() {
      window.electronStore.set('items', this.items);
    },
    updateItem(itemName, newData) {
      for (const setKey in this.items) {
        const set = this.items[setKey];
        for (const partKey in set) {
          const item = set[partKey];
          if (item.name === itemName) {
            this.items[setKey][partKey] = newData;
            break;
          }
        }
      }
      this.saveUserData();
    },
    async loadUserData() {
      try {
        const storedData = await window.electronStore.get('armorData');
        if (storedData) {
          this.items = storedData;
        } else {
          this.items = armorTemplate;
        }
        this.isLoading = false;
      } catch (err) {
        console.error("Error loading user data:", err)
        this.isLoading - false;
      }
    },
    async saveUserData() {
      try {
        const simpleData = JSON.parse(JSON.stringify(this.items))
        await window.electronStore.set('armorData', simpleData);
      } catch (err) {
        console.error('Error saving user data:', err)
      }
    },
    reset() {
      this.items = armorTemplate;
    }
  }
});
