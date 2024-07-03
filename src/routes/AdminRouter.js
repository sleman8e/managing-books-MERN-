const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminControllers');


router.post('/', AdminController.createAdmin);

router.get('/', AdminController.getAllAdmin);

// Route for updating a password  by ID
module.exports = router;