## Features

- [x] Zero unnecessary callbacks
- [x] 100% error capture (process/window)
- [x] Console-based log system
- [x] Fully event-driven
- [x] The electron way

## Rules

- Exposed electron-is-dev is not trusted
- process.env.DEBUG should be envify'd
- Prefer promises over callbacks
- console.* should be persisted as logger

## Demo

Log file `/Users/fritx/Library/Application Support/TalkApp/log/20160730.log`

Full stack trace in development mode

```plain
0730 19:23:35 [warn] sfsdf1sfd222 { a: 2 }
0730 19:23:35 [error] Error: boom
    at EventEmitter.app.on (/Users/fritx/d/talkapp/app/main/index.js:30:17)
    at emitOne (events.js:101:20)
    at EventEmitter.emit (events.js:188:7)
0730 19:23:35 [log] aaa: 16.859ms
0730 19:24:53 [log] sfsdf1sfd222 { a: 2 }
0730 19:24:53 [info] sfsdf1sfd222 { a: 2 }
0730 22:56:40 [error] window.onerror { message: 'el is not defined',
  name: 'ReferenceError',
  stack: 'ReferenceError: el is not defined\n    at fillForm (/Users/fritx/d/talkapp/app/renderer/util.js:30:13)\n    at EventEmitter.ipc.on (file:///Users/fritx/d/talkapp/app/window/login.html:33:3)\n    at emitTwo (events.js:106:13)\n    at EventEmitter.emit (events.js:191:7)' }
0730 23:39:30 [error] process.uncaught Error: aaaaa
    at EventEmitter.app.on (/Users/fritx/d/talkapp/app/main/index.js:26:9)
    at emitOne (events.js:101:20)
    at EventEmitter.emit (events.js:188:7)
0730 23:39:56 [error] App threw an error during load
0730 23:39:56 [error] Error: bb
    at Object.<anonymous> (/Users/fritx/d/talkapp/app/main/index.js:14:9)
    at Module._compile (module.js:541:32)
    at Object.Module._extensions..js (module.js:550:10)
    at Module.load (module.js:456:32)
```

## Issues

- [Couldn't set selectedTextBackgroundColor from default ()](https://github.com/electron/electron/issues/4420)
