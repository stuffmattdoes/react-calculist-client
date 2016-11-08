// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _lists = {};
var _currentID = null;

function populateLists(rawLists) {
    console.log("Populate lists");
    _lists = rawLists;
}

class ListStore extends EventEmitter {

    getAll() {
        // console.log("Get all lists");
        return _lists;
    }

    getCurrentID() {
        return _currentID;
    }

    listCreate(listID, title) {
        console.log("Create list: ", action);
        _lists.push({
            title: title,
            ID: listID
        });
        this.emit("LISTS_CHANGE");
    }

    listDelete(listID) {
        console.log("Delete list: ", action);
        _lists.forEach(function(value, index) {
            if (listID == value.ID) {
                _lists.splice(index, 1);
            }
        });
        this.emit("LISTS_CHANGE");
    }

    listUpdate(action) {
        console.log("Update list: ", action);
        this.emit("LISTS_CHANGE");
    }

    handleActions(action) {
        switch(action.type) {
            case "CLICK_LIST" : {
                _currentID = action.listID;
                // console.log(_currentID);
                break;
            }
            case "CREATE_LIST" : {
                this.listCreate(action.listID, action.title);
                break;
            }
            case "DELETE_LIST" : {
                this.listDelet(action);
                break;
            }
            case "RECEIVE_RAW_LISTS" : {
                populateLists(
                    action.rawLists
                )
                break;
            }
            case "UPDATE_LIST" : {
                this.listUpdate(action);
                break;
            }
        }
    }
}

const listStore = new ListStore;

dispatcher.register(listStore.handleActions.bind(listStore));

export default listStore;
