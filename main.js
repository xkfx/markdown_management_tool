const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    return win;
}

app.whenReady().then(() => {
    let mainWindow = createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    function importFile() {
        // 1 打开对话框
        let dialogOptions = {
            title: '选择要导入的Markdown文件',
            filters: [
                { name: 'Markdown Files', extensions: ['md'] }
            ],
            properties: ['openFile', 'multiSelections'],
        }         
        // 2 拿到 path数组
        let paths = dialog.showOpenDialogSync(mainWindow, dialogOptions);
        console.log(paths);
        // 3 通过 path读文件 逐个封装成一个 md file对象 并插入到 files数组

    }

    ipcMain.handle('importFile', async (event, someArgument) => {
        const result = await importFile()
        return result
    })    
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

