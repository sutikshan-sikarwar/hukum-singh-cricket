import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamDetails = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);

  // Fetch team details based on teamId
  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/team/${teamId}`); // Adjust with your API endpoint
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  if (!team) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">{team.teamName} - Team Details</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-medium mb-4">Captain</h2>
        <p>Name: {team.captain.name}</p>
        <p>Aadhaar: {team.captain.aadhaarNumber}</p>
        <p>Mobile: {team.captain.mobileNumber}</p>

        <h2 className="text-2xl font-medium mt-6 mb-4">Players</h2>
        <ul>
          {team.players.map((player, index) => (
            <li key={index} className="mb-2">
              <p>Name: {player.name}</p>
              <p>Aadhaar: {player.aadhaarNumber}</p>
              <p>Mobile: {player.mobileNumber}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDetails;
