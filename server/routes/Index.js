// Modules and stuff
const express = require('express');
const AuthenticationController = require('../controllers/AuthController');
const ItemController = require('../controllers/ItemsController');
const ListController = require('../controllers/ListsController');


const 	APIRoutes = new express.Router(),
    	apiVersion = 'v1.0',
    	authRoutes = new express.Router(),
    	listRoutes = new express.Router(),
    	itemRoutes = new express.Router();

function requireAuth(req, res, next) {
	console.log('Authorization required');
	return next();
}

// ==================================================
// Auth Route
// ==================================================

// Set auth routes as subgroup/middleware to apiRoutes
APIRoutes.use('/auth', authRoutes);

// Registration route
authRoutes.post('/register', AuthenticationController.register);

// Login route
authRoutes.post('/login', AuthenticationController.login);

// Refresh route
authRoutes.get('/refresh', AuthenticationController.refreshToken);


// ==================================================
// Lists Route
// ==================================================

APIRoutes.use('/lists', listRoutes);

// Get all lists
// /lists
listRoutes.get('/', ListController.getLists);

// Create a new list
// /lists/asdvm3t
listRoutes.post('/:listID', requireAuth, ListController.createList);
// listRoutes.post('/:listID', ListController.createList);

// Update existing list
// /lists/asdvm3t
listRoutes.put('/:listID', requireAuth, ListController.updateList);

// Remove existing list
// /lists/asdvm3t
listRoutes.delete('/:listID', requireAuth, ListController.deleteList);


// ==================================================
// Items Route
// ==================================================

// apiRoutes.use('/lists', itemRoutes);
APIRoutes.use('/items', itemRoutes);

// Get all items
// apiRoutes.get('/items', ItemController.getItems);
itemRoutes.get('/', ItemController.getItems);

// Get all items for this list
// itemRoutes.get('/:listID', ItemController.getItemsForList);

// Create a new item
// itemRoutes.post('/:listID/:itemID', ItemController.createItem);
itemRoutes.post('/:itemID', requireAuth, ItemController.createItem);

// Update an existing item
itemRoutes.put('/:itemID', requireAuth, ItemController.updateItem);

// Delete an existing item
itemRoutes.delete('/:itemID', requireAuth, ItemController.deleteItem);

module.exports = APIRoutes;