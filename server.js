const server = require('http').createServer()
const config = require('./config')
const io = require('socket.io')(server)
const express = require('express')
const app = express()
const allhosts = {}
var master = ''

setInterval(() => {
  if (master !== '') {
    io.to(master).emit('stats', allhosts)
  }
}, 3000)

io.on('connection', (client) => {
  console.log(`-> ${client.id}`)

  client.on('stats', (data) => {
    if (data === 'master') {
      master = client.id
      console.log(`master !!! ${client.id}`)
    } else allhosts[client.id] = data
  })

  client.on('disconnect', () => {
    if (client.id === master) {
      master = ''
      console.log(`master ¡¡¡ ${client.id}`)
    } else console.log(`<- ${client.id}`)
  })
})

server.listen(config.socket_port)

app.set('view engine', 'pug')
app.get('/', (req, res) => {
  res.render('index', { server: config.server, port: config.socket_port })
})
app.listen(config.http_port, () => {
  console.log(`monserv - server: ${config.server}:${config.http_port}`)
})


