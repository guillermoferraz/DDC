const ip = require ('ip')
const PORT_APP = ":3200"
const SERVER = ('http://'+ ip.address() + `${PORT_APP}`) 

module.exports = SERVER;
