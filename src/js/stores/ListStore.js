// Libraries
import { EventEmitter } from "events";
import dispatcher from '../dispatcher/Dispatcher';

class ListStore extends EventEmitter {
    constructor() {
        super();
        this.lists = [
            {
                title: "Groceries",
                items: [
                    {
                        title: "Milk",
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
                        id: 'iv2r6zml'
                    },
                    {
                        title: "Eggs",
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
                        id: 'iv2rlmbl'
                    },
                    {
                        title: "Cat food",
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
                        id: 'iv2rtpsl'
                    },
                    {
                        title: "Vegetable oil",
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
                        id: 'iv2rkedc'
                    },
                    {
                        title: "Butter",
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
                        id: 'iv2rxbgq'
                    },
                    {
                        title: "More cat food",
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
                        id: 'iv2rsurb'
                    },
                ],
                taxRate: 6.5
            }
        ];
    }

    createListItem(title) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        this.lists[0].items.push({
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
            id: id
        });

        // console.log("ListStore: List item created");
        this.emit("change");
    }

    deleteListItem(id) {
        // console.log("Store: Delete list item");
        this.lists[0].items.forEach(function(value, index) {
            // console.log(value, index);
            if (id == value.id) {
                this.lists[0].items.splice(index, 1);
            }
        }.bind(this));

        this.emit("change");
    }

    updateListItem(id, updates) {
        this.lists[0].items.forEach(function(value, index) {

            // Match our item ID
            if (id == value.id) {

                // Iterate through our updates and apply them
                for (var update in updates) {
                    if (updates.hasOwnProperty(update)) {
                        value[update] = updates[update];
                    }
                };
                console.log(value.amount);
            }

        }.bind(this));

        this.emit("change");
    }

    getAll() {
        return this.lists;
    }

    handleActions(action) {
        // console.log("ListStore: received ", action);
        switch(action.type) {
            case "CREATE_ITEM" : {
                this.createListItem(action.title);
                break;
            }
            case "DELETE_ITEM" : {
                this.deleteListItem(action.id);
                break;
            }
            case "UPDATE_ITEM_AMOUNT" : {
                this.updateListItem(action.id, {amount: action.amount});
                break;
            }
            case "UPDATE_ITEM_CHECKED" : {
                this.updateListItem(action.id, {checked: action.checked});
                break;
            }
            case "UPDATE_ITEM_TITLE" : {
                this.updateListItem(action.id, {title: action.title});
                break;
            }
            case "UPDATE_ITEM_TAXED" : {
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
            case "UPDATE_ITEM_UNIT_PRICE_ACTIVE" : {
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
                console.log(action.totalPrice);
                this.updateListItem(
                    action.id,
                    {
                        amount: action.totalPrice,
                        unitPricing: {
                            price: action.unitPrice
                        }
                    }
                );
                break;
            }
            case "UPDATE_ITEM_UNIT_QUANTITY" : {
                console.log(action.totalPrice);
                this.updateListItem(
                    action.id,
                    {
                        amount: action.totalPrice,
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
