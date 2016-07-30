const leftPad = require('./leftPad')

module.exports = {
  moment,
}

// todo: remove once moment is included
// by other app/ node_modules
function moment (v, f) {
  const d = new Date(v)
  return f.replace(/YYYY/g, d.getFullYear())
    .replace(/MM/g, p(d.getMonth() + 1))
    .replace(/DD/g, p(d.getDate()))
    .replace(/HH/g, p(d.getHours()))
    .replace(/mm/g, p(d.getMinutes()))
    .replace(/ss/g, p(d.getSeconds()))
}

function p (v, n = 2) {
  return leftPad(v, n, '0')
}
