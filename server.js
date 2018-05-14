const server = require('http').createServer()
const io = require('socket.io')(server)
const allhosts = {}
var master = ''

setInterval(() => {
  if (master !== '') {
    console.log('enviant a master: ' + master)
    io.to(master).emit('stats', allhosts)
  } else console.log('no master')
}, 3000)

io.on('connection', (client) => {
  console.log(`-> ${client.id}`)

  client.on('stats', (data) => {
    if (data === 'master') {
      master = client.id
      console.log('set the master')
    } else {
      allhosts[data.hostname] = data
    }
  })

  client.on('disconnect', () => {
    if (client.id === master) {
      console.log('unset master')
      master = ''
    } else console.log(`<- ${client.id}`)
  })
})

server.listen(3001)

const express = require('express')
const app = express()
app.use('/',express.static('static'))
app.listen(3000)
console.log('master server')

