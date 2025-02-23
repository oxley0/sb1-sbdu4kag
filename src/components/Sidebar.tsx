import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PlayCircle } from 'lucide-react';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 p-6">
      <div className="flex items-center space-x-2 mb-8">
        <PlayCircle className="w-8 h-8 text-blue-500" />
        <span className="text-xl font-bold text-white">AnimeStream</span>
      </div>
      
      <nav>
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg p-3 transition duration-200"
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;