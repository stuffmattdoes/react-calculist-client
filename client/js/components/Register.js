// Libraries
import React from 'react';

const Register = React.createClass({
    
    formValidate: function(formProps) {
        const errors = {};

        if (!formProps.email) {
            errors.email = 'Please enter an email.';
        }
        if (!formProps.password) {
            errors.password = 'Please enter a password.';
        }
        if (!formProps.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password.';
        }

        // method="POST" action="/api/auth/register"
        
        return errors;
    },

    render: function() {
        return (
            <div className="app">
                <div className="login-view">
                    <h1>Register</h1>
                    <form className="form-standard" onSubmit={this.formValidate}>
                        <div className="input-group input-error">
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
                                className="label-error"
                                htmlFor="email"
                                >
                                Enter a valid email
                            </label>
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
                            <label 
                                className="label-error"
                                htmlFor="password"
                                >
                                Enter a password
                            </label>
                        </div>
                        <div className="input-group">
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
                            <label 
                                className="label-error"
                                htmlFor="confirmPassword"
                                >
                                Passwords do not match
                            </label>
                        </div>
                        <input
                            className="button-full button-main"
                            type="submit"
                        />
                    </form>
                    <div className="login-alt">
                        <p>Already have an account?</p>
                        <a href="/login">Sign in</a>
                    </div>
                </div>
            </div>
        );
    }
});

export default Register;
