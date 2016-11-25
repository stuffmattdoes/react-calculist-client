// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Router
import AppRoutes from './AppRoutes';

// CSS
require('../scss/main.scss');

ReactDOM.render(
    AppRoutes,
    document.getElementById('container')
);
