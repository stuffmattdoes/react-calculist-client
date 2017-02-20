import ApiUtils from "../utils/ApiUtils";
import { browserHistory } from 'react-router';
import Dispatcher from "../dispatcher/Dispatcher";

const AuthActions = {

    userLogin: function(creds) {
        ApiUtils.userLogin(creds);
    },

    userAuth: function(data) {
        Dispatcher.dispatch({
            type: 'RECEIVE_USER_LOGIN_SUCCESS',
            response: data
        });
    },

    userLogout: function() {
        Dispatcher.dispatch({
            type: 'USER_LOGOUT'
        });
        browserHistory.push('/login');
    },

    userRegister: function(creds) {
        ApiUtils.userRegister(creds);
    },

    setUser: function(user) {
        Dispatcher.dispatch({
            type: 'SET_USER',
            user: user
        });
    },

    setToken: function(token) {
        Dispatcher.dispatch({
            type: 'SET_TOKEN',
            token: token
        });
    }

}

export default AuthActions;
