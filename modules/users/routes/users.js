const express = require('express');
const router = express.Router();
const controller =  require('../controller/usersController');
const validate = require('../../auth/validator');

	// Add user route
router.post('/', controller.add);

	// Find user route
router.get('/find-user/:id', validate, controller.find);

	// Delete user route
router.delete('/delete-user/:id', validate, controller.delete);

router.get('/referral/:userID/:groupID', controller.generateGroupReferral);

router.post('/update/:userID', validate, controller.update)


module.exports =  router;
