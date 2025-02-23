import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/watch/:episode" element={<VideoPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;