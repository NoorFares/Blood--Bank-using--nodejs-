const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Routes
router.get('/', userController.view);
module.exports = router;
