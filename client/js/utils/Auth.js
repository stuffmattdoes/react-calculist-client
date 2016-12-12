// Redirect the page if the user is logged in
const Auth = {

    loggedIn: function(nextState, replace, callback) {
        // Check for Login
        var isLoggedIn = true;

        // console.log(nextState, replace, callback);

        if (isLoggedIn) {
            console.log("Logged in!");
            return callback();
        }

        console.log("Not logged in :/");
        replace({
            pathname: '/login',
            state: {
                nextPathname: nextState.location.pathname
            }
        });
        return callback();
    },

    userAuthorize: function() {
        console.log("User authorization");
    },

    userLogout: function() {
        console.log("User log out");
    }
}

export default Auth;
