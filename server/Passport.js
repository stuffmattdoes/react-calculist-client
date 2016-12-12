const 	passport = require('passport'),
		User = require('./models/User'),
		config = require('./Config'),
		JwtStrategy = require('passport-jwt').Strategy,
		ExtractJwt = require('passport-jwt').ExtractJwt,
		LocalStrategy = require('passport-local');

// User the email field as our 'username' auth
const localOptions = {
	usernameField: 'email'
};

// Authenticate users with email/password combo.
// Successful login will yield Json Web Token (JWT) for automatic future authorization
const localLogin = new LocalStrategy(localOptions, (email, password, next) => {
	User.findOne({
		email: email
	}, (err, user) => {
		if (err) {
			return next(err);
		}
		
		if (!user) {
			return next(null, false, {
				error: 'Your login details could not be verified. Please try again.'
			});
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return next(err);
			}

			if (!isMatch) {
				return next(null, false, {
					error: 'Your login details could not be verified. Please try again.'
				});
			}

			return next(null, user);
		});

	});
});

// JWT authentication options
const jwtOptions = {
	// Tell Passport ot check authorization headers for JWT
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	// Tell Passport where to find the secret
	secretOrKey: config.secret
};

// Set up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

	console.log(payload);

	// Actual comparison between login creds & database user entry
	User.findById(payload._id, (err, user) => {
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Allow passport ot use the strategies we've defined above
passport.use(jwtLogin);
passport.use(localLogin);