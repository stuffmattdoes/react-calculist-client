import dispatcher from "../dispatcher/Dispatcher";

var ListActions = {

    createListItem: function(title) {
        // console.log("Action: Create list item (before)");

        dispatcher.dispatch({
            type: "CREATE_ITEM",
            title: title
        });

        // console.log("Action: Create list item (after)");
    },

    deleteListItem: function(id) {
        // console.log("Action: delete list item");

        dispatcher.dispatch({
            type: "DELETE_ITEM",
            id: id
        });
    },

    updateListItemAmount: function(id, amount) {
        // console.log("updateListItemAmount");
        dispatcher.dispatch({
            type: "UPDATE_ITEM_AMOUNT",
            id: id,
            amount: amount
        });
    },

    updateListItemChecked: function(id, checked) {
        dispatcher.dispatch({
            type: "UPDATE_ITEM_CHECKED",
            id: id,
            checked: checked
        });
    },

    updateListItemTitle: function(id, title) {
        dispatcher.dispatch({
            type: "UPDATE_ITEM_TITLE",
            id: id,
            title: title
        });
    },

    updateListItemUnitPriceActive: function(id, active) {
        // console.log("updateListItemUnitPriceActive");
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_PRICE_ACTIVE",
            id: id,
            unitPriceActive: active
        });
    },

    updateListItemUnitPrice: function(id, unitPrice, totalPrice) {
        // console.log("updateListItemUnitPrice", totalPrice);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_PRICE",
            id: id,
            unitPrice: unitPrice,
            totalPrice: totalPrice
        });
    },

    updateListItemUnitQuantity: function(id, quantity, totalPrice) {
        // console.log("updateListItemUnitQuantity", totalPrice);
        dispatcher.dispatch({
            type: "UPDATE_ITEM_UNIT_QUANTITY",
            id: id,
            quantity: quantity,
            totalPrice: totalPrice
        });
    },

    updateListItemTaxed: function(id, taxed) {
        // console.log("updateListItemTaxed");
        dispatcher.dispatch({
            type: "UPDATE_ITEM_TAXED",
            id: id,
            taxed: taxed
        });
    }

}

export default ListActions;
