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
        let _authErrors = AuthStore.getUserAuthErrors();

        if (this.checkValidation(_authErrors)) {
            this.onUserAuthSuccess();
        } else {
            this.setState({
                validation: _authErrors,
                formSubmitted: false
            });
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

    formValidate: function(e) {
        e.preventDefault();
        let errorMessages = {};
        let formSubmitted = false;

        let formData = {
            email: {
                value: document.getElementById('email').value
            },
            password: {
                value: document.getElementById('password').value
            }
        }

        if (formData.email.value.trim() === '') {
            errorMessages.email = 'Enter your email.';
        }

        if (formData.password.value.trim() === '') {
            errorMessages.password = 'Enter your password.';
        }

        // If no errors, send off to the login
        // method="POST" action="/api/auth/login"
        if (this.checkValidation(errorMessages)) {
            formSubmitted = true;
            AuthActions.default.userLogin(formData);
        }

        this.setState({
            formSubmitted: formSubmitted,
            authErrors: errorMessages
        });

    },

    checkValidation: function(data) {
        for (var val in data) {
            if (typeof data[val] === 'string') {
                return false;
            }
        }
        return true;
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
