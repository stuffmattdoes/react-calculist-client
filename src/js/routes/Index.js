// Libraries
import React from 'react';
import { browserHistory, IndexRedirect, IndexRoute, Route, Router } from 'react-router';

// Components
import App from '../components/App';
import ItemView from '../components/ItemView';
import ListSettings from '../components/ListSettings';
import ListView from '../components/ListView';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Register from '../components/Register';

// Utils
import AuthUtils from '../utils/AuthUtils';

const Routes = (
    <Router history={browserHistory} >
        <Route path='/' component={App} >
            <IndexRedirect to='/lists' />
            <Route path='/lists' component={ListView} onEnter={ AuthUtils.requireAuth } />
            <Route path='/lists/:listID' component={ItemView} onEnter={ AuthUtils.requireAuth } />
            <Route path='/lists/:listID/settings' component={ListSettings} onEnter={ AuthUtils.requireAuth } />
        </Route>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='*' component={NotFound} />
    </Router>
);

export default Routes;
