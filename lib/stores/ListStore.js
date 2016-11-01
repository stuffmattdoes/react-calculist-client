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

    getAll() {
        return this.lists;
    }

    handleActions(action) {
        console.log("ListStore: received ", action);
        switch(action.type) {
            case "CREATE_ITEM" : {
                this.createListItem(action.title);
                break;
            }
        }
    }
}

const listStore = new ListStore;
dispatcher.register(listStore.handleActions.bind(listStore));
// window.dispatcher = dispatcher;

export default listStore;
