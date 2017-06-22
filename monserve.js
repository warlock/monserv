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

var intervals = {}

io.on('connection', socket => {
  console.log(`conected: ${socket.id}`)
  socket.on('stats', data => {
    if (sb.empty(data.key) || sb.empty(data.hostname) || data.key !== conf.key) {
      console.log(`kick: ${socket.id}`)
      socket.disconnect()
    } else {
      delete(data.key)
      nodes[socket.id] = data
    }
  })

  socket.on('info', data => {
    console.log('web-client online')
    intervals[socket.id] = setInterval(() => {
      io.to(socket.id).emit('stats', nodes)
    }, 3000)
  })

  socket.on('disconnect', () => {
    if (!sb.empty(nodes[socket.id])) delete(nodes[socket.id])
    if (!sb.empty(intervals[socket.id])) {
      clearInterval(intervals[socket.id])
    }
    console.log(`disconnected: ${socket.id}`)
  })
})
