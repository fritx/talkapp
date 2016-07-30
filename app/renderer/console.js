const { ipcRenderer } = require('electron')
const { isFunction } = require('util')
const prev = console
const map = {}

const _console = {}
global.console = _console // replace

for (const key in prev) {
  if (isFunction(prev[key])) {
    map[key] = prev[key].bind(prev) // bind
    _console[key] = (...args) => {
      map[key](...args)
      ipcRenderer.send('win-console', key, args)
    }
  }
}
