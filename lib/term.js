const { exec } = require('child_process')
module.exports = {
  pm2ls: () => {
    return new Promise((resolve, reject) => {
      exec('pm2 jlist', (error, stdout, stderr) => {
        if (error) reject(error)
        else resolve({ stdout, stderr })
      })
    })
  }
}
