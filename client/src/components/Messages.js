import React, {useState} from 'react'
import Message from './Message.js'
import Session from 'react-session-api'

const Messages = () => {
  const [messages, setMessages] = useState()

  console.log(Session.get("ChatId"));

  async function getMessages(){
  if(Session.get("ChatId") !== "kein Chat vorhanden"){
    const postData = {
      ChatId: Session.get("ChatId")
    }
    try {
        const res = await fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },    
        body: JSON.stringify(postData)
        })
        const data= await res.json();
        console.log(data)
    } catch (error) {
        console.error('Error:', error);
    }
  }
}

      
  return (
    <div className='messages'>
      {/*
        Session.get("ChatId") !== "kein Chat vorhanden" ? 
        messages.map(data =>{

        })
        : ""*/
      }
      <button onClick={() =>getMessages()}>Get Messages</button>
        <Message owner={true} text={"abc"} time={"20:01"}/>
        <Message owner={false} text={"test"} time={"20:05"}/>

    </div>
  )
}

export default Messages