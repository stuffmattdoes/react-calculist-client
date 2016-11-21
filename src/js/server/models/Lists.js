'use strict';

var mongoose = require('mongoose');

/*
    title: "List Title",
    ID: "iv3v3mtv"
*/

var listSchema = new mongoose.Schema({
    title: String,
    ID: String
});

var listModel = mongoose.model('List', listSchema);

module.exports = listModel;
