const { moment } = require('../common/util')
const { logPath } = require('./const')
const { format } = require('util')
const { join } = require('path')
const fs = require('fs-extra')

const logger = {}
module.exports = logger

const date = moment(new Date(), 'YYYYMMDD')
const file = join(logPath, `${date}.log`)

fs.ensureFileSync(file)
const stream = fs.createWriteStream(file, {
  flags: 'a'
})

;['log', 'info', 'warn', 'error'].forEach(key => {
  logger[key] = (...args) => {
    const time = moment(new Date(), 'MMDD HH:mm:ss')
    const str = format(...args)
    stream.write(`${time} [${key}] ` + str + '\n')
  }
})
