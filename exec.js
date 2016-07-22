var exec = require('child_process').exec

module.exports = function (cmd, timeout, callback) {
	if (typeof timeout === 'number') {
		var proc = exec(cmd)
		setTimeout(function () {
			callback("KILL", "")
			proc.kill('SIGHUP')
		}, 600000)
	} else {
		callback = timeout
		var proc = exec(cmd)
	}

	var list = []
	var error = []
	proc.stdout.setEncoding('utf8');
	proc.stdout.on('data', function (res) {
		list.push(res)
	})

	proc.stderr.on('error', function (err) {
		error.push(err)
	})

	proc.stdout.on('end', function () {
		callback(error.join(""), list.join(""))
	})
}
