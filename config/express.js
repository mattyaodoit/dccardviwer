/**
 * Express configuration
 */

'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var path = require('path');
var config = require('./index');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

module.exports = function(app){
  app.use(logger('development'));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'mern-dc'
    })
  }));
};
