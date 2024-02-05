import React, {useState, useRef} from 'react'
import Session from 'react-session-api'

const Search = () => {
  const [searchedUsers, setSearchedUsers] = useState();
  const [unfolded, setUnfolded] = useState(false);
  const searchedRef = useRef( );

  const SearchUser = (userName) => {
    console.log(userName);
    return (            
      <div className='userChat'>
        {/*<img src='https://images.pexels.com/photos/18796314/pexels-photo-18796314/free-photo-of-herbstliche-radtour-durch-berlin.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load' alt=''/>*/}
        <div className='userChatInfo'>
          <span className='userName'>{userName}</span>
        </div>
      </div>)
  }

  async function handleKeyPress(event){
    if(event.code === "Enter" || event.code === "NumpadEnter"){
      event.preventDefault()
      const postData = {
        searchedUser: searchedRef.current.value
      }
      try {
          const res = await fetch('/search', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },    
          body: JSON.stringify(postData)
          })

          const data = await res.json();
          setSearchedUsers(data);
      } catch (error) {
          console.error('Error:', error);
      }
    }  
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Suchen nach Personen' onKeyDown={event => handleKeyPress(event)} onFocus={() => setUnfolded(true)} onBlur={() => setUnfolded(false)} ref={searchedRef}/>
        {unfolded && (
          <div>
            {searchedUsers !== undefined ?
            searchedUsers.map(e => {
              return(
              <div className='userChat'>
              <div className='userChatInfo'>
                <span className='userName' onClick={Session.set('ChatPartner', e[0])}>{e[1]}</span>
              </div>
            </div>)
            })
            : <div className='userChat'>
            <div className='userChatInfo'>
              <span className='userName'>No User Found</span>
            </div>
          </div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search