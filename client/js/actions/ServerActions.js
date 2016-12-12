import Dispatcher from '../dispatcher/Dispatcher';

const ServerActions = {
    receiveAllItems: function(rawItems) {
        // console.log("Server action: receive all lists", rawItems);
        Dispatcher.dispatch({
            type: "RECEIVE_RAW_ITEMS",
            rawItems: rawItems
        });

        // console.log(rawItems);
    },

    receiveAllLists: function(rawLists) {
        // console.log("Server action: receive all lists", rawLists);
        Dispatcher.dispatch({
            type: "RECEIVE_RAW_LISTS",
            rawLists: rawLists
        })
    }

}

export default ServerActions;
