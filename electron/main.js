const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require('fs');
const path = require("path");
const Store = require('electron-store');
const store = new Store();

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
  });
  win.webContents.on("did-finish-load", () => {
    win == null
      ? void 0
      : win.webContents.send(
          "main-process-message",
          /* @__PURE__ */ new Date().toLocaleString()
        );
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.whenReady().then(() => {
  createWindow()
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle('electron-store-get', (event, key) => {
  return store.get(key);
});

ipcMain.handle('electron-store-set', (event, key, value) => {
  store.set(key, value);
})
