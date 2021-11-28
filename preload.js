const { contextBridge } = require('electron')
const { ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fileController', {
    importFile: () => ipcRenderer.invoke('importFile'),
    getFiles: () => ipcRenderer.invoke('getFiles'),
})

