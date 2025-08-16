import React, {useState} from "react";

const Sidebar = ({ activeTab, setActiveTab, songs, setCurrentSong }) => {
  const [search, setSearch] = useState("");

  // Filter songs by search term (name or artist)
  const filteredTracks = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sm:w-1/3 w-full text-white sm:h-screen flex flex-col">
      {/* Tabs */}
      <div className="flex justify-around p-4">
        <button
          className={`px-3 py-2 rounded font-700 text-2xl ${activeTab === "forYou" ? "text-white" : "text-gray-400"}`}
          onClick={() => setActiveTab("forYou")}
        >
          For You
        </button>
        <button
          className={`px-3 py-2 rounded font-700 text-2xl ${activeTab === "topTracks" ? "text-white" : "text-gray-400"}`}
          onClick={() => setActiveTab("topTracks")}
        >
          Top Tracks
        </button>
      </div>

      {/* Search box */}
      <div className="relative">
        <img src="src\assets\search-icon.png" alt="" className="absolute right-6 w-7 h-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring focus:ring-white/40"
        />
      </div>

      {/* Song list */}
      <div className="flex-1 overflow-y-auto">
        {filteredTracks.length === 0 ? (
          <p className="p-4 text-gray-400">No songs found.</p>
        ) : (
          <ul>
            {filteredTracks.map((song) => (
              <li
                key={song.id}
                className="p-4 cursor-pointer hover:bg-white/20 hover:rounded-lg"
                onClick={() => setCurrentSong(song)}
              >
                <p className="font-semibold">{song.name}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
