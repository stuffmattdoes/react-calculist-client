// Libraries
import React from 'react';
import { browserHistory } from 'react-router';

// Actions
import * as AuthActions from '../actions/AuthActions';

// Stores
import AuthStore from '../stores/AuthStore';

const inputFields = [
    {
        label: 'Email',
        name: 'email',
        type: 'text'
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password'
    }
];

const Login = React.createClass({

    getInitialState: function() {
        return {
            authErrors: '',
            formSubmitted: false
        }
    },

    onStoreChange: function() {
        var authErrors = AuthStore.getUserAuthErrors();

        if (this.checkForObjectProps(authErrors)) {
            this.setState({
                authErrors: authErrors,
                formSubmitted: false
            });
        } else {
            this.onUserAuthSuccess();
        }

    },

    onUserAuthSuccess: function() {
        browserHistory.push('/lists/');
    },

    componentWillMount: function() {
        AuthStore.on('USER_AUTH', this.onStoreChange);
    },

    componentWillUnmount: function() {
        AuthStore.removeListener('USER_AUTH', this.onStoreChange);
    },

    checkForObjectProps(objectToCheck) {
        if (Object.keys(objectToCheck).length === 0
            && objectToCheck.constructor === Object) {
            return false;
        }
        return true;
    },

    formValidate: function(e) {
        e.preventDefault();
        const errorMessages = {};
        var formData = {
            email: document.getElementById('email').value,
            password:  document.getElementById('password').value,
        }
        var formSubmitted = false;

        if (formData.email.trim() === '') {
            errorMessages.email = 'Enter your email.';
        }

        if (formData.password.trim() === '') {
            errorMessages.password = 'Enter your password.';
        }

        // If no errors, send off to the login
        // method="POST" action="/api/auth/login"
        if(!this.checkForObjectProps(errorMessages)) {
            this.formSubmit(formData);
            formSubmitted = true;
        }

        this.setState({
            formSubmitted: formSubmitted,
            authErrors: errorMessages
        });

    },

    formSubmit: function(formData) {
        AuthActions.default.userLogin({
            email: formData.email,
            password: formData.password
        });
    },

    render: function() {

        return (
            <div className="app">
                <div className="login-view">
                    <h1>Login</h1>
                    <form method="POST" className="form-standard" onSubmit={this.formValidate} >
                        <label
                            className="label-error"
                        >
                            {this.state.authErrors.invalid}
                        </label>
                        {inputFields.map((inputField) => {
                            var error = this.state.authErrors[inputField.name];
                            var inputGroupClass = "input-group";

                            if(error) {
                                inputGroupClass += ' input-error';
                            }

                            return(
                                <div className={inputGroupClass} key={inputField.name} >
                                    <label
                                        className="label-standard"
                                        htmlFor={inputField.name}
                                    >{inputField.label}</label>
                                    <input
                                        id={inputField.name}
                                        className="input-standard"
                                        {...inputField}
                                    />
                                    {error ?
                                        <label
                                            className="label-error"
                                            htmlFor={inputField.name}
                                        >
                                            {error}
                                        </label>
                                        : null}
                                </div>
                            );

                        })}

                        <input
                            className="button-full button-main"
                            type="submit"
                            value={this.state.formSubmitted ?
                                "Loading...": "Submit"
                            }
                            disabled={this.state.formSubmitted ?
                                "disabled": ""
                            }
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
