const router = require('express').Router();
const { PingController } = require('../controllers');

module.exports = app => {
    PingController(app, router);
};
