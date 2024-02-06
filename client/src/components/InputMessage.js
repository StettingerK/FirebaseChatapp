import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import Session from 'react-session-api'

const InputMessage = () => {


  async function handleSending(e){
    //Session.get("ChatId");
  }

  return (
    <div className='inputMessage'>
      <input type='text'placeholder='Deine Nachricht'/>
      <div className='inputButtons'>
        <SendIcon className='sendIcon' onClick={(e) => handleSending(e)}/>
      </div>
    </div>
  )
}

export default InputMessage