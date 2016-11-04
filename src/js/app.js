import React from 'react';
import ReactDOM from 'react-dom';

// Components
import ListApp from './components/ListApp';

// CSS
require('../scss/main.scss');

ReactDOM.render(
    <ListApp />,
    document.getElementById('container')
);
