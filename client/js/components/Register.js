// Libraries
import React from 'react';
import FormValidationUtils from '../utils/FormValidationUtils';

// Actions
import * as AuthActions from '../actions/AuthActions';

const inputs = [
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

    formValidate: function(e) {
        e.preventDefault();
        var email = document.getElementById('email').value,
            password = document.getElementById('password').value,
            confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessages = {};
        
        // Email validation
        var emailErrors = FormValidationUtils.emailValidate(email);

        if (emailErrors !== '') {
            errorMessages.email = emailErrors
        }

        // Password validation
        var passwordErrors = FormValidationUtils.passwordValidate(password, 7, false, false);

        if (passwordErrors !== '') {
            errorMessages.password = passwordErrors;
        }

        // Password match
        var confirmPasswordErrors = FormValidationUtils.passwordsMatch(password, confirmPassword);

        if (confirmPasswordErrors !== '') {
            errorMessages.confirmPassword = confirmPasswordErrors;
        }

        // If no errors, send off to the register
        // method="POST" action="/api/auth/register"
        if (Object.keys(errorMessages).length === 0
            && errorMessages.constructor === Object) {

            AuthActions.default.userRegister({
                email: email,
                password: password
            }).done((response) => {
                console.log('Response: ', response);
            });

            this.setState({
                formSubmitted: true
            });

        }

        this.setState({
            validationErrors: errorMessages
        });

    },

    render: function() {

        return (
            <div className="app">
                <div className="login-view">
                    <h1>Register</h1>
                    <form className="form-standard"  onSubmit={this.formValidate} >
                        {inputs.map((inputField, index) => {
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
