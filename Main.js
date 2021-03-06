'use strict';

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const server = require('./server');
const RunningScripts = require('./server/models/runningScripts');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let dev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === 'development'
) {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'build', 'icon.png'),
    title: 'Tantive - Blockade Runner'
  });

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS
      } = require('electron-devtools-installer');

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log('Error loading React DevTools: ', err)
      );
      // mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

RunningScripts.on('init', (run) => {
  const { windowId } = run;
  // init event handlers
  run.on('message', (data) => {
    mainWindow.send('message', { data, windowId });
  });
  run.on('error', (data) => {
    mainWindow.send('error', { data, windowId });
  });
  run.on('exit', (code) => {
    mainWindow.send('exit', { code, windowId });
  });
});

ipcMain.on('reset', () => {
  RunningScripts.terminateAll();
});

ipcMain.on('terminate', (e, { runId }) => {
  RunningScripts.terminate(runId);
});

ipcMain.on('run', (e, { runId, windowId, args = [] }) => {
  try {
    RunningScripts.run(runId, args);
    mainWindow.send('status', { windowId, status: 'Running' });
  } catch (e) {
    mainWindow.send('error', { windowId });
  }
});

ipcMain.on('close', (e, { runId }) => {
  RunningScripts.terminate(runId);
});

server.listen(5555, () => {
  console.info(`${new Date()}: Server started on port 5555`);
});
