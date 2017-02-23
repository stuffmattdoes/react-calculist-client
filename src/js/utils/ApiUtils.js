// Libraries
import axios from 'axios';

// Actions
import ServerResponseActions from '../actions/ServerResponseActions';
import AuthActions from '../actions/AuthActions';

const API_PREFIX = '/api';
const API_VERSION = '/v1.0';
const API_URLS = {
    items: API_PREFIX + '/items',
    lists: API_PREFIX + '/lists',
    auth: API_PREFIX + '/auth'
}

const WebAPIUtils = {

    // ==================================================
    // Items API
    // ==================================================

    itemCreate: function(title, listID, itemID) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }
        let newItem = {
            title: title,
            checked: false,
            amount: 0.00,
            tax: {
                active: false,
                singleTaxRate: 0.0
            },
            unitPricing: {
                active: false,
                price: 0.00,
                quantity: 0
            },
            itemID: itemID,
            listID: listID
        }

        axios.post(API_URLS.items + '/'+ itemID, newItem, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    },

    itemDelete: function(itemID) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }

        axios.delete(API_URLS.items + '/' + itemID, config)
        .then(response => {
           console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    },

    itemGetAll: function() {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        };

        axios.get(API_URLS.items, config)
        .then(response => {
            ServerResponseActions.receiveAllItems(response.data);
        })
        .catch(error => {
            console.log('Error:', error);
        });
    },

    itemUpdate: function(itemID, updates) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }
        let updateItem =  {
            itemID: itemID,
            updates: updates
        }

        axios.put(API_URLS.items + '/' + itemID, updateItem, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    },


    // ==================================================
    // List API
    // ==================================================

    listCreate: function(listID, listTitle, listOwner) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }
        let newList =  {
            listID: listID,
            owner: listOwner,
            title: listTitle
        }

        axios.post(API_URLS.lists + '/' + listID, newList, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    },

    listDelete: function(listID) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }

        axios.delete(API_URLS.lists + '/' + listID, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })

    },

    listGetAll: function(user) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        };

        axios.get(API_URLS.lists, config)
        .then(response => {
            ServerResponseActions.receiveAllLists(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    },

    listUpdate: function(listID, updates) {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        }
        let updateList =  {
            updates: updates
        }

        axios.put(API_URLS.lists + '/' + listID, updateList, config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    },


    // ==================================================
    // Auth API
    // ==================================================

    userRegister: function(creds) {
        axios.post(API_URLS.auth + '/register', creds)
        .then(response => {
            ServerResponseActions.receiveUserRegisterSuccess(response.data);
        })
        .catch(error => {
            ServerResponseActions.receiveUserRegisterError(error.response.data);
        });
    },

    userLogin: function(creds) {
        axios.post(API_URLS.auth + '/login', creds)
        .then(response => {
            ServerResponseActions.receiveUserLoginSuccess(response.data);
        })
        .catch(error => {
            AuthActions.default.userLogout();
            ServerResponseActions.receiveUserLoginError(error.response.data);
        });
    },

    tokenRefresh: function() {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        };

        let data = {
            jwt: localStorage.getItem('jwt'),
            user: localStorage.getItem('user')
        };

        let p1 = new Promise((resolve, reject) => {
            axios.get(API_URLS.auth + '/refresh', config)
            .then(response => {
                ServerResponseActions.receiveTokenRefreshSuccess(data);
                resolve();
            })
            .catch(error => {
                ServerResponseActions.receiveTokenRefreshError(error);
                AuthActions.userLogout();
                reject();
            });
        });

        return p1;
    }

};

export default WebAPIUtils;
