import React, {useState, useEffect} from "react";

const SongsList = ({ filteredTracks, setCurrentSong }) => {
  const [durations, setDurations] = useState({}); // store durations keyed by song.id

  useEffect(() => {
    // Load duration for each song when filteredTracks changes
    filteredTracks.forEach((song) => {
      if (!durations[song.id]) {
        const audio = new Audio(song.url);
        audio.addEventListener("loadedmetadata", () => {
          setDurations((prev) => ({
            ...prev,
            [song.id]: formatTime(audio.duration),
          }));
        });
      }
    });
  }, [filteredTracks]);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex-1 pt-6 overflow-y-auto no-scrollbar">
      {filteredTracks.length === 0 ? (
        <p className="p-4 text-gray-400">No songs found.</p>
      ) : (
        <ul>
          {filteredTracks.map((song) => (
            <li
              key={song.id}
              className="py-4 px-4 cursor-pointer hover:bg-white/20 hover:rounded-lg"
              onClick={() => setCurrentSong(song)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={`https://cms.samespace.com/assets/${song.cover}`}
                    alt={song.name}
                    className="w-12 h-12 rounded-3xl object-cover mr-4"
                  />
                  <div className="">
                    <p>{song.name}</p>
                    <p className="text-sm text-white/60">{song.artist}</p>
                  </div>
                </div>
                <span className="text-white/60">{durations[song.id] || "--:--"}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongsList;
