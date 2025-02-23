import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rewind, FastForward, Play, Pause, AlertCircle } from 'lucide-react';

function VideoPlayer() {
  const { episode } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [episode]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handlePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleError = () => {
    setError(true);
    setIsPlaying(false);
  };

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Video Not Available</h2>
          <p className="text-gray-400 mb-6">
            The video file for Episode {episode} could not be loaded. Please make sure the video file exists in the correct format.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Demon Slayer - Episode {episode}</h1>
      
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src={`/components/eps_${episode}.mp4`}
          onError={handleError}
          controls={false}
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleTimeSkip(-10)}
                className="text-white hover:text-blue-400 transition"
              >
                <Rewind className="w-6 h-6" />
              </button>
              
              <button
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button
                onClick={() => handleTimeSkip(10)}
                className="text-white hover:text-blue-400 transition"
              >
                <FastForward className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              {[0.5, 1, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handlePlaybackRate(rate)}
                  className={`px-2 py-1 rounded ${
                    playbackRate === rate
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
