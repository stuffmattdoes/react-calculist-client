import Dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const AuthActions = {

    userLogin: function(creds) {
        WebAPIUtils.userLogin(creds);
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
    },

    userRegister: function(creds) {
        WebAPIUtils.userRegister(creds);
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
