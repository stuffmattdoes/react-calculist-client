import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const AuthActions = {
    userLogin: function(creds) {
        console.log("userLogin", creds);
        WebAPIUtils.userLogin(creds);
    },

    userRegister: function(creds) {
    	// console.log("userRegister", creds);

        // dispatcher.dispatch({
        //     type: "REGISTER_USER",
        //     credentials: creds
        // });

        // API action call
        console.log("Registration API call dispatch");
        WebAPIUtils.userRegister(creds);
    },

    validateLogin: function(creds) {
        console.log("validateLogin", creds);
    }
}

export default AuthActions;
