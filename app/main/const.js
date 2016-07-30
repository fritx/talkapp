const { app } = require('electron')
const { join } = require('path')

const dataPath = app.getPath('userData')
const logPath = join(dataPath, 'log')

module.exports = {
  dataPath,
  logPath,
}
