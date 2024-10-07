import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

// Cloudinary config
const cloud_name = "dswssapvb";  // Replace with your Cloudinary cloud name
const upload_preset = "cricket";  // Replace with your Cloudinary upload preset

// Cloudinary upload function
const uploadToCloudinary = async (file) => {
  if (!file) {
    console.error('No file provided for upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const fileData = await res.json();
    if (fileData.secure_url) {
      return fileData.secure_url;
    } else {
      throw new Error('Failed to upload image to Cloudinary');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

const RegistrationForm = () => {
  const [teamName, setTeamName] = useState('');
  const [leagueFormat, setLeagueFormat] = useState('');  // New state for league format
  const [captain, setCaptain] = useState({
    name: '',
    aadhaarNumber: '',
    mobileNumber: '',
    imageUrl: '',
  });
  const [players, setPlayers] = useState(Array(14).fill({ name: '', aadhaarNumber: '', mobileNumber: '', imageUrl: '' }));
  const [message, setMessage] = useState('');

  // State for image previews
  const [captainImagePreview, setCaptainImagePreview] = useState(null);
  const [playerImagePreviews, setPlayerImagePreviews] = useState(Array(14).fill(null));

  // Handle change for captain details
  const handleCaptainChange = (field, value) => {
    setCaptain({ ...captain, [field]: value });
  };

  // Handle change for each player
  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = players.map((player, i) =>
      i === index ? { ...player, [field]: value } : player
    );
    setPlayers(updatedPlayers);
  };

  // Handle image upload for captain and players
  const handleImageChange = async (e, isCaptain = false, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set image preview
    const previewUrl = URL.createObjectURL(file);
    if (isCaptain) {
      setCaptainImagePreview(previewUrl);
    } else {
      const updatedPreviews = [...playerImagePreviews];
      updatedPreviews[index] = previewUrl;
      setPlayerImagePreviews(updatedPreviews);
    }

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (isCaptain) {
        setCaptain({ ...captain, imageUrl });
      } else {
        const updatedPlayers = players.map((player, i) =>
          i === index ? { ...player, imageUrl } : player
        );
        setPlayers(updatedPlayers);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Captain and Players
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/;
    const mobileRegex = /^\d{10}$/;

    if (!aadhaarRegex.test(captain.aadhaarNumber) || !mobileRegex.test(captain.mobileNumber)) {
      setMessage('Invalid captain Aadhaar or mobile number format.');
      return;
    }

    for (let player of players) {
      if (!aadhaarRegex.test(player.aadhaarNumber) || !mobileRegex.test(player.mobileNumber)) {
        setMessage('Invalid player Aadhaar or mobile number format.');
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/team/register', {
        teamName,
        leagueFormat,  // Include league format in the submission
        captain,
        players,
      });

      setMessage(`Team registered successfully: ${response.data.teamName}`);
    } catch (error) {
      console.error('Error registering team:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="bg-orange-400 py-4 shadow-md">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <h1 className="text-2xl font-bold text-center md:text-left">Late Hukum Singh Thakur Memorial Cricket Tournament</h1>
    <nav className="mt-4 md:mt-0 space-x-6">
      <a href="/*" className="text-gray-800 text-lg hover:text-gray-900">Home</a>
      <a href="/regulations" className="text-gray-800 text-lg hover:text-gray-900">Rules and Regulations</a>
    </nav>
  </div>
</header>

      <div id="rules" className="max-w-3xl mx-auto mt-10 p-5 space-y-7 bg-orange-200 rounded-xl shadow-md">
      <p>Note: Please carefully go through the respective rules and regulations before applying for the particular league.</p>
      <p>नोट: कृपया संबंधित नियमों और दिशानिर्देशों को ध्यान से पढ़ें और उसके बाद ही विशेष लीग के लिए आवेदन करें।</p>
      </div>

      {/* Form layout */}
      {/* Form layout */}
<div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-12 lg:p-20 shadow-lg bg-white mt-12">
  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Team Registration</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Team Name:</label>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
        className="mt-1 block w-full p-2 border rounded-md"
      />
    </div>

    {/* League Format */}
    <div>
      <label className="block text-sm font-medium">League Format:</label>
      <select
        value={leagueFormat}
        onChange={(e) => setLeagueFormat(e.target.value)}
        required
        className="mt-1 block w-full p-2 border rounded-md"
      >
        <option value="" disabled>Select League Format</option>
        <option value="Departmental League">Departmental League</option>
        <option value="Corporate League">Corporate League</option>
        <option value="Open Club Level League">Open Club Level League</option>
        <option value="Women's League">Women's League</option>
      </select>
    </div>

    {/* Captain Section */}
    <h3 className="text-lg sm:text-xl font-semibold mt-6">Captain Details</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Captain Name:</label>
        <input
          type="text"
          value={captain.name}
          onChange={(e) => handleCaptainChange('name', e.target.value)}
          required
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Captain Aadhaar (Format: XXXX-XXXX-XXXX):</label>
        <input
          type="text"
          value={captain.aadhaarNumber}
          onChange={(e) => handleCaptainChange('aadhaarNumber', e.target.value)}
          required
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Captain Mobile (10 digits):</label>
        <input
          type="text"
          value={captain.mobileNumber}
          onChange={(e) => handleCaptainChange('mobileNumber', e.target.value)}
          required
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Upload Captain's Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, true)}
          required
          className="mt-1 block w-full p-2 border rounded-md"
        />
        {/* Display Captain Image Preview */}
        {captainImagePreview && (
          <img src={captainImagePreview} alt="Captain Preview" className="mt-2 h-24 w-24 sm:h-32 sm:w-32 object-cover" />
        )}
      </div>
    </div>

    {/* Players Section */}
<h3 className="text-xl font-semibold mt-6">Player Details</h3>
{players.map((player, index) => (
  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
    <h4 className="col-span-1 sm:col-span-2 text-lg font-semibold">Player {index + 1} Details</h4>
    
    <div className="col-span-1">
      <label className="block text-sm font-medium">Name:</label>
      <input
        type="text"
        value={player.name}
        onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
        required
        className="mt-1 block w-full p-2 border rounded-md"
      />
    </div>
    
    <div className="col-span-1">
      <label className="block text-sm font-medium">Aadhaar (Format: XXXX-XXXX-XXXX):</label>
      <input
        type="text"
        value={player.aadhaarNumber}
        onChange={(e) => handlePlayerChange(index, 'aadhaarNumber', e.target.value)}
        required
        className="mt-1 block w-full p-2 border rounded-md"
      />
    </div>
    
    <div className="col-span-1">
      <label className="block text-sm font-medium">Mobile (10 digits):</label>
      <input
        type="text"
        value={player.mobileNumber}
        onChange={(e) => handlePlayerChange(index, 'mobileNumber', e.target.value)}
        required
        className="mt-1 block w-full p-2 border rounded-md"
      />
    </div>
    
    <div className="col-span-1">
      <label className="block text-sm font-medium">Upload Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, false, index)}
        required
        className="mt-1 block w-full p-2 border rounded-md"
      />
      {/* Display Player Image Preview */}
      {playerImagePreviews[index] && (
        <img src={playerImagePreviews[index]} alt={`Player ${index + 1} Preview`} className="mt-2 h-32 w-32 object-cover" />
      )}
    </div>
  </div>
))}


    {/* Submit Button */}
    <div className='mt-4 flex'>
      <button type="submit" className="mt-2 px-8 sm:px-10 md:px-12 py-2 mx-auto text-md sm:text-lg bg-orange-500 text-white rounded-lg">
        Register Team
      </button>
    </div>
  </form>

        <div className='flex'>
          {message && <p className="mt-4 mx-auto text-green-600">{message}</p>}
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default RegistrationForm;
