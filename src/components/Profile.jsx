import React from 'react'

const Profile = () => {
  return (
    <div className="p-4 flex items-center gap-2">
      <img
        src="https://i.pravatar.cc/40"
        alt="profile"
        className="rounded-full"
      />
      <span className="text-sm">John Doe</span>
    </div>
  )
}

export default Profile