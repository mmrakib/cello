// Node
import path from "node:path"

// Electron
import { app, BrowserWindow } from "electron"

// Electron boolean values
import isDev from "electron-is-dev"
import squirrelHasStarted from "electron-squirrel-startup"

if (squirrelHasStarted) {
    app.quit()
}

//
// Window creation
//
function createWindow(width: number, height: number): void {
    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    if (isDev) {
        mainWindow.loadURL("http://localhost:3000").catch(console.error)
    } else {
        const indexHtmlPath = path.join(__dirname, "../index.html")
        mainWindow.loadFile(indexHtmlPath).catch(console.error)
    }
}

//
// Window events
//
app.on("ready", () => {
    createWindow(800, 600)
})

app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow(800, 600)
    }
})
