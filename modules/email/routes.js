const express = require('express');
const router = express.Router();
const controller =  require('./controller/email');
const validate = require('../auth/validator');

router.post('/reset-password/:email', controller.resetPassword);

module.exports =  router;