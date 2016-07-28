const { app, Menu, ipcMain, BrowserWindow } = require('electron')
const {
  close, closeAll, openAlert, openConfirm, openLogin, openHome
} = require('./desktop')
let currUser

const noop = () => {}
app.on('will-quit', noop)
app.on('window-all-closed', () => {
  if (!currUser) app.quit()
})
app.on('ready', () => {
  Menu.setApplicationMenu(null) // disable menu
  openLogin()
})

// events
// todo: broadcast
// todo: ipc emit
ipcMain.on('user-login', (e, data) => {
  if (data.username === 'admin') { // success
    currUser = data.username
    close('login')
    openHome()
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
