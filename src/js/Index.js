// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Router
import Routes from './Routes';

// CSS
require('../scss/main.scss');

ReactDOM.render(
    Routes,
    document.getElementById('container')
);
