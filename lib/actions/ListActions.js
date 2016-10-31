import dispatcher from "../stores/Dispatcher";

export function createListItem(text) {
    // console.log("Action: Create list item");

    dispatcher.dispatch({
        type: "CREATE_TODO",
        title: text
    });
}

export function deleteListItem(id) {
    console.log("Action: delete list item");
    
    dispatcher.dispatch({
        type: "DELETE_TODO",
        id: id
    });
}
