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
        dispatcher.dispatch({
            type: 'USER_LOGOUT'
        });
    },

    userRegister: function(creds) {
        WebAPIUtils.userRegister(creds);
    },

}

export default AuthActions;
