import React, {useState, useEffect} from 'react';
import InputMessage from './InputMessage.js';
import Messages from './Messages.js';
import Search from './Search.js';
import Session from 'react-session-api'

const Chat = () => {
  const [chatpartner, setChatpartner] = useState();
  const [chatpartnerId, setChatpartnerId] = useState();
  const [chatId, setChatId] = useState();
  let abc;
  const didMount = React.useRef(false);

  const Chatpartner = (data) => {
    console.log(data["ChatparternerName"]);
    abc= data['ChatparternerName'];
    console.log("abc is " + abc);
    //setChatpartner(data["ChatparternerName"])
    setChatpartner(data["ChatparternerName"])
    setChatpartnerId(data["ChatparternerId"])
  };
  Session.onSet(data =>Chatpartner(data));
  
  const handleClick =() =>{
    console.log("Chatpartner ist " + chatpartner);
    setChatpartner("hixen")
    handleGetChatId()
  }
  useEffect(() => {
    if(!didMount.current){
      didMount.current = true;
      console.log("abc")
      return;
    }
    console.log("useEffect")
    console.log(chatpartner);
  }, [chatpartner]);

  async function handleGetChatId(){
      const postData = {
        //myUserId: Session.get("UserId"),
        myUserId: "KXLtVdT7GfqVn8hKErtE",
        //chatpartnerUserId: Session.get("ChatparternerId")
        chatpartnerUserId: "rxnIqmqcZVxhBKhCM40H"
      }
      try {
          const res = await fetch('/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },    
          body: JSON.stringify(postData)
          })
          const data= await res.text();
          Session.set("ChatId", data)
          setChatId(data);
          console.log(data)
      } catch (error) {
          console.error('Error:', error);
      }
  }

  return (
    <div className='chat'>
      <div className='infoBar'>
        <div className='chatPartner'>
          {/*<img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>*/}
          <div className='chatPartnerInfo'>
            <span className='chatPartnerName'>{chatpartner}</span>
            <button onClick={() => handleClick()}>abc</button>
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