import React from 'react'

const Player = ({currentSong}) => {
    if (!currentSong){
        return(
            <div className='flex-1 bg-gray-800 flex items-center justify-center'>Select a song to play!</div>
        )
    }
  return (
    <div className='flex-1 bg-gradient-to-b from-gray-800 to-black flex flex-col items-center justify-center p-6'>
        <img 
            src={`https://cms.samespace.com/assets/${currentSong.cover}`} 
            alt={currentSong.title} 
            className='w-64 h-64 object-cover shadow-lg rounded-lg mb-6'
        />
        <h2 className='text-2xl font-bold'>{currentSong.name}</h2>
        <p className='text-sm text-gray-400'>{currentSong.artist}</p>
        <audio 
        controls
        autoPlay
        src={currentSong.url}
        className='mt-4 w-full max-w-md'
        ></audio>
    </div>
  )
}

export default Player