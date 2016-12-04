// Libraries
import React from 'react';

const Login = React.createClass({
    render: function() {
        return (
            <div className="app">
                <div className="login-view">
                    <h1>Login</h1>
                    <form method="POST" action="/api/login" className="form-standard">
                        <div className="input-group">
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
                        </div>
                        <div className="input-group">
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
                        </div>
                        <input
                            className="button-full button-main"
                            type="submit"
                        />
                    </form>
                    <div className="login-alt">
                        <p>Don't have an account yet?</p>
                        <a href="/register">Register now</a>
                    </div>
                </div>
            </div>
        );
    }
});

export default Login;
