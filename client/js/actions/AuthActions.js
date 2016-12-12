import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const AuthActions = {
    userLogin: function(creds) {
        console.log("userLogin");
    },

    validateLogin: function(creds) {
        console.log("validateLogin", creds);
    }
}

export default AuthActions;
