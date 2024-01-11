import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  },
  on: (channel, data) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
});
