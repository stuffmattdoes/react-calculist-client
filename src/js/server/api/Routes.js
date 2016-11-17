'use strict';

// TODO:
// - Add POST route to create new entries
// - Add PUT route to udpate existing entries
// - Add DELETE route to delete entries

var express = require('express');
var router = express.Router();
var Lists = require('../models/Lists');

// Routes
router.get('/lists', function(req, res) {
    Lists.find({}, function(err, lists) {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        }
        res.json({
            lists: lists
        });
    });
});

module.exports = router;
