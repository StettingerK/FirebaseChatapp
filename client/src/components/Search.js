import React, {useState} from 'react'
import { Key } from 'react'

const Search = () => {


  const SearchUser = () => {
    return (            
      <div className='userChat'>
        <img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>
        <div className='userChatInfo'>
          <span className='userName'>Hans Meyer</span>
        </div>
      </div>)
  }

  const handleKeyPress = (event) => {
  console.log(event.Key)

   // if( === "Enter"){console.log("Juhu")}  
  }
  const [unfolded, setUnfolded] = useState(false);

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Suchen nach Personen' onKeyDown={event => handleKeyPress(event)} onFocus={() => setUnfolded(true)} onBlur={() => setUnfolded(false)}/>
        {unfolded && (
          <div>
            {SearchUser()}
            {SearchUser()}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search