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
        WebAPIUtils.listCreate(listID, title);
    },

    listDelete: function(listID) {
        dispatcher.dispatch({
            type: "DELETE_LIST",
            listID: listID
        });

        WebAPIUtils.listDelete(listID);
    },

    listUpdateTitle: function(listID, title) {
        dispatcher.dispatch({
            type: "UPDATE_LIST_TITLE",
            listID: listID,
            title: title
        });

        // API action call
        WebAPIUtils.listUpdate(
            listID,
            {
                title: title
            }
        );
    },

    resetListView: function() {
        dispatcher.dispatch({
            type: "RESET_LIST_VIEW"
        });
    }
}

export default ListActions;
