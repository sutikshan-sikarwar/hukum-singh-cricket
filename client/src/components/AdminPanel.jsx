import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Dashboard = () => {
  const [teams, setTeams] = useState([]);
  const [totalForms, setTotalForms] = useState(0);
  const [selectedLeagueFormat, setSelectedLeagueFormat] = useState("Departmental League"); // New state for league format
  const [selectedTeam, setSelectedTeam] = useState(null); // New state for selected team
  const navigate = useNavigate();

  // Placeholder image for players/captain if their image fails to load
  const placeholderImage = "https://via.placeholder.com/150";
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove from localStorage
    sessionStorage.removeItem('token'); // Remove from sessionStorage
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `https://hukum-singh-cricket.onrender.com/api/team/league/${selectedLeagueFormat}` // Update to fetch by league format
        );
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [selectedLeagueFormat]); // Depend on selectedLeagueFormat

  // Fetch the total number of forms (teams)
  useEffect(() => {
    const fetchTotalForms = async () => {
      try {
        const response = await axios.get(
          "https://hukum-singh-cricket.onrender.com/api/team/totalforms"
        ); // Adjust with your total forms API endpoint
        setTotalForms(response.data.totalForms);
      } catch (error) {
        console.error("Error fetching total forms:", error);
      }
    };

    fetchTotalForms();
  }, []);

  // Utility function to convert image URL to base64
  const convertImageToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = () => {
        console.warn(`Failed to load image from ${url}, using placeholder.`);
        resolve(placeholderImage); // Use placeholder image in case of an error
      };
      img.src = url;
    });
  };

  // Function to check if base64 data is valid
  const isValidBase64 = (base64String) => {
    return /^data:image\/(png|jpeg|jpg);base64,/.test(base64String);
  };

  // Function to generate PDF for a specific team with pagination
  const generatePDF = async (team) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height; // Get page height
    let yOffset = 20; // Initial Y offset

    const addPageIfNeeded = (yPos) => {
      if (yPos >= pageHeight - 30) { // Leave margin at bottom
        doc.addPage();
        yOffset = 20; // Reset Y offset for new page
      }
    };

    // Adding title
    doc.setFontSize(22);
    doc.text(team.teamName, 20, yOffset);
    yOffset += 10;

    // Adding captain information
    doc.setFontSize(16);
    doc.text("Captain Details (Player 1)", 20, yOffset);
    yOffset += 10;

    // Fetch and add captain's image
    const captainImage = await convertImageToBase64(team.captain.imageUrl);
    if (isValidBase64(captainImage)) {
      doc.addImage(captainImage, "PNG", 150, yOffset - 5, 40, 40);
    } else {
      console.warn("Invalid base64 image data for captain.");
    }

    // Adding captain details
    doc.setFontSize(12);
    doc.text(`Name: ${team.captain.name}`, 20, yOffset + 10);
    doc.text(`Aadhaar: ${team.captain.aadhaarNumber}`, 20, yOffset + 20);
    doc.text(`Mobile: ${team.captain.mobileNumber}`, 20, yOffset + 30);
    yOffset += 50;

    addPageIfNeeded(yOffset); // Check if we need to add a new page

    // Adding players information
    doc.setFontSize(16);
    doc.text("Players Details", 20, yOffset);
    yOffset += 10;

    for (let i = 0; i < team.players.length; i++) {
      const player = team.players[i];

      // Player title
      doc.setFontSize(14);
      doc.text(`Player ${i + 2}:`, 20, yOffset);

      // Fetch and add player's image
      const playerImage = await convertImageToBase64(player.imageUrl);
      if (isValidBase64(playerImage)) {
        doc.addImage(playerImage, "PNG", 150, yOffset - 5, 40, 40);
      } else {
        console.warn(`Invalid base64 image data for player ${player.name}`);
      }

      // Adding player details
      doc.setFontSize(12);
      doc.text(`Name: ${player.name}`, 20, yOffset + 10);
      doc.text(`Aadhaar: ${player.aadhaarNumber}`, 20, yOffset + 20);
      doc.text(`Mobile: ${player.mobileNumber}`, 20, yOffset + 30);

      yOffset += 50; // Move down for the next player

      addPageIfNeeded(yOffset); // Check if we need to add a new page
    }

    // Save the PDF
    doc.save(`${team.teamName}-details.pdf`);
  };

  // Function to generate individual PDFs for all teams
  const generateAllPDFs = () => {
    teams.forEach((team) => {
      generatePDF(team);
    });
  };

  // Function to view team details
  const viewTeamDetails = (team) => {
    setSelectedTeam(team); // Set selected team to state
  };

  // Function to close team details view
  const closeTeamDetails = () => {
    setSelectedTeam(null); // Reset selected team to null
  };

  // Handle click outside to close modal
  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeTeamDetails();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="container flex justify-between items-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Admin Panel
          </div>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
  
      {/* Main Dashboard Content */}
      <main className="container mx-auto p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-semibold mb-6">
          Dashboard
        </h1>
        <div className="mb-4">
          <label className="mr-2 font-medium">Select League Format:</label>
          <select
            value={selectedLeagueFormat}
            onChange={(e) => setSelectedLeagueFormat(e.target.value)}
            className="border rounded p-2"
          >
            <option value="Departmental League">Departmental League</option>
            <option value="Corporate League">Corporate League</option>
            <option value="Open Club Level League">Open Club Level League</option>
            <option value="Women's League">Women's League</option>
          </select>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Total Forms Submitted */}
  
          {/* Download All Button */}
          <div className="flex flex-col md:flex-row items-center p-2 mb-10">
            <h3 className="text-md sm:text-lg px-2 my-auto font-medium">
              Download all the forms in PDF format
            </h3>
            <button
              className="bg-black w-8/12 text-lg sm:text-xl my-1 md:my-0 mx-auto text-white py-2 rounded-xl"
              onClick={generateAllPDFs}
            >
              Download All
            </button>
          </div>
        </div>
  
        {/* Display fetched teams */}
        {teams.length > 0 ? (
          teams.map((team) => (
            <div
              key={team._id}
              className="bg-white p-4 sm:p-6 w-full mb-4 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between"
            >
              <div className="flex-col space-y-2 flex">
                <h3 className="text-2xl sm:text-3xl font-semibold">
                  {team.teamName}
                </h3>
                <p className="text-sm sm:text-lg text-gray-600">
                  Captain:{" "}
                  <span className="text-lg sm:text-2xl font-medium">
                    {team.captain.name}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2 sm:space-x-3 my-auto">
                <button
                  className="bg-black text-white text-md sm:text-lg py-2 px-3 sm:px-4 rounded-full"
                  onClick={() => viewTeamDetails(team)}
                >
                  View
                </button>
                <button
                  className="text-black hover:bg-gray-200 border-2 border-black text-md sm:text-lg py-2 px-3 sm:px-4 rounded-full"
                  onClick={() => generatePDF(team)}
                >
                  Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No teams found</p>
        )}
      </main>
  
      {/* Team Details Modal */}
      {selectedTeam && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-lg p-6 max-w-md sm:max-w-lg w-full h-[90vh] overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              {selectedTeam.teamName}
            </h2>
            <h3 className="text-md sm:text-lg font-medium mb-2">Captain Details:</h3>
            <div className="flex mb-4">
              <img
                src={selectedTeam.captain.imageUrl}
                onError={(e) => (e.target.src = placeholderImage)} // Fallback image
                alt="Captain"
                className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mr-4"
              />
              <div>
                <p>Name: {selectedTeam.captain.name}</p>
                <p>Aadhaar: {selectedTeam.captain.aadhaarNumber}</p>
                <p>Mobile: {selectedTeam.captain.mobileNumber}</p>
              </div>
            </div>
            <h3 className="text-md sm:text-lg font-medium mb-2">Players Details:</h3>
            <div className="overflow-y-auto h-[60vh]">
              {selectedTeam.players.map((player, index) => (
                <div key={index} className="flex mb-4">
                  <img
                    src={player.imageUrl}
                    onError={(e) => (e.target.src = placeholderImage)} // Fallback image
                    alt={`Player ${index + 2}`}
                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mr-6"
                  />
                  <div className="mb-4">
                    <p>Name: {player.name}</p>
                    <p>Aadhaar: {player.aadhaarNumber}</p>
                    <p>Mobile: {player.mobileNumber}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full"
              onClick={closeTeamDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
  
      <Footer />
    </div>
  );
  
  
};

export default Dashboard;
