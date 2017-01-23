import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const AuthActions = {
    userLogin: function(creds) {
        // dispatcher.dispatch({
        //     type: 'USER_LOGIN',
        //     credentials: creds
        // });

        // API action call
        WebAPIUtils.userLogin(creds);
    },

    userRegister: function(creds) {

        // dispatcher.dispatch({
        //     type: 'USER_REGISTER',
        //     credentials: creds
        // });

        // API action call
        WebAPIUtils.userRegister(creds);
    },

}

export default AuthActions;
