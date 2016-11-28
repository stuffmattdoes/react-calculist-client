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
router.get('/lists/', function(req, res, next) {
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

// POST route - create lists
/*
{
    "title": "List Title",
    "ID": "iv3v3mtv"
}
*/
router.post('/lists/', function(req, res, next) {
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

// PUT route - update existing lists
/*
{
    "title": "Updated List Title",
    "ID": "iv3v3mtv"
}
*/
router.put('/lists/:id', function(req, res, next) {
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

// DELETE route - delete existing lists
/*
{
    "ID": "iv3v3mtv"
}
*/
router.delete('/lists/:id', function(req, res, next) {
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


// -----
// Items
// -----

// Routes
// GET route - receive all items
router.get('/items/', function(req, res, next) {
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
router.get('/lists/:id', function(req, res, next) {
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

// POST route - create items
/*
{
    "title": "Item Title",
    "itemID": "iv2rsurb",       - the ID of this item
    "listID": "iv3v3mtv"        - the ID of the list this item belongs to
}
*/
router.post('/items/', function(req, res, next) {
    var item = req.body;
    Item.create(item, function(err, item) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            "item": item,
            "message": "Item created."
        });
    });
});

// UPDATE HERE

// DELETE route - delete existing lists
/*
{
    "_id": "583bc4ce1a7e726b2c915cd6"
}
*/
router.delete('/items/:id', function(req, res, next) {
    var id = req.params.id;
    var item = req.body;

    if (item && item._id !== id) {
        console.log(item._id, id);
        return res.status(500).json({err: "ID was not found"});
    }

    List.findByIdAndRemove(id, function(err, item) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({
            message: "Item deleted"
        });
    });
});

module.exports = router;
