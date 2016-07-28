const { EventEmitter } = require('events')

// @public
const hub = new EventEmitter()
module.exports = hub
