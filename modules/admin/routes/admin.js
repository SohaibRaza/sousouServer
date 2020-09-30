const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');
const authorize = require('../../../utils/authorize');

// GET ALL GROUPS
router.post('/groups/:pageNum', authorize, controller.getAllGroups);

// GET ALL USERS
router.post('/users/:pageNum', authorize, controller.getAllUsers);


module.exports = router;
