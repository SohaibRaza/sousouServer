const express = require('express');
const router = express.Router();
const controller =  require('../controller/group');
const validate = require('../../auth/validator');
const checkMembership = require('../middlewares/checkMembership')

//router.get('/', controller.create);
router.post('/create', validate, controller.create);

router.get('/get/:id', validate, controller.get_groups );

router.get('/get-group/:id', validate, controller.get_group );

router.get('/joingroup/:userID/:groupID', controller.join_group);

router.post('/testpayment/:groupID/:userID', validate, controller.test_payment);

module.exports =  router;