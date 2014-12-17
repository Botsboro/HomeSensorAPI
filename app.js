// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSanitizer = require('express-sanitizer');
var compress = require('compression'); // Enables gzip compression
  
// Models and Routes
var readings = require('./routes/readings');

// Initialize the Express app
var app = express();

// We want to know what environment we're in
// Defaults to development if none is set
env = process.env.NODE_ENV || 'development';

// Set up our database connection from env variables
var dbString = 'mongodb://' + process.env.HOMESENSORAPI_DBUSER
                + ':' + process.env.HOMESENSORAPI_DBPASS
                + '@' + process.env.HOMESENSORAPI_DB;
mongoose.connect(dbString);

// Redirect non-SSL requests to require SSL.
var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
 };

// In production, we may want to force using SSL to protect auth credentials.
// Uncomment the app.use line to enforce this.
if (env === 'production') {
    // app.use(forceSsl);
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(compress()); // Enable gzip compression
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressSanitizer());

// all of our routes will be prefixed with /api
app.use('/api/v1', readings);

module.exports = app;