const { Router } = require('express');
const ping = require('./ping.js');
const posts = require('./posts.js');

module.exports = () => {
    const app = Router();
    ping(app);
    posts(app);
    return app;
};
