const 	AuthenticationController = require('./controllers/AuthController'),
		express = require('express'),
		ItemController = require('./controllers/ItemsController'),
		ListController = require('./controllers/ListsController'),
		passPortService = require('./Passport'),
		passport = require('passport');

const requireAuth = passport.authenticate('jwt', {
	session: false
});

const requireLogin = passport.authenticate('local', {
	session: false
});

const Routes = app => {

	const 	apiRoutes = express.Router(),
			API_VERSION = 'v1.0',
			authRoutes = express.Router(),
			listRoutes = express.Router(),
			itemRoutes = express.Router();

	// Set URL for API group routes
	// domain.com/api/ 
	app.use('/api', apiRoutes);


	// ==================================================
	// Auth Route
	// ==================================================

	// Set auth routes as subgroup/middleware to apiRoutes
	apiRoutes.use('/auth', authRoutes);

	// Registration route
	authRoutes.post('/register', AuthenticationController.register);

	// Login route
	authRoutes.post('/login', requireLogin, AuthenticationController.login);
	

	// ==================================================
	// Lists Route
	// ==================================================

	apiRoutes.use('/lists', listRoutes);
		
	// Get all lists
	// /lists
	listRoutes.get('/', ListController.getLists);

	// Create a new list
	// /lists/asdvm3t
	// listRoutes.post('/lists', requireAuth, ListController.createList);
	listRoutes.post('/:listID', ListController.createList);

	// Update existing list
	// /lists/asdvm3t
	listRoutes.put('/:listID', ListController.updateList);

	// Remove existing list
	// /lists/asdvm3t
	listRoutes.delete('/:listID', ListController.deleteList);


	// ==================================================
	// Items Route
	// ==================================================

	// apiRoutes.use('/lists', itemRoutes);
	apiRoutes.use('/items', itemRoutes);

	// Get all items
	// apiRoutes.get('/items', ItemController.getItems);
	itemRoutes.get('/', ItemController.getItems);

	// Get all items for this list
	// itemRoutes.get('/:listID', ItemController.getItemsForList);

	// Create a new item
	// itemRoutes.post('/:listID/:itemID', ItemController.createItem);
	itemRoutes.post('/:itemID', ItemController.createItem);

	// Update an existing item
	itemRoutes.put('/:itemID', ItemController.updateItem);

	// Delete an existing item
	itemRoutes.delete('/:itemID', ItemController.deleteItem);

}

module.exports = Routes;