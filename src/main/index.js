import { app, BrowserWindow,Menu,ipcMain, } from 'electron'
import '../renderer/store'
import path from 'path'
import { createLocalStore } from './../renderer/util/LocalStore'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const alwaysOnTop = createLocalStore().get('alwaysOnTop')
  mainWindow = new BrowserWindow({
    height: 477,
    useContentSize: true,
    width: process.env.NODE_ENV !== 'production'?1360:360,
    icon: path.join(__static, 'icon.png'),    // 注意，这里的path是一个node模块哦，需要npm安装并且引入使用。最直接的作用就是拼接字符串。
    alwaysOnTop:alwaysOnTop,
    // 需要在BrowserWindow 的 webPreferences 中设置 webviewTag 为 true
    webPreferences: {
      // webviewTag:true,
      nodeIntegration: true,   
      enableRemoteModule: true, 
      webSecurity:false,
   },
   frame: process.env.NODE_ENV !== 'production', // 去掉导航最大化最小化以及关闭按钮
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  if(process.env.NODE_ENV !== 'production'){
     mainWindow.webContents.openDevTools()
  }
}

app.on('ready', ()=>{
  createWindow()
})
app.on('ready', () => {
  if (process.env.NODE_ENV !== 'production') {
    require('vue-devtools').install()
  }
})

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


ipcMain.on('window-close', (event, arg) => {
  mainWindow.close()
})

ipcMain.on('window-minimize', (event, arg) => {
  if (arg) {
    mainWindow.hide()
  } else {
    mainWindow.minimize()
  }
})

ipcMain.on('toggle-alwaysOnTop', (event, arg) => {
  mainWindow.setAlwaysOnTop(arg)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
