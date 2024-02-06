import React, {useState, useRef, useCallback} from 'react'
import Session from 'react-session-api'

const Search = () => {
  const [searchedUsers, setSearchedUsers] = useState();
  const [unfolded, setUnfolded] = useState(false);
  const searchedRef = useRef( );

  async function handleKeyPress(event){
    if((event.code === "Enter" || event.code === "NumpadEnter") && searchedRef.current.value !== ""){
      //event.preventDefault()
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
          const data= await res.json();
          console.log(data)
          setSearchedUsers(data);
      } catch (error) {
          console.error('Error:', error);
          setSearchedUsers(undefined);
      }
    }  
  }

  const handleClickChatpartner = (data) => {
    console.log("Session changed");
    //console.log(data);
    Session.set('ChatparternerName', data[1]);
    Session.set('ChatpartnerId', data[0]);
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text" placeholder='Suchen nach Personen' onKeyDown={event => handleKeyPress(event)} onFocus={() => setUnfolded(true)} onBlur={() => {setTimeout(() => {setUnfolded(false);}, 100)}} ref={searchedRef}/>
      </div>
        {unfolded && (
          <div>
            {searchedUsers !== undefined?
            searchedUsers.map(data => {
              return(
              <div className='userChat' onClick={() => handleClickChatpartner(data)}>
                <span className='userName'>{data[1]}</span>
              </div>)
            })
            : <div className='userChat'>
                <span className='userName' >No User Found</span>
              </div>
            }
          </div>
        )}
    </div>
  )
}

export default Search