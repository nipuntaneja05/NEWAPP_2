const Request = require('../models/Request');

// Controller function to create a new request
exports.createRequest = async (req, res) => {
  const { title, description, category, radius, waitTime, region ,email} = req.body; // Destructure all fields

  // For now, we'll set userId as a dummy value (you can change this later based on your requirement)
  const userId = 'dummyUserId'; 

  // Validate region fields
  if (!region.latitude || !region.longitude || !region.latitudeDelta || !region.longitudeDelta) {
    return res.status(400).json({ message: 'Invalid region data' });
  }

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
      email,// Dummy userId (replace it with real user data later if needed)
    });

    // Save the request to the database
    await newRequest.save();

    // Respond with a success message and the created request
    res.status(201).json({ message: 'Request saved successfully', newRequest });
  } catch (error) {
    // Catch any error and send a response with an error message
    res.status(500).json({ message: 'Error saving request', error: error.message });
  }
};

// Controller function to get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find(); // Retrieve all requests from the database
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};
