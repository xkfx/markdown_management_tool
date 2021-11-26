const { contextBridge } = require('electron')
const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
})




