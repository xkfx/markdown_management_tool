const { contextBridge } = require('electron')
const fs = require("fs");

window.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('myAPI', {
        desktop: true
    });

})




