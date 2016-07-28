const { Tray, Menu } = require('electron')
const { join } = require('path')
const hub = require('./hub')

const icon = join(__dirname, '../media/caprine/IconTray.png')
let tray

const menu = Menu.buildFromTemplate([
  {
    label: 'Show',
    click () {
      hub.emit('app-show')
    }
  },
  {
    label: 'Quit',
    click () {
      hub.emit('app-quit')
    }
  }
])

// @public
// cuz should be placed in app.on('ready')
function createTray () {
  tray = new Tray(icon)
  tray.setToolTip('TalkApp')
  tray.setContextMenu(menu)
}
exports.createTray = createTray

// todo: updateTray
