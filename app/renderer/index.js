const { webFrame, ipcRenderer } = require('electron')
const util = require('./util')

// disable tap-zoom in mac
webFrame.setZoomLevelLimits(1, 1)

// @public
global.renderer = {
  ipc: ipcRenderer,
  util
}

// shortcuts
// @public
global.$ = document.querySelector.bind(document)
global.$$ = document.querySelectorAll.bind(document)
