import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UserDetailsPage from './pages/UserDetailsPage';
import PersonDetails from './pages/PersonDetails';
import SongVibeSelector from './pages/SongVibeSelector';
import Input1 from './pages/Input1';
import LyricsGenerator from './pages/LyricsGenerator';
import CreateSong from './pages/CreateSong';

import './App.css';

function App() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: 'url(/assets/BG.jpg)' }}
    >
      <div className="min-h-screen bg-black bg-opacity-40">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user-details" element={<UserDetailsPage />} />
            <Route path="/person-details" element={<PersonDetails />} />
            <Route path="/song-vibe" element={<SongVibeSelector />} />
            <Route path="/input1" element={<Input1/>} />
            <Route path="/lyrics-generator" element={<LyricsGenerator />} />
            <Route path="/create-song" element={<CreateSong />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;