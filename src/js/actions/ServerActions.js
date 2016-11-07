import Dispatcher from '../dispatcher/Dispatcher';

const ServerActions = {
    receiveAllLists: function(rawLists) {
        console.log("Server action: receive all lists", rawLists);
        Dispatcher.dispatch({
            type: "RECEIVE_RAW_LISTS",
            rawLists: rawLists
        });
    }

}

export default ServerActions;
