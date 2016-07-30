const { ipcMain } = require('electron')
const logger = require('./logger')
const hub = require('./hub')
const prev = {}

hub.on('win-console', (key, args) => {
  prev[key](...args)
  if (logger[key]) logger[key](...args)
})
hub.on('main-console', (key, args) => {
  prev[key](...args)
  if (logger[key]) logger[key](...args)
})

ipcMain.on('win-console', (e, key, args) => {
  hub.emit('win-console', key, args)
})

// methods to replace
;['log', 'info', 'warn', 'error'].forEach(key => {
  prev[key] = console[key] // keep
  console[key] = (...args) => { // replace
    hub.emit('main-console', key, args)
  }
})
