const config = require('./config.js')
const os = require('os')
const disk = require('diskusage')
const io = require('socket.io-client')
const socket = io(config.server + ":" + config.socket_port)
const term = require('./lib/term')
const prettybytes = require('pretty-bytes')
const moment = require('moment')

const x = async () => {
  const networkdata = os.networkInterfaces()
  const network = Object.keys(networkdata).map(((iface) => {
    return { iface: iface, address: networkdata[iface][0].address }
  }))
  const diskusage = disk.checkSync('/')

  const stats = {
    cores: os.cpus().length,
    ree: os.freemem(), total: os.totalmem(),
    hostname: os.hostname(),
    load_avg: os.loadavg(),
    platform: os.platform(),
    release: os.release(),
    uptime: os.uptime(),
    network,
    diskusage
  }

  try {
    const { stdout } = await term.pm2ls()
    const data = JSON.parse(stdout)
    const process = data.map((it) => {
      return {
        app: it.name,
        pm2_id: it.pm_id,
        pid: it.pid,
        memory: it.monit.memory,
        memorybeauty: prettybytes(it.monit.memory),
        cpu: it.monit.cpu,
        instances: it.pm2_env.instances,
        status: it.pm2_env.status,
        uptime: moment(it.pm2_env.pm_uptime).fromNow(),
        uptimebeauty: moment(it.pm2_env.pm_uptime).fromNow(),
        restart: it.pm2_env.restart_time
      }
    })

    stats.process = process
  } catch (error) {
    console.log(JSON.stringify(error))
  }

  return stats
}

var active = false

setInterval(() => {
  if (active) {
    x()
      .then((res) => {
        socket.emit('stats', res)
      })
      .catch((error) => {
        console.log(JSON.stringify(error))
      })
    
  }
}, 3000)

socket.on('connect', () => {
  active = true
  console.log('-> master online')
})

socket.on('disconnect', () => {
  active = false
  console.log('<- master disconnected')
})

console.log('monserv - client')
