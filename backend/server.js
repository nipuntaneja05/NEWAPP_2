const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling CORS
const requestRoutes = require('./routes/requestRoutes'); // Import the request routes
const appliersRoutes = require('./routes/appliers');
const appliers=require('./models/Appliers');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/requestsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Use the request routes for API endpoints
app.use('/api/requests', requestRoutes);

app.use('/api/requests', appliersRoutes); // Use the route for applying

// Fetch applicants for a specific request
// Assuming you have a Request model and Applicant model

// Fetch applicants for a specific request
// app.get('/api/requests/applicants/:requestId', async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     console.log("Fetching applicants for requestId:", requestId); // Log requestId

//     const appliers = await Appliers.findOne({ requestId });


//     if (!appliers) {
//       console.log("No applicants found");
//       return res.status(404).json({ message: 'No applicants found for this request.' });
//     }

//     console.log("Applicants found:", appliers.appliedEmails);
//     res.json(appliers.appliedEmails); // Return list of emails
//   } catch (err) {
//     console.error('Error fetching applicants:', err);
//     res.status(500).json({ message: 'Failed to fetch applicants' });
//   }
// });





// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
