// Libraries
import React from 'react';

const Login = React.createClass({
    render: function() {
        return (
            <div className="register-view">
                <form className="form-main">
                    <label
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="text"
                    />
                    <label
                        htmlFor="password"
                    >Password</label>
                    <input
                        id="password"
                        type="password"
                    />
                    <label
                        htmlFor="password-confirm"
                    >Confirm Password</label>
                    <input
                        id="password-confirm"
                        type="password"
                    />
                </form>
                <p>Don't have an account yet?</p>
                <a href="#">Register now</a>
            </div>
        );
    }
});

export default Login;