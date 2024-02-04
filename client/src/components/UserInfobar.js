import React from 'react'
import Benutzer from '../img/Benutzer4.jpeg';
import {useNavigate} from 'react-router-dom';
import Session from 'react-session-api'


const UserInfobar = () => {
  const navigate = useNavigate();

  function handleLogout(){
    navigate("/login");
    Session.clear();
  }


  const userName = Session.get('UserName');
  return (
    <div className='userInfoBar'>
      <div className='logo'> Chatapp</div>
      <div className='user'>
        {/*<img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>*/}
        <span className='userName'>{userName}</span>
        <button className='logoutButton' type="button" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

export default UserInfobar