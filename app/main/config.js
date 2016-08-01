// https://github.com/sindresorhus/electron-config
const { app } = require('electron')
const { isObject } = require('util')
const { join } = require('path')
const fs = require('fs-extra-promise')
const dotProp = require('dot-prop')
const dataPath = app.getPath('userData')

class Config {
  constructor (name, defaults) {
    this.name = name
    this.defaults = defaults
    this.path = join(dataPath, `config/${name}.json`)
    this.data = null
  }

  load () {
    return fs.readFileAsync(this.path)
      .then(buf => {
        const str = buf.toString()
        this.data = JSON.parse(str)
      })
      .catch(err => {
        console.log('err', err)
        if (err.code !== 'ENOENT') { // parse error
          throw err
        }
        this.data = this.defaults // file not exists
        return this.save()
      })
  }

  setv (key, val) { // `set` breaks highlighting
    if (isObject(key)) {
      for (const k in key) {
        this.setv(k, key[k])
      }
    }
    else {
      dotProp.set(this.data, key, val)
    }
  }

  getv (key) {
    return dotProp.get(this.data, key)
  }

  delete (key) {
    dotProp.delete(this.data, key)
  }

  save () {
    const str = JSON.stringify(this.data)
    return fs.outputFileAsync(this.path, str)
  }
}

const userConf = new Config('user', {
  login: {
    username: 'admin233',
    remember: true,
    auto: false
  }
})

module.exports = {
  userConf,
}
