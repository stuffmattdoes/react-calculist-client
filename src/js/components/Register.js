// Libraries
import React from 'react';
import FormValidationUtils from '../utils/FormValidationUtils';
import { hashHistory } from 'react-router';

// Actions
import AuthActions from '../actions/AuthActions';

// Stores
import AuthStore from '../stores/AuthStore';

const inputFieldGroups = [
    {
        label: 'Email',
        name: 'email',
        type: 'text',
        required: true,
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
    },
    {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        required: true,
    }
];

const Register = React.createClass({
    
    getInitialState: function() {
        return {
            validation: {},
            formSubmitted: false
        }
    },

    onStoreChange: function() {
        let _authErrors = AuthStore.getUserAuthErrors();
        console.log(_authErrors);

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
        hashHistory.push('/lists/');
    },

    componentWillMount: function() {
        AuthStore.on('USER_AUTH', this.onStoreChange);
    },

    componentWillUnmount: function() {
        AuthStore.removeListener('USER_AUTH', this.onStoreChange);
    },

    formValidate: function(e) {
        e.preventDefault();
        let formSubmitted = false;

        let formData = {
            email: {
                validationType: 'email',
                value: document.getElementById('email').value,
                required: true
            },
            password: {
                validationType: 'password',
                value: document.getElementById('password').value,
                required: true,
                params: {
                    minimumLength: 7,
                    upperCharacter: false,
                    specialCharacter: false
                }
            },
            confirmPassword: {
                validationType: 'match',
                value: document.getElementById('confirmPassword').value,
                required: true
            }
        };

        let formValidationResults = FormValidationUtils.formValidate(formData);

        // If no errors, send off to the register
        // method="POST" action="/api/auth/register"
        if (this.checkValidation(formValidationResults)) {
            formSubmitted = true;
            // AuthActions.clearCredentials();
            AuthActions.userRegister(formData);
        }

        this.setState({
            formSubmitted: formSubmitted,
            validation: formValidationResults
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
                <div className="view--login">
                    <h1>Register</h1>
                    <form className="form"  onSubmit={this.formValidate} >
                        {inputFieldGroups.map((inputField) => {
                            let fieldError = this.state.validation[inputField.name];
                            let inputGroupClass = 'form__group';
                            
                            if (typeof fieldError === 'string') {
                                inputGroupClass += ' form__group--error';
                            }

                            return(
                                <div className={inputGroupClass} key={inputField.name} >
                                    <label
                                        className="form__label"
                                        htmlFor={inputField.name}
                                    >
                                        {inputField.label}
                                        {inputField.required ? ' *' : ''}
                                    </label>
                                    <input
                                        id={inputField.name}
                                        className="form__input"
                                        name={inputField.name}
                                        type={inputField.type}
                                    />
                                    {fieldError ?
                                    <label
                                        className="form__label--error"
                                        htmlFor={inputField.name}
                                        >
                                        {fieldError}
                                    </label>
                                    : null}
                                </div>
                            );

                        })}
                        <p className="form__label--small">* required fields</p>
                        <input
                            className="button button--main button--full"
                            type='submit'
                            value={this.state.formSubmitted ?
                                'Loading...': 'Submit'
                            }
                            disabled={this.state.formSubmitted ?
                                'disabled': ''
                            }
                        />
                    </form>
                    <div className='login__alt-link'>
                        <p>Already have an account?</p>
                        <a href='/#/login/'>Sign in</a>
                    </div>
                </div>
            </div>
        );
    }
});

export default Register;
