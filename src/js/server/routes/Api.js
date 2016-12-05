var express = require('express');
var api = express.Router();
var Item = require('../models/Items');
var List = require('../models/Lists');
var User = require('../models/Users');

// -----
// Lists
// -----

// GET route - receive all existing lists
api.get('/lists/', (req, res, next) => {

    List.find({}, (err, lists) => {
        if (err) {
            res.status(500).json({message: err.message});
            return next();
        }
        res.json({
            lists: lists
        });
    });
});

// POST route - create lists
/*
{
    "title": "List Title",
    "ID": "iv3v3mtv"
}
*/
api.post('/lists/', (req, res, next) => {
    var list = req.body;
    List.create(list, (err, list) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            "list": list,
            "message": "List created."
        });
    });
});

// PUT route - update existing lists
/*
{
    "title": "Updated List Title",
    "ID": "iv3v3mtv"
}
*/
api.put('/lists/:id', (req, res, next) => {
    var id = req.params.id;
    var listUpdates = req.body.updates;

    // Query our list for our ID, then update it
    List.update({ID: id}, listUpdates, {new: true}, (err, list) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
        res.json({
            "list": list,
            successMessage: "List updated"
        });
    });

});

// DELETE route - delete existing lists
/*
{
    "ID": "iv3v3mtv"
}
*/
api.delete('/lists/:id', (req, res, next) => {
    var id = req.params.id;

    // Delete the list
    List.remove({"ID": id}, (err, list) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
        res.json({
            successMessage: "List deleted"
        });
    });

    // Delete the list's items
    Item.remove({"listID": id}, (err, item) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
    });

    // ***************************************************************************
    // Delete all items contained in the list
    // ***************************************************************************

});


// -----
// Items
// -----

// GET route - receive all items
api.get('/items/', (req, res, next) => {
    Item.find({}, (err, items) => {
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
api.get('/lists/:id', (req, res, next) => {
    var id = req.params.id;

    Item.find({}, (err, items) => {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        }

        res.json({
            items: items
        });
    });
});

// POST route - create items
/*
{
    "title": "Item Title",
    "itemID": "iv2rsurb",       - the ID of this item
    "listID": "iv3v3mtv"        - the ID of the list this item belongs to
}
*/
api.post('/items/', (req, res, next) => {
    var item = req.body;
    Item.create(item, (err, item) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            "item": item,
            "message": "Item created."
        });
    });
});

// PUT route - update existing items
/*
{
    "_id": "583bc4ce1a7e726b2c915cd6"
}
*/
api.put('/items/:id', (req, res, next) => {
    var id = req.params.id;
    var itemUpdates = req.body.updates;

    Item.update({ID: id}, itemUpdates, {new: true}, (err, item) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
        res.json({
            "item": item,
            successMessage: "Item updated"
        });
    });

});

// DELETE route - delete existing items
/*
{
    "_id": "583bc4ce1a7e726b2c915cd6"
}
*/
api.delete('/items/:id', (req, res, next) => {
    var id = req.params.id;

    Item.remove({ID: id}, (err, item) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
        res.json({
            successMessage: "Item deleted"
        });
    });

});

module.exports = api;