var exec = require('./exec.js')
var s = require('spellbook')

module.exports = function (servidor, callback) {
	var data = {}
	s.waterfall([
	(done) => {
		exec("ssh root@" + servidor + " \"df -h\"", (err, resp) => {
			data['df'] = err || resp
			done()
		})
	},
	(done) => {
		exec("ssh root@" + servidor + " \"/etc/init.d/pbs_mom status\"", (err, resp) => {
			data['pbs'] = err || resp
			done()
		})
	},
	(done) => {
		exec("ssh root@" + servidor + " \"route\"", (err, resp) => {
			data['route'] = err || resp
			done()
		})
	}],
	() => {
		callback(data)
	})
}