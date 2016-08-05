require('./console')
require('./contextMenu')()
if (process.env.DEBUG) {
  require('electron-debug')()
}

const { app, Menu, ipcMain, BrowserWindow } = require('electron')
const {
  close, closeAll, openAlert, openConfirm, openLogin, openHome
} = require('./desktop')
const { createTray } = require('./tray')
const { userConf } = require('./config')
const { userLogin } = require('./api')
const hub = require('./hub')
let currUser

const noop = () => {}
app.on('will-quit', noop)
app.on('window-all-closed', () => {
  if (!currUser) hub.emit('app-quit')
})
app.on('ready', () => {
  hub.appReady = true
  Menu.setApplicationMenu(null) // disable menu
  createTray()
  openLogin()
})

// hub events
hub.on('app-show', () => {
  if (currUser) openHome()
  else openLogin()
})
hub.on('app-quit', () => {
  app.quit()
})

hub.on('user-login-success', data => {
  const { username } = data
  currUser = username
  close('login')
  openHome()

  const { remember, auto } = data
  userConf.setv({
    'login.username': username,
    'login.remember': remember,
    'login.auto': auto,
  })
  userConf.save()
})
hub.on('user-login-failed', err => {
  openAlert({
    title: 'Login Failed',
    content: err.message
  })
})

// ipcMain events
// todo: broadcast
ipcMain.on('user-login', (e, data) => {
  userLogin(data)
    .then(() => {
      hub.emit('user-login-success', data)
    }, err => {
      hub.emit('user-login-failed', err)
    })
})
ipcMain.on('user-logout', () => {
  openConfirm({
    title: 'Logout',
    content: 'Are you sure to log out?'
  }).then(answer => {
    if (answer) logout()
  })
  function logout () {
    closeAll()
    setImmediate(() => {
      currUser = null // after closeAll
      openLogin()
    })
  }
})
ipcMain.on('win-show', e => {
  const win = BrowserWindow.fromWebContents(e.sender)
  win.show()
})
ipcMain.on('win-close', e => {
  const win = BrowserWindow.fromWebContents(e.sender)
  win.close()
})
