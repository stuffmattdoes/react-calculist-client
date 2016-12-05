var jwt = require('jwt-simple');

const Token = {

    generateToken: function(user) {
        //1. Dont use password and other sensitive fields
        //2. Use fields that are useful in other parts of the
        //app/collections/models
        var secret = 'noodels is the best cat X(*I$0isdj0fif9op2FHKL&*IslWP}';

        var u = {
            name: user.name,
            username: user.username,
            admin: user.admin,
            _id: user._id.toString(),
            image: user.image
        };

        return token = jwt.sign(u, secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
    }

}

export default Token;
