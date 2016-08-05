const socket = require('./socket')
const hub = require('./hub')

module.exports = {
  userLogin,
}

let loggingIn = false
let loginRs, loginRj

// todo: login timeout
// todo: throw vs reject?
function userLogin (data) {
  return new Promise((rs, rj) => {
    if (loggingIn) {
      return rj(new Error('Already logging in.'))
    }
    loggingIn = true
    loginRs = () => {
      loginClear()
      rs()
    }
    loginRj = err => {
      loginClear()
      rj(err)
    }
    socket.on('user-login-success', loginRs)
    socket.on('user-login-failed', loginRj) // fixme: err
    if (!hub.socketConnected) {
      return rj(new Error('Socket is not ready.'))
    }
    socket.emit('user-login', data)
  })
}
function loginClear () {
  socket.removeListener('user-login-success', loginRs)
  socket.removeListener('user-login-failed', loginRj)
  loginRs = null // deref
  loginRj = null
  loggingIn = false
}
