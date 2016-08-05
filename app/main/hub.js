const { EventEmitter } = require('events')

const hub = new EventEmitter()
module.exports = hub

hub.appReady = false
hub.socketConnected = false
