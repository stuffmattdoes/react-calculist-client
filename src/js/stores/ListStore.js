// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _lists = {};
var _currentID = null;
var CHANGE_EVENT = "CHANGE_LIST";

class ListStore extends EventEmitter {

    getAll() {
        // console.log("ListStore: getAll", _lists);
        return _lists;
    }

    getCurrentListID() {
        // console.log("ListStore: getCurrentListID", _currentID);
        return _currentID;
    }

    getCurrentList() {
        // console.log("ListStore: getCurrentList");
        var currentList = {};

        _lists.forEach(function(value, index) {
            if (_currentID == value.ID) {
                currentList = value;
            }
        });
        return currentList;
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
        // console.log("Delete list", listID);
        _lists.forEach(function(value, index) {
            if (listID == value.ID) {
                _lists.splice(index, 1);
            }
        });
        this.resetListView();
        this.emit(CHANGE_EVENT);
    }

    listsPopulate(rawLists) {
        // console.log("Populate lists", rawLists.lists);
        _lists = rawLists.lists;
        this.emit(CHANGE_EVENT);
    }

    listUpdate(listID, updates) {
        // console.log("Update list: ");

        _lists.forEach(function(value, index) {

            // Match our item ID
            if (listID == value.ID) {

                // Iterate through our updates and apply them
                for (var update in updates) {

                    // Is this property an object?
                    if (typeof updates[update] != "object") {

                        // If our store object has a similar property, update it
                        if (value.hasOwnProperty(update)) {
                            value[update] = updates[update];
                        }
                    } else {
                        // Iterate through children object - TEMPORARY FIX. should probs make data object flat instead
                        for (var childUpdate in updates[update]) {
                            if (value[update].hasOwnProperty(childUpdate)) {
                                if (value[update].hasOwnProperty(childUpdate)) {
                                    value[update][childUpdate] = updates[update][childUpdate];
                                }
                            }
                        }
                    }

                }
                // console.log(value);
            }

        }.bind(this));

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
                this.listDelete(action.listID);
                break;
            }
            case "RECEIVE_RAW_LISTS" : {
                this.listsPopulate(
                    action.rawLists
                )
                break;
            }
            case "RESET_LIST_VIEW" : {
                this.resetListView();
                break;
            }
            case "UPDATE_LIST_TITLE" : {
                this.listUpdate(action.listID, {title: action.title});
                break;
            }
        }
    }
}

const listStore = new ListStore;

dispatcher.register(listStore.handleActions.bind(listStore));

export default listStore;
