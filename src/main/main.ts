import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow | null

// 開発時には electron アプリをホットリロードする
// electron-reload の mainFileを'main.js'でハードコーディングする
const filePath = path.resolve(__dirname, '..')
const execPath = path.resolve(
  __dirname,
  '..',
  '..',
  'node_modules',
  '.bin',
  'electron' + (process.platform === 'win32' ? '.cmd' : '')
)
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(filePath, {
    electron: execPath,
    forceHardReset: false,
    hardResetMethod: 'exit',
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true,
    },
  })

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
