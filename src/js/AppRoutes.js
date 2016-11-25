// Libraries
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

// Components
import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';

const AppRoutes = (
    <Router history={hashHistory} >                           // "hashHistory" tells the router to utilize hash URLs to handle navigation history
        <Route path="/" component={App} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
    </Router>
    // <Register />
);

export default AppRoutes;
