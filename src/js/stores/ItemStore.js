// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';
import ListStore from './ListStore';

var _items = {};
var _filter = "SHOW_ALL";
var CHANGE_EVENT = "CHANGE_ITEM";

function itemsPopulate(rawItems) {
    _items = rawItems.items;
    // console.log("Populate items:", _items);
}

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
        _items.forEach(function(value, index) {
            if (listID == value.listID) {
                listItems.push(value);
            }
        });
        return listItems;
    }

    getAllForListFilter(listID) {
        var listItems = [];
        _items.forEach(function(value, index) {
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
        // console.log("ItemStore: getListItemCount", listID, _items);
        var listItemChecked = 0,
            listItemUnchecked = 0;

        _items.forEach(function(value, index) {
            if (listID == value.listID) {
                if (value.checked) {
                    listItemChecked ++;
                } else {
                    listItemUnchecked ++;
                }
            }
        });
        return {
            checked: listItemChecked,
            unchecked: listItemUnchecked
        };
    }

    getCurrentListItemCount() {
        return this.getListItemCount(ListStore.getCurrentListID());
    }

    itemCreate(listID, itemID, title) {

        _items.push({
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
            ID: itemID,
            listID: ListStore.getCurrentListID()
        });

        this.emit(CHANGE_EVENT);
    }

    itemDelete(itemID) {
        // console.log("Store: Delete list item");
        _items.forEach(function(value, index) {
            if (itemID == value.ID) {
                _items.splice(index, 1);
            }
        });

        this.emit(CHANGE_EVENT);
    }

    itemSetVisibilityFilter(filter) {
        _filter = filter;
        this.emit(CHANGE_EVENT);
    }

    itemUpdate(itemID, updates) {
        _items.forEach(function(value, index) {

            // Match our item ID
            if (itemID == value.ID) {

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

    handleActions(action) {
        switch(action.type) {
            case "CREATE_ITEM" : {
                // console.log("CREATE_ITEM");
                this.itemCreate(action.listID, action.itemID, action.title);
                break;
            }
            case "DELETE_ITEM" : {
                // console.log("DELETE_ITEM");
                this.itemDelete(action.itemID);
                break;
            }
            case "SET_VISIBILITY_FILTER" : {
                this.itemSetVisibilityFilter(action.filter);
                break;
            }
            case "UPDATE_ITEM_AMOUNT" : {
                // console.log("UPDATE_ITEM_AMOUNT", action.amount);
                this.itemUpdate(action.itemID, {amount: action.amount});
                break;
            }
            case "UPDATE_ITEM_CHECKED" : {
                // console.log("UPDATE_ITEM_CHECKED");
                this.itemUpdate(action.itemID, {checked: action.checked});
                break;
            }
            case "UPDATE_ITEM_TITLE" : {
                // console.log("UPDATE_ITEM_TITLE");
                this.itemUpdate(action.itemID, {title: action.title});
                break;
            }
            case "UPDATE_ITEM_TAXED" : {
                // console.log("UPDATE_ITEM_TAXED");
                this.itemUpdate(
                    action.itemID,
                    {
                        tax: {
                            active: action.taxed
                        }
                    }
                );
                break;
            }
            case "RECEIVE_RAW_ITEMS" : {
                itemsPopulate(
                    action.rawItems
                )
                break;
            }
            case "UPDATE_ITEM_UNIT_PRICE_ACTIVE" : {
                // console.log("UPDATE_ITEM_UNIT_PRICE_ACTIVE");
                this.itemUpdate(
                    action.itemID,
                    {
                        unitPricing: {
                            active: action.unitPriceActive
                        }
                    }
                );
                break;
            }
            case "UPDATE_ITEM_UNIT_PRICE" : {
                // console.log("UPDATE_ITEM_UNIT_PRICE");
                this.itemUpdate(
                    action.itemID,
                    {
                        unitPricing: {
                            price: action.unitPrice
                        }
                    }
                );
                break;
            }
            case "UPDATE_ITEM_UNIT_QUANTITY" : {
                // console.log("UPDATE_ITEM_UNIT_QUANTITY");
                this.itemUpdate(
                    action.itemID,
                    {
                        unitPricing: {
                            quantity: action.quantity
                        }
                    }
                );
                break;
            }

            default : {
                return null;
            }

        }
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
