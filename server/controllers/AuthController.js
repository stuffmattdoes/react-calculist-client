// Libraries
var config = require('../Config'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    User = require('../models/User');

// Utilities
var FormValidationUtils = require('../utils/FormValidationUtils');

// Generate JSON web token (JWT) from user object we pass in
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        email: request.email,
        role: request.role,
    };
}

// function checkForObjectProps(objectToCheck) {
//     if (Object.keys(objectToCheck).length === 0
//         && objectToCheck.constructor === Object) {
//         return false;
//     }
//     return true;
// }


// ==================================================
// Registration Route
// ==================================================

// POST route - user registration
exports.register = (req, res, next) => {
    let formValidationResults = FormValidationUtils.formValidate(req.body);
    let validCreds = true;

    console.log('Authcontroller: ', req.body.email.value, formValidationResults);

    for (let val in formValidationResults) {
        if (typeof formValidationResults[val] === 'string') {
            validCreds = false;
        }
    }

    if (!validCreds) {
        return res.status(422).send({
            errors: formValidationResults
        });
    }

    // Now add our user
    User.findOne({ email: req.body.email.value }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // Check for existing email
        if (existingUser) {
            return res.status(422).send({
                errors: {
                    'email': 'That email address is already in use.'
                }
            });
        }

        // If credentials are looking good, create the account!
        let user = new User({
            email: req.body.email.value,
            password: req.body.password.value
        });

        // Create our user
        user.save((err, user) => {
            if (err) {
                return next(err);
            }

            // Subscribe member to Mailchimp list
            // mailchimp.subscribeToNewsletter(user.email);

            // Respond with JWT if user was created
            let userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        });

    });

}

// ==================================================
// Login Route
// ==================================================

// POST route - user login
exports.login = (req, res, next) => {

    if (req.body.email.value
        && req.body.password.value) {
        User.authenticate(req.body.email.value, req.body.password.value, (error, user) => {
            if (error || !user) {
                return res.status(401).send({
                    errors: {
                        'invalid': 'Wrong email or password.'
                    }
                });
            } else {
                // Authorization token here
                // Respond with JWT if user was created
                let userInfo = setUserInfo(user);
                res.status(200).json({
                    token: 'JWT ' + generateToken(userInfo),
                    user: userInfo
                });
            }
        });
    } else {
        return res.status(401).send({
            errors: {
                'invalid': 'Wrong email or password.'
            }
        });
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
        var user = req.user;

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

