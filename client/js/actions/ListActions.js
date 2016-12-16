import dispatcher from "../dispatcher/Dispatcher";
import WebAPIUtils from "../utils/WebAPIUtils";

const ListActions = {

    setCurrentList: function(listID) {
        dispatcher.dispatch({
            type: "SET_CURRENT_LIST",
            listID: listID
        })
    },

    listCreate: function(title, owner) {
        var listID = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

        // Add data to local store
        dispatcher.dispatch({
            type: "CREATE_LIST",
            title: title,
            listID: listID,
            owner: 'm.james.morrison00@gmail.com'
        });

        // API action call
        WebAPIUtils.listCreate(listID, title, owner);
    },

    listDelete: function(listID) {
        dispatcher.dispatch({
            type: "DELETE_LIST",
            listID: listID
        });

        WebAPIUtils.listDelete(listID);
    },

    listUpdate: function(listID, updates) {
        dispatcher.dispatch({
            type: "UPDATE_LIST",
            listID: listID,
            updates: updates
        });

        // API action call
        WebAPIUtils.listUpdate(
            listID,
            updates
        );
    },

    resetListView: function() {
        dispatcher.dispatch({
            type: "RESET_LIST_VIEW"
        });
    }
}

export default ListActions;
