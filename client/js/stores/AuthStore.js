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
        this.setToken(data.jwt);
        this.setUser(data.user);
        _authErrors  = {};
        this.emit(CHANGE_EVENT);
    }

    userAuthError(data) {
        _authErrors = data.errors;
        this.emit(CHANGE_EVENT);
    }

    userLogout() {
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
            case 'USER_LOGOUT' : {
                this.userLogout();
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
            case 'RECEIVE_USER_REGISTER_SUCCESS' : {
                this.setUserInfo(action.data);
                break;
            }
            case 'RECEIVE_USER_REGISTER_ERROR' : {
                this.userAuthError(action.data);
                break;
            }
            case 'RECEIVE_USER_LOGIN_SUCCESS' : {
                this.setUserInfo(action.data);
                break;
            }
            case 'RECEIVE_USER_LOGIN_ERROR' : {
                this.userAuthError(action.data);
                break;
            }
            case 'RECEIVE_TOKEN_REFRESH_SUCCESS' : {
                this.setUserInfo(action.data);
                break;
            }
            case 'RECEIVE_TOKEN_REFRESH_ERROR' : {
                console.log('token refresh error');
                // this.tokenRefreshError();
                break;
            }
        }
    }

}

const authStore = new AuthStore();
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
