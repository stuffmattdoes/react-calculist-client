import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const AuthActions = {
    userLogin: function(creds) {
        console.log("userLogin");
    },

    userRegister: function(creds) {
    	// console.log("userRegister", creds);

        // dispatcher.dispatch({
        //     type: "REGISTER_USER",
        //     credentials: creds
        // });

        // API action call
        WebAPIUtils.userRegister(creds);

    },

    validateLogin: function(creds) {
        console.log("validateLogin", creds);
    }
}

export default AuthActions;
