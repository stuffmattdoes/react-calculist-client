import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const ListActions = {

    listClick: function(listID) {
        dispatcher.dispatch({
            type: "CLICK_LIST",
            listID: listID
        })
    },

    listCreate: function(title) {
        var listID = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        dispatcher.dispatch({
            type: "CREATE_LIST",
            title: title,
            listID: listID
        });

        // API action call
        // var newItem = ListUtils.
        // WebAPIUtils.listCreate(itemID, title);

    }
}

export default ListActions;
