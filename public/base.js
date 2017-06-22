var socket = io.connect('http://localhost:4568')
var div = document.getElementById('stats')

socket.on('connect', function () {
  console.log('conected')
  socket.emit('info')
})

socket.on('stats', function (data) {
  div.innerHTML = "<pre>" + JSON.stringify(data,null,2) + "</pre>"
})