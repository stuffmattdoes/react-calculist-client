const   express = require('express'),
        Item = require('../models/Item'),
        List = require('../models/List');

// ==================================================
// Items Route
// ==================================================

// GET route - receive all items
exports.getItems = (req, res, next) => {
    Item.find({}, (err, items) => {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        }
        res.status(200).json({
            items: items
        });
        return next();
    });
};

// GET route - receive items for current list
exports.getItemsForList = (req, res, next) => {
    var id = req.params.listID;
    console.log(id);

    Item.find({ listID: id}, (err, items) => {
        if (err) {
            res.status(500).json({message: err.message});
            return;
        }

        res.status(200).json({
            items: items
        });
        return next();
    });
};

// POST route - create items
/*
{
    "title": "Item Title",
    "itemID": "iv2rsurb",       - the ID of this item
    "listID": "iv3v3mtv"        - the ID of the list this item belongs to
}

*/
exports.createItem = (req, res, next) => {
    var item = req.body;
    Item.create(item, (err, item) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.status(200).json({
            "item": item,
            "message": "Item created."
        });
        return next();
    });
};

// PUT route - update existing items
/*
{
    "_id": "583bc4ce1a7e726b2c915cd6"
}
*/
exports.updateItem = (req, res, next) => {
    var id = req.params.id;
    var itemUpdates = req.body.updates;

    Item.update({ID: id}, itemUpdates, {new: true}, (err, item) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
        res.status(200).json({
            "item": item,
            successMessage: "Item updated"
        });
        return next();
    });
};

// DELETE route - delete existing items
/*
{
    "_id": "583bc4ce1a7e726b2c915cd6"
}
*/
exports.deleteItem = (req, res, next) => {
    var id = req.params.id;

    Item.remove({ID: id}, (err, item) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
        res.status(200).json({
            successMessage: "Item deleted"
        });
        return next();
    });

};