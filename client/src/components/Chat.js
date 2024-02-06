import React, {useState} from 'react';
import InputMessage from './InputMessage.js';
import Messages from './Messages.js';
import Search from './Search.js';
import Session from 'react-session-api'

const Chat = () => {
  const [chatpartner, setChatpartner] = useState(Session.get('ChatparternerName'));


  Session.onSet("ChatparternerName");
  return (
    <div className='chat'>
      <div className='infoBar'>
        <div className='chatPartner'>
          {/*<img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>*/}
          <div className='chatPartnerInfo'>
            <span className='chatPartnerName'>{chatpartner}</span>
          </div>
        </div>
        <Search/>
      </div>
      <Messages/>
      <InputMessage/>
    </div>
  )
}

export default Chat