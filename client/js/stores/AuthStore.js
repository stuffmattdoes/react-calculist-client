// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _registerErrors = {};
const CHANGE_EVENT = 'USER_REGISTER';

class AuthStore extends EventEmitter {

    userRegisterSuccess(data) {
        _registerErrors = {};
        console.log(data);
        this.emit(CHANGE_EVENT);
    }

    userRegisterError(data) {
        _registerErrors = data.responseJSON.errors;
        console.log(_registerErrors);
        this.emit(CHANGE_EVENT);
    }

    getUserRegisterErrors() {
        return _registerErrors;
    }

    handleActions(action) {
        switch(action.type) {
            case 'RECEIVE_USER_REGISTER_SUCCESS' : {
                this.userRegisterSuccess(action.response);
                break;
            }
            case 'RECEIVE_USER_REGISTER_ERROR' : {
                this.userRegisterError(action.response);
                break;
            }
        }
    }

}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
