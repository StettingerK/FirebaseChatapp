import React from 'react'
import Message from './Message.js'

const Messages = () => {

  /*
  fetch('/data')
      .then(res => res.json())
      .then(data => console.log({ data }));
  
      */
      
  return (
    <div className='messages'>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default Messages