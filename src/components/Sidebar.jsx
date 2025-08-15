import React from 'react'

const Sidebar = ({songs, onSelectSong}) => {
  return (
    <div className='bg-gray-900 w-64 flex flex-col justify-between text-white'>
        <ul>
            {songs.map((song)=> (
                <li 
                key={song.id}
                onClick={() => onSelectSong(song)}
                className='p-3 hover:bg-grey-700 cursor-pointer'>   
                    {song.name}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Sidebar
