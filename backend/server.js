const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling CORS
const requestRoutes = require('./routes/requestRoutes'); // Import the request routes
const appliersRoutes = require('./routes/appliers');

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
