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
  setData: (key, value) => ipcRenderer.send('set-data', key, value),
  getData: (key) => ipcRenderer.invoke('get-data', key)
});
