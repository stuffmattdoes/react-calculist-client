// Redirect the page if the user is logged in
const Auth = {

    loggedIn: function(nextState, replace, callback) {
        // Check for Login
        var isLoggedIn = false;

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
    }
}

export default Auth;
