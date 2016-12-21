
const   EMAIL_EMPTY = 'Enter an email address.',
        EMAIL_INVALID = 'Invalid email.',
        PASSWORD_CONFIRM_EMPTY = 'Confirm your password.',
        PASSWORD_EMPTY = ['Enter a password (minimum of ', ' characters).'],
        PASSWORD_INVALID = ['Invalid password (minimum of ', ' characters).'],
        PASSWORD_MISMATCH = 'Passwords do not match.';

const FormValidationUtils = {
	 emailValidate: function(email) {
        if (!email) {
            return EMAIL_EMPTY;
            // return false;
        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            return true;
        }
        
        return EMAIL_INVALID;
        // return false;
    },

    passwordValidate: function(password, minLength, upperChar, specialChar) {
        if (!password) {
            return PASSWORD_EMPTY[0] + minLength + PASSWORD_EMPTY[1];
            // return false;
        }

        if (minLength && password.length < minLength) {
            return PASSWORD_INVALID[0] + minLength + PASSWORD_INVALID[1];
            // console.log('Nope.');
            // return false;
        }

        // Upper character detection here

        // Special character detection here

        return true;
        
    },

    passwordsMatch: function(password1, password2) {
    	if (!password2) {
            return PASSWORD_CONFIRM_EMPTY;
            // return false;
        }

        if (password1 !== password2) {
            return PASSWORD_MISMATCH;
            // return false;
        }

        return true;
    }
}

export default FormValidationUtils;