// Libraries
import React from 'react';
import { browserHistory, IndexRedirect, IndexRoute, Route, Router } from 'react-router';

// Components
import App from '../components/App';
import ItemView from '../components/ItemView';
import ListSettings from '../components/ListSettings';
import ListView from '../components/ListView';
import Login from '../components/Login';
import Auth from '../utils/Auth';
import NotFound from '../components/NotFound';
import Register from '../components/Register';

const Routes = (
    <Router history={browserHistory} >
        <Route path='/' component={App} >
            <IndexRedirect to='/lists' />
            <Route path='/lists' component={ListView} />
            <Route path='/lists/:listID' component={ItemView} />
            <Route path='/lists/:listID/settings' component={ListSettings} />
        </Route>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='*' component={NotFound} />
    </Router>
);

export default Routes;
