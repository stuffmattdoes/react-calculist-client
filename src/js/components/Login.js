// Libraries
import React from 'react';
import { browserHistory } from 'react-router';

// Actions
import AuthActions from '../actions/AuthActions';

// Stores
import AuthStore from '../stores/AuthStore';

const inputFieldGroups = [
    {
        label: 'Email',
        name: 'email',
        type: 'text',
        required: true
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true
    }
];

const Login = React.createClass({

    getInitialState: function() {
        return {
            validation: '',
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
        browserHistory.push('/lists');
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
            AuthActions.userLogin(formData);
        }

        this.setState({
            formSubmitted: formSubmitted,
            validation: errorMessages
        });

    },

    checkValidation: function(data) {
        for (let val in data) {
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
                            {this.state.validation.invalid}
                        </label>
                        {inputFieldGroups.map((inputField) => {
                            let fieldError = this.state.validation[inputField.name];
                            let inputGroupClass = "input-group";

                            if(fieldError) {
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
                                    {fieldError ?
                                        <label
                                            className="label-error"
                                            htmlFor={inputField.name}
                                        >
                                            {fieldError}
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
