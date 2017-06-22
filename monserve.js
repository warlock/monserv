const express = require('express')
const app = express()
const conf = require('./conf.js')
const sb = require('spellbook')
const io = require('socket.io')({ transports: ['websocket'] })
var nodes = {}

app.use('/', express.static('public'))
app.listen(conf.http_port, () => {
  console.log("Server start...")
})

io.attach(conf.socket_port)

setInterval(() => {
  console.log(JSON.stringify(nodes))
}, 3000)

io.on('connection', socket => {
  console.log(`conected: ${socket.id}`)
  socket.on('stats', data => {
    if (sb.empty(data.key) || sb.empty(data.hostname) || data.key !== conf.key) {
      console.log(`kick: ${socket.id}`)
      socket.disconnect()
    } else {
      nodes[socket.id] = data
    }
  })

  socket.on('rec_data', data => {

  })

  socket.on('disconnect', () => {
    if (!sb.empty(nodes[socket.id])) delete(nodes[socket.id])
    console.log(`disconnected: ${socket.id}`)
  })
})
