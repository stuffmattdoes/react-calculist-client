// Libraries
import React from 'react';

const Login = React.createClass({
    render: function() {
        return (
            <div className="app">
                <div className="login-view">
                    <h1>Login</h1>
                    <form method="POST" action="/api/login" className="form-standard">
                        <label
                            className="label-standard"
                            htmlFor="email"
                        >Email</label>
                        <input
                            id="email"
                            name="email"
                            className="input-standard"
                            type="text"
                        />
                        <label
                            className="label-standard"
                            htmlFor="password"
                        >Password</label>
                        <input
                            id="password"
                            name="password"
                            className="input-standard"
                            type="password"
                        />
                        <input
                            className="submit-standard button-main"
                            type="submit"
                        />
                    </form>
                    <div className="login-alt">
                        <p>Don't have an account yet?</p>
                        <a href="#">Register now</a>
                    </div>
                </div>
            </div>
        );
    }
});

export default Login;
