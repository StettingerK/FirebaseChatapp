import React from 'react'
import UserInfoBar from './UserInfobar'
import Chats from './Chats.js'


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <UserInfoBar/>
      <Chats/>
    </div>
  )
}

export default Sidebar