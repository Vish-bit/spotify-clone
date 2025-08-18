import React, { useState } from "react";
import SongsList from "./SongsList";
import SearchLogo from '../assets/search-icon.png';

const Sidebar = ({ activeTab, setActiveTab, songs, setCurrentSong }) => {
  const [search, setSearch] = useState("");

  // Filter songs by search term (name or artist)
  const filteredTracks = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="md:w-1/3 w-full text-white flex flex-col px-6">

      <div className="flex sm:justify-left py-4">
        <button
          className={`py-2 pr-10 rounded font-700 text-2xl ${
            activeTab === "forYou" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("forYou")}
        >For You
        </button>
        <button
          className={`py-2 rounded font-700 text-2xl ${
            activeTab === "topTracks" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("topTracks")}
        >Top Tracks
        </button>
      </div>

      <div className="relative">
        <img
          src={SearchLogo}
          alt="Search"
          className="absolute right-4 w-7 h-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring focus:ring-white/40"
        />
      </div>

      <SongsList filteredTracks={filteredTracks} setCurrentSong={setCurrentSong}/>
    </div>
  );
};

export default Sidebar;
