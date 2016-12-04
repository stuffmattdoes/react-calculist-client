// Libraries
import React from 'react';

const Register = React.createClass({
    render: function() {
        return (
            <div className="app">
                <div className="login-view">
                    <h1>Login</h1>
                    <form method="POST" action="/api/register" className="form-standard">
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
                        <label
                            className="label-standard"
                            htmlFor="confirmPassword"
                        >Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            className="input-standard"
                            type="password"
                        />
                        <input
                            className="submit-standard button-main"
                            type="submit"
                        />
                    </form>
                    <div className="login-alt">
                        <p>Already have an account?</p>
                        <a href="#">Sign in</a>
                    </div>
                </div>
            </div>
        );
    }
});

export default Register;
