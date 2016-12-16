// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Router
import Routes from './routes/Index';

// CSS
require('../scss/main.scss');

ReactDOM.render(
    Routes,
    document.getElementById('container')
);
