const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// POST route for registering a team
router.post('/register', async (req, res) => {
  const { teamName, captain, captainImageUrl, players } = req.body; // Removed playerImageUrls as it doesn't seem necessary

  // Validate input data
  if (!teamName || !captain || !players || players.length === 0) {
    return res.status(400).json({ message: 'Team name, captain, and at least one player are required.' });
  }

  if (players.length > 15) {
    return res.status(400).json({ message: 'A team can have a maximum of 15 players.' });
  }

  // Additional checks can be added here (e.g., checking player data)

  // Prepare the players with image URLs
  const playersWithImages = players.map((player, index) => ({
    ...player,
    imageUrl: player.imageUrl, // Assuming that player.imageUrl is already included in the request
  }));

  try {
    const newTeam = new Team({
      teamName,
      captain: {
        ...captain,
        imageUrl: captainImageUrl, // Save the captain's image URL
      },
      players: playersWithImages, // Include the players with their image URLs
    });

    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    console.error('Error saving team:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
