'use strict';

var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.listen(8081, function() {
    console.log("The server is running on port: 8081");
});
