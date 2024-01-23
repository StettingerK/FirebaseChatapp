import React from 'react'

const Chats = () => {
  return (
    <div className='chats'>
      <div className='userChat'>
        <img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>
        <div className='userChatInfo'>
          <span className='userName'>Jürgen Hansenbauer</span>
          <span className='lastMessage'>Letzte Message1</span>
        </div>
      </div>
      <div className='userChat'>
        <img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>
        <div className='userChatInfo'>
          <span className='userName'>Henry Henrysohn</span>
          <span className='lastMessage'>Letzte Message2</span>
        </div>
      </div>
      <div className='userChat'>
        <img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>
        <div className='userChatInfo'>
          <span className='userName'>Hans Meyer</span>
          <span className='lastMessage'>Letzte Message3</span>
        </div>
      </div>
      <div className='userChat'>
        <img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>
        <div className='userChatInfo'>
          <span className='userName'>Hans Meyer</span>
          <span className='lastMessage'>Letzte Message4</span>
        </div>
      </div>

    </div>
  )
}

export default Chats