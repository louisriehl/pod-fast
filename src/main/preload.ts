// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('mainApi', {
  sendPlayers: (players: string[]) => ipcRenderer.send('sendPlayers', players),
  onSendPods: (callback: any) => ipcRenderer.on('onSendPods', callback),
  getTableCount: (players: string[]) => ipcRenderer.invoke('getTableCount', players),
});