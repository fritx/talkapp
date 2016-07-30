const { ipcMain } = require('electron')
const logger = require('./logger')
const hub = require('./hub')
const prev = {}

process.on('uncaughtException', err => {
  hub.emit('main-error', err)
})

hub.on('main-error', err => {
  // console.error is called by electron before ready
  // however, is not called after ready
  if (hub.appReady) {
    hub.emit('main-console', 'error', ['process.uncaught', err])
  }
})
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
ipcMain.on('win-error', (e, err) => {
  hub.emit('win-console', 'error', ['window.onerror', err])
})

// methods to replace
;['log', 'info', 'warn', 'error'].forEach(key => {
  prev[key] = console[key] // keep
  console[key] = (...args) => { // replace
    hub.emit('main-console', key, args)
  }
})
