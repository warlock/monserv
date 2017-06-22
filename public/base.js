var socket = io.connect('http://localhost:4568')
socket.on('stats', function(data) {
  var data = document.getElementById('stats')
  data.innerHTML = data.join("</br>")
})