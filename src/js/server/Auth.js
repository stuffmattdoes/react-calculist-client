
// Redirect the page if the user is logged in
const Auth = {
    loggedIn: function() {
        console.log("Not logged in :/");
        return false;
    }
}

export default Auth;