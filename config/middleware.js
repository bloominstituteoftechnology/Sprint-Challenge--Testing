const express = require('express');

//const router = require('../routers/router.js');

module.exports = server => {
    server.use(express.json());

    //server.use('/api/', router);
};