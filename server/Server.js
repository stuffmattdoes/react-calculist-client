const   config = require('./Config'),
        express = require('express'),
        mongoose = require('mongoose'),
        parser = require('body-parser'),
        path = require('path'),
        router = require('./Router'),
        app = express();
        // MongoStore = require('connect-mongo')(session);     // Passing session as a parameter here allows mongo connect store access to it

// Establish database connection
mongoose.connect(config.database, res => {
    if (res) {
        console.log("Failure to run Mongoose.", res);
    } else {
        console.log("Mongoose is running!");
    }
});

// var db = mongoose.connection;

// User sessions for tracking user authorization
// app.use(session({
// 	resave: true,			           	  // Forces session to be saved in session store whether anything changed during request or not
// 	saveUninitialized: true,              // Forces uninitialized session (new, not yet modified session) to be saved in session store
// 	secret: config.secret,			  // Required. Signs session ID cookie, adds another level of security
// 	store: new MongoStore({		          // Stores session IDs in a database instead of the server. Frees up server memory for many concurrent users
// 		mongooseConnection: db
// 	})
// }));

// Make user ID available to routes
// app.use((req, res, next) => {
//     res.locals.currentUser = req.session.userId;
//     next();
// });

// Parse url encoded responses into useable formats
// In this case, we'll parse into JSON
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// Serve static files like CSS, HTML & JS
// app.use('/', express.static('public'));

// Route catch all
// Allows static files to be served from URLs other than from '/'
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
// });

// serve static files from /public
// app.use(express.static(__dirname + '/public'));

// Run local server
var server = app.listen(config.port, () => {
    console.log("The server is running on port: " + config.port);
});

// Enable CORS from client-side
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Controll-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


// Give our App access to our routes
router(app);
