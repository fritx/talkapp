const { BrowserWindow } = require('electron')
const { join } = require('path')
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
  openWindow('login', {
    width: 300,
    height: 400
  })
}
exports.openLogin = openLogin

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
function openWindow (key, opts) {
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
    win.show()
  })
  win.on('closed', () => {
    delete wins[key]
  })
}
function fileURL (key) {
  const path = join(__dirname, `../window/${key}.html`)
  return `file://${path}`
}
