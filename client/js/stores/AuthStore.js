// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _authErrors  = {};
const CHANGE_EVENT = 'USER_AUTH';

class AuthStore extends EventEmitter {

    userAuthSuccess(data) {
        console.log('User auth success!', data);
        _authErrors  = {};
        this.emit(CHANGE_EVENT);
    }

    userAuthError(data) {
        console.log('User auth error.', data);
        _authErrors = data.responseJSON.errors;
        this.emit(CHANGE_EVENT);
    }

    getUserAuthErrors() {
        return _authErrors;
    }

    handleActions(action) {
        switch(action.type) {
            case 'RECEIVE_USER_REGISTER_SUCCESS' : {
                this.userAuthSuccess(action.response);
                break;
            }
            case 'RECEIVE_USER_REGISTER_ERROR' : {
                this.userAuthError(action.response);
                break;
            }
            case 'RECEIVE_USER_LOGIN_SUCCESS' : {
                this.userAuthSuccess(action.response);
                break;
            }
            case 'RECEIVE_USER_LOGIN_ERROR' : {
                this.userAuthError(action.response);
                break;
            }
        }
    }

}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
