// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _lists = {};
var _currentID = null;
var CHANGE_EVENT = "CHANGE_LIST";

function populateLists(rawLists) {
    // console.log("Populate lists");
    _lists = rawLists;
}

class ListStore extends EventEmitter {

    getAll() {
        // console.log("Get all lists");
        return _lists;
    }

    getCurrentList() {
        return _currentID;
    }

    listClick(listID) {
        _currentID = listID;
        this.emit(CHANGE_EVENT);
    }

    listCreate(listID, title) {
        // console.log("Create list");
        _lists.push({
            title: title,
            ID: listID
        });
        this.emit(CHANGE_EVENT);
    }

    listDelete(listID) {
        // console.log("Delete list");
        _lists.forEach(function(value, index) {
            if (listID == value.ID) {
                _lists.splice(index, 1);
            }
        });
        this.emit(CHANGE_EVENT);
    }

    listUpdate(action) {
        // console.log("Update list: ");
        this.emit(CHANGE_EVENT);
    }

    resetListView() {
        _currentID = null;
        this.emit(CHANGE_EVENT);
    }

    handleActions(action) {
        switch(action.type) {
            case "CLICK_LIST" : {
                this.listClick(action.listID);
                break;
            }
            case "CREATE_LIST" : {
                this.listCreate(action.listID, action.title);
                break;
            }
            case "DELETE_LIST" : {
                this.listDelete(action);
                break;
            }
            case "RECEIVE_RAW_LISTS" : {
                populateLists(
                    action.rawLists
                )
                break;
            }
            case "RESET_LIST_VIEW" : {
                this.resetListView();
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
