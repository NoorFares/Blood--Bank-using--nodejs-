const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Routes
router.get('/', userController.view);
router.post('/', userController.find);

module.exports = router;
