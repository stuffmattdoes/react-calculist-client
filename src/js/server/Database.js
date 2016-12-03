'use strict';
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/calculist', function(res) {
    if (res) {
        console.log("Failure to run Mongoose.", res);
    } else {
        console.log("Mongoose is running!");
    }
});
