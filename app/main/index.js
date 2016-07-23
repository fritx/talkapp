const { app, Menu, ipcMain } = require('electron')
const { close, closeAll, openLogin, openHome } = require('./desktop')
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
    e.sender.send('user-login-failed')
  }
})
ipcMain.on('user-logout', () => {
  closeAll()
  setImmediate(() => {
    currUser = null // after closeAll
    openLogin()
  })
})
