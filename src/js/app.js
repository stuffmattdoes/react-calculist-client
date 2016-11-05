import React from 'react';
import ReactDOM from 'react-dom';

// Components
import ListApp from './components/ListApp';

// Data
var ListDataExample = require('./ListDataExample');

// CSS
require('../scss/main.scss');

// Load example data
ListDataExample.init();

ReactDOM.render(
    <ListApp />,
    document.getElementById('container')
);
