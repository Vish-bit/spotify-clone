import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("https://cms.samespace.com/items/songs");
        const data = await res.json();
        setSongs(data.data);
      } catch (err) {
        console.error("Error fetching songs:", err);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (activeTab === "topTracks") {
      setFilteredTracks(songs.filter((song) => song.top_track === true));
    } else {
      setFilteredTracks(songs);
    }
  }, [activeTab, songs]);

  return (
    <>
      <div
        className="flex sm:flex-row flex-col sm:h-screen text-white text-lg transition-all duration-500"
        style={{
          background: `linear-gradient(to right, ${
            currentSong ? currentSong.accent : "#242424"
          }, black)`,
        }}
      >
        <Logo />
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} songs={filteredTracks} setCurrentSong={setCurrentSong}/>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {filteredTracks.length > 0 ? (
            <Player currentSong={currentSong} />
          ) : (
            <p className="text-gray-400">Loading songs...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
