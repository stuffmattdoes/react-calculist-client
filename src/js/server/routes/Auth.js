var express = require('express');
var auth = express.Router();
var User = require('../models/Users');

// --------------------
// Login & Registration
// --------------------

// POST route - user registration
auth.post('/register', (req, res, next) => {

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
                // User token here
                // req.session.userId = user._id;
                return res.redirect('/lists');
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }

});

// router.get('/login', (req, res, next) => {
//     // If we're already logged in, redirect us to the app
//     if (req.session.userId) {
//         console.log("You're already logged in.");
//         return res.redirect('/lists');
//     }
// });

// POST route - user login
auth.post('/login', (req, res, next) => {
    if (req.body.email
        && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                var err = new Error('Wrong email or password');
                err.status = 401;
                return next(err);
            } else {
                // Authorization token here
                // req.session.userId = user._id;
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
auth.get('/logout', (req, res, next) => {
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

module.exports = auth
