const mongoose = require('mongoose');

const appliersSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' }, // Reference to the Request
  appliedEmails: [String], // Array to store applicant emails
});

const Appliers = mongoose.model('Appliers', appliersSchema);

module.exports = Appliers;
