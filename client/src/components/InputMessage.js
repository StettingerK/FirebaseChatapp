import React from 'react'
import SendIcon from '@mui/icons-material/Send';

const InputMessage = () => {
  return (
    <div className='inputMessage'>
      <input type='text'placeholder='Deine Nachricht'/>
      <div className='inputButtons'>
          <button>
            <SendIcon className='sendIcon'/>
          </button>
      </div>
    </div>
  )
}

export default InputMessage