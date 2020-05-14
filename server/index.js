const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const scriptRoutes = require('./routes/scripts');
const documentRoutes = require('./routes/documents');

// mount api routes
app.use('/scripts', scriptRoutes);
app.use('/documents', documentRoutes);

module.exports = app;
