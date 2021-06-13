const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(
    proxy('/back', {
        target: 'http://192.168.0.100:3300',
      changeOrigin: true
    })
  )
  app.use(
    proxy('/common', {
        target: 'http://192.168.0.100:3300',
      changeOrigin: true
    })
  )
}
