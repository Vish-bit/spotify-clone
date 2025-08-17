import React, { useState, useRef, useEffect } from "react";

const Player = ({ currentSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load(); // reload audio
      audioRef.current.play(); // auto play on select
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / audioRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  if (!currentSong) {
    return (
      <div className="flex items-center justify-center">
        Select a song to play!
      </div>
    );
  }
  return (
    <div className="w-full max-w-md text-white p-2 flex flex-col items-center">
      <div className="text-left mb-4 w-full">
        <h2 className="text-4xl font-700">{currentSong.name}</h2>
        <p className="text-white/60 text-base">{currentSong.artist}</p>
      </div>

      <img
        src={`https://cms.samespace.com/assets/${currentSong.cover}`}
        alt={currentSong.name}
        className="w-120 h-120 rounded-lg shadow-xl mb-4 object-cover"
      />

      <input
        type="range"
        value={progress}
        onChange={handleSeek}
        className="w-full mt-4 accent-white cursor-pointer"
      />

      <div className="flex items-center justify-between w-full mt-6 ">
        <button>
          <img src="src\assets\more-options.svg" alt="More" className="" />
        </button>
        <div className="flex items-center w-1/3 justify-between">
          <button>
            <img src="src\assets\skipback.svg" alt="Skip Back" />
          </button>
          <button onClick={togglePlay} className="shadow-lg cursor-pointer">
            {isPlaying ? (
              <img
                src="src/assets/pause.svg"
                alt="Pause"
                className="w-12 h-12"
              />
            ) : (
              <img src="src/assets/play.svg" alt="Play" className="w-12 h-12" />
            )}
          </button>
          <button>
            <img src="src/assets/skipforward.svg" alt="Skip Forward" />
          </button>
        </div>
        <button>
          <img src="src\assets\volume.svg" alt="Volume" />
        </button>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export default Player;
