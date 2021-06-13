const express = require('express')
const router = express.Router()
const SERVER = require('../address')
const API = require('../address_api')

router.get("/global_api", async (req, res) => {
    console.log(SERVER, API)
    res.json(SERVER, API)
});

module.exports = router; 
