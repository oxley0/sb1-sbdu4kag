import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const animeData = {
  title: "Demon Slayer",
  description: "A young man fights demons to save his sister and avenge his family.",
  episodes: 5,
  thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
  rating: "4.8",
  genre: ["Action", "Fantasy", "Adventure"]
};

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Anime Dashboard</h1>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={animeData.thumbnail} 
              alt={animeData.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="p-8 md:w-2/3">
            <h2 className="text-3xl font-bold text-white mb-4">{animeData.title}</h2>
            <p className="text-gray-300 mb-4">{animeData.description}</p>
            <div className="mb-6">
              <span className="text-yellow-400 text-lg">★ {animeData.rating}</span>
              <div className="mt-2">
                {animeData.genre.map((g, index) => (
                  <span key={index} className="inline-block bg-blue-600 text-white rounded-full px-3 py-1 text-sm mr-2">
                    {g}
                  </span>
                ))}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">Episodes</h3>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(animeData.episodes)].map((_, index) => (
                <Link
                  key={index}
                  to={`/watch/${index + 1}`}
                  className="flex items-center justify-center bg-gray-700 hover:bg-blue-600 text-white rounded-lg p-4 transition duration-300"
                >
                  <Play className="w-4 h-4 mr-2" />
                  <span>Episode {index + 1}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;