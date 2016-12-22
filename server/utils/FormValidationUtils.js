
const   EMAIL_EMPTY = 'Enter an email address.',
        EMAIL_INVALID = 'Invalid email.',
        PASSWORD_CONFIRM_EMPTY = 'Confirm your password.',
        PASSWORD_EMPTY = ['Enter a password (minimum of ', ' characters).'],
        PASSWORD_INVALID = ['Invalid password (minimum of ', ' characters).'],
        PASSWORD_MISMATCH = 'Passwords do not match.';

exports.emailValidate = (email) => {
    if (!email) {
        // return false;
        return EMAIL_EMPTY;
    }

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        // return false;
        return EMAIL_INVALID;
    }
    
    // Return true
    return '';
}

exports.passwordValidate = (password, minLength, upperChar, specialChar) => {
    if (!password) {
        // return false;
        return PASSWORD_EMPTY[0] + minLength + PASSWORD_EMPTY[1];
    }

    if (minLength && password.length < minLength) {
        // return false;
        return PASSWORD_INVALID[0] + minLength + PASSWORD_INVALID[1];
    }

    // Upper character detection here

    // Special character detection here

    // Return true
    return '';
    
}

exports.passwordsMatch = (password1, password2) => {
	if (!password2) {
        // return false;
        return PASSWORD_CONFIRM_EMPTY;
    }

    if (password1 !== password2) {
        // return false;
        return PASSWORD_MISMATCH;
    }

    // Return true
    return '';
}