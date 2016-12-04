var express = require('express');
var router = express.Router();
var Item = require('../models/Items');
var List = require('../models/Lists');
var User = require('../models/Users');

// --------------------
// Login & Registration
// --------------------

// POST route - user registration
router.post('/register', (req, res, next) => {

    if (req.body.email
        && req.body.password
        && req.body.confirmPassword) {

        // Confirm the passwords match
        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        // Create object with form input
        var userData = {
            email: req.body.email,
            password: req.body.password
        };

        // Insert user document into mongo
        User.create(userData, (err, user) => {
            if (err) {
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/lists');
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }

});

router.get('/login', (req, res, next) => {
    // If we're already logged in, redirect us to the app
    if (req.session.userId) {
        console.log("You're already logged in.");
        return res.redirect('/lists');
    }

});

// POST route - user login
router.post('/login', (req, res, next) => {
    if (req.body.email
        && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                var err = new Error('Wrong email or password');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/lists');
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401;
        return next(err);
    }

});

// GET route - user log out
router.get('/logout', (req, res, next) => {
    if (req.session) {
        // Delete session object
        req.session.destroy(err => {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/login');
            }
        });
    }
});

// -----
// Lists
// -----

// Routes
// GET route - receive all existing lists
router.get('/lists/', (req, res, next) => {

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
router.delete('/lists/:id', (req, res, next) => {
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
router.delete('/items/:id', (req, res, next) => {
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

module.exports = router;
