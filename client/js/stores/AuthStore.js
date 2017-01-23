// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _errors = {};
const CHANGE_EVENT = 'USER_REGISTER';

class AuthStore extends EventEmitter {

    getRegisterErrors(userRegister) {
        console.log(userRegister);
        this.emit(CHANGE_EVENT);
    }

    handleActions(action) {
        switch(action.type) {
            case 'RECEIVE_USER_REGISTER' : {
                this.getRegisterErrors(action.userRegister);
                break;
            }
        }
    }

}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;
