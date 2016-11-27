// Libraries
import React from 'react';
import { Router, Route, browserHistory, hashHistory } from 'react-router';

// Components
import App from './components/App';
import ListView from './components/ListView';
import Login from './components/Login';
import Register from './components/Register';

const Routes = (
    <Router history={browserHistory} >
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/lists" component={ListView} >
            <Route path="/lists/:id" component={ListView} >
                <Route path="/lists/:id/options" component={ListView} />
            </Route>
        </Route>
        <Route path="*" component={App} />
    </Router>
);

export default Routes;
