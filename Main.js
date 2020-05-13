'use strict';

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const RunScript = require('./server/runner');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let dev = false;

const runningScripts = {};

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
    }
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

ipcMain.on('reset', () => {
  for (const runId in runningScripts) {
    try {
      runningScripts[runId].terminate();
    } catch (e) {
      // fail silently
    }
    delete runningScripts[runId];
  }
});

ipcMain.on('terminate', (e, { runId }) => {
  try {
    runningScripts[runId].terminate();
  } catch (e) {
    // fail silently
  }
});

ipcMain.on('init', (e, { windowId, name }) => {
  const newRun = new RunScript(name);
  const { runId } = newRun;
  runningScripts[runId] = newRun;
  // init event handlers
  newRun.on('message', (data) => {
    mainWindow.send('message', { data, windowId });
  });
  newRun.on('error', (data) => {
    mainWindow.send('error', { data, windowId });
  });
  newRun.on('exit', (code) => {
    mainWindow.send('exit', { code, windowId });
  });
  mainWindow.send('ready', { windowId, runId });
});

ipcMain.on('run', (e, { runId, windowId, args = [] }) => {
  let run;
  if (runId) {
    run = runningScripts[runId];
    if (run) {
      run.run(args);
      mainWindow.send('status', { windowId, status: 'Running' });
    } else {
      mainWindow.send('error', { windowId });
    }
  }
});

ipcMain.on('close', (e, { runId }) => {
  runningScripts[runId].terminate();
  delete runningScripts[runId];
});
