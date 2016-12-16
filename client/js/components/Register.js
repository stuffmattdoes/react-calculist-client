// Libraries
import React from 'react';

const inputs = [
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
        required: true
    },
    {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
        required: true
    }
];

const Register = React.createClass({
    
    getInitialState: function() {
        return {
            validationErrors: {}
        }
    },
/*
    formValidate: function(e) {
        e.preventDefault();
        var email = document.getElementById('email').value,
            password = document.getElementById('password').value,
            confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessages = {};

        console.log(email, password, confirmPassword);
        
        // Email validation

        errorMessages.email = 'Please enter an email.';
        errorMessages.password = 'Please enter a password.';
        errorMessages.confirmPassword = 'Please confirm your password.';

        this.setState({
            validationErrors: errorMessages
        });

        // If no errors, send off to the register

    },
*/
    render: function() {

        return (
            <div className="app">
                <div className="login-view">
                    <h1>Register</h1>
                    <form className="form-standard" method="POST" action="/api/auth/register" >
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
