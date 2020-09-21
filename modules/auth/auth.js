const router = require('express').Router();
const UsersModel = require('../users/model/users');
const passwordHashing = require('bcrypt');
const jwt = require('jsonwebtoken');
const controller = require('./authController');

// Registration Route
router.post('/register', controller.register);

// Login Route
router.post('/login', controller.login);

module.exports =  router;
