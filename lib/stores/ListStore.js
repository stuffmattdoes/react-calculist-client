// Libraries
import { EventEmitter } from "events";
import dispatcher from '../stores/Dispatcher';

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
                        id: 1477930616475
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
                        id: 1477930628428
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
                        id: 1477930639107
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
                        id: 1477930647994
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
                        id: 1477930654154
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
                        id: 1477930663042
                    },
                ],
                taxRate: 6.5
            }
        ];
    }

    createListItem(title) {

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
            id: Date.now()
        });

        // console.log("ListStore: List item created");
        this.emit("change");
    }

    deleteListItem(id) {
        // console.log("Store: Delete list item");

        // this.lists[0].items.splice(id, 1);

        this.lists[0].items.forEach(function(value, index) {
            // console.log(value, index);
            if (id == value.id) {
                this.lists[0].items.splice(index, 1);
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
        }
    }
}

const listStore = new ListStore;
dispatcher.register(listStore.handleActions.bind(listStore));
// window.dispatcher = dispatcher;

export default listStore;
