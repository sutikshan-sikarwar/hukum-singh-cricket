

// module.exports = router;
const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// POST route for registering a team
router.post('/register', async (req, res) => {
  const { teamName, captain, players, leagueFormat } = req.body;

  // Validate required fields
  if (!teamName || !captain || !players || players.length === 0) {
    return res.status(400).json({ message: 'Team name, captain, and at least one player are required.' });
  }

  if (!leagueFormat || !['Departmental League', 'Corporate League', 'Open Club Level League', 'Women\'s League'].includes(leagueFormat)) {
    return res.status(400).json({ message: 'Invalid league format. Allowed formats are Departmental League, Corporate League, Open Club Level League, and Women\'s League.' });
  }

  if (players.length > 15) {
    return res.status(400).json({ message: 'A team can have a maximum of 15 players.' });
  }

  // Ensure that the captain has an image URL
  if (!captain.imageUrl) {
    return res.status(400).json({ message: 'Captain image URL is required.' });
  }

  // Ensure that all players have image URLs
  const playersWithImages = players.map((player) => ({
    ...player,
    imageUrl: player.imageUrl,
  }));

  try {
    // Create a new team document with the league format
    const newTeam = new Team({
      teamName,
      captain,
      players: playersWithImages,
      leagueFormat  // Add the league format to the team object
    });

    // Save the team to the database
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    console.error('Error saving team:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch all teams or filter by league format
router.get('/allteams', async (req, res) => {
  const { leagueFormat } = req.query;  // Extract the league format from query parameters
  
  try {
    // If a leagueFormat is provided, filter teams by that format
    let query = {};
    if (leagueFormat) {
      query.leagueFormat = leagueFormat;
    }

    const teams = await Team.find(query);  // Fetch all teams or teams filtered by league format
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Server error while fetching teams' });
  }
});

// GET route to fetch the total number of registered teams (forms submitted)
router.get('/totalforms', async (req, res) => {
  const { leagueFormat } = req.query;  // Extract the league format from query parameters

  try {
    // If a leagueFormat is provided, filter teams by that format
    let query = {};
    if (leagueFormat) {
      query.leagueFormat = leagueFormat;
    }

    // Count the total number of teams or teams filtered by league format
    const totalForms = await Team.countDocuments(query);
    res.status(200).json({ totalForms });
  } catch (error) {
    console.error('Error fetching total forms count:', error);
    res.status(500).json({ message: 'Server error while fetching total forms count' });
  }
});

// GET route for fetching team details by ID
router.get('/:id', async (req, res) => {
  const teamId = req.params.id;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/league/:leagueFormat', async (req, res) => {
  const leagueFormat = req.params.leagueFormat;

  try {
    // Fetch teams that match the specified league format
    const teams = await Team.find({ leagueFormat });

    if (teams.length === 0) {
      return res.status(404).json({ message: 'No teams found for this league format' });
    }

    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams by league format:', error);
    res.status(500).json({ message: 'Server error while fetching teams by league format' });
  }
});


// GET route for fetching team details by team name
router.get('/name/:teamName', async (req, res) => {
  const teamName = req.params.teamName;

  try {
    const team = await Team.findOne({ teamName });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
