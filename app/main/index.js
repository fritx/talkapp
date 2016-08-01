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

// ipcMain events
// todo: broadcast
// todo: ipc emit
ipcMain.on('user-login', (e, data) => {
  const { username } = data
  if (data.username === 'admin') { // success
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
  }
  else {
    // e.sender.send('user-login-failed')
    openAlert({
      title: 'Login Failed',
      content: 'Username or password incorrect.'
    })
  }
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
