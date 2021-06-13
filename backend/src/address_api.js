const ip = require ('ip')
const PORT_API  = ":3300" 
const API = ('http://' + ip.address() + `${PORT_API}`)

module.exports = API;
