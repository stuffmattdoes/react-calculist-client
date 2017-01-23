// Libraries
import React from 'react';
import FormValidationUtils from '../utils/FormValidationUtils';
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
    },
    {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password'
    }
];

const Register = React.createClass({
    
    getInitialState: function() {
        return {
            validationErrors: {},
            formSubmitted: false
        }
    },

    onStoreChange: function() {
        var validationErrors = AuthStore.getUserRegisterErrors();

        if (this.checkForObjectProps(validationErrors)) {
            this.setState({
                validationErrors: validationErrors
            });
        } else {
            this.onUserRegisterSuccess();
        }

    },

    onUserRegisterSuccess: function() {
        browserHistory.push('/lists/');
    },

    componentWillMount: function() {
        AuthStore.on('USER_REGISTER', this.onStoreChange);
    },

    componentWillUnmount: function() {
        AuthStore.removeListener('USER_REGISTER', this.onStoreChange);
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
        var formData = {
            email: document.getElementById('email').value,
            password:  document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        }

        const errorMessages = {};
        var formSubmitted = false;
        
        // Email validation
        var emailErrors = FormValidationUtils.emailValidate(formData.email);

        if (emailErrors !== '') {
            errorMessages.email = emailErrors
        }

        // Password validation
        var passwordErrors = FormValidationUtils.passwordValidate(formData.password, 7, false, false);

        if (passwordErrors !== '') {
            errorMessages.password = passwordErrors;
        }

        // Password match
        var confirmPasswordErrors = FormValidationUtils.passwordsMatch(formData.password, formData.confirmPassword);

        if (confirmPasswordErrors !== '') {
            errorMessages.confirmPassword = confirmPasswordErrors;
        }

        // If no errors, send off to the register
        // method="POST" action="/api/auth/register"
        if(!this.checkForObjectProps(errorMessages)) {
            this.formSubmit(formData);
            formSubmitted = true;
        }

        this.setState({
            formSubmitted: formSubmitted,
            validationErrors: errorMessages
        });

    },

    formSubmit: function(formData) {
        AuthActions.default.userRegister({
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        });
    },

    render: function() {

        return (
            <div className="app">
                <div className="login-view">
                    <h1>Register</h1>
                    <form className="form-standard"  onSubmit={this.formValidate} >
                        {inputFields.map((inputField, index) => {
                            var error = this.state.validationErrors[inputField.name];
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
                        <p>Already have an account?</p>
                        <a href="/login">Sign in</a>
                    </div>
                </div>
            </div>
        );
    }
});

export default Register;
