const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const tradRouter = require('./routes/trad');
const prodRouter = require('./routes/produits');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/trad', tradRouter);
app.use('/produits', prodRouter);

module.exports = app;
