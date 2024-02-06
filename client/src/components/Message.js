import React from 'react'

const Message = (data) => {
  console.log(data)
  return (
    <div className='message'>
      <div className={`${data.owner ? "from-me" : "from-them"}`}>
        <span>{data.owner ? '' : 'Them'} {data.time}</span><br></br>
        <span className='text'>{data.text}</span>
      </div>
    </div>
  )
}

export default Message