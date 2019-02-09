require('dotenv').config();
const express = require('express');

const server = require('./api/server');

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`\n** server up on port ${PORT} **\n`)
});