const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Define admin routes
router.get('/customers', adminController.getAllCustomers);
// ...other routes

module.exports = router;
