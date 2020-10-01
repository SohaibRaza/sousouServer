const express = require('express');
const router = express.Router();
const controller =  require('../controller/group');
const validate = require('../../auth/validator');

//router.get('/', controller.create);
router.post('/create', validate, controller.create);

router.get('/get/:id', validate, controller.get_groups );

router.post('/get-group/:id', validate, controller.get_group );

router.post('/joingroup/:userID/:groupID', controller.join_group);

router.post('/testpayment/:groupID', validate, controller.test_payment);

router.post('/update/:groupID', validate, controller.update)

module.exports =  router;