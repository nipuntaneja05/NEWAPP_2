const Request = require('../models/Request');

// Controller function to create a new request
exports.createRequest = async (req, res) => {
  const { title, description, category, radius, waitTime, region } = req.body; // Destructure all fields

  const userId = req.user.id; 
  try {
    // Create a new request with all parameters
    const newRequest = new Request({
      title,
      description,
      category,
      radius,
      waitTime,
      region,
      userId,
    });

    // Save the request to the database
    await newRequest.save();

    // Respond with a success message and the created request
    res.status(201).json({ message: 'Request saved successfully', newRequest });
  } catch (error) {
    // Catch any error and send a response with an error message
    res.status(500).json({ message: 'Error saving request', error });
  }
};

exports.getRequests = async (req, res) => {
    try {
      const requests = await Request.find(); // Retrieve all requests from the database
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching requests', error });
    }
  };
