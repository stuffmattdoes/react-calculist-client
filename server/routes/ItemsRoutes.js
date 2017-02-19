// Item routes

const express = require('express');
const ItemController = require('../controllers/ItemsController');
const AuthenticationController = require('../controllers/AuthController');
const ItemRoutes = new express.Router();

ItemRoutes.use('/items', ItemRoutes);

// Get all items
// apiRoutes.get('/items', ItemController.getItems);
ItemRoutes.get('/', AuthenticationController.authorizeUser, ItemController.getItems);

// Get all items for this list
// itemRoutes.get('/:listID', ItemController.getItemsForList);

// Create a new item
// itemRoutes.post('/:listID/:itemID', ItemController.createItem);
ItemRoutes.post('/:itemID', AuthenticationController.authorizeUser, ItemController.createItem);

// Update an existing item
ItemRoutes.put('/:itemID', AuthenticationController.authorizeUser, ItemController.updateItem);

// Delete an existing item
ItemRoutes.delete('/:itemID', AuthenticationController.authorizeUser, ItemController.deleteItem);

module.exports = ItemRoutes;