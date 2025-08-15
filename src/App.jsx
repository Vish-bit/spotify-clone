import { useEffect, useState } from "react"
import Logo from "./components/Logo"
import Profile from "./components/Profile"
import Sidebar from "./components/Sidebar"
import Player from "./components/Player";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    fetch("https://cms.samespace.com/items/songs")
    .then((res) => res.json())
    .then((data)=> 
      setSongs(data? data.data : [])
    // console.log(data.data)
  )
    .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-white">
        <div>
          <Logo />
          <Profile />
        </div>
        <Sidebar songs={songs} onSelectSong={setCurrentSong}/>
        <Player currentSong={currentSong}/>
      </div>
    </>
  ) 
}

export default App
