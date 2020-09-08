const express = require('express');

const Router = express.Router();

const sendController = require('../controllers/send.controller');

Router.post('/send', sendController.sendData);

module.exports = Router;
