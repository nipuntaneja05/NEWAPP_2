const express = require('express');
const { applyForRequest ,fetchApplicants } = require('../controllers/appliersController');

const router = express.Router();


// Route to apply for a request
router.post('/apply/:id', applyForRequest);

router.get('/applicants/:requestId',fetchApplicants);

module.exports = router;
