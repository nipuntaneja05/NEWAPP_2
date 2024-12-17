const express = require('express');
const router = express.Router();
const { createRequest, getRequests } = require('../controllers/requestController');
const Request = require('../models/Request'); // Import the Request model
// const verifyToken = require('../middleware/verifytoken');
 // Import the token verification middleware

// Route to create a new request
router.post('/',  createRequest); // Use verifyToken middleware to check user authorization

router.get('/get', getRequests);
router.delete('/:id', async (req, res) => {
  try {
    const { email } = req.body; // Get email from request body
    const { id } = req.params; // Get request ID

    const request = await Request.findOneAndDelete({ _id: id, email });

    if (!request) {
      return res.status(404).json({ message: 'Request not found or unauthorized' });
    }

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error });
  }
});


module.exports = router;
