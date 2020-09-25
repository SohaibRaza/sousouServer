const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');
const validate = require('../../auth/validator');

// GET ALL GROUPS
router.get('/groups/:pageNum', validate, controller.getAllGroups);

// GET ALL USERS
router.get('/users/:pageNum', validate, controller.getAllUsers);


module.exports = router;
