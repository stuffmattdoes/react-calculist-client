var express = require('express');
var router = express.Router();
var List = require('../models/Lists');
var Item = require('../models/Items');


// -----
// Login
// -----
// router.get('/register', function(req, res, next) {
//     return res.render('Register', {});
// });


// -----
// Lists
// -----

// Routes
// GET route - receive all existing lists
router.get('/lists/', (req, res, next) => {
    List.find({}, (err, lists) => {
        if (err) {
            res.status(500).json({message: err.message});
            return;
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
router.post('/lists/', (req, res, next) => {
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
router.put('/lists/:id', (req, res, next) => {
    var id = req.params.id;
    var list = req.body;

    if (list && list._id !== id) {
        return res.status(500).json({err: "ID was not found"});
    }

    List.findByIdAndUpdate(id, list, {new: true}, (err, list) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            'list': list,
            message: "List updated"
        });
    });
});

// DELETE route - delete existing lists
/*
{
    "ID": "iv3v3mtv"
}
*/
router.delete('/lists/:id', (req, res, next) => {
    var id = req.params.id;
    // var list = req.body;

    // if (list && list._id !== id) {
    //     return res.status(500).json({err: "ID was not found"});
    // }

    // Delete the list
    List.findByIdAndRemove(id, (err, list) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            message: "List deleted"
        });
    });

    // ***************************************************************************
    // Delete all items contained in the list
    // ***************************************************************************

});


// -----
// Items
// -----

// Routes
// GET route - receive all items
router.get('/items/', (req, res, next) => {
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
router.get('/lists/:id', (req, res, next) => {
    var id = req.params.id;

    // if (item && item.listID !== id) {
    //     return res.status(500).json({err: "ID was not found"});
    // }

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
router.post('/items/', (req, res, next) => {
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
router.put('/items/:id', (req, res, next) => {
    var id = req.params.id;
    var item = req.body;

    console.log(id, item._id, item);
    
    if (item && item._id !== id) {
        return res.status(500).json({err: "ID was not found"});
    }

    // Item.findByIdAndUpdate(id, item, {new: true}, (err, item) => {
    //     if (err) {
    //         return res.status(500).json({message: err.message});
    //     }
    //     res.json({
    //         'item': item,
    //         message: "Item updated"
    //     });
    // });
});

// DELETE route - delete existing items
/*
{
    "_id": "583bc4ce1a7e726b2c915cd6"
}
*/
router.delete('/items/:id', (req, res, next) => {
    var id = req.params.id;
    var mongoID;

    // We need to query our DB with our ID and return Mongo's _id
    Item.find({ID : id}, (err, item) => {
        if (err) {
            console.log("Error");
            return res.status(500).json({message: err.message});
        }
        mongoID = item[0]._id;
        console.log("Item found", mongoID);
    });

    Item.findByIdAndRemove(mongoID, (err, item) => {
        if (err) {
            console.log("item findByIdAndRemove error")
            return res.status(500).json({message: err.message});
        }
        console.log("Item deleted!");
        res.json({
            message: "Item deleted " + mongoID
        });
    });
});

module.exports = router;
