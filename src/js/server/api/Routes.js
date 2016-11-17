'use strict';

// TODO:
// - Add PUT route to udpate existing entries

var express = require('express');
var router = express.Router();
var List = require('../models/Lists');

// Routes
// GET route
router.get('/lists', function(req, res) {
    List.find({}, function(err, lists) {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        }
        res.json({
            lists: lists
        });
    });
});

// POST route
router.post('/lists', function(req, res) {
    var list = req.body;
    List.create(list, function(err, list) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            'list': list
        });
    });
});

module.exports = router;
