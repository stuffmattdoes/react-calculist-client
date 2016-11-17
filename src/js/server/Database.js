'use strict';
var mongoose = require('mongoose');

console.log(mongoose);

mongoose.connect('mongodb://localhost/calculist', function(res) {
    if (res) {
        console.log("Failuse", res);
    } else {
        console.log("Success!");
    }
});
