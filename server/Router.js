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

// const 	REQUIRE_ADMIN = 'Admin',
// 		REQUIRE_OWNER = 'Owner',
// 		REQUIRE_CLIENT = 'Client',
// 		REQUIRE_MEMBER = 'Member';

const Router = app => {
	const 	apiRoutes = express.Router(),
			API_VERSION = 1.0,
			authRoutes = express.Router(),
			listRoutes = express.Router(),
			itemRoutes = express.Router();

	// Set URL for API group routes
	// domain.com/api/ 
	app.use('/api/', apiRoutes);


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
	listRoutes.get('/lists', requireAuth, ListController.getLists);

	// Create a new list
	listRoutes.post('/lists', requireAuth, ListController.createList);

	// Update existing list
	listRoutes.put('/lists/:id', requireAuth, ListController.updateList);

	// Remove existing list
	listRoutes.delete('/lists/:id', requireAuth, ListController.deleteList);


	// ==================================================
	// Items Route
	// ==================================================

	itemRoutes.use('/lists/:id', itemRoutes);

	// Get all items for this list
	itemRoutes.get('/lists/:id', requireAuth, ItemController.getItems);

	// Create a new item
	itemRoutes.post('/items/', requireAuth, ItemController.createItem);

	// Update an existing item
	itemRoutes.put('/items/:id', requireAuth, ItemController.updateItem);

	// Delete an existing item
	itemRoutes.delete('/items/:id', requireAuth, ItemController.deleteItem);

}

module.exports = Router;