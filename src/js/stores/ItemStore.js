// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

class ItemStore extends EventEmitter {
    constructor() {
        super();
        this.items = {}
    }

    createItem(title) {

    }

    deleteItem(id) {

    }

    updateItem(id, updates) {

    }

    getAll() {
        return this.items;
    }

    handleActions(action) {

    }
}

const itemStore = new ItemStore;

/*
    Registers our store with our dispatcher to provide it with callback functions
    (pretty much any of the functions above). These callback functions receive
    actions as parameters, which are then interpreted by the Switch statement.
    Finally, the payload of the action is taken in by the store's internal methods
*/
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;
