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

```plain
0730 19:23:35 [warn] sfsdf1sfd222 { a: 2 }
0730 19:23:35 [error] Error: boom
    at EventEmitter.app.on (/Users/fritx/d/talkapp/app/main/index.js:30:17)
    at emitOne (events.js:101:20)
    at EventEmitter.emit (events.js:188:7)
0730 19:23:35 [log] aaa: 16.859ms
0730 19:24:53 [log] sfsdf1sfd222 { a: 2 }
0730 19:24:53 [info] sfsdf1sfd222 { a: 2 }
```

## Issues

- [Couldn't set selectedTextBackgroundColor from default ()](https://github.com/electron/electron/issues/4420)
