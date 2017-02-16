// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _authErrors = {};
var _user = null;
var _userRole = null;
var _jwt = null;
const CHANGE_EVENT = 'USER_AUTH';

class AuthStore extends EventEmitter {

    getToken() {
        return _jwt;
    }

    getUser() {
        return _user;
    }

    isUserAuth() {
        return !!_user && !!_jwt;
    }

    userLoginSuccess(data) {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', data.user);
        _jwt = data.jwt;
        _user = data.user;
        _authErrors  = {};
        this.emit(CHANGE_EVENT);
    }

    userAuthError(data) {
        _authErrors = data.responseJSON.errors;
        this.emit(CHANGE_EVENT);
    }

    getUserAuthErrors() {
        return _authErrors;
    }

    tokenRefreshSuccess(data) {
        console.log(data.jwt);
        _jwt = data.jwt;
        _user = data.user;
        this.emit(CHANGE_EVENT);
    }

    tokenRefreshError(token) {
        console.log(token);
        _jwt = null;
        _user = null;
        this.emit(CHANGE_EVENT);
    }

    handleActions(action) {
        switch(action.type) {
            case 'USER_LOGOUT' : {
                this.setToken(null, null);
                break;
            }
            case 'RECEIVE_USER_REGISTER_SUCCESS' : {
                // this.setToken(action.response.jwt, action.response.user);
                this.userLoginSuccess(action.response);
                break;
            }
            case 'RECEIVE_USER_REGISTER_ERROR' : {
                this.userAuthError(action.response);
                break;
            }
            case 'RECEIVE_USER_LOGIN_SUCCESS' : {
                // this.setToken(action.response.jwt, action.response.user);
                this.userLoginSuccess(action.response);
                break;
            }
            case 'RECEIVE_USER_LOGIN_ERROR' : {
                this.userAuthError(action.response);
                break;
            }
            case 'RECEIVE_TOKEN_REFRESH_SUCCESS' : {
                this.tokenRefreshSuccess(action.response);
                break;
            }
            case 'RECEIVE_TOKEN_REFRESH_ERROR' : {
                this.tokenRefreshError(action.response);
                break;
            }
        }
    }

}

const authStore = new AuthStore();
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
