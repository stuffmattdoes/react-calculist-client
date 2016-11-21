'use strict';

var express = require('express');
var router = express.Router();
var List = require('../models/Lists');
var Item = require('../models/Items');

// ----------
// Lists view
// ----------

// Routes
// GET route - receive existing items
router.get('/lists/', function(req, res) {
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
/*
{
    "New_Property": "New_Key"
    "_id": "58309833a1f3175197e9d5be"
}
*/
router.post('/lists/', function(req, res) {
    var list = req.body;
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
/*
{
    "Existing_Property": "Updated_Key"
    "_id": "58309833a1f3175197e9d5be"
}
*/
router.put('/lists/:id', function(req, res) {
    var id = req.params.id;
    var list = req.body;

    if (list && list._id !== id) {
        return res.status(500).json({err: "ID was not found"});
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
/*
{
    "_id": "58309833a1f3175197e9d5be"
}
*/
router.delete('/lists/:id', function(req, res) {
    var id = req.params.id;
    var list = req.body;

    if (list && list._id !== id) {
        return res.status(500).json({err: "ID was not found"});
    }

    List.findByIdAndRemove(id, function(err, list) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            message: "List deleted"
        });
    });
});


// ----------
// Items view
// ----------

// Routes
// GET route - receive all items
router.get('/items/', function(req, res) {
    Item.find({}, function(err, items) {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        }
        res.json({
            items: items
        });
    });
});

// GET route - receive items for current list
router.get('/lists/:id', function(req, res) {
    var id = req.params.id;

    // if (item && item.listID !== id) {
    //     return res.status(500).json({err: "ID was not found"});
    // }

    Item.find({}, function(err, items) {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        }

        res.json({
            items: items
        });
    });
});

module.exports = router;
