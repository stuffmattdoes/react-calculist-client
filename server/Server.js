'use strict';

// Modules
const config = require('./Config');
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const app = express();

// Routes
const APIRoutes = require('./routes/Index');

// Variables
const ROOT_DIR = process.env.ROOT_DIR = __dirname;

// Establish database connection
mongoose.connect(config.database);

// Parse url encoded responses into useable formats
// In this case, we'll parse into JSON
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// serve static files from /public
// app.use(express.static(__dirname + './public'));

// Enable CORS from client-side
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Controll-Allow-Credentials');
    next();
});

// Serve static files like CSS, HTML & JS
app.use('/', express.static('public'));

// Give our App access to our routes
// Set URL for API group routes
// domain.com/api/ 
app.use('/api', APIRoutes);

// Route catch all
// Allows static files to be served from URLs other than from '/'
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// Configure Error Handling
app.all( '*' , ( req , res , next ) => {
    res.status( 404 );
    // DEPENDING ON API OR VIEW, RENDER 404 OR SEND 404
    // res.render( '404' );
    res.send({
        'status': res.statusCode,
        'message': 'No resource exists at this route.'
    });
});

// Start the server
const server = app.listen(config.port, () => {
    console.log("The server is running on port: " + config.port);
});