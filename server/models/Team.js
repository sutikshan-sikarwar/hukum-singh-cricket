const mongoose = require('mongoose');

// Schema for individual players with optional fields
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,  // Player name is optional
  },
  aadhaarNumber: {
    type: String,
    required: false,  // Aadhaar number is optional
  },
  mobileNumber: {
    type: String,
    required: false,  // Mobile number is optional
  },
  imageUrl: {
    type: String,
    required: false,  // Image URL is optional
  },
});

// Schema for the team, including the captain and player details
const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,  // Team name is required
  },
  leagueFormat: {
    type: String,
    enum: ['Departmental League', 'Corporate League', 'Open Club Level League', 'Women\'s League'],
    required: true
  },
  captain: {
    name: {
      type: String,
      required: true,  // Captain's name is required
    },
    aadhaarNumber: {
      type: String,
      required: true,  // Captain's Aadhaar number is required
    },
    mobileNumber: {
      type: String,
      required: true,  // Captain's mobile number is required
    },
    imageUrl: {
      type: String,
      required: false,  // Store the Cloudinary URL for the captain's image, optional
    },
  },
  players: {
    type: [PlayerSchema],
    validate: {
      validator: function (v) {
        return v.length <= 15;  // Validate that the number of players is <= 15
      },
      message: 'A team can have a maximum of 15 players.',
    },
    default: [],  // Default to an empty array
  },
});

// Export the team model
module.exports = mongoose.model('Team', TeamSchema);
