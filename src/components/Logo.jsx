import Profile from './Profile'
import spotifyLogo from '../assets/spotify-logo.png'

const Logo = () => {
  return (
    <div className='md:w-64 w-full flex md:flex-col flex-row justify-between'>
      <div className='text-2xl p-4'>
          <img src={spotifyLogo} alt="Spotify Logo" />
      </div>
      <Profile />
    </div>
  )
}

export default Logo