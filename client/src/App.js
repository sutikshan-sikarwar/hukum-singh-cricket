import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/Homepage';
import Regulations from './components/Regulations';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/AdminLogin';
import TeamDetails from './components/TeamDetails';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/*" element={<HomePage/>} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/regulations" element={<Regulations />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/adminlogin" element={<LoginPage />} />
          <Route path="/team/:teamId" element={<TeamDetails />} />
        </Routes>
      </div>
    </Router>
    // <AdminPanel/>
    
  );
}

export default App;
