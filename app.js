// You can set envrionment variables in .env
require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost';

app.use('/api', routes());

app.listen(port, () => {
    console.log(`Server running at ${host}:${port}`);
});
