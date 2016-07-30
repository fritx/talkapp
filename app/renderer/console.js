const { ipcRenderer } = require('electron')
const { isError, isFunction } = require('util')
const prev = console
const map = {}

const _console = {}
global.console = _console // replace

for (const key in prev) {
  if (isFunction(prev[key])) {
    map[key] = prev[key].bind(prev) // bind
    _console[key] = (...args) => {
      map[key](...args)

      // cast error obj before ipc sending
      // todo: logic move to global.ipc.send
      args.forEach((v, i) => {
        if (isError(v)) {
          const { name, message, stack } = v
          const obj = { name, message, stack }
          args[i] = obj // replace
        }
      })

      ipcRenderer.send('win-console', key, args)
    }
  }
}
