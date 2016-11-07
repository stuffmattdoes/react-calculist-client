import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const ListActions = {

    createListItem: function(title) {
        // console.log("Action: Create list item (before)");
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        dispatcher.dispatch({
            type: "CREATE_ITEM",
            id: id,
            title: title
        });

        // API action call
        // var newItem = ListUtils.
        WebAPIUtils.createItem(id, title);
    },

    deleteListItem: function(id) {
        // console.log("Action: delete list item");
        dispatcher.dispatch({
            type: "DELETE_ITEM",
            id: id
        });

        // API action call
    },

    updateListItemAmount: function(id, amount) {
        // console.log("updateListItemAmount");
        dispatcher.dispatch({
            type: "UPDATE_ITEM_AMOUNT",
            id: id,
            amount: amount
        });

        // API action call
    },

    updateListItemChecked: function(id, checked) {
        dispatcher.dispatch({
            type: "UPDATE_ITEM_CHECKED",
            id: id,
            checked: checked
        });

        // API action call
    },

    updateListItemTitle: function(id, title) {
        dispatcher.dispatch({
            type: "UPDATE_ITEM_TITLE",
            id: id,
            title: title
        });

        // API action call
    },

    updateListItemUnitPriceActive: function(id, active) {
        // console.log("updateListItemUnitPriceActive", id, active);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_PRICE_ACTIVE",
            id: id,
            unitPriceActive: active
        });

        // API action call
    },

    updateListItemUnitPrice: function(id, unitPrice) {
        // console.log("updateListItemUnitPrice", unitPrice);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_PRICE",
            id: id,
            unitPrice: unitPrice
        });

        // API action call
    },

    updateListItemUnitQuantity: function(id, quantity) {
        // console.log("updateListItemUnitQuantity", quantity);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_QUANTITY",
            id: id,
            quantity: quantity
        });

        // API action call
    },

    updateListItemTaxed: function(id, taxed) {
        // console.log("updateListItemTaxed");
        dispatcher.dispatch({
            type: "UPDATE_ITEM_TAXED",
            id: id,
            taxed: taxed
        });

        // API action call
    }

}

export default ListActions;
