const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      backgroundColor: 'white',
      webPreferences: {
        nodeIntegration: true,
        worldSafeExecuteJavaScript: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
    isDev && win.webContents.openDevTools();
    return win;
  }
  
  if (isDev) {
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
  }

  app.whenReady()
  .then(() => {
    const mainApp = createWindow();
    mainApp.show();
  });

  ipcMain.on('app-quit', () => {
    app.quit();
  })

  ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
  })