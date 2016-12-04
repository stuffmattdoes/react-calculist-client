var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email : {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password : {
		type: String,
		required: true
	},
	name : {
		type: String,
		required: false,
		trim: true
	}
});

// Authenticate login input vs. database document
// 'Statics' lets you add methods directly to the model
UserSchema.statics.authenticate = (email, password, callback) => {
    console.log(UserModel);
    UserModel.findOne({ email: email })
        .exec((err, user) => {
            if (err) {
                return callback(err);
            } else if (!user){
                var err = new Error('User not found.');
                err.status - 401;
                return callback(err);
            }

            // At this point, the user exists. So compare the given password to the database password
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback(err);
                }
            });
        });
}

// Pre-save hook: runs just before saving record to mongo (hence 'save' keyword)
// Hash password before saving to database
UserSchema.pre('save', function (next) {
    var user = this;

    // (password to hash, # of times to apply encryption algorithm, callback)
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;