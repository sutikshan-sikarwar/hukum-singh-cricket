import React, { useState } from 'react';
import axios from 'axios';

// Cloudinary config
const cloud_name = "dkjqtitcy";  // Replace with your Cloudinary cloud name
const upload_preset = "blackhole";  // Replace with your Cloudinary upload preset

// Cloudinary upload function
const uploadToCloudinary = async (file, fileType = 'image') => {
  if (!file) {
    console.error('No file provided for upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);  // Cloudinary upload preset

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
      method: 'POST',
      body: formData,
    });

    const fileData = await res.json();
    if (fileData.secure_url) {
      return fileData.secure_url;  // Return the secure URL of the uploaded image
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
  const [captain, setCaptain] = useState({
    name: '',
    aadhaarNumber: '',
    mobileNumber: '',
  });
  const [captainImageUrl, setCaptainImageUrl] = useState('');
  const [player, setPlayer] = useState({
    name: '',
    aadhaarNumber: '',
    mobileNumber: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');

  const handlePlayerChange = (field, value) => {
    setPlayer({ ...player, [field]: value });
  };

  const handleImageChange = async (e, isCaptain = false) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (isCaptain) {
        setCaptainImageUrl(imageUrl);
      } else {
        setPlayer({ ...player, imageUrl });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate captain details
    if (!captain.name || !captain.aadhaarNumber || !captain.mobileNumber) {
      setMessage('All captain fields are required.');
      return;
    }

    // Validate player details
    if (!player.name || !player.aadhaarNumber || !player.mobileNumber) {
      setMessage('All player fields are required.');
      return;
    }

    // Validate Aadhaar and mobile number formats
    const aadhaarRegex = /^\d{4}-\d{4}-\d{4}$/; // Format: 1234-5678-9101
    const mobileRegex = /^\d{10}$/; // Format: 9876543210

    if (!aadhaarRegex.test(captain.aadhaarNumber) || !aadhaarRegex.test(player.aadhaarNumber)) {
      setMessage('Aadhaar number must be in the format: XXXX-XXXX-XXXX.');
      return;
    }

    if (!mobileRegex.test(captain.mobileNumber) || !mobileRegex.test(player.mobileNumber)) {
      setMessage('Mobile number must be a 10-digit number without any spaces or special characters.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/team/register', {
        teamName,
        captain,
        captainImageUrl,
        players: [player], // Wrap player in an array
      });

      setMessage(`Team registered successfully: ${response.data.teamName}`);
    } catch (error) {
      console.error('Error registering team:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h2>Team Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>

        <h3>Captain Details</h3>
        <div>
          <label>Captain Name:</label>
          <input
            type="text"
            value={captain.name}
            onChange={(e) => setCaptain({ ...captain, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Captain Aadhaar Number (Format: XXXX-XXXX-XXXX):</label>
          <input
            type="text"
            value={captain.aadhaarNumber}
            onChange={(e) =>
              setCaptain({ ...captain, aadhaarNumber: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Captain Mobile Number (Format: 10-digit number):</label>
          <input
            type="text"
            value={captain.mobileNumber}
            onChange={(e) =>
              setCaptain({ ...captain, mobileNumber: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Upload Captain's Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, true)}
            required
          />
        </div>

        <h3>Player Details</h3>
        <div>
          <label>Player Name:</label>
          <input
            type="text"
            value={player.name}
            onChange={(e) => handlePlayerChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Player Aadhaar Number (Format: XXXX-XXXX-XXXX):</label>
          <input
            type="text"
            value={player.aadhaarNumber}
            onChange={(e) => handlePlayerChange('aadhaarNumber', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Player Mobile Number (Format: 10-digit number):</label>
          <input
            type="text"
            value={player.mobileNumber}
            onChange={(e) => handlePlayerChange('mobileNumber', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Player's Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            required
          />
        </div>

        <button type="submit">Register Team</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
