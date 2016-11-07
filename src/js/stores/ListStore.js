// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

var _lists = {};

function populateLists(rawLists) {
    // console.log(rawLists);
    _lists = rawLists;
}

class ListStore extends EventEmitter {

    createListItem(itemID, title) {

        _lists[0].items.push({
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
            id: itemID
        });

        // console.log("ListStore: List item created");
        this.emit("change");
    }

    deleteListItem(id) {
        // console.log("Store: Delete list item");
        _lists[0].items.forEach(function(value, index) {
            // console.log(value, index);
            if (id == value.id) {
                _lists[0].items.splice(index, 1);
            }
        });

        this.emit("change");
    }

    getAll() {
        // console.log(_lists);
        return _lists;
    }

    updateListItem(id, updates) {
        _lists[0].items.forEach(function(value, index) {

            // Match our item ID
            if (id == value.id) {

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

        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case "CREATE_ITEM" : {
                // console.log("CREATE_ITEM");
                this.createListItem(action.id, action.title);
                break;
            }
            case "DELETE_ITEM" : {
                // console.log("DELETE_ITEM");
                this.deleteListItem(action.id);
                break;
            }
            case "UPDATE_ITEM_AMOUNT" : {
                // console.log("UPDATE_ITEM_AMOUNT", action.amount);
                this.updateListItem(action.id, {amount: action.amount});
                break;
            }
            case "UPDATE_ITEM_CHECKED" : {
                // console.log("UPDATE_ITEM_CHECKED");
                this.updateListItem(action.id, {checked: action.checked});
                break;
            }
            case "UPDATE_ITEM_TITLE" : {
                // console.log("UPDATE_ITEM_TITLE");
                this.updateListItem(action.id, {title: action.title});
                break;
            }
            case "UPDATE_ITEM_TAXED" : {
                // console.log("UPDATE_ITEM_TAXED");
                this.updateListItem(
                    action.id,
                    {
                        tax: {
                            active: action.taxed
                        }
                    }
                );
                break;
            }
            case "RECEIVE_RAW_LISTS" : {
                populateLists(
                    action.rawLists
                )
                break;
            }
            case "UPDATE_ITEM_UNIT_PRICE_ACTIVE" : {
                // console.log("UPDATE_ITEM_UNIT_PRICE_ACTIVE");
                this.updateListItem(
                    action.id,
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
                this.updateListItem(
                    action.id,
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
                this.updateListItem(
                    action.id,
                    {
                        unitPricing: {
                            quantity: action.quantity
                        }
                    }
                );
                break;
            }

        }
    }
}

const listStore = new ListStore;

/*
    Registers our store with our dispatcher to provide it with callback functions
    (pretty much any of the functions above). These callback functions receive
    actions as parameters, which are then interpreted by the Switch statement.
    Finally, the payload of the action is taken in by the store's internal methods
*/
dispatcher.register(listStore.handleActions.bind(listStore));

export default listStore;
