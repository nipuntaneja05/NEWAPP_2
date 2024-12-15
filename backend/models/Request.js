const mongoose = require('mongoose');

// Define the schema for the request
const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'Others' },
  radius: { type: Number, default: 200 },
  waitTime: { type: String, default: '15 mins' },
  region: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitudeDelta: { type: Number, required: true },
    longitudeDelta: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  email: { type: String, required: true },

});

// Create the model
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
