import React from 'react'
import './home.scss'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Session from 'react-session-api'

const Home = () => {
  console.log(Session.get('UserId'));
  console.log(Session.get('UserName'));
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home