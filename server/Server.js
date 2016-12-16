const   config = require('./Config'),
        express = require('express'),
        mongoose = require('mongoose'),
        parser = require('body-parser'),
        path = require('path'),
        routes = require('./Routes'),
        app = express();

// Establish database connection
mongoose.connect(config.database, res => {
    if (res) {
        console.log("Failure to run Mongoose.", res);
    } else {
        console.log("Mongoose is running!");
    }
});

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
app.use(express.static(__dirname + './public'));

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
routes(app);