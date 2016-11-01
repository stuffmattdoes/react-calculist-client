import dispatcher from "../stores/Dispatcher";

export function createListItem(text) {
    // console.log("Action: Create list item (before)");

    dispatcher.dispatch({
        type: "CREATE_ITEM",
        title: text
    });

    // console.log("Action: Create list item (after)");
}

export function deleteListItem(id) {
    // console.log("Action: delete list item");

    dispatcher.dispatch({
        type: "DELETE_ITEM",
        id: id
    });
}
