import React, { useRef, useEffect } from "react";

const Player = ({ currentSong }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load(); // reload audio
      audioRef.current.play(); // auto play on select
    }
  }, [currentSong]);

  if (!currentSong) {
    return (
      <div className="flex items-center justify-center">
        Select a song to play!
      </div>
    );
  }
  return (
    <div className="w-1/3 flex flex-col items-center justify-center">
      <img
        src={`https://cms.samespace.com/assets/${currentSong.cover}`}
        alt={currentSong.name}
        className="w-48 h-48 rounded-lg shadow-lg mb-4"
      />
      <h2 className="text-xl font-bold">{currentSong.name}</h2>
      <p className="text-gray-600">{currentSong.artist}</p>

      <audio ref={audioRef} controls className="mt-4 w-full max-w-md">
        <source src={currentSong.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
