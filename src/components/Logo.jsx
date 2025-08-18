import React from 'react'
import Profile from './Profile'

const Logo = () => {
  return (
    <div className='md:w-1/4 w-full flex md:flex-col flex-row justify-between'>
      <div className='text-2xl p-4'>
          <img src="src\assets\spotify-logo.png" alt="Spotify Logo" />
      </div>
      <Profile />
    </div>
  )
}

export default Logo