import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const AuthActions = {
    userLogin: function(creds) {
        console.log("userLogin");
    },

    userRegister: function(creds) {
    	console.log("userRegister");
    },

    validateLogin: function(creds) {
        console.log("validateLogin", creds);
    }
}

export default AuthActions;
