'use strict';

var mongoose = require('mongoose');

/*
    list.title
    list.ID
*/

var listsSchema = new mongoose.Schema({
    title: String,
    ID: String
});

var listsModel = mongoose.model('Lists', listsSchema);

module.exports = listsModel;
