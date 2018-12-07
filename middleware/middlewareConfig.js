const helmet = require('helmet');
const express = require('express');

const middlewareConfig = server => {
  server.use(express.json());
  server.use(helmet());
};

module.exports = middlewareConfig;
