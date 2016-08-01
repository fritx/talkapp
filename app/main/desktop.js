const { ipcMain, BrowserWindow } = require('electron')
const { join } = require('path')
const { userConf } = require('./config')
const preload = join(__dirname, `../renderer/index.js`)
const wins = {}

// @public
function openHome () {
  openWindow('home', {
    width: 800,
    height: 550,
    minWidth: 800,
    minHeight: 550,
    resizable: true
  })
}
exports.openHome = openHome

// @public
function openLogin () {
  const win = openWindow('login', {
    show: false, // dont show
    width: 250,
    height: 400
  })
  Promise.all([ // parallel
    userConf.load().then(() => {
      return userConf.getv('login')
    }),
    new Promise(rs => {
      win.webContents.on('did-finish-load', rs)
    })
  ])
  .then(arr => {
    win.webContents.send('init-data', arr[0])
  })
  .catch(console.error) // catch
}
exports.openLogin = openLogin

// @private
const confirmMap = {}
ipcMain.on('win-confirm', (e, answer) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  const rs = confirmMap[win.id]
  if (rs) rs(answer)
  win.close()
})

// @public
function openConfirm (data) {
  const win = openWindow('confirm', {
    width: 300,
    height: 150,
    frame: false,
    show: false // dont show
  })
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('init-data', data)
  })
  return new Promise(rs => {
    confirmMap[win.id] = rs // wait for call
  })
}
exports.openConfirm = openConfirm

// @public
function openAlert (data) {
  const win = openWindow('alert', {
    width: 300,
    height: 150,
    frame: false,
    show: false // dont show
  })
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('init-data', data)
  })
}
exports.openAlert = openAlert

// @public
function closeAll () {
  for (const k in wins) {
    wins[k].close()
  }
}
exports.closeAll = closeAll

// @public
function close (key) {
  wins[key].close()
}
exports.close = close

// @private
function openWindow (key, opts = {}) {
  const dontShow = opts.show === false
  opts = Object.assign({
    show: false,
    resizable: false
  }, opts)
  opts.webPreferences = Object.assign({
    nodeIntegration: false,
    preload
  }, opts.webPreferences)
  const win = new BrowserWindow(opts)
  wins[key] = win
  win.loadURL(fileURL(key))
  // win.webContents.on('did-finish-load', () => {
  win.on('ready-to-show', () => { // >= 1.2.3
    if (!dontShow) win.show()
  })
  win.on('closed', () => {
    delete wins[key]
  })
  return win
}
function fileURL (key) {
  const path = join(__dirname, `../window/${key}.html`)
  return `file://${path}`
}
