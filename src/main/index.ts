import { app, BrowserWindow, ipcMain, session, Menu, shell } from 'electron';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const PODS_WINDOW_WEBPACK_ENTRY: string;
declare const PODS_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const isPackaged = app.isPackaged;

const WINDOW_HEIGHT = 800;
const WINDOW_WIDTH = 1200;

const createMainWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    minHeight: WINDOW_HEIGHT,
    minWidth: WINDOW_WIDTH,
    show: false,
    title: 'PodFast',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: !isPackaged
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.on('ready-to-show', () => {
    if (!isPackaged) {
      mainWindow.webContents.openDevTools();
    }
    mainWindow.show();
  })
};

const createPodsWindow = (pods: string[][]): void => {
  const podsWindow = new BrowserWindow({
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    minHeight: WINDOW_HEIGHT,
    minWidth: WINDOW_WIDTH,
    show: false,
    title: 'Tables',
    webPreferences: {
      preload: PODS_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: !isPackaged
    },
  });

  // and load the index.html of the app.
  podsWindow.loadURL(PODS_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  podsWindow.on('ready-to-show', () => {
    if (!isPackaged) {
      podsWindow.webContents.openDevTools();
    }
    podsWindow.webContents.send('onSendPods', pods);
    podsWindow.show();
  });

  podsWindow.on('focus', () => {
    podsWindow.webContents.send('onSendPods', pods);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  modifyMenu();
  establishSession();
  createMainWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    establishSession();
    createMainWindow();
  }
});

function modifyMenu(): void {
  const menu = Menu.getApplicationMenu();
  const viewMenu = menu.items[2];

  const filtered = viewMenu.submenu.items.filter(item => item.role !== null && !['reload', 'forcereload', 'toggledevtools'].includes(item.role));
  const newMenu = Menu.buildFromTemplate(
    [
      menu.items[0], 
      menu.items[1], 
      {role: 'viewMenu', label: 'View', submenu: Menu.buildFromTemplate(filtered)}, 
      menu.items[3],
      {role: 'help',
      submenu: Menu.buildFromTemplate([
        {
          label: 'GitHub',
          click: () => shell.openExternal('https://github.com/louisriehl/pod-fast')
        }
      ])
    }]);

  Menu.setApplicationMenu(newMenu);
}

function establishSession() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': `Content-Security-Policy: default-src 'self' data:; style-src 'self' https://cdnjs.cloudflare.com:* data: 'unsafe-inline';`
      }
    })
  })
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('sendPlayers', handleGotPlayers);
ipcMain.handle('getTableCount', handleGetTableCount)

function handleGotPlayers(event: any, players: string[]) {
  const pods = generatePods(players);
  createPodsWindow(pods)
}

function handleGetTableCount(event: any, players: string[]): number {
  const pods = generatePods(players);
  return pods.length;
}

function generatePods(players: string[]): string[][] {
  const shuffledArray = shuffle(players);
  return sortIntoPods(shuffledArray);
}

// Sort players into as many pods of 4 as possible, and pods of 3 for the rest
function sortIntoPods(players: string[]): string[][] {
  const totalPlayers = players.length;
  const remainderOfFour = totalPlayers % 4;
  let sortedPods: string[][];

  // No need for 3-person pods
  if (remainderOfFour === 0) {
    sortedPods = splitIntoEqualGroups(players, 4);
  } else {
    const maximumNumberOfFourPods = getMaximumFourPodGroups(totalPlayers, remainderOfFour);
    console.log(`Max 4 pods: ${maximumNumberOfFourPods}`);
    const endIndex = 4 * maximumNumberOfFourPods;
    const fourGroupSlice = players.slice(0, endIndex);
    const threeGroupSlice = players.slice(endIndex);
    console.log(`End index: ${endIndex}, 4 group length = ${fourGroupSlice.length}, 3 group length: ${threeGroupSlice.length}`);
    const fourPlayerPods = splitIntoEqualGroups(fourGroupSlice, 4);
    const threePlayerPods = splitIntoEqualGroups(threeGroupSlice, 3);

    sortedPods = fourPlayerPods.concat(threePlayerPods);
  }

  return sortedPods;
}

function getMaximumFourPodGroups(totalPlayers: number, remainder: number): number {
  return (totalPlayers - (3 * (4 - remainder))) / 4;
}

function splitIntoEqualGroups(array: any[], size: number): any[][] {
  const groups: any[][] = []
  
  for (let i = 0; i < array.length; i = i + size) {
    groups.push(array.slice(i, i + size));
  }

  return groups;
}

// Fisher-Yates shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array: string[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}