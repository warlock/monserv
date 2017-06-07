var s = require('spellbook')
var chk = require('./chk.js')

module.exports = {
  status : {},
  refresh : function (servidores, callback) {
    s.epl(servidores, 1, (row, index, next) => {
      chk(row, (data) => {
        this.status[row] = data
        next()
      })
    }, () => {
      callback(this.status)
    })
  }
}