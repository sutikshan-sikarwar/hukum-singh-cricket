import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/admin'); // Redirect to admin route if logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://hukum-singh-cricket.onrender.com/api/auth/login', {
        email,
        password,
      });

      // Handle successful login (e.g., save the token, redirect)
      console.log('Login successful:', response.data);
      
      // Save the token based on rememberMe status
      if (rememberMe) {
        localStorage.setItem('token', response.data.token);
      } else {
        sessionStorage.setItem('token', response.data.token);
      }

      // Redirect to the admin route
      navigate('/admin');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server error, please try again.');
      }
      console.error('Login error:', error);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token'); // Remove from localStorage
  //   sessionStorage.removeItem('token'); // Remove from sessionStorage
  //   setEmail(''); // Clear email
  //   setPassword(''); // Clear password
  //   navigate('/'); // Redirect to login page or home
  // };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2">
        <img src="/banner.png" alt="Login" className="h-screen w-full" />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="bg-white px-6 sm:px-10 md:px-12 lg:px-20 py-16 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">Log in to your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-base font-medium">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-base font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 mt-5 bg-orange-500 text-white rounded-full hover:bg-orange-700 transition duration-200"
            >
              Sign in
            </button>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}
          </form>

          {/* Logout Button */}
          {/* <button
            className="mt-4 w-full p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
