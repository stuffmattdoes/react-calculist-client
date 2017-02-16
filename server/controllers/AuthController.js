// Libraries
var config = require('../Config'),
    express = require('express'),
    jsonwebtoken = require('jsonwebtoken'),
    User = require('../models/User');

// Utilities
var FormValidationUtils = require('../utils/FormValidationUtils');

function setUserInfo(request) {
    return {
        _id: request._id,
        email: request.email,
        role: request.role,
    };
}

// Generate JSON web token (JWT) from user object we pass in
function generateToken (user, secret) {
    return jsonwebtoken.sign(user, secret, {
        expiresIn: 60 * 60 * 24 * 7 // 1 week
    });
}

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
                jwt: generateToken(userInfo, config.secret),
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
                    jwt: generateToken(userInfo, config.secret),
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


exports.refreshToken = (req, res, next) => {
    var token = req.body.token || req.query.token;

    // Check for token
    if (!token) {
        return res.status(401).json({
            message: 'You must provide a token.'
        });
    }

    // Decode & verify token
    jsonwebtoken.verify(token, config.secret, (err, user) => {
        if (err) {
            return next(err);
        }

        //return user using the id from w/in JWTToken
        User.findById({'_id': user._id}, (err, user) => {
            if (err) {
                return next(err);
            }

            //Note: you can renew token by creating new token(i.e.
            //refresh it)w/ new expiration time at this point, but I’m
            //passing the old token back.
            // var token = utils.generateToken(user);
            res.json({
                user: user,
                token: token
            });
        });
    });

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

