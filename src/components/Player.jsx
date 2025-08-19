import React, { useState, useRef, useEffect } from "react";
import MoreOptions from "../assets/more-options.svg";
import MuteIcon from "../assets/mute.png";
import VolumeIcon from "../assets/volume.svg";
import SkipBackIcon from "../assets/skipback.svg";
import SkipForwardIcon from "../assets/skipforward.svg";
import PlayIcon from "../assets/play.svg";
import PauseIcon from "../assets/pause.svg";
import HeartIcon from "../assets/heart.png";
import ShareIcon from "../assets/share.png";
import DownloadIcon from "../assets/download.png";

const Player = ({ currentSong, songs, setCurrentSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const [open, setOpen] = useState(false);

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

  const skipForward = () => {
    if (!songs || songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const skipBackward = () => {
    if (!songs || songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      if (audioRef.current.volume > 0) {
        audioRef.current.volume = 0; // mute
        setVolume(0);
      } else {
        audioRef.current.volume = 1; // unmute (or last volume you want)
        setVolume(1);
      }
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / audioRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    console.log("audioRef - ", audioRef);
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
    <div className="w-full max-w-md h-full max-h-md text-white p-6 flex flex-col items-center justify-center">
      <div className="text-left mb-8 w-full">
        <h2 className="text-4xl mb-2 font-700">{currentSong.name}</h2>
        <p className="text-white/60 text-base">{currentSong.artist}</p>
      </div>

      <img
        src={`https://cms.samespace.com/assets/${currentSong.cover}`}
        alt={currentSong.name}
        className="w-full max-h-[420px] aspect-[2/3] rounded-lg shadow-xl mb-6 object-cover"
      />

      <div
        className="w-full h-2 bg-gray-600 rounded-lg cursor-pointer relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const newProgress = clickX / rect.width;
          handleSeek({ target: { value: newProgress * 100 } }); // simulate range change
        }}
      >
        <div
          className="h-2 bg-white rounded-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between w-full mt-8 gap-2">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer focus:outline-none focus-visible:outline-none"
          >
            <img src={MoreOptions} alt="More" />
          </button>

          {open && (
            <div className="absolute right-14 bottom-3 mt-2 w-15 bg-white/10 text-white rounded-lg shadow-lg">
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-white/10 hover:rounded-lg cursor-pointer">
                  <img src={HeartIcon} alt="Heart" width={24} />
                </li>
                <li className="px-4 py-2 hover:bg-white/10 hover:rounded-lg cursor-pointer">
                  <img src={DownloadIcon} alt="" width={24} />
                </li>
                <li className="px-4 py-2 hover:bg-white/10 hover:rounded-lg cursor-pointer">
                  <img src={ShareIcon} alt="" width={21} />
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 justify-between">
          <button className="cursor-pointer focus:outline-none focus-visible:outline-none">
            <img src={SkipBackIcon} alt="Skip Back" onClick={skipBackward} />
          </button>

          <button
            onClick={togglePlay}
            className="shadow-lg cursor-pointer focus:outline-none focus-visible:outline-none"
          >
            {isPlaying ? (
              <img src={PauseIcon} alt="Pause" className="w-12 h-12" />
            ) : (
              <img src={PlayIcon} alt="Play" className="w-12 h-12" />
            )}
          </button>

          <button className="cursor-pointer focus:outline-none focus-visible:outline-none">
            <img
              src={SkipForwardIcon}
              alt="Skip Forward"
              onClick={skipForward}
            />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={handleVolumeChange}
            className="text-2xl cursor-pointer focus:outline-none focus-visible:outline-none"
          >
            {volume === 0 ? (
              <div className="bg-white/10 p-3 rounded-full">
                <img src={MuteIcon} alt="Volume" width={24.1} />
              </div>
            ) : (
              <img src={VolumeIcon} alt="Volume" />
            )}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        volume={volume}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Player;
