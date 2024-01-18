import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, ...args);
  },
  on: (channel, data) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  saveUserData: (userData) => ipcRenderer.invoke('save-user-data', userData),
  loadUserData: () => ipcRenderer.invoke('load-user-data')
});

contextBridge.exposeInMainWorld('electronStore', {
  get: async (key) => await ipcRenderer.invoke('electron-store-get', key),
  set: async (key, value) => await ipcRenderer.invoke('electron-store-set', key, value)
});
