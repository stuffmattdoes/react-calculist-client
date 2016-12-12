// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _lists;
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
        // console.log("getCurrentList");

        if (!_lists
            || !_currentID) {
            return null;
        }

        for (var index in _lists) {
            if (_currentID == _lists[index].ID) {
                return _lists[index];
            }
        }

    }

    setCurrentList(listID) {
        // console.log("ListStore: Set current list:", listID);
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
        _lists.forEach((value, index) => {
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
        // this.emit(CHANGE_EVENT);
    }

    listUpdate(listID, updates) {

        _lists.forEach((list, index) => {

            // Match our list ID
            if (listID == list.ID) {
                this.updateProperties(list, updates);
            }
        });
        this.emit(CHANGE_EVENT);
    }

    updateProperties(list, updates) {

        // Iterate through our updates
        for (var key in updates) {
            // 'updates' gets the entire object
            // 'key' gets the property
            // 'updates[key]' gets the value

            // Is this property an object? And does our list have the same object property?
            if (typeof updates[key] === 'object'
                && list.hasOwnProperty(key)) {
                this.updateProperties(list[key], updates[key]);
            } else {
                if (key in list) {
                    list[key] = updates[key];
                }
            }
        }
    }

    resetListView() {
        _currentID = null;
        this.emit(CHANGE_EVENT);
    }

    handleActions(action) {
        switch(action.type) {
            case "SET_CURRENT_LIST" : {
                this.setCurrentList(action.listID);
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
            case "UPDATE_LIST" : {
                this.listUpdate(
                    action.listID,
                    action.updates
                );
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
