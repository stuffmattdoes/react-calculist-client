// Libraries
import { browserHistory } from 'react-router';

// Actions
import * as AuthActions from '../actions/AuthActions';

// Stores
import AuthStore from '../stores/AuthStore';

const AuthUtils = {

    checkForToken: function() {
        let authData = {};
        authData.jwt = localStorage.getItem('jwt');
        authData.user = localStorage.getItem('user');

        console.log(authData.user);

        if (authData.jwt && authData.user) {
            AuthActions.default.userAuth(authData);
            return true;
        }
        return false;
    },

    requireAuth: function() {
        if (!AuthStore.isUserAuth()) {
            console.log('Sure aren\'t logged in, are we?');
            browserHistory.push('/login');
        }
    },

    userLogout: function() {
        localStore.removeItem('jwt');
        AuthActions.default.userLogout();
        console.log("User log out");
    }
}

export default AuthUtils;