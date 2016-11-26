'use strict';

var express = require('express');
var parser = require('body-parser');
var app = express();
var router = require('./api/Router');

// Database
require('./Database');
require('./Seed');

// Serve static files like CSS, HTML & JS
app.use('/', express.static('public'));
app.use(parser.json());

// Mount router to app
// Prefix routes with API namespace
app.use('/api', router);

// app.get('*', function(req, res) {
//     console.log(req);
//     res.sendFile('../index.js');
// });

// Run local server
app.listen(8081, function() {
    console.log("The server is running on port: 8081");
});
