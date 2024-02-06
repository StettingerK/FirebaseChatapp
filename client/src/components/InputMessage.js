import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import Session from 'react-session-api'

const InputMessage = () => {

  const handleSend = () => {
    Session.get('ChatID');
    //Session.get('ChatPartnerId');
    //Session.get('UserId');
  }

  return (
    <div className='inputMessage'>
      <input type='text'placeholder='Deine Nachricht'/>
      <div className='inputButtons'>
        <SendIcon className='sendIcon' onClick={handleSend()}/>
      </div>
    </div>
  )
}

export default InputMessage