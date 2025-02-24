import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rewind, FastForward, Play, Pause, AlertCircle, Loader } from 'lucide-react';

function VideoPlayer() {
  const { episode } = useParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    setProgress(0);
    
    // Reset video state when episode changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [episode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(false);
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      setError(false);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        setProgress((bufferedEnd / duration) * 100);
      }
    };

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('waiting', () => setIsLoading(true));
    video.addEventListener('canplay', () => setIsLoading(false));

    // Cleanup
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('waiting', () => setIsLoading(true));
      video.removeEventListener('canplay', () => setIsLoading(false));
    };
  }, []);

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
    setIsLoading(false);
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
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-white">Loading video... {Math.round(progress)}%</p>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src={`https://cdn.discordapp.com/attachments/1269215595661103115/1343542743489708094/eps_1.mp4?ex=67bda72f&is=67bc55af&hm=c28d3b1d89eebaae10a3e530fd5382dda9cec1b441541ff21fac1e20f8f66548&`}
          onError={handleError}
          controls={false}
          preload="auto"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleTimeSkip(-10)}
                className="text-white hover:text-blue-400 transition"
                disabled={isLoading}
              >
                <Rewind className="w-6 h-6" />
              </button>
              
              <button
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition"
                disabled={isLoading}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button
                onClick={() => handleTimeSkip(10)}
                className="text-white hover:text-blue-400 transition"
                disabled={isLoading}
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
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
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
