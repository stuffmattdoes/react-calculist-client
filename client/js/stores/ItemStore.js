// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

// Stores
import ListStore from './ListStore';

var _items = null;
var _filter = "SHOW_ALL";
var CHANGE_EVENT = "CHANGE_ITEM";

class ItemStore extends EventEmitter {

    getAll() {
        return _items;
    }

    getAllForCurrentList(filterActive) {
        if (filterActive) {
            return this.getAllForListFilter(ListStore.getCurrentListID());
        } else {
            return this.getAllForList(ListStore.getCurrentListID());
        }

    }

    getAllForList(listID) {
        var listItems = [];
        _items.forEach((value, index) => {
            if (listID == value.listID) {
                listItems.push(value);
            }
        });
        return listItems;
    }

    getAllForListFilter(listID) {
        var listItems = [];
        _items.forEach((value, index) => {
            if (listID == value.listID) {
                switch (_filter) {
                    case "SHOW_ALL" : {
                        listItems.push(value);
                        break;
                    }
                    case "SHOW_UNCHECKED" : {
                        if (!value.checked) {
                            listItems.push(value);
                        }
                        break;
                    }
                    case "SHOW_CHECKED" : {
                        if (value.checked) {
                            listItems.push(value);
                        }
                        break;
                    }
                }
            }
        });
        return listItems;
    }

    getCurrentFilter() {
        return _filter;
    }

    getListItemCount(listID) {
        var itemCount = {
            checked: 0,
            unchecked: 0
        }

        _items.forEach((value, index) => {
            if (listID == value.listID) {
                if (value.checked) {
                    itemCount.checked ++;
                } else {
                    itemCount.unchecked ++;
                }
            }
        });
        return itemCount;
    }

    getCurrentListItemCount() {
        return this.getListItemCount(ListStore.getCurrentListID());
    }

    itemCreate(listID, itemID, title) {
        var newItem = {
            title: title,
            checked: false,
            amount: 0.00,
            tax: {
                active: false,
                singleTaxRate: 0.0
            },
            unitPricing: {
                active: false,
                price: 0.00,
                quantity: 0
            },
            itemID: itemID,
            listID: ListStore.getCurrentListID()
        }
        _items.push(newItem);
        this.emit(CHANGE_EVENT);
    }

    itemDelete(itemID) {
        _items.forEach((value, index) => {
            if (itemID == value.itemID) {
                _items.splice(index, 1);
            }
        });

        this.emit(CHANGE_EVENT);
    }

    itemPopulate(data) {
        _items = data.items;
        this.emit(CHANGE_EVENT);
    }

    itemSetVisibilityFilter(filter) {
        _filter = filter;
        this.emit(CHANGE_EVENT);
    }

    itemUpdate(itemID, updates) {
        _items.forEach((item, index) => {

            // // Match our item ID
            if (itemID == item.itemID) {
                this.updateProperties(item, updates);
            }

        });
        this.emit(CHANGE_EVENT);
    }

    updateProperties(item, updates) {
        // Iterate through our updates
        for (var key in updates) {
            // console.log(_items);
            // 'updates' gets the entire object
            // 'key' gets the property
            // 'updates[key]' gets the value

            // Is this property an object? And does our item have the same object property?
            if (typeof updates[key] === 'object'
                && item.hasOwnProperty(key)) {
                // console.log(_items);
                this.updateProperties(item[key], updates[key]);
            } else {
                // console.log(_items);
                if (key in item) {
                    item[key] = updates[key];
                }
            }
        }

    }

    resetItemFilter() {
        _filter = "SHOW_ALL";
    }

    handleActions(action) {
        switch(action.type) {
            case "CREATE_ITEM" : {
                this.itemCreate(action.listID, action.itemID, action.title);
                break;
            }
            case "DELETE_ITEM" : {
                this.itemDelete(action.itemID);
                break;
            }
            case "SET_VISIBILITY_FILTER" : {
                this.itemSetVisibilityFilter(action.filter);
                break;
            }
            case "RECEIVE_ITEMS" : {
                this.itemPopulate(action.data);
                break;
            }
            case "RESET_LIST_VIEW" : {
                this.resetItemFilter();
                break;
            }
            case "UPDATE_ITEM" : {
                this.itemUpdate(
                    action.itemID,
                    action.updates
                );
                break;
            }
            default : {
                return null;
            }

        }
    }
}

const itemStore = new ItemStore();

/*
    Registers our store with our dispatcher to provide it with callback functions
    (pretty much any of the functions above). These callback functions receive
    actions as parameters, which are then interpreted by the Switch statement.
    Finally, the payload of the action is taken in by the store's internal methods
*/
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;
