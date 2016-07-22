var maquines = ['v1','v2']
var express = require('express');
var b = require('./base.js')
var app = express();
var serveStatic = require('serve-static');
app.use(serveStatic('web', {'index': ['index.html', 'index.htm']}))
app.listen(3000);

var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4568);

io.on('connection', function(socket){
	socket.on('stats', function () {
		b.refresh(maquines, (data) => {
			socket.emit('stats', data)
		})
	})
})