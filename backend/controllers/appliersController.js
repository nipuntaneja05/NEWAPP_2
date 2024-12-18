const mongoose = require('mongoose');
const Appliers = require('../models/Appliers');
const fetchApplicants = async (req, res) => {
    try {
      const { requestId } = req.params;
  
      // Validate if the requestId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({ error: "Invalid requestId format" });
      }
  
      // Correct way to instantiate ObjectId
      const requestObjectId = new mongoose.Types.ObjectId(requestId);
  
      // Fetch the applicants for the given requestId
      const applicants = await Appliers.findOne({ requestId: requestObjectId });
  
      if (!applicants) {
        return res.status(404).json({ message: "No applicants found for the given requestId" });
      }
  
      // Return only the appliedEmails as an array of objects
      res.status(200).json(applicants.appliedEmails.map(email => ({ email })));
    } catch (error) {
      console.error("Error fetching applicants:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// Controller to handle applying to a request
const applyForRequest = async (req, res) => {
  const {email} = req.body; // User's email from the request body
  const {id: requestId} = req.params; // Request ID from URL parameters

  try {
    // Check if email is provided
    if (!email) {
      return res.status(400).json({message: 'Email is required'});
    }

    // Check if Appliers document exists for the request
    let appliers = await Appliers.findOne({requestId});

    if (!appliers) {
      // If no document exists, create one with the email
      appliers = new Appliers({requestId, appliedEmails: [email]});
    } else {
      // If document exists, check for duplicate email
      if (appliers.appliedEmails.includes(email)) {
        return res
          .status(400)
          .json({message: 'You have already applied for this request.'});
      }
      // Add email to the list
      appliers.appliedEmails.push(email);
    }

    // Save changes
    await appliers.save();
    res.status(200).json({message: 'Successfully applied for the request.'});
  } catch (error) {
    console.error('Error applying for request:', error);
    res.status(500).json({message: 'Failed to apply for the request.'});
  }
};

module.exports = {applyForRequest, fetchApplicants};
