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

    setToken(token) {
        localStorage.setItem('jwt', token);
        _jwt = token;
        this.emit(CHANGE_EVENT);
    }

    getUser() {
        return _user;
    }

    setUser(user) {
        localStorage.setItem('user', user);
        _user = user;
        this.emit(CHANGE_EVENT);
    }

    isUserAuth() {
        return !!_user && !!_jwt;
    }

    setUserInfo(data) {
        let jwt = data.jwt;
        if (!jwt) {
            jwt = localStorage.getItem('jwt');
        }
        this.setToken(jwt);
        this.setUser(data.user);
        _authErrors  = {};
        this.emit(CHANGE_EVENT);
    }

    userAuthError(data) {
        _authErrors = data.errors;
        this.emit(CHANGE_EVENT);
    }

    clearCreds() {
        _user = null;
        _jwt = null;
        _userRole = null;
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
        this.emit(CHANGE_EVENT);
    }

    getUserAuthErrors() {
        return _authErrors;
    }

    tokenRefreshError() {
        _jwt = null;
        _user = null;
        this.emit(CHANGE_EVENT);
    }

    handleActions(action) {
        switch(action.type) {
            case 'CLEAR_CREDENTIALS' : {
                this.clearCreds();
                break;
            }
            case 'SET_USER' : {
                this.setUser(action.user);
                break;
            }
            case 'SET_TOKEN' : {
                this.setToken(action.token);
                break;
            }
            case 'USER_REGISTER_SUCCESS' : {
                this.setUserInfo(action.data);
                break;
            }
            case 'USER_REGISTER_ERROR' : {
                this.userAuthError(action.data);
                break;
            }
            case 'USER_LOGIN_SUCCESS' : {
                this.setUserInfo(action.data);
                break;
            }
            case 'USER_LOGIN_ERROR' : {
                this.userAuthError(action.data);
                break;
            }
            case 'TOKEN_REFRESH_SUCCESS' : {
                this.setUserInfo(action.data);
                break;
            }
            case 'TOKEN_REFRESH_ERROR' : {
                this.clearCreds();
                break;
            }
        }
    }

}

const authStore = new AuthStore();
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
