const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require("fs").promises
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

    async function importFile() {
        // 1 打开对话框
        let dialogOptions = {
            title: '选择要导入的Markdown文件',
            filters: [
                { name: 'Markdown Files', extensions: ['md'] }
            ],
            properties: ['openFile', 'multiSelections'],
        }        
        let dialogResult = await dialog.showOpenDialog(mainWindow, dialogOptions)

        // 2 拿到 path数组
        let filePaths = dialogResult.filePaths
        let titles = filePaths.map(p => path.basename(p, ".md"))

        // 3 通过 path读文件 逐个封装成一个 md file对象 并插入到 files数组
        return Promise.allSettled(filePaths.map(p => readFile(p))).then(results => {
            return results.map((result, num) => {
                if (result.status == "fulfilled") {
                    let mdFile = {
                        title: titles[num],
                        body: result.value,
                    };                   
                    return `${num}: ${titles[num]}.md 读取成功`
                } 
                
                if (result.status == "rejected") {
                    return `${num}: ${titles[num]}.md 读取失败` + result.reason
                }
            })
        })
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

function readFile(path) {
    let opions = {
        encoding: 'utf-8',
    }
    return fs.readFile(path, opions)
}



