'use strict';

// TODO:
// - Add DELETE route to remove existing entries

var express = require('express');
var router = express.Router();
var List = require('../models/Lists');

// Routes
// GET route - receive existing items
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

// POST route - create items
router.post('/lists', function(req, res) {
    var list = req.body;
    console.log(list);
    List.create(list, function(err, list) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            "list": list,
            "message": "List created."
        });
    });
});

// PUT route - update existing items
router.put('/lists/:id', function(req, res) {
    var id = req.params.id;
    var list = req.body;

    if (list && list._id !== id) {
        return res.status(500).json({err: "IDs don't match"});
    }

    List.findByIdAndUpdate(id, list, {new: true}, function(err, list) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            'list': list,
            message: "List updated"
        });
    });
});

// DELETE route - remote existing items
router.delete('/lists/:id', function(req, res) {
    var id = req.params.id;
    var list = req.body;

    if (list && list._id !== id) {
        return res.status(500).json({err: "IDs do not match"});
    }

    List.remove({}, function(err, list) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            message: "List deleted"
        });
    });
});

module.exports = router;
