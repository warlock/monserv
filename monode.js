const conf = require('./conf.js')
const os = require('os')
const socket = require('socket.io-client')(conf.server + ":" + conf.socket_port)
console.log(`Conecting: ${conf.server + ":" + conf.socket_port}`)
socket.on('connect', () => {
  socket.emit('identify', {
    key : conf.key,
    hostname : os.hostname()
  })
})

socket.on('disconnect', () => {
  console.log(`Disconnected from server`)
})