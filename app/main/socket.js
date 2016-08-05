const hub = require('./hub')
const io = require('socket.io-client')
const socket = hub.socket = io('http://localhost:9088')
module.exports = socket

socket.on('connect', () => {
  hub.socketConnected = true
})
socket.on('disconnect', () => {
  hub.socketConnected = false
})
