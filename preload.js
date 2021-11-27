const { contextBridge } = require('electron')
const { ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    importFile: () => ipcRenderer.invoke('importFile'),
    getFiles: () => ipcRenderer.invoke('getFiles'),
})

