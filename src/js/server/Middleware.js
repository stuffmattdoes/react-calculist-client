
// Redirect the page if the user is logged in
function loggedOut(req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    }
    return next();
}

module.exports.loggedOut = loggedOut;

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
    // return res.redirect('/login');
}

module.exports.requiresLogin = requiresLogin;
