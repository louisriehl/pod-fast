// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcMain, ipcRenderer } from 'electron';

console.log('Initializing context bridge')

contextBridge.exposeInMainWorld('mainApi', {
  sendPlayers: (players: string[]) => ipcRenderer.send('sendPlayers', players),
  onSendPods: (callback: any) => ipcRenderer.on('onSendPods', callback),
  getTableCount: (players: string[]) => ipcRenderer.invoke('getTableCount', players),
});