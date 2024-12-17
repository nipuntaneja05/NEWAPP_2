const express = require('express');
const { applyForRequest } = require('../controllers/appliersController');

const router = express.Router();

// Route to apply for a request
router.post('/apply/:id', applyForRequest);

module.exports = router;
