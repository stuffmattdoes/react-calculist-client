import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const ItemActions = {

    itemCreate: function(title) {
        var itemID = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        dispatcher.dispatch({
            type: "CREATE_ITEM",
            itemID: itemID,
            title: title
        });

        // API action call
        WebAPIUtils.itemCreate(itemID, title);
    },

    itemDelete: function(itemID) {
        // console.log("Action: delete list item");
        dispatcher.dispatch({
            type: "DELETE_ITEM",
            itemID: itemID
        });

        // API action call
        WebAPIUtils.itemDelete(itemID);
    },

    itemSetVisibilityFilter: function(filter) {
        dispatcher.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: filter
        });
    },

    itemUpdateAmount: function(itemID, amount) {
        // console.log("updateListItemAmount");
        dispatcher.dispatch({
            type: "UPDATE_ITEM_AMOUNT",
            itemID: itemID,
            amount: amount
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            {
                amount: amount
            }
        );
    },

    itemUpdateChecked: function(itemID, checked) {
        dispatcher.dispatch({
            type: "UPDATE_ITEM_CHECKED",
            itemID: itemID,
            checked: checked
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            {
                checked: checked
            }
        );
    },

    itemUpdateTitle: function(itemID, title) {
        dispatcher.dispatch({
            type: "UPDATE_ITEM_TITLE",
            itemID: itemID,
            title: title
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            {
                title: title
            }
        );
    },

    itemUpdateUnitPriceActive: function(itemID, active) {
        // console.log("updateListItemUnitPriceActive", id, active);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_PRICE_ACTIVE",
            itemID: itemID,
            unitPriceActive: active
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            {
                unitPricing: {
                    active: active
                }
            }
        );
    },

    itemUpdateUnitPrice: function(itemID, unitPrice) {
        // console.log("updateListItemUnitPrice", unitPrice);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_PRICE",
            itemID: itemID,
            unitPrice: unitPrice
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            {
                unitPricing: {
                    price: unitPrice
                }
            }
        );
    },

    itemUpdateUnitQuantity: function(itemID, quantity) {
        // console.log("updateListItemUnitQuantity", quantity);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_QUANTITY",
            itemID: itemID,
            quantity: quantity
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            {
                unitPricing: {
                    quantity: quantity
                }
            }
        );
    },

    itemUpdateTaxed: function(itemID, taxed) {
        // console.log("updateListItemTaxed");
        dispatcher.dispatch({
            type: "UPDATE_ITEM_TAXED",
            itemID: itemID,
            taxed: taxed
        });

        // API action call
        WebAPIUtils.itemUpdate(
            itemID,
            {
                tax: {
                    active: taxed
                }
            }
        );
    }

}

export default ItemActions;
