const   Item = require('../models/Item'),
        List = require('../models/List');


// ==================================================
// Lists Route
// ==================================================

// GET route - receive all existing lists
exports.getLists = (req, res, next) => {
    List.find({}, (err, lists) => {
        if (err) {
            res.status(500).json({message: err.message});
            return next();
        }
        res.status(200).json({
            lists: lists
        });
        return next();
    });
};

// POST route - create lists
/*
{
    "title": "List Title",
    "ID": "iv3v3mtv"
}
*/
exports.createList = (req, res, next) => {
    var list = req.body;
    List.create(list, (err, list) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.status(200).json({
            "list": list,
            "message": "List created."
        });
        return next();
    });
};

// PUT route - update existing lists
/*
{
    "title": "Updated List Title",
    "ID": "iv3v3mtv"
}
*/
exports.updateList = (req, res, next) => {
    var id = req.params.id;
    var listUpdates = req.body.updates;

    // Query our list for our ID, then update it
    List.update({ID: id}, listUpdates, {new: true}, (err, list) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
        res.status(200).json({
            "list": list,
            successMessage: "List updated"
        });
        return next();
    });

};

// DELETE route - delete existing lists
/*
{
    "ID": "iv3v3mtv"
}
*/
exports.deleteList = (req, res, next) => {
    var id = req.params.id;

    // Delete the list
    List.remove({"ID": id}, (err, list) => {
        if (err) {
            return res.status(500).json({errorMessage: err.message});
        }
    });

    // Delete the list's items
    Item.remove({"listID": id}, (err, item) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
    });

    res.status(200).json({
        successMessage: "List deleted"
    });
    return next();
};
