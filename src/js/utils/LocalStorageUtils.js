
const LocalStorageUtils = {
    listsGetAll: function() {
        var rawItems = JSON.parse(localStorage.getItem('items'));
    },

    itemsGetAll: function() {
        var rawLists = JSON.parse(localStorage.getItem('lists'));
    }
}
