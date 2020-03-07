const router = require('express').Router();
const { PostsController } = require('../controllers');

module.exports = app => {
    PostsController(app, router);
};
