const conf = require('./conf.js')
const os = require('os')
const disk = require('diskusage')
const socket = require('socket.io-client')(conf.server + ":" + conf.socket_port)
console.log(`Conecting: ${conf.server + ":" + conf.socket_port}`)
var stats
socket.on('connect', () => {
  stats = setInterval(() => {
    disk.check("/", (err, info) => {
      if (err) console.error(err)
      socket.emit('stats', {
        key : conf.key,
        hostname : os.hostname(),
        freemem : os.freemem(),
        totalmem : os.totalmem(),
        loadavg : os.loadavg(),
        network : os.networkInterfaces(),
        platform : os.platform(),
        relase : os.release(),
        uptime : os.uptime(),
        diskusage : info
      })
    })
  }, 2500)
})


socket.on('disconnect', () => {
  clearInterval(stats)
  console.log(`Disconnected from server`)
})