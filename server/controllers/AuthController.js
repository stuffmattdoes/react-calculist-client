var express = require('express');
var auth = express.Router();
var User = require('../models/User');


// Generate JSON web token (JWT) from user object we pass in
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

// We don't want to use the entire user object to sign into our JWTs for 2 reasons:
// 1. That's a lot of info to eventually store in a cookie
function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role,
    };
}


// ==================================================
// Registration Route
// ==================================================

// POST route - user registration
exports.register = (req, res, next) => {

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
}

// ==================================================
// Login Route
// ==================================================

// POST route - user login
exports.login = (req, res, next) => {
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
}

// GET route - user log out
exports.logout = (req, res, next) => {
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
}


// ==================================================
// Authorization Middleware
// ==================================================

// Role authorization check
exports.roleAuthorization = role => {
    return (req, res, next) => {
        const user = req.user;

        User.findById(user._id, (err, foundUser) => {
            if (err) {
                res.status(422).json({
                    error: 'No user was found.'
                });
                return next(err);
            }

            if (foundUser.role == role) {
                return next();
            }

            res.status(401).json({
                error: 'You are not authorized to view this content.'
            });

            return next('Unauthorized');
        });
    }
}

